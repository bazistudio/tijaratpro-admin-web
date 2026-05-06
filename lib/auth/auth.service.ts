import { AuthResponse, LoginCredentials } from './auth.types';
import axiosInstance from '../api/axios';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      // Re-throw the normalized error from axios interceptor
      throw error;
    }
  },
  
  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error("Logout failed", error);
    }
  }
};

