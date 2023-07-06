import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000"
    // localstorage
})

export default class Api{
    async getadmin(){
        const result = await axiosInstance.get("/admin/getadmin")
        return result
    }
}

// export default getadmin


