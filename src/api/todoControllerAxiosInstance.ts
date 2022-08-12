import axios, { AxiosRequestConfig } from 'axios';
import { axiosInstanceWrapper } from './axiosInstanceWrapper';

const todoControllerAxiosInnerInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT, 10),
});

todoControllerAxiosInnerInstance.interceptors.request.use(
  (request) => {
    if (localStorage.getItem('todoAuthToken')) {
      request.headers.Authorization = localStorage.getItem('todoAuthToken');
      request.headers.accept = 'application/json';
    }
    return request;
  },
  (error) => Promise.reject(error)
);

// TODO todoResponse Error handling
todoControllerAxiosInnerInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const todoControllerAxiosInstance = <T>(config: AxiosRequestConfig) =>
  axiosInstanceWrapper<T>(config, todoControllerAxiosInnerInstance);

export default todoControllerAxiosInstance;
