import axios from "axios";

 const Axios = axios.create({
    baseURL:'http://192.168.43.84:8000/'
})

export default Axios