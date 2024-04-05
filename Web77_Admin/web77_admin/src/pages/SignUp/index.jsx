import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { signUp } from '../../services/user';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            setLoading(true)
            const result = await signUp(values)
            toast.success("Đăng kí người dùng thành công")
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error("Đăng kí thất bại")
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
                    label="Tên người dùng"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên người dùng',
                        },
                        {
                            min: 6,
                            message: "Tên người dùng phải trên 6 kí tự"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
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
                    label="Nhập lại mật khẩu:"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập lại mật khẩu',
                        },
                        {
                            min: 6,
                            message: "Mật khẩu nhập lại phải trên 6 kí tự"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu nhập lại không đúng!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <div className='flex justify-end'><Link to={'/'}>Đã có tài khoản? Đăng nhập</Link></div>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button className='mt-2' loading={loading} type="primary" htmlType="submit">
                        <p className='text-[white]'>Submit</p>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default SignUp;