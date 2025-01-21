import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://206.189.147.71:10100/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = process.env.AUTH_TOKEN;
    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
