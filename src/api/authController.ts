import { AuthResponse } from 'src/types/AuthResponse';
import authControllerAxiosInstance from './authControllerAxiosInstance';

const authController = {
  signUp: (email: string, password: string): Promise<AuthResponse> => {
    return authControllerAxiosInstance<AuthResponse>({
      method: 'POST',
      data: { email, password },
      url: '/auth/signup',
    });
  },
  login: (email: string, password: string): Promise<AuthResponse> => {
    return authControllerAxiosInstance<AuthResponse>({
      method: 'POST',
      data: { email, password },
      url: '/auth/signin',
    });
  },
};

export default authController;
