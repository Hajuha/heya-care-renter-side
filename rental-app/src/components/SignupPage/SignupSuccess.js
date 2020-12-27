import * as React from 'react';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const SignupSuccess = () => {
    return (
        <React.Fragment>
            <div className='signup-success'>
                <CheckSquareOutlined className='icon' />
                <div>
                    <Typography.Title level={3}>
                        Tài khoản của bạn đã được tạo. Vui lòng xác nhận email
                        của bạn.
                    </Typography.Title>
                    <Typography.Text>
                        Chúng tôi đã gửi cho bạn một email có chứa đường link
                        xác nhận. Kiểm tra hòm thư và truy cập vào đường link để
                        xác nhận email.
                    </Typography.Text>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SignupSuccess;
