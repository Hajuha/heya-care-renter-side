import { Col, Dropdown, Input, Menu, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import Logo from '../../../assets/icons/header-logo.svg';
import { browserHistory } from '../../../helpers';
import { connect, useDispatch, useSelector } from 'react-redux';
import authAPI from '../../../services/apis/auth';
import * as actions from '../../../actions/auth';
import './style.scss';
import Avatar from 'antd/lib/avatar/avatar';
import { DownOutlined, HeartOutlined, LogoutOutlined } from '@ant-design/icons';

const AppHeader = (props) => {
    const [scrolled, setScrolled] = React.useState(false);

    const user = useSelector((state) => state.user);
    const [currentUser, setCurrentUser] = useState({});
    const dispatch = useDispatch();
    const { isAuthenticated } = props;
    const [state, setState] = React.useState(false);
    const location = useLocation();
    const histiory = useHistory();
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        if (user.access_token) {
            authAPI.getUser().then((user) => {
                setCurrentUser(user.data);
            });
        }
    }, [location]);

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });
    useEffect(() => {}, [location]);
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
    };

    const handleLogout = () => {
        histiory.push('/login');
        dispatch(actions.logout());
    };

    const handleFavorite = () => {
        histiory.push('/favorite');
    };

    const userMenu = (
        <Menu>
            <Menu.Item data-testid='btn-logout' onClick={handleFavorite}>
                <HeartOutlined />
                <span>Phòng đã lưu</span>
            </Menu.Item>
            <Menu.Item data-testid='btn-logout' onClick={handleFavorite}>
                <HeartOutlined />
                <span>Danh sách ưa thích</span>
            </Menu.Item>
            <Menu.Item data-testid='btn-logout' onClick={handleLogout}>
                <LogoutOutlined />
                <span>Đăng xuất</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <React.Fragment>
            <div className={navbarClasses.join(' ')}>
                <Row align='middle' justify='space-between'>
                    <Col md={6} offset={{ sm: '0', md: '2' }}>
                        <Link className='logo' to='/'>
                            <img
                                alt='logo'
                                className='logo-img'
                                src={Logo}></img>
                        </Link>
                    </Col>
                    <Col md={13} sm={0}>
                        <div className='search-bar'>
                            <Input.Search
                                onSearch={searchRoom}
                                addonBefore={selectBefore}
                                placeholder='Tìm kiếm theo địa điểm, quận, tên đường,...'></Input.Search>
                        </div>
                    </Col>
                    <Col md={5}>
                        {!user.access_token ? (
                            <Link to='/login'>
                                <span className='login'>Sign In</span>
                            </Link>
                        ) : (
                            <Dropdown overlay={userMenu}>
                                <span className='app-user'>
                                    <Avatar
                                        src={currentUser.avatar_url}
                                        size={{ md: '64', sm: '32' }}
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
