import axios, { AxiosRequestConfig } from 'axios';
import { axiosInstanceWrapper } from './axiosInstanceWrapper';

const todoControllerAxiosInnerInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT, 10),
});

todoControllerAxiosInnerInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('todoAuthToken');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

// TODO todoResponse Error handling
todoControllerAxiosInnerInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const todoControllerAxiosInstance = <T>(config: AxiosRequestConfig) =>
  axiosInstanceWrapper<T>(config, todoControllerAxiosInnerInstance);

export default todoControllerAxiosInstance;
