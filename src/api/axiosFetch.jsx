//fetch user specific cards from backend
import axios from "axios";
const axiosFetch= axios.create({
    baseURL: "http://localhost:7777/api/routes",
    headers:{
        "authToken": localStorage.getItem("token") || ""
    }
});
export default axiosFetch;