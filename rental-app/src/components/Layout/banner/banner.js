import React from 'react';
import './style.scss';
import Particles from "react-particles-js";
import Background from "../../../assets/images/background1.png"
import {Col, Row} from "antd";

const Banner = () => {
    return (
        <React.Fragment>
            <div className='banner-page' style={{backgroundImage: `url('${Background}')`}}>
                <Row>
                    <Col span={10}>
                        <div className='title-wrap'>
                            <div className='big-title'>
                                HEYACARE
                            </div>
                            <div className='title'>
                                Ứng dụng tìm kiếm phòng trọ miễn phí cho người đi thuê hàng đầu Việt Nam. Đem lại trải
                                nghiệm và
                                lợi ích tuyệt đối cho cả chủ phòng và người đi thuê.
                            </div>

                        </div>
                    </Col>

                </Row>


            </div>
        </React.Fragment>
    )
};


export default Banner;
