import axios from 'axios';

const authControllerAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

authControllerAxiosInstance.interceptors.request.use(
  (request) => {
    request.headers.accept = 'application/json';
    return request;
  },
  (error) => Promise.reject(error)
);

authControllerAxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authControllerAxiosInstance;
