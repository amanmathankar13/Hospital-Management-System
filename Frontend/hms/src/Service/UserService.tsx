import axiosInstance from "../Interceptor/AxiosInterceptor"

const registerUser = async(user: any)=>{
    return axiosInstance.post("user/register", user)
    .then((response:any)=>{
        return response.data
    })
    .catch((error:any)=>{
        throw error
    })
}

const loginUser=async(user: any)=> {
    return axiosInstance.post("user/login", user)
    .then((response:any)=>{
        return response.data
        })
        .catch((error:any)=>{
            throw error
            })
}
export {registerUser, loginUser}