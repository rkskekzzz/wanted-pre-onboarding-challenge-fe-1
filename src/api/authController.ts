import axios from 'axios';
import { AuthResponse } from 'src/types/AuthResponse';
import throwError from 'src/errors/throwError';
import makeApiPath from './api';

/**
 * 방법 1. 현재 구현되어 있는 방식
 * 방법 2. throwError(error); => 함수 내부에서 throw
 */
const authController = {
  signUp: async (email: string, password: string): Promise<AuthResponse> => {
    const method = 'POST';
    const url = makeApiPath('/users/create');
    const body = { email, password };

    return axios({
      method,
      data: body,
      url,
    })
      .then((response) => response.data)
      .catch(throwError);
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const method = 'POST';
    const url = makeApiPath('/users/login');
    const body = { email, password };

    return axios({
      method,
      data: body,
      url,
    })
      .then((response) => response.data)
      .catch(throwError);
  },
};

export default authController;
