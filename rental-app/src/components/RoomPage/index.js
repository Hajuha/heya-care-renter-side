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
import balconyIcon from '../../assets/icons/balcony.svg';
import kitchenIcon from '../../assets/icons/gas-stove.svg';
import airConditionerIcon from '../../assets/icons/air-conditioner.svg';
import waterHeaterIcon from '../../assets/icons/water-heater.svg';
import { Link, useParams } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const RoomPage = () => {
    let [room, setRoom] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let { id } = useParams();
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

    useEffect(() => {
        getRoom();
    }, []);

    const getRoom = () => {
        roomAPI.get(id).then((res) => {
            setRoom(res.data);
            setIsLoading(false);
        });
    };
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

    if (isLoading) {
        return <Spin className='app-spinner' />;
    }

    const { images, owner, nearby_locations } = room;

    const utility = {
        balcony: room.has_balcony,
        water_heater: room.has_electric_water_heater,
        air_condition: room.has_air_conditioning,
        kitchen_type: room.kitchen_type,
    };
    return (
        <div className='room-page'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/'>Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/results/'>{room.city.name}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/'>{room.district.name}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/'>{room.ward.name}</Link>
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
                                        {room.is_rented ? 'Đã hết' : 'Còn chỗ'}
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
                            <Row>
                                <Col md={12} lg={6}>
                                    <div
                                        className={
                                            'utility ' +
                                            (utility.balcony
                                                ? 'show'
                                                : 'hidden')
                                        }>
                                        <img
                                            alt=''
                                            src={balconyIcon}
                                            className='icon'></img>
                                        <div className='text'>Ban công</div>
                                    </div>
                                </Col>
                                <Col md={12} lg={6}>
                                    <div
                                        className={
                                            'utility ' +
                                            (utility.air_condition
                                                ? 'show'
                                                : 'hidden')
                                        }>
                                        <img
                                            alt=''
                                            src={airConditionerIcon}
                                            className='icon'></img>
                                        <div className='text'>Điều hòa</div>
                                    </div>
                                </Col>
                                <Col md={12} lg={6}>
                                    <div
                                        className={
                                            'utility ' +
                                            (utility.water_heater
                                                ? 'show'
                                                : 'hidden')
                                        }>
                                        <img
                                            alt=''
                                            src={waterHeaterIcon}
                                            className='icon'></img>
                                        <div className='text'>
                                            Bình nước nóng
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12} lg={6}>
                                    <div
                                        className={
                                            'utility ' +
                                            (utility.kitchen_type ===
                                            'Không nấu ăn'
                                                ? 'hidden'
                                                : 'show')
                                        }>
                                        <img
                                            alt=''
                                            src={kitchenIcon}
                                            className='icon'></img>
                                        <div className='text'>
                                            {utility.kitchen_type}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
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
                                        <Link to='/search'> {location}</Link>
                                    </Tag>
                                );
                            })}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default RoomPage;
