import { axiosInstance } from './index'

const login = ({ email, password }) => {
    return axiosInstance.post('/user/login', { password, email })
}

export {
    login
}