import axiosInstance from "../Interceptor/AxiosInterceptor"

const scheduleAppointment = async(data: any)=>{
    return axiosInstance.post("appointment/schedule", data)
    .then((response:any)=>{
        return response.data
    })
    .catch((error:any)=>{
        throw error
    })
}

const cancelAppoinment=async(id: any)=> {
    return axiosInstance.post("appointment/cancel/"+id)
    .then((response:any)=>{
        return response.data
        })
        .catch((error:any)=>{
            throw error
            })
}

const getAppoinment=async(id: any)=> {
    return axiosInstance.get("appointment/get/"+id)
    .then((response:any)=>{
        return response.data
        })
        .catch((error:any)=>{
            throw error
            })
}

const getAppoinmentDetails=async(id: any)=> {
    return axiosInstance.get("appointment/get/details/"+id)
    .then((response:any)=>{
        return response.data
        })
        .catch((error:any)=>{
            throw error
            })
}

const getAllAppointmentsByPatient = async(patientId:any)=>{
    return axiosInstance.get("appointment/get/detailsByPatientId/"+patientId)
    .then((response:any)=>
        {
            return response.data
            })
            .catch((error:any)=>
                {
                    throw error
                    })
}

const createAppointmentReport = (data:any)=>{
    return axiosInstance.post('/appointment/record/create', data)
    .then((response: any)=> response.data)
    .catch((error: any)=> {throw error})
}

const isReportExists = async(appointmentId:any)=>{
    return axiosInstance.get('/appointment/record/isRecordExists/'+appointmentId)
    .then((response: any)=> response.data)
    .catch((error: any)=> {throw error})
}

const getReportsByPatientId = async(patientId:any)=>{
    return axiosInstance.get('/appointment/record/getRecordsByPatientId/'+patientId)
    .then((response: any)=> response.data)
    .catch((error: any)=> {throw error})
}

const getPrescriptionsByPatientId = async(patientId:number)=>{
    console.log("Fetching prescriptions for patientId:", patientId);
    return axiosInstance.get(`/appointment/record/getPrescriptionsByPatientId/${patientId}`)
    .then((response: any)=> response.data)
    .catch((error: any)=> {throw error})
}

const getAllAppointmentsByDoctor = async(doctorId:any)=>{
    return axiosInstance.get("appointment/get/detailsByDoctorId/"+doctorId)
    .then((response:any)=>
        {
            return response.data
            })
            .catch((error:any)=>
                {
                    throw error
                    })
}
export {scheduleAppointment, cancelAppoinment, getAppoinment, getAppoinmentDetails,getAllAppointmentsByDoctor,getAllAppointmentsByPatient, createAppointmentReport, isReportExists, getReportsByPatientId, getPrescriptionsByPatientId}