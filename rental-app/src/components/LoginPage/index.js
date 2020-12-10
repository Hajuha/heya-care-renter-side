/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Background from '../../assets/images/background.jpg';
import LogoTransparent from '../../assets/icons/logo_transparent.png';
import GoogleIcon from '../../assets/icons/logo-google-plus.svg';
import FacebookIcon from '../../assets/icons/logo-facebook.svg';
import './style.scss';
import { Button, Form, Input, Checkbox, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { AuthHook } from '../../hooks';

const LoginPage = () => {
    const { login } = AuthHook.useAuth();

    const onFinish = (values) => {
        console.log('Success:', values);
        // setCredential(values);
        login(values.username, values.password).then(() => {
            // Todo ...
        });
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

                        <div className='or-signup-using'>
                            hoặc tiếp tục bằng
                        </div>

                        <div className='app-social'>
                            <div className='app-social-item'>
                                <FacebookLogin
                                    appId='facebookAPIKey'
                                    autoLoad={true}
                                    size='small'
                                    fields='name,email,picture'
                                    render={(renderProps) => (
                                        <div
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}>
                                            <img
                                                alt='facebook-icon'
                                                className='logo-img'
                                                src={FacebookIcon}
                                            />
                                        </div>
                                    )}
                                />
                            </div>

                            <div className='app-social-item'>
                                <GoogleLogin
                                    className='google-button ant-btn'
                                    clientId='googleAPIKey'
                                    render={(renderProps) => (
                                        <a
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}>
                                            <img
                                                alt='google-icon'
                                                className='logo-img'
                                                src={GoogleIcon}
                                            />
                                        </a>
                                    )}
                                    cookiePolicy={'single_host_origin'}
                                    icon={false}
                                />
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LoginPage;
