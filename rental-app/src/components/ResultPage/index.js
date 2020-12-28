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
} from 'antd';
import RoomPlaceholder from '../RoomPlaceholder';
import './style.scss';
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
            price_max: 10000000,
            price_min: 200000,
            electricity_price_max: 10000,
            electricity_price_min: 0,
            water_price_max: 150000,
            water_price_min: 1000,
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
        total: total,
        showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
    };
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
            q: searchQuery,
        };

        roomAPI.search(data).then((res) => {
            setRooms(res.data.accommodations);
            setTotal(res.data.total);
            setIsLoading(false);
        });
    };

    if (isLoading) {
        return <Spin className='app-spinner' />;
    }

    const priceFormat = (values) => {
        return `${values.toLocaleString()}đ`;
    };

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
                                            price_max: values[1],
                                            price_min: values[0],
                                        }));
                                    }}
                                    defaultValue={[200000, 10000000]}
                                />

                                <Text className='price-min'>
                                    {filterOptions.price_min}đ
                                </Text>
                                <Text className='price-max'>
                                    {filterOptions.price_max}đ
                                </Text>
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
                                            electricity_price_max: values[1],
                                            electricity_price_min: values[0],
                                        }));
                                    }}
                                    defaultValue={[0, 5000]}
                                />

                                <Text className='price-min'>
                                    {filterOptions.electricity_price_min}đ
                                </Text>
                                <Text className='price-max'>
                                    {filterOptions.electricity_price_max}đ
                                </Text>
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
                                            water_price_max: values[1],
                                            water_price_min: values[0],
                                        }));
                                    }}
                                    defaultValue={[3000, 150000]}
                                />

                                <Text className='price-min'>
                                    {filterOptions.water_price_min}đ
                                </Text>
                                <Text className='price-max'>
                                    {filterOptions.water_price_max}đ
                                </Text>
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
                <Col span={16}>
                    {!isLoading && rooms.length === 0 ? (
                        <Card>
                            {' '}
                            <Empty />{' '}
                        </Card>
                    ) : (
                        <div>
                            <Pagination {...paginationOptions} />
                            {rooms.map((room, index) => (
                                <RoomPlaceholder key={index} Room={room} />
                            ))}
                            <Pagination {...paginationOptions} />
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ResultPage;
