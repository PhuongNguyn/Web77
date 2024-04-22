import { Button, Form, Input, Modal, Select } from "antd"
import { getUserById } from "../../../../services/user"
import { useEffect } from "react"

const ModalCreateUser = ({ form, loading, title, isModalOpen, handleCancel, handleOk, selectedUser }) => {

    const getUser = async () => {
        try {
            const result = await getUserById(selectedUser)
            form.setFieldValue("name", result.data.user.name)
            form.setFieldValue("email", result.data.user.email)
            form.setFieldValue("role", result.data.user.role)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (selectedUser)
            getUser()
    }, [selectedUser])

    return (
        <Modal
            title={title}
            open={isModalOpen}
            okButtonProps={{ style: { display: "none" } }}
            cancelButtonProps={{ style: { display: "none" } }}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                name="basic"
                initialValues={{
                }}
                onFinish={handleOk}
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
                    label="Quyền hạn"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn quyền hạn',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value='admin'>Admin</Select.Option>
                        <Select.Option value='customer'>Customer</Select.Option>
                    </Select>
                </Form.Item>

                {!selectedUser && <Form.Item
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
                </Form.Item>}
                {!selectedUser && <Form.Item
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
                </Form.Item>}
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
        </Modal>
    )
}

export default ModalCreateUser