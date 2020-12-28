import React, {useEffect, useState} from 'react';
import {Row, Col, Typography, Card, Spin, Skeleton} from 'antd';
import RoomPlaceholder from '../RoomPlaceholder';
import './style.scss';
import roomAPI from '../../services/apis/room';
import InfiniteScroll from 'react-infinite-scroll-component';
import {ArrowUpOutlined} from '@ant-design/icons';
import RoomPlaceholderTrending from '../RoomPlaceholderTrending';
import Banner from "../Layout/banner/banner";

const HomePage = (props) => {
    let [rooms, setRooms] = useState([]);
    let [trendingRooms, setTrendingRooms] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [page, setPage] = useState(1);
    let [hasMore, setHasMore] = useState(true);
    const [showScroll, setShowScroll] = useState(false), checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    }, scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop);

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = () => {
        roomAPI.getTrendingRooms().then((res) => {
            setTrendingRooms(res);
        });
        roomAPI.getAll().then((res) => {
            setRooms(res.data.accommodations);
            setIsLoading(false);
        });
    };

    const getMoreRoom = () => {
        const data = {
            _page: page + 1,
        };
        roomAPI.search(data).then((res) => {
            setRooms((rooms) => [...rooms, ...res.data.accommodations]);
            if (res.data.accommodations.length === 0) setHasMore(false);
            setIsLoading(false);
        });
        setPage(page + 1);
    };
    // const getTrendingRooms = () => {
    //     roomAPI.getTrendingRooms().then((res) => {
    //         setTrendingRooms(res);
    //         setIsLoading(false);
    //     });
    // };

    if (isLoading) {
        return <Spin className='app-spinner'/>;
    }

    return (
        <React.Fragment>
            <Banner/>
            <div className='home-page'>
                <Row gutter={{md: '32', sm: '0'}}>
                    <div
                        className='scrollTop'
                        onClick={scrollTop}
                        style={{
                            height: 40,
                            display: showScroll ? 'flex' : 'none',
                        }}>
                        <ArrowUpOutlined className='icon'/>
                    </div>
                    <Col md={16} sm={24}>
                        <Card style={{width: '100%'}}>
                            <Typography.Title level={3}>
                                Phòng mới đăng
                            </Typography.Title>
                            <InfiniteScroll
                                dataLength={rooms.length}
                                next={getMoreRoom}
                                hasMore={hasMore}
                                loader={<Spin></Spin>}
                                endMessage={
                                    <Typography.Text>
                                        Đã hết phòng để hiển thị
                                    </Typography.Text>
                                }>
                                {rooms.map((room, index) => (
                                    <RoomPlaceholder key={index} Room={room}/>
                                ))}
                            </InfiniteScroll>
                        </Card>
                    </Col>
                    <Col md={8} sm={24}>
                        <Card style={{width: '100%'}}>
                            <Typography.Title level={3}>
                                Top 10 phòng hot nhất
                            </Typography.Title>
                            {trendingRooms.map((room, index) => (
                                <RoomPlaceholderTrending key={index} Room={room}/>
                            ))}
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>

    );
};

export default HomePage;
