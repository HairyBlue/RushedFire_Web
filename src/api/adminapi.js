import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/admin"
    // localstorage
})

export default class Api{
    //GET
    async getadmin(){
        const result = await axiosInstance.get("/getadmin")
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


