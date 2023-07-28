import axios from "axios";
import { toRaw } from "vue";
const  bearerToken = localStorage.getItem("auth")
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/admin",
    // localstorage
    headers: {Authorization: `Bearer ${bearerToken}`}
})

export default class Api{
    //GET
    async getadmin(){
        const result = await axiosInstance.get("/getadmin")
        return result
    }

    async getDashboardData() {
        const result = await axiosInstance.get("/dashboard")
        return result
    } 

    async getAlarmOverview(page, selectedYear) {
        const result = await axiosInstance.get(`/overview-alarm?page=${page}&year=${selectedYear}`)
        return result
    }

    async getViewEachDevice(deviceId) {
        const result = await axiosInstance.get(`/view-each-device?deviceId=${deviceId}`)
        return result
    }
    //POST
    async signup(data) {
        const result = await axiosInstance.post("/signup", data)
        return result
    }
    async login(data) {
        const result = await axiosInstance.post("/login", data)
        return result
    }
}

// export default getadmin


