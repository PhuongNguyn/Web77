import { axiosInstance } from './index'

const login = ({ email, password }) => {
    return axiosInstance.post('/user/login', { password, email })
}

const signUp = ({ name, email, password }) => {
    return axiosInstance.post('/user/sign-up', { name, email, password })
}
export {
    login,
    signUp
}