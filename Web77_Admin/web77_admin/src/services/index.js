import axios from "axios";
import { API_URL } from "../config";
import { getTokenFromLocalStorage, removeTokenFromLocalstorage, removeUserFromLocalstorage } from "../utils/localstorge";

const axiosInstance = axios.create({
    baseURL: API_URL
})

const axiosInstaceAuth = axios.create({
    baseURL: API_URL
})

axiosInstaceAuth.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getTokenFromLocalStorage()}`

    return config
})

axiosInstaceAuth.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        if (error.response.status == 401) {
            removeTokenFromLocalstorage()
            removeUserFromLocalstorage()

            window.location.href = "/"
        }
    }
)

export {
    axiosInstance,
    axiosInstaceAuth
}