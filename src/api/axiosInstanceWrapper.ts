import { AxiosInstance, AxiosRequestConfig } from 'axios';

export const axiosInstanceWrapper: <T>(
  config: AxiosRequestConfig,
  instance: AxiosInstance
) => Promise<T> = async (
  config: AxiosRequestConfig,
  instance: AxiosInstance
) => {
  return instance(config).then((response) => response.data);
};
