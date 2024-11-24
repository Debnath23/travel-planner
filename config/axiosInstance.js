import axios from "axios";

const BASE_URI = 'https://travel-planner-backend-zj5z.onrender.com';

const axiosInstance = axios.create({
  baseURL: BASE_URI,
  withCredentials: true
});

export default axiosInstance;