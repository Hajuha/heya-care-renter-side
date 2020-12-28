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
const RoomPlaceholderTrending = (props) => {
    const { Room } = props;
    const history = useHistory();
    // let [Room, setRoom] = React.useState(room);
    const price_in_million = (Room.price / 1000000).toFixed(1);
    // console.log(price_in_million);
    const path = `/room/${Room.id}`;
    return (
        <React.Fragment>
            <Link to={path}>
                <div className='room-placeholder-trending'>
                    <div className='image-container'>
                        <img
                            alt=''
                            src={Room.images[0].url}
                            className='room-placeholder-trending-image'
                        />
                    </div>
                    <div className='title'>{Room.title}</div>
                    <Row align='top'>
                        <Col span={16}>
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

                        <Col span={8}>
                            <div className='price'>
                                <span className='price_'>
                                    {price_in_million}
                                </span>
                                <div>tr/phòng</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Link>
        </React.Fragment>
    );
};

export default RoomPlaceholderTrending;
