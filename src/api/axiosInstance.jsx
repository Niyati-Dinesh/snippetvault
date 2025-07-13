import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7777/api/routes",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token dynamically before each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authToken = token;
  } else {
    delete config.headers.authToken;
  }
  return config;
});

// Handle 401 Unauthorized responses (e.g. JWT expired)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg = error?.response?.data?.error;

    // Only run logout logic for token expiration
    if (
      error.response?.status === 401 &&
      errorMsg === "TokenExpired"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.error("Session expired. Please login again.");

      setTimeout(() => {
        window.location.href = "/signin";
      }, 1000);
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
