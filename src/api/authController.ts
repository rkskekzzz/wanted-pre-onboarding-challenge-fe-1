import { AuthResponse } from 'src/types/AuthResponse';
import authControllerAxiosInstance from './authControllerAxiosInstance';

/**
 * 방법 1. 현재 구현되어 있는 방식
 * 방법 2. throwError(error); => 함수 내부에서 throw
 */
const authController = {
  signUp: async (email: string, password: string): Promise<AuthResponse> => {
    return authControllerAxiosInstance({
      method: 'POST',
      data: { email, password },
      url: '/users/create',
    }).then((response) => response.data);
  },
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return authControllerAxiosInstance({
      method: 'POST',
      data: { email, password },
      url: '/users/login',
    }).then((response) => response.data);
  },
};

export default authController;
