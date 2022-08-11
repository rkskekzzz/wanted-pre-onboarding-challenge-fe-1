import axios from 'axios';

const todoControllerAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

todoControllerAxiosInstance.interceptors.request.use(
  (request) => {
    if (localStorage.getItem('todoAuthToken')) {
      request.headers.Authorization = localStorage.getItem('todoAuthToken');
      request.headers.accept = 'application/json';
    }
    return request;
  },
  (error) => Promise.reject(error)
);

todoControllerAxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default todoControllerAxiosInstance;
