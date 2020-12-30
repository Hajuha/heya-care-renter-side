/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import Background from '../../assets/images/background.jpg';
import LogoTransparent from '../../assets/icons/logo_transparent.png';
import GoogleIcon from '../../assets/icons/logo-google-plus.svg';
import FacebookIcon from '../../assets/icons/logo-facebook.svg';
import './style.scss';
import { Button, Form, Input, Checkbox, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { login } from '../../actions/auth';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

const LoginPage = (props) => {
    const [isLogged, setIsLogged] = React.useState(false);
    const dispatch = useDispatch();
    const history  = useHistory()
    if (isLogged && props.isAuthenticated) {
        return <Redirect to={'/'} />;
    }

    const onFinish = (values) => {
        login(values,dispatch, ()=> {history.push('/');});

        setIsLogged(true);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <React.Fragment>
            <div
                className='login-container'
                style={{ backgroundImage: `url('${Background}')` }}>
                <div className='form-container'>
                    <Row>
                        <Col span={8}>
                            <img
                                alt='logo'
                                className='form-container-logo'
                                src={LogoTransparent}
                            />
                        </Col>

                        <Col span={16}>
                            <div className='form-container-title'>
                                <div className='text'>Tìm trọ</div>
                                <div className='text'>và cho thuê</div>
                            </div>
                        </Col>
                    </Row>

                    <Form
                        name='login'
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <Form.Item
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}>
                            <Input placeholder='Tên đăng nhập/email' />
                        </Form.Item>

                        <Form.Item
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}>
                            <Input.Password placeholder='Mật khẩu' />
                        </Form.Item>

                        <Form.Item name='remember' valuePropName='checked'>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className='signin-button'
                                type='primary'
                                htmlType='submit'>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='text-align-center'>
                        <p className='signin-guide'>
                            {'Chưa có tài khoản?'}&nbsp;
                            <Link to='/register'>{'Đăng ký ngay'}</Link>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
    };
}

export default connect(mapStateToProps, {})(LoginPage);
