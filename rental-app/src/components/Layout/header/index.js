import { Col, Input, Row, Select } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/icons/header-logo.svg';
import './style.scss';

const AppHeader = () => {
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

    return (
        <React.Fragment>
            <div className={navbarClasses.join(' ')}>
                <Row align='middle' justify='center'>
                    <Col md={6} offset={{ sm: '0', md: '2' }}>
                        <a className='logo' href='/'>
                            <img
                                alt='logo'
                                className='logo-img'
                                src={Logo}></img>
                        </a>
                    </Col>
                    <Col md={13}>
                        <div className='search-bar'>
                            <Input.Search
                                addonBefore={selectBefore}
                                placeholder='Tìm kiếm theo địa điểm, quận, tên đường,...'></Input.Search>
                        </div>
                    </Col>
                    <Col md={3}>
                        <a href='/login'>
                            <span className='login'>Sign In</span>
                        </a>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default AppHeader;
