import axios, { AxiosRequestConfig } from 'axios';
import { axiosInstanceWrapper } from './axiosInstanceWrapper';

const authControllerAxiosInnerInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT, 10),
});

authControllerAxiosInnerInstance.interceptors.request.use(
  (request) => {
    request.headers.accept = 'application/json';
    return request;
  },
  (error) => Promise.reject(error)
);

// TODO authResponse Error handling
authControllerAxiosInnerInstance.interceptors.response.use(
  (response) => {
    localStorage.setItem('todoAuthToken', response.data.access_token);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authControllerAxiosInstance = <T>(config: AxiosRequestConfig) =>
  axiosInstanceWrapper<T>(config, authControllerAxiosInnerInstance);

export default authControllerAxiosInstance;
