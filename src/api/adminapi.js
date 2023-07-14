import axios from "axios";
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


