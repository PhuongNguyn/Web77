import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '../../services/user';
import toast from 'react-hot-toast';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const onFinish = async (values) => {
        try {
            setLoading(true)
            const result = await login(values)
            toast.success("Đăng nhập thành công")
        } catch (error) {
            console.log(error)
            toast.error("Đăng nhập thất bại")
        } finally {
            setLoading(false)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Form
                name="basic"
                initialValues={{
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Email',
                        },
                        {
                            min: 6,
                            message: "Email phải trên 6 kí tự"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu',
                        },
                        {
                            min: 6,
                            message: "Mật khẩu phải trên 6 kí tự"
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button loading={loading} type="primary" htmlType="submit">
                        <p className='text-[white]'>Submit</p>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default Login;