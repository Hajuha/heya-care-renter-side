import './style.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import { Row, Col } from 'antd';
import Logo from '../../../assets/icons/header-logo.svg';
import LogoFB from '../../../assets/icons/logo-facebook.svg';
import LogoGG from '../../../assets/icons/logo-google-plus.svg';
function Footer(props) {
    return (
        <React.Fragment>
            <div className='footer-container'>
                <Row>
                    <Col sm={12}>
                        <div className='footer-left-side'>
                            <Link to='/'>
                                <img alt='/' className='logo-img' src={Logo} />
                            </Link>

                            <div className='footer-description-container'>
                                <span className='footer-description'>
                                    HeyaCare – Trang web đăng tin chuyên nghiệp,
                                    cung cấp nền tảng hiện tại, đầy đủ, chính
                                    xác, kịp thời mức giá bán bất động sản tại
                                    các tỉnh thành trên khắp Việt Nam.
                                </span>
                            </div>

                            <div className='social-connect'>
                                <Link href='/'>
                                    <img
                                        alt='/'
                                        className='logo-social'
                                        src={LogoFB}
                                    />
                                </Link>

                                <Link href='/'>
                                    <img
                                        alt='/'
                                        className='logo-social'
                                        src={LogoGG}
                                    />
                                </Link>
                            </div>
                        </div>
                    </Col>

                    <Col sm={12}>
                        <div className='footer-right-side'>
                            <div className='footer-menu'>
                                <div className='footer-menu-item footer-menu-item-text'>
                                    <Link to='/'>
                                        <div className='footer-menu-item-text'>
                                            Trang chủ
                                        </div>
                                    </Link>
                                </div>

                                <div className='footer-menu-item'>
                                    <Link to='/results?q=' className='footer-menu-item-text'>
                                        Tìm kiếm
                                    </Link>
                                </div>
                            </div>

                            <div className='footer-info'>
                                <div className='footer-info-container'>
                                    <div className='footer-info-text email'>
                                        heyacare@gmail.com
                                    </div>

                                    <div className='footer-info-text'>
                                        (+84)-0966542232
                                    </div>

                                    <div className='footer-info-text address'>
                                        Tòa nhà Accommodation, 144 Xuân Thủy,
                                        Cầu Giấy, Hà Nội.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className='footer-end'>
                    <span className='footer-copyright-text'>
                        Copyright© 2020 All rights reserved
                    </span>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Footer;
