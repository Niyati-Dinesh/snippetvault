import axios from 'axios'
const axiosAdd = axios.create(
    {
        baseURL:"http://localhost:7777/api/routes",
        headers: {
            "Content-Type":"application/json",
            "authToken":localStorage.getItem("token")
    }}
);
export default axiosAdd;