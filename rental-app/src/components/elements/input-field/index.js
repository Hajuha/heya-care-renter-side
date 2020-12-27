import { Form, Input } from 'antd';
import './style.scss';

const InputField = (props) => {
    const { Item } = Form;
    const { placeholder, rules, label, name, type } = props;

    return (
        <Item className='field-wrapper' label={label} rules={rules} name={name}>
            {type === 'password' ? (
                <Input.Password
                    className='inputField'
                    placeholder={placeholder || ''}
                    {...props}
                />
            ) : (
                <Input
                    className='inputField'
                    placeholder={placeholder || ''}
                    {...props}
                />
            )}
        </Item>
    );
};

export default InputField;
