import React, { useEffect, useState } from 'react';
import { Button, Form, Space, Table, Tag } from 'antd';
import { createUser, deleteUser, editUser, getPagingUser, uploadAvatar } from '../../services/user';
import { Pagination, Popconfirm } from 'antd';
import ModalCreateUser from './components/ModalCreateUser';
import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaFileImage } from "react-icons/fa";
import ModalUploadUserAvatar from './components/ModalUploadUserAvatar';

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const [pageIndex, setPageIndex] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalDoc, setTotalDoc] = useState(0)
    const [modalCreateUser, setModalCreateUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [modalUploadUserAvatar, setModalUploadUserAvatar] = useState(false)

    const handleOpenUploadUserAvatarModal = (userId) => {
        setModalUploadUserAvatar(true)
        setSelectedUser(userId)
    }

    const handleCloseUploadUserAvatarModal = () => {
        setModalUploadUserAvatar(false)
        setSelectedUser(null)
    }

    const handleOpenEditModal = (userId) => {
        setModalCreateUser(true)
        setSelectedUser(userId)
    }

    const handleCloseModal = () => {
        setModalCreateUser(false)
        setSelectedUser(null)
    }

    const handleDeleteUser = async (userId) => {
        try {
            setLoading(true)
            const result = await deleteUser(userId)
            setUsers(users.filter((user) => user._id != userId))
            toast.success("Xoá người dùng thành công")
        } catch (error) {
            console.log(error)
            toast.error("Xoá người dùng thất bại!")
        } finally {
            setLoading(false)
        }
    }

    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (row) => {
                return (
                    <img width={150} src={row} />
                )
            }
        },
        {
            title: 'Quyền hạn',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (row) => {
                return (
                    <div className='flex gap-2'>
                        <FaEdit cursor={'pointer'}
                            onClick={
                                () => { handleOpenEditModal(row._id) }
                            } />
                        <Popconfirm
                            title="Xoá người dùng"
                            description="Bạn có chắc chắn xoá người dùng này"
                            onConfirm={() => handleDeleteUser(row._id)}
                            okText="Đồng ý"
                            cancelText="Huỷ"
                            style={{ cursor: "pointer" }}
                        >
                            <MdDelete />
                        </Popconfirm>
                        <FaFileImage cursor={'pointer'} onClick={() => handleOpenUploadUserAvatarModal(row._id)} />
                    </div>
                )
            }
        },
    ];

    const [form] = Form.useForm()


    const getUsers = async () => {
        try {
            setLoading(true)
            const result = await getPagingUser({ pageSize, pageIndex })
            setUsers(result.data.users)
            setTotalPages(result.data.totalPage)
            setTotalDoc(result.data.count)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateUser = async (values) => {
        try {
            setLoading(true)
            if (!selectedUser) {
                const result = await createUser(values)
                let newUser = users
                newUser.pop()
                setUsers([result.data.result, ...newUser])
                toast.success("Tạo người dùng thành công")
            } else {
                const result = await editUser(selectedUser, values)
                setUsers(users.map(user => {
                    if (user._id == selectedUser) {
                        return result.data.user
                    }
                    return user
                }))
                toast.success("Cập nhật thông tin người dùng thành công")
                setSelectedUser(null)
            }
            setModalCreateUser(false)
            form.resetFields()

        } catch (error) {
            console.log(error)
            toast.error(selectedUser ? "Cập nhật thông tin người dùng thất bại" : "Tạo người dùng thất bại")
        } finally {
            setLoading(false)
        }
    }

    const handleUploadFile = async (file) => {
        try {
            const formData = new FormData()
            formData.append("avatar", file)
            formData.append("userId", selectedUser)
            const result = await uploadAvatar(formData)
            setUsers(users.map(user => {
                if (user._id == selectedUser) {
                    user.avatar = result.data.url
                }

                return user
            }))
            setModalUploadUserAvatar(false)
            toast.success("Upload hình đại diện người dùng thành công")
        } catch (error) {
            toast.error("Upload hình đại diện người dùng thất bại")
        }
    }

    useEffect(() => {
        getUsers()
    }, [pageSize, pageIndex])

    return (
        <>
            <Button type='primary' onClick={() => setModalCreateUser(true)}>Thêm người dùng</Button>
            <Table loading={loading} columns={columns} dataSource={users} pagination={false} />
            <Pagination
                defaultCurrent={1}
                current={pageIndex}
                total={totalDoc}
                pageSize={pageSize}
                showSizeChanger
                onChange={(pageIndex, pageSize) => {
                    setPageSize(pageSize)
                    setPageIndex(pageIndex)
                }}
            />
            <ModalCreateUser
                form={form}
                loading={loading}
                title={selectedUser ? "Sửa thông tin người dùng" : "Thêm mới người dùng"}
                isModalOpen={modalCreateUser}
                handleCancel={handleCloseModal}
                handleOk={handleCreateUser}
                selectedUser={selectedUser}
            />
            <ModalUploadUserAvatar
                isOpen={modalUploadUserAvatar}
                handleCancel={handleCloseUploadUserAvatarModal}
                handleUploadFile={handleUploadFile}
            />
        </>
    )
}
export default Dashboard;