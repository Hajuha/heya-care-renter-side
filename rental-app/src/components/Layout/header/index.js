import { Col, Input, Row, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import * as React from 'react';
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
            <Option value='HN'>HN</Option>
            <Option value='TP.HCM'>TP.HCM</Option>
        </Select>
    );

    return (
        <React.Fragment>
            <div className={navbarClasses.join(' ')}>
                <Row align='middle'>
                    <Col span={6}>
                        <a className='logo' href='/'>
                            <img
                                alt='logo'
                                className='logo-img'
                                src={Logo}></img>
                        </a>
                    </Col>
                    <Col span={12}>
                        <div className='search-bar'>
                            <Input.Search
                                addonBefore={selectBefore}
                                placeholder='Tìm kiếm theo địa điểm, quận, tên đường,...'></Input.Search>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='user-field'></div>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default AppHeader;
