import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Typography,
    Card,
    Spin,
    Empty,
    Radio,
    Collapse,
    Slider,
    Pagination,
    Divider,
    notification,
} from 'antd';
import RoomPlaceholder from '../RoomPlaceholder';
import './style.scss';
import './responsive.scss';
import roomAPI from '../../services/apis/room';
import { ArrowUpOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';

const { Panel } = Collapse;

const Favorite = (props) => {
    let [rooms, setRooms] = useState([]);
    let [total, setTotal] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [filterOptions, setFilterOption] = useState(() => {
        return {
            _page: 1,
            _limit: 10,
        };
    });

    let paginationOptions = {
        onChange: (page, pageSize) => {
            setFilterOption((filterOptions) => ({
                ...filterOptions,
                _page: page,
            }));
            scrollTop();
        },
        current: filterOptions._page,
        total: total,
    };
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

        roomAPI.getFavorite(data).then((res) => {
            setRooms(res);
            setTotal(res.length);

            setIsLoading(false);
        });
    };

    

    if (isLoading) {
        return <></>;
    }

    return (
        <div className='result-page'>
            <Row gutter={{ lg: '32', sm: '0' }} justify='center'>
                <div
                    className='scrollTop'
                    onClick={scrollTop}
                    style={{
                        height: 40,
                        display: showScroll ? 'flex' : 'none',
                    }}>
                    <ArrowUpOutlined className='icon' />
                </div>
                <Col md={16} sm={24}>
                    {!isLoading && rooms.length === 0 ? (
                        <Card style={{ width: '100%' }}>
                            {' '}
                            <Empty />{' '}
                        </Card>
                    ) : (
                        <Card>
                            {total === 0 ? (
                                <Typography.Title level={4}>
                                    Không có phòng nào phù hợp
                                </Typography.Title>
                            ) : (
                                <Typography.Title level={4}>
                                    {' '}
                                    Hiển thị kết quả{' '}
                                    {`${
                                        (filterOptions._page - 1) * 10 + 1
                                    }`} -{' '}
                                    {`${
                                        filterOptions._page * 10 < total
                                            ? filterOptions._page * 10
                                            : total
                                    }`}{' '}
                                    của {total} phòng
                                </Typography.Title>
                            )}
                            <Divider />
                            {rooms.map((room, index) => (
                                <RoomPlaceholder
                                    key={index}
                                    Room={room.accommodation}
                                />
                            ))}
                            <Pagination {...paginationOptions} />
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Favorite;
