import axios from "axios";
import https from "https";

const axiosInstance = axios.create({
  baseURL: "http://206.189.147.71:10100/api",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Disable SSL certificate validation
  }),
  headers: {
    'Access-Control-Allow-Origin': '*',  // Allow cross-origin requests from any origin
  },
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
