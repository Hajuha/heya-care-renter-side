import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Breadcrumb, Card, Col, List, Row, Typography } from 'antd';
import { HomeFilled, UserOutlined } from '@ant-design/icons';
import StarRatings from 'react-star-ratings';
import { Map, Marker } from 'pigeon-maps';
import IMAGE from '../../assets/images/phong-tro-2.jpg';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './style.scss';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const MAPTILER_ACCESS_TOKEN = 'zbUgtIA4VLEBWqVtl2jt';
const MAP_ID = 'basic';

const RoomPage = (props) => {
    const { id } = props;

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

    function mapTilerProvider(x, y, z, dpr) {
        return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
            dpr >= 2 ? '@2x' : ''
        }.png?key=${MAPTILER_ACCESS_TOKEN}`;
    }

    const ratingChanged = (rating) => {
        console.log(rating);
    };

    return (
        <React.Fragment>
            <div className='room-page'>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href='/'>Hà Nội</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href='/'>Đống Đa</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Nam Đồng</Breadcrumb.Item>
                </Breadcrumb>
                <div className='room-title'>
                    <Typography.Title level={2}>
                        HOMESTAY CAO CẤP CẠNH BÁCH-KINH-XÂY TRỌN GÓI 1,4TR/THÁNG{' '}
                    </Typography.Title>
                    <StarRatings
                        starRatedColor='black'
                        changeRating={ratingChanged}
                        numberOfStars={5}
                        name='rating'
                        starDimension='32px'
                    />
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
                            <div>
                                <Typography.Title level={4}>
                                    Nguyễn Văn A
                                </Typography.Title>
                                <Typography.Title level={5}>
                                    0987666555
                                </Typography.Title>
                            </div>
                        </Card>
                    </Col>
                    <Col sm={24} xl={{ span: 16, pull: 8 }}>
                        <Swiper
                            spaceBetween={0}
                            loop={true}
                            slidesPerView={1}
                            navigation={{ clickable: true }}
                            pagination={{ clickable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}>
                            <SwiperSlide>
                                <img
                                    alt='img'
                                    src={IMAGE}
                                    className='img-slide'></img>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    alt='img'
                                    src={IMAGE}
                                    className='img-slide'></img>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    alt='img'
                                    src={IMAGE}
                                    className='img-slide'></img>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    alt='img'
                                    src={IMAGE}
                                    className='img-slide'></img>
                            </SwiperSlide>
                        </Swiper>
                    </Col>
                </Row>
                <div className='room-info'>
                    <Row gutter={32}>
                        <Col span={16}>
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
                                        <div>GÍA PHÒNG</div>
                                        <div>1,399,000 đồng</div>
                                    </Col>
                                    <Col span={6}>
                                        <div>DIỆN TÍCH</div>
                                        <div>130 mét vuông</div>
                                    </Col>
                                    <Col span={6}>
                                        <div>ĐẶT CỌC</div>
                                        <div>1,399,000 đồng</div>
                                    </Col>
                                    <Col span={6}>
                                        <div>SỨC CHỨA</div>
                                        <div>5 người</div>
                                    </Col>
                                </Row>

                                <Row className='info-container'>
                                    <Col span={6}>
                                        <div className='room-status'>
                                            TRẠNG THÁI
                                        </div>
                                        <div>Còn chỗ</div>
                                    </Col>
                                </Row>
                                <Row className='info-container'>
                                    <Col>
                                        <div className='room-status'>
                                            ĐIẠ CHỈ
                                        </div>
                                        <div>
                                            229 Phố vọng, Phường Đồng Tâm, Quận
                                            Hai Bà Trưng, Hà Nội
                                        </div>
                                    </Col>
                                </Row>
                            </Card>

                            <Card
                                title={
                                    <div className='card-header room-info-card'>
                                        <Typography.Title level={3}>
                                            <HomeFilled className='icon' />
                                            &nbsp;&nbsp;Thông tin phòng
                                        </Typography.Title>
                                    </div>
                                }
                                className='room-information'></Card>
                            <Card title='Mô tả' className='room-information'>
                                <p>
                                    (Dịch vụ Ở GHÉP tiết kiệm chi phí với những
                                    tiện ích cao cấp ) * Địa chỉ: ngõ 229 Phố
                                    Vọng. cách các trường lớn BÁCH – KINH – XÂY
                                    chỉ 600m - Bạn đang là sinh viên? - Bạn là
                                    người mới đi làm? Tất cả đều mong muốn được
                                    sống trong một không gian hiện đại, đầy đủ
                                    tiện nghi, môi trường sống dân trí cao, thời
                                    gian đi lại thoải mái, và quan trọng là
                                    không phát sinh chi phí Chúng tôi đã xây
                                    dựng được căn hộ cho thuê phù hợp với các
                                    bạn tại Số 229 Phố Vọng: - phòng NỮ 3 giường
                                    tầng, WC khép kín - còn 2 slot giá
                                    1.500.000/người/tháng - phòng NAM 3 giường
                                    tầng, - còn 2 slot giá 1.400.000/người/tháng
                                    Giá trên đã bao gồm TOÀN BỘ CÁC CHI PHÍ:
                                    điện, nước sạch mạng internet, gas, vệ sinh
                                    hàng tuần (cam kết không phát sinh chi phí)
                                    Căn hộ nằm tại khu chung cư cao cấp đảm bảo
                                    an ninh, sạch sẽ, thuận tiện giao thông, đầy
                                    đủ tiện nghi chỉ việc xách quần áo đến ở ✨
                                    Mỗi người có 2 tủ quần áo có khóa riêng ✨
                                    Bếp, tủ bếp , nồi niêu bát đĩa ✨ Tủ lạnh ,
                                    máy giặt , bình nóng lạnh, điều hòa, bồn tắm
                                    nằm. ✨ Bình lọc nước uống tại vòi. Các bạn
                                    quan tâm vui lòng liên hệ chính chủ để đi
                                    xem nhà NÓI KHÔNG VỚI THU PHÍ ĐI XEM LH
                                    CHÍNH CHỦ: (fb, zalo, viber, imessage)
                                </p>
                            </Card>
                            <Card className='room-information'>
                                <List
                                    size='large'
                                    header={
                                        <Typography.Title level={4}>
                                            Địa điểm lân cận:
                                        </Typography.Title>
                                    }
                                    dataSource={nearLocation}
                                    renderItem={(item) => (
                                        <List.Item>{item}</List.Item>
                                    )}
                                />
                                <div className='map-container'>
                                    <Map
                                        center={[21.028511, 105.804817]}
                                        defaultZoom={15}
                                        provider={mapTilerProvider}>
                                            
                                        <Marker
                                            anchor={[21.028511, 105.804817]}
                                            height={80 }
                                            color='#fc5185'
                                            payload={1}
                                            onClick={({
                                                event,
                                                anchor,
                                                payload,
                                            }) => {}}
                                        />
                                    </Map>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RoomPage;
