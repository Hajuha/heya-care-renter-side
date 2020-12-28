import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkedAlt,
    faLocationArrow,
    faRuler,
} from '@fortawesome/free-solid-svg-icons';

import { Card, Col, Row, Typography } from 'antd';
import * as React from 'react';

import './style.scss';
import { Link, useHistory } from 'react-router-dom';
const RoomPlaceholder = (props) => {
    const { Room } = props;
    const history = useHistory();
    // let [Room, setRoom] = React.useState(room);
    const price_in_million = Room.price / 1000000;
    // console.log(price_in_million);
    const path = `/room/${Room.id}`;
    return (
        <React.Fragment>
            <Link to={path}>
                <div className='room-placeholder'>
                    <Row align='center'>
                        <Col>
                            <div className='image-container'>
                                <img
                                    alt=''
                                    src={Room.images[0].url}
                                    className='room-placeholder-image'
                                />
                            </div>
                        </Col>

                        <Col span={18}>
                            <div className='room-info'>
                                <Row>
                                    <Col span={20}>
                                        <span className='title'>
                                            {Room.title}
                                        </span>
                                        <div className='informations'>
                                            <Row>
                                                <Col span={12}>
                                                    <div className='column'>
                                                        <div className='info'>
                                                            <FontAwesomeIcon
                                                                className='icon'
                                                                icon={
                                                                    faLocationArrow
                                                                }
                                                            />
                                                            <span className='unit'>
                                                                {Room.ward.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col span={12}>
                                                    <div className='info'>
                                                        <FontAwesomeIcon
                                                            className='icon'
                                                            icon={faRuler}
                                                        />
                                                        <span className='unit'>
                                                            {Room.area}m2
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='info'>
                                            <FontAwesomeIcon
                                                className='icon'
                                                icon={faMapMarkedAlt}
                                            />
                                            <span className='unit'>
                                                {Room.full_address}
                                            </span>
                                        </div>
                                    </Col>

                                    <Col span={3}>
                                        <div className='price'>
                                            <span className='price_'>
                                                {price_in_million}
                                            </span>

                                            <div className='unit'>tr/phòng</div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Link>
        </React.Fragment>
    );
};

export default RoomPlaceholder;
