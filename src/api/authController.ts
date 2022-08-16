import { AuthResponse } from 'src/types/Auth';
import authControllerAxiosInstance from './authControllerAxiosInstance';

const authController = {
  signUp: async (email: string, password: string): Promise<AuthResponse> => {
    return authControllerAxiosInstance<AuthResponse>({
      method: 'POST',
      data: { email, password },
      url: '/users/create',
    });
  },
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return authControllerAxiosInstance<AuthResponse>({
      method: 'POST',
      data: { email, password },
      url: '/users/login',
    });
  },
};

export default authController;
