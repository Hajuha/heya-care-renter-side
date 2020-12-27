import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from 'swiper';
import { Breadcrumb, Card, Col, Row, Spin, Tag, Typography } from 'antd';
import {
    HomeFilled,
    UserOutlined,
    RocketFilled,
    EditFilled,
    ArrowUpOutlined,
} from '@ant-design/icons';
import roomAPI from '../../services/apis/room';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './style.scss';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const RoomPage = (props) => {
    let [room, setRoom] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('scroll', checkScrollTop);

    const { id } = props;

    let coordinate = [];

    useEffect(() => {
        getRoom();
    }, []);

    const getRoom = () => {
        roomAPI.get('ce8acec3-4e2c-437f-a608-119aa140df18').then((res) => {
            setRoom(res.data);
            setIsLoading(false);
        });
    };

    const nearLocation = [
        'Dai hoc Quoc gia Ha Noi',
        'Dai hoc Su pham Ha Noi',
        'Dai hoc Thuong mai',
        'Nga tu Mai dich',
    ];
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

    let navbarClasses = ['owner-info'];

    if (scrolled) {
        navbarClasses.push('card-scroll');
    }
    const ratingChanged = (rating) => {};

    if (isLoading) {
        return <Spin className='app-spinner' />;
    }

    const { images, owner, nearby_locations } = room;

    return (
        <React.Fragment>
            <div className='room-page'>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href='/'>Trang chủ</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href='/'>{room.city.name}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href='/'>{room.district.name}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href='/'>{room.ward.name}</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className='room-title'>
                    <Typography.Title level={2}>{room.title}</Typography.Title>
                </div>
                <Row gutter={32}>
                    <Col sm={24} xl={{ span: 8, push: 16 }}>
                        <Card
                            title={
                                <div className='card-header room-info-card'>
                                    <Typography.Title level={3}>
                                        <UserOutlined className='icon' />
                                        &nbsp;&nbsp;Thông tin chủ phòng
                                    </Typography.Title>
                                </div>
                            }
                            className={navbarClasses.join(' ')}>
                            <div className='body'>
                                <div
                                    className='owner-avt'
                                    style={{
                                        backgroundImage:
                                            'url(' + owner.avatar_url + ')',
                                    }}></div>
                                <Typography.Title level={4}>
                                    {owner.fullname}
                                </Typography.Title>
                                <Typography.Title level={5}>
                                    {owner.phone_number}
                                </Typography.Title>
                            </div>
                        </Card>
                    </Col>
                    <Col sm={24} xl={{ span: 16, pull: 8 }}>
                        <Swiper
                            spaceBetween={0}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            slidesPerView={1}
                            navigation={{ clickable: true }}
                            pagination={{ clickable: true }}>
                            {images.map((image, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <img
                                            alt='img'
                                            src={image}
                                            className='img-slide'></img>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Col>
                </Row>
                <div className='room-info'>
                    <div
                        className='scrollTop'
                        onClick={scrollTop}
                        style={{
                            height: 40,
                            display: showScroll ? 'flex' : 'none',
                        }}>
                        <ArrowUpOutlined className='icon' />
                    </div>
                    <Row gutter={32}>
                        <Col xl={16} span={24}>
                            <Card
                                title={
                                    <div className='card-header room-info-card'>
                                        <Typography.Title level={3}>
                                            <HomeFilled className='icon' />
                                            &nbsp;&nbsp;Thông tin phòng
                                        </Typography.Title>
                                    </div>
                                }
                                className='room-information'>
                                <Row
                                    justify='space-around'
                                    className='info-container'>
                                    <Col span={6}>
                                        <div
                                            style={{
                                                fontWeight: '600',
                                            }}>
                                            GÍA PHÒNG
                                        </div>
                                        <div>
                                            {room.price?.toLocaleString()} đồng
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div
                                            style={{
                                                fontWeight: '600',
                                            }}>
                                            DIỆN TÍCH
                                        </div>
                                        <div>{room.area}</div>
                                    </Col>
                                    <Col span={6}>
                                        <div
                                            style={{
                                                fontWeight: '600',
                                            }}>
                                            Ở CHUNG CHỦ
                                        </div>
                                        <div>
                                            {room.is_stay_with_the_owner
                                                ? 'Có'
                                                : 'Không'}
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div
                                            style={{
                                                fontWeight: '600',
                                            }}>
                                            SỨC CHỨA
                                        </div>
                                        <div>5 người</div>
                                    </Col>
                                </Row>

                                <Row className='info-container'>
                                    <Col span={6}>
                                        <div
                                            className='room-status'
                                            style={{
                                                fontWeight: '600',
                                            }}>
                                            TRẠNG THÁI
                                        </div>
                                        <div>
                                            {room.is_rented
                                                ? 'Đã hết'
                                                : 'Còn chỗ'}
                                        </div>
                                    </Col>

                                    <Col span={6}>
                                        <div
                                            style={{
                                                fontWeight: '600',
                                            }}>
                                            GIÁ ĐIỆN
                                        </div>
                                        <div>{room.electricity_price}</div>
                                    </Col>
                                    <Col span={6}>
                                        <div
                                            style={{
                                                fontWeight: '600',
                                            }}>
                                            GIÁ NƯỚC
                                        </div>
                                        <div>{room.water_price}</div>
                                    </Col>
                                </Row>
                                <Row className='info-container'>
                                    <Col>
                                        <div
                                            className='room-status'
                                            style={{
                                                fontWeight: '600',
                                            }}>
                                            ĐIẠ CHỈ
                                        </div>
                                        <div>
                                            {room.street_address}
                                            {', '}
                                            {room.address}
                                        </div>
                                    </Col>
                                </Row>
                            </Card>

                            <Card
                                title={
                                    <div className='card-header room-info-card'>
                                        <Typography.Title level={3}>
                                            <RocketFilled className='icon' />
                                            &nbsp;&nbsp;Tiện ích
                                        </Typography.Title>
                                    </div>
                                }
                                className='room-information'>


                            </Card>
                            <Card
                                title={
                                    <div className='card-header room-info-card'>
                                        <Typography.Title level={3}>
                                            <EditFilled className='icon' />
                                            &nbsp;&nbsp;Mô tả
                                        </Typography.Title>
                                    </div>
                                }
                                className='room-information'>
                                <pre className='description'>
                                    {room.description}
                                </pre>
                            </Card>
                            <Card className='room-information'>
                                {nearby_locations.map((location) => {
                                    return (
                                        <Tag>
                                            <a href='/search'> {location}</a>
                                        </Tag>
                                    );
                                })}
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RoomPage;
