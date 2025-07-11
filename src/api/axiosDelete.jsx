//Api to manage delete requests /manage/deletesnippet
import axios from "axios";
authToken=localStorage.getItem("token");
const axiosDelete = axios.create({
    baseURL: "http://localhost:7777/api/routes",
    headers: {
        "Content-Type": "application/json",
        "authToken": `${authToken}`
    }
})
