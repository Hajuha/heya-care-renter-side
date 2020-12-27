import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Divider } from 'antd';
import CustomInputField from '../elements/input-field';
import './style.scss';
import logoFB from '../../assets/icons/logo-facebook.svg';
import logoGG from '../../assets/icons/logo-google-plus.svg';
import auth from '../../services/apis/auth';
const initialValues = {
    fullName: '',
    emailAddress: '',
    password: '',
    inviteCode: '',
};

// Form rule
const rules = {
    fullName: [
        {
            required: true,
            message: 'Vui lòng nhập họ tên',
        },
    ],
    email: [
        {
            required: true,
            message: 'Vui lòng nhập email',
        },
        {
            pattern: /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/g,
            message: 'Email không đúng định dạng',
        },
    ],
    password: [
        {
            required: true,
            message: 'Vui lòng nhập mật khẩu',
        },
        {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Mật khẩu phải dài ít nhất 8 kí tự, gồm cả chữ cái và số',
        },
    ],
};
const SignupPage = () => {
    let [isLoading, setIsLoading] = useState(false);
    let history = useHistory();

    const register = async (values) => {
        setIsLoading(true);
        let result = await auth.register(values);
        if (result.code === 200) {
            history.push('/register/success')
        }
    };
    const onFinish = (values) => {
        register(values);
    };

    const onFinishFailed = () => {};

    const handleSignInFb = () => {};

    const handleSignInGoogle = () => {};

    return (
        <React.Fragment>
            <div className='signup'>
                <div className='signup-content'>
                    <div className='signup-form__title'>
                        <h2>Đăng ký tài khoản</h2>
                    </div>

                    <Row justify='center'>
                        <Col span={24} xxl={14} lg={24} md={16}>
                            <Form
                                className='signup-form'
                                initialValues={initialValues}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}>
                                <div className='signup-form__content'>
                                    <CustomInputField
                                        name='fullName'
                                        rules={rules.fullName}
                                        placeholder={'Họ tên'}
                                    />
                                    <CustomInputField
                                        name='email'
                                        rules={rules.email}
                                        placeholder={'Email'}
                                    />
                                    <CustomInputField
                                        name='password'
                                        rules={rules.password}
                                        placeholder={'Mật khẩu'}
                                        type='password'
                                    />
                                </div>

                                <Button
                                    block
                                    className='register-button'
                                    htmlType='submit'
                                    loading={isLoading === true}>
                                    {'Đăng ký'}
                                </Button>
                            </Form>

                            <Divider>{'Hoặc'}</Divider>

                            <Row justify='center' gutter={[16, 0]}>
                                <Col>
                                    <img
                                        className='social-button'
                                        src={logoFB}
                                        alt='facebook-icon'
                                        onClick={handleSignInFb}
                                    />
                                </Col>

                                <Col>
                                    <img
                                        className='social-button'
                                        src={logoGG}
                                        alt='google-icon'
                                        onClick={handleSignInGoogle}
                                    />
                                </Col>
                            </Row>

                            <div className='text-align-center'>
                                <p className='signup-guide'>
                                    {'Đã có tài khoản?'}&nbsp;
                                    <a href='/login'>{'Đăng nhập'}</a>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SignupPage;
