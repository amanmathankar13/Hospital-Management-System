import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8081/",
})
axiosInstance.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    }
)
export default axiosInstance;