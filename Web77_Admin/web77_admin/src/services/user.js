import { axiosInstaceAuth, axiosInstance } from './index'

const login = ({ email, password }) => {
    return axiosInstance.post('/user/login', { password, email })
}

const signUp = ({ name, email, password }) => {
    return axiosInstance.post('/user/sign-up', { name, email, password })
}

const getPagingUser = ({ pageSize, pageIndex }) => {
    return axiosInstaceAuth.get(`/user/get-paging-user?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}

const createUser = (data) => {
    return axiosInstaceAuth.post(`/user/create-user`, data)
}

const getUserById = (userId) => {
    return axiosInstaceAuth.get(`/user/${userId}`)
}

const editUser = (userId, data) => {
    return axiosInstaceAuth.put(`/user/${userId}`, data)
}

const deleteUser = (userId) => {
    return axiosInstaceAuth.delete(`/user/${userId}`)
}

const uploadAvatar = (formData) => {
    return axiosInstaceAuth.put('/user/upload-avatar', formData)
}


export {
    login,
    signUp,
    getPagingUser,
    createUser,
    getUserById,
    editUser,
    deleteUser,
    uploadAvatar
}