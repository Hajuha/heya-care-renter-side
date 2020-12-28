import { Col, Input, Row, Select } from 'antd';
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../../../assets/icons/header-logo.svg';
import { browserHistory } from '../../../helpers';

import './style.scss';

const AppHeader = (props) => {
    const [scrolled, setScrolled] = React.useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });

    let navbarClasses = ['app-header'];

    if (scrolled) {
        navbarClasses.push('scrolled');
    }

    const selectBefore = (
        <Select defaultValue='HN' className='select-before'>
            <Select.Option value='HN'>Hà Nội</Select.Option>
            <Select.Option value='hcm'>Hà Nộiiiii</Select.Option>
        </Select>
    );
    const searchRoom = (values) => {
        browserHistory.push({
            pathname: '/results/',
            search: '?' + new URLSearchParams({ q: values }).toString(),
        });
        // window.location.reload();   
    };

    return (
        <React.Fragment>
            <div className={navbarClasses.join(' ')}>
                <Row align='middle' justify='center'>
                    <Col md={6} offset={{ sm: '0', md: '2' }}>
                        <Link className='logo' to='/'>
                            <img
                                alt='logo'
                                className='logo-img'
                                src={Logo}></img>
                        </Link>
                    </Col>
                    <Col md={13}>
                        <div className='search-bar'>
                            <Input.Search
                                onSearch={searchRoom}
                                addonBefore={selectBefore}
                                placeholder='Tìm kiếm theo địa điểm, quận, tên đường,...'></Input.Search>
                        </div>
                    </Col>
                    <Col md={3}>
                        <Link to='/login'>
                            <span className='login'>Sign In</span>
                        </Link>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default AppHeader;
