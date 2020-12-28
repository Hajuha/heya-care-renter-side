import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Card, Spin, Empty, Radio } from 'antd';
import RoomPlaceholder from '../RoomPlaceholder';
import './style.scss';
import roomAPI from '../../services/apis/room';
import { ArrowUpOutlined } from '@ant-design/icons';

const ResultPage = (props) => {
    const { searchQuery } = props;
    console.log(searchQuery);
    let [rooms, setRooms] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [filterOptions, setFilterOption] = useState(() => {
        console.log('Update filter');
        return { q: searchQuery };
    });

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
        getRooms(filterOptions);
    }, [filterOptions]);

    const getRooms = (filterOptions) => {
        const data = {
            ...filterOptions,
        };

        roomAPI.search(data).then((res) => {
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
                <Col span={8}>
                    <Card style={{ width: '100%' }}>
                        <Typography.Title level={4}>Filter</Typography.Title>
                        <div>
                            <Typography.Title level={5}>
                                Ở chung chủ
                            </Typography.Title>
                            <Radio.Group
                                onChange={(e) => {
                                    setFilterOption((filterOptions) => ({
                                        ...filterOptions,
                                        is_stay_with_the_owner: e.target.value,
                                    }));
                                }}
                                defaultValue={true}>
                                <Radio value={false}>Không</Radio>
                                <Radio value={true}>Có</Radio>
                            </Radio.Group>
                        </div>
                    </Card>
                </Col>
                <Col span={16}>
                    {!isLoading && rooms.length === 0 ? (
                        <Card>
                            {' '}
                            <Empty />{' '}
                        </Card>
                    ) : (
                        <div>
                            {rooms.map((room, index) => (
                                <RoomPlaceholder key={index} Room={room} />
                            ))}
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ResultPage;
