import Cookies from 'js-cookie';
import { apiClient } from './base-api-client';
import { LoginInfos, RegisterInfos, ReturnedUser } from './types/auth-types';
import { ApiError } from './utils/api-error';
import axios from 'axios';

export const authService = {
  async postUserData({
    email,
    password,
  }: LoginInfos): Promise<ReturnedUser | null> {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      const { accessToken } = response.data;

      this.setToken(accessToken);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      console.error('Unexpected error in postUserData:', error);
      return null;
    }
  },

  async postRegisterData({
    name,
    email,
    password,
  }: RegisterInfos): Promise<ReturnedUser> {
    try {
      const response = await apiClient.post('/users/register', {
        name,
        email,
        password,
      });

      const { accessToken } = response.data;

      this.setToken(accessToken);

      return response.data;
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  },

  setToken(token: string): void {
    Cookies.set('authToken', token, {
      sameSite: 'strict',
      expires: 1,
    });
  },

  getToken(): string | undefined {
    return Cookies.get('authToken');
  },

  removeToken(): void {
    Cookies.remove('authToken');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
