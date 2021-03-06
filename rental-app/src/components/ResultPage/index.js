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
    InputNumber,
    Pagination,
    Divider,
} from 'antd';
import RoomPlaceholder from '../RoomPlaceholder';
import './style.scss';
import './responsive.scss';
import roomAPI from '../../services/apis/room';
import { ArrowUpOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import balconyIcon from '../../assets/icons/balcony.svg';
import kitchenIcon from '../../assets/icons/gas-stove.svg';
import airConditionerIcon from '../../assets/icons/air-conditioner.svg';
import waterHeaterIcon from '../../assets/icons/water-heater.svg';

const { Panel } = Collapse;

const ResultPage = (props) => {
    const { searchQuery } = props;
    let [rooms, setRooms] = useState([]);
    let [total, setTotal] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [filterOptions, setFilterOption] = useState(() => {
        return {
            q: searchQuery,
            price_max: 0,
            price_min: 0,
            electricity_price_max: 0,
            electricity_price_min: 0,
            water_price_max: 0,
            water_price_min: 0,
            _page: 1,
        };
    });

    useEffect(() => {
        setFilterOption((filterOptions) => ({
            ...filterOptions,
            q: searchQuery,
        }));
    }, [searchQuery]);

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
            q: searchQuery,
        };

        roomAPI.search(data).then((res) => {
            setRooms(res.data.accommodations);
            setTotal(res.data.total);
            setIsLoading(false);
        });
    };

    if (isLoading) {
        return <></>;
    }

    const priceFormat = (values) => {
        return `${values.toLocaleString()}đ`;
    };

    return (
        <div className='result-page'>
            <Row gutter={{ lg: '32', sm: '0' }}>
                <div
                    className='scrollTop'
                    onClick={scrollTop}
                    style={{
                        height: 40,
                        display: showScroll ? 'flex' : 'none',
                    }}>
                    <ArrowUpOutlined className='icon' />
                </div>
                <Col md={8} sm={24} style={{ width: '100%' }}>
                    <Card>
                        <Typography.Title level={4}>Bộ lọc</Typography.Title>
                        <Collapse bordered={false}>
                            <Panel header={'Giá tiền'} key='1'>
                                <Slider
                                    className='price-slider'
                                    range={true}
                                    min={200000}
                                    max={10000000}
                                    step={100000}
                                    tipFormatter={priceFormat}
                                    onAfterChange={(values) => {
                                        setFilterOption((filterOptions) => ({
                                            ...filterOptions,
                                            _page: 1,
                                            price_max: values[1],
                                            price_min: values[0],
                                        }));
                                    }}
                                    defaultValue={[200000, 10000000]}
                                />
                                <div style={{ display: 'flex' }}>
                                    <Text
                                        className='price-min'
                                        style={{ flexGrow: '1' }}>
                                        {filterOptions.price_min} đ
                                    </Text>
                                    <Text className='price-max'>
                                        {filterOptions.price_max} đ
                                    </Text>
                                </div>
                            </Panel>

                            <Panel header={'Giá điện'} key='2'>
                                <Slider
                                    className='price-slider'
                                    range={true}
                                    min={0}
                                    max={10000}
                                    step={500}
                                    tipFormatter={priceFormat}
                                    onAfterChange={(values) => {
                                        setFilterOption((filterOptions) => ({
                                            ...filterOptions,
                                            _page: 1,
                                            electricity_price_max: values[1],
                                            electricity_price_min: values[0],
                                        }));
                                    }}
                                    defaultValue={[0, 5000]}
                                />
                                <div style={{ display: 'flex' }}>
                                    <Text
                                        className='price-min'
                                        style={{ flexGrow: '1' }}>
                                        {filterOptions.electricity_price_min} đ
                                    </Text>
                                    <Text className='price-max'>
                                        {filterOptions.electricity_price_max} đ
                                    </Text>
                                </div>
                            </Panel>
                            <Panel header={'Giá nước'} key='3'>
                                <Slider
                                    className='price-slider'
                                    range={true}
                                    min={5000}
                                    max={150000}
                                    step={5000}
                                    tipFormatter={priceFormat}
                                    onAfterChange={(values) => {
                                        setFilterOption((filterOptions) => ({
                                            ...filterOptions,
                                            _page: 1,
                                            water_price_max: values[1],
                                            water_price_min: values[0],
                                        }));
                                    }}
                                    defaultValue={[3000, 150000]}
                                />
                                <div style={{ display: 'flex' }}>
                                    <Text
                                        className='price-min'
                                        style={{ flexGrow: '1' }}>
                                        {filterOptions.water_price_min} đ
                                    </Text>
                                    <Text className='price-max'>
                                        {filterOptions.water_price_max} đ
                                    </Text>
                                </div>
                            </Panel>
                            <Panel header={'Tiện ích'} key='4'>
                                <div>
                                    <Typography.Title level={5}>
                                        Ở chung chủ
                                    </Typography.Title>
                                    <Radio.Group
                                        onChange={(e) => {
                                            setFilterOption(
                                                (filterOptions) => ({
                                                    ...filterOptions,
                                                    _page: 1,
                                                    is_stay_with_the_owner:
                                                        e.target.value,
                                                })
                                            );
                                        }}>
                                        <Radio value={true}>Có</Radio>
                                        <Radio value={false}>Không</Radio>
                                    </Radio.Group>
                                </div>
                                <div>
                                    <Typography.Title level={5}>
                                        Có điều hòa
                                    </Typography.Title>
                                    <Radio.Group
                                        onChange={(e) => {
                                            setFilterOption(
                                                (filterOptions) => ({
                                                    ...filterOptions,
                                                    _page: 1,
                                                    has_air_conditioning:
                                                        e.target.value,
                                                })
                                            );
                                        }}>
                                        <Radio value={true}>Có</Radio>
                                        <Radio value={false}>Không</Radio>
                                    </Radio.Group>
                                </div>
                                <div>
                                    <Typography.Title level={5}>
                                        Có bình nước nóng
                                    </Typography.Title>
                                    <Radio.Group
                                        onChange={(e) => {
                                            setFilterOption(
                                                (filterOptions) => ({
                                                    ...filterOptions,
                                                    _page: 1,
                                                    has_electric_water_heater:
                                                        e.target.value,
                                                })
                                            );
                                        }}>
                                        <Radio value={true}>Có</Radio>
                                        <Radio value={false}>Không</Radio>
                                    </Radio.Group>
                                </div>
                                <div>
                                    <Typography.Title level={5}>
                                        Có ban công
                                    </Typography.Title>
                                    <Radio.Group
                                        onChange={(e) => {
                                            setFilterOption(
                                                (filterOptions) => ({
                                                    ...filterOptions,
                                                    _page: 1,
                                                    has_balcony: e.target.value,
                                                })
                                            );
                                        }}>
                                        <Radio value={true}>Có</Radio>
                                        <Radio value={false}>Không</Radio>
                                    </Radio.Group>
                                </div>
                                <div>
                                    <Typography.Title level={5}>
                                        Nấu ăn
                                    </Typography.Title>
                                    <Radio.Group
                                        onChange={(e) => {
                                            setFilterOption(
                                                (filterOptions) => ({
                                                    ...filterOptions,
                                                    _page: 1,
                                                    kitchen_type:
                                                        e.target.value,
                                                })
                                            );
                                        }}>
                                        <Radio value={0}>Không nấu ăn</Radio>
                                        <Radio value={1}>Nấu ăn riêng</Radio>
                                        <Radio value={-1}>Nấu ăn chung</Radio>
                                    </Radio.Group>
                                </div>
                                <div>
                                    <Typography.Title level={5}>
                                        Nhà tắm & vệ sinh
                                    </Typography.Title>
                                    <Radio.Group
                                        onChange={(e) => {
                                            setFilterOption(
                                                (filterOptions) => ({
                                                    ...filterOptions,
                                                    _page: 1,
                                                    bathroom_type:
                                                        e.target.value,
                                                })
                                            );
                                        }}>
                                        <Radio value={0}>Chung</Radio>
                                        <Radio value={1}>Riêng</Radio>
                                    </Radio.Group>
                                </div>
                            </Panel>
                        </Collapse>
                    </Card>
                </Col>
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
                                <RoomPlaceholder key={index} Room={room} />
                            ))}
                            <Pagination {...paginationOptions} />
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ResultPage;
