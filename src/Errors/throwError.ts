import axios, { AxiosError } from 'axios';

const throwError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
  throw new Error(`Unknown error: ${error}`);
};

export default throwError;
