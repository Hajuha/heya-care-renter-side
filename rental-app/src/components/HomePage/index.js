import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Card, Spin } from 'antd';
import RoomPlaceholder from '../RoomPlaceholder';
import './style.scss';
import roomAPI from '../../services/apis/room';
import { ArrowUpOutlined } from '@ant-design/icons';
const HomePage = (props) => {
    let [rooms, setRooms] = useState([]);
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

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = () => {
        roomAPI.getAll().then((res) => {
            setRooms(res.data.accommodations);
            setIsLoading(false);
        });
    };

    if (isLoading) {
        return <Spin className='app-spinner' />;
    }
    
    return (
        <div className='home-page'>
            <Row gutter={32}>
                <div
                    className='scrollTop'
                    onClick={scrollTop}
                    style={{
                        height: 40,
                        display: showScroll ? 'flex' : 'none',
                    }}>
                    <ArrowUpOutlined className='icon' />
                </div>
                <Col span={16}>
                    {rooms.map((room, index) => (
                        <RoomPlaceholder key={index} Room={room} />
                    ))}
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
    );
};

export default HomePage;
