import { Col, Dropdown, Input, Menu, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useHistory, useLocation } from "react-router";
import Logo from '../../../assets/icons/header-logo.svg';
import { browserHistory } from '../../../helpers';
import { connect } from 'react-redux';
import authAPI from '../../../services/apis/auth';
import * as actions from '../../../actions/auth';
import './style.scss';
import Avatar from 'antd/lib/avatar/avatar';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';

const AppHeader = (props) => {
    const [scrolled, setScrolled] = React.useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const { isAuthenticated, logout } = props;
    const [state, setState] = React.useState(false);
    const location = useLocation();
    const histiory = useHistory()
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            authAPI.getUser().then((user) => {
                setCurrentUser(user.data);
            });
        }
    }, []);

    React.useEffect(() => {
        // window.addEventListener('scroll', handleScroll);
    });
    useEffect(() => {
        // console.log(location);
        // console.log(state);
    }, [location])
    let navbarClasses = ['app-header'];

    if (scrolled) {
        navbarClasses.push('scrolled');
    }

    const selectBefore = (
        <Select defaultValue='HN' className='select-before'>
            <Select.Option value='HN'>Hà Nội</Select.Option>
        </Select>
    );
    const searchRoom = (values) => {
        histiory.push({
            pathname: '/results',
            search: '?' + new URLSearchParams({ q: values }).toString(),
        });
        // setState(!state)
        // window.location.reload();
    };

    const handleLogout = () => {
        histiory.push('/login');
        logout();
    };

    const userMenu = (
        <Menu>
            <Menu.Item data-testid='btn-logout' onClick={handleLogout}>
                <LogoutOutlined />
                <span>Đăng xuất</span>
            </Menu.Item>
        </Menu>
    );

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
                        {!isAuthenticated ? (
                            <Link to='/login'>
                                <span className='login'>Sign In</span>
                            </Link>
                        ) : (
                            <Dropdown overlay={userMenu} trigger={['click']}>
                                <span className='app-user'>
                                    <Avatar
                                        src={currentUser.avatar_url}
                                        size={64}
                                    />
                                    <span className='name'>
                                        {currentUser.fullname}
                                    </span>
                                    <DownOutlined />
                                </span>
                            </Dropdown>
                        )}
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};
function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
    };
}

export default connect(mapStateToProps, { logout: actions.logout })(AppHeader);
