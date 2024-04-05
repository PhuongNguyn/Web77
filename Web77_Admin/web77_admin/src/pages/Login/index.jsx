import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '../../services/user';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { saveTokenToLocalstorage, saveUserToLocalstorage } from '../../utils/localstorge';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginAction } from "../../features/user/userSlice"

const Login = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user)
    const onFinish = async (values) => {
        try {
            setLoading(true)
            const result = await login(values)
            dispatch(loginAction({ user: result.data.user }))
            saveTokenToLocalstorage(result.data.accessToken)
            saveUserToLocalstorage(result.data.user)
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
                <div className='flex justify-end'><Link to={'/sign-up'} className=''>Chưa có tài khoản? Đăng ký</Link></div>
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
export default Login;