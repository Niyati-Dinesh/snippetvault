import axios from "axios";
// Create an Axios instance with a base URL and default headers for login purpose
const axiosInstance = axios.create({
  baseURL: "http://localhost:7777/api/routes",
  headers: { 
    "Content-Type": "application/json",
  },
});
// Add the authToken to the headers of every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authToken = token;
  }
  return config;
});
// Handle 401 Unauthorized responses by redirecting to the sign-in page
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
