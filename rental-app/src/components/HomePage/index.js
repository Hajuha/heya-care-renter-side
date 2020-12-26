import * as React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import RoomPlaceholder from '../RoomPlaceholder';
import Image from '../../assets/images/phong-tro-2.jpg';
import './style.scss';
import HeyaCareClient from '../../services/apis/request';
const HomePage = (props) => {
    const room = {
        owner: {
            name: 'Nguyen Van A',
            mobile_number: '0978655332',
        },
        image: Image,
        id: 'abcdhsuw2',
        title: 'Phòng trọ sinh viên giá rẻ nhiều tiện ích',
        street_address: 'So 79, ngo 59, Khuc Thua Du',
        ward: 'Dich Vong',
        district: 'Cau Giay',
        type: 'Phong tro',
        price: 1900000,
        area: '30',
        is_stay_with_owner: true,
        has_electric_water_heater: true,
        has_air_conditioning: true,
        electricity_price: 4000,
        water_price: 50000,
    };
    const rooms = HeyaCareClient.get('/address/city');
    console.log(rooms);
    return (
        <React.Fragment>
            <div className='home-page'>
                <Row gutter={32}>
                    <Col span={16}>
                        <RoomPlaceholder room={room} />
                        <RoomPlaceholder room={room} />
                        <RoomPlaceholder room={room} />
                        <RoomPlaceholder room={room} />
                    </Col>
                    <Col span={8}>
                        <Card style={{ width: '100%' }}>
                            <Typography.Title level={4}>
                                Top Trending
                            </Typography.Title>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default HomePage;
