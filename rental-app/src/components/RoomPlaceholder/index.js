import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkedAlt,
    faLocationArrow,
    faRuler,
} from '@fortawesome/free-solid-svg-icons';

import { Card, Col, Row, Typography } from 'antd';
import * as React from 'react';

import './style.scss';
import { useHistory } from 'react-router-dom';
const RoomPlaceholder = (props) => {
    const { room } = props;
    const history = useHistory();
    let [Room, setRoom] = React.useState(room);
    const price_in_million = Room.price / 1000000;
    console.log(price_in_million);
    const path = `/room/${Room.id}`;
    
    return (
        <React.Fragment>
            <a href={path}>
                <div className='room-placeholder'>
                    <Row>
                        <Col>
                            <img
                                alt=''
                                src={Room.image}
                                className='room-placeholder-image'
                            />
                        </Col>

                        <Col span={18}>
                            <div className='room-info'>
                                <span className='title'>{Room.title}</span>
                                <Row>
                                    <Col span={20}>
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
                                                                {Room.ward}
                                                            </span>
                                                        </div>

                                                        <div className='info'>
                                                            <FontAwesomeIcon
                                                                className='icon'
                                                                icon={
                                                                    faMapMarkedAlt
                                                                }
                                                            />
                                                            <span className='unit'>
                                                                {
                                                                    Room.street_address
                                                                }
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
            </a>
        </React.Fragment>
    );
};

export default RoomPlaceholder;
