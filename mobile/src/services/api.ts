import axios from "axios";

export const api = axios.create({
    //http://localhost:3000
    baseURL: 'http://192.168.0.109:3000'
})

