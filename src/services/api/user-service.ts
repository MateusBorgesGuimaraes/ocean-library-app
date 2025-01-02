import { apiClient } from './base-api-client';
import { UserPermissions } from './types/user-types';
import { ApiError } from './utils/api-error';
import axios from 'axios';

export const userService = {
  searchUserByEmail: async (email: string) => {
    try {
      const response = await apiClient.get(
        `/users/search/email?email=${email}`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  getUserById: async (id: string) => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  updateUserPermissions: async (id: string, permissions: UserPermissions[]) => {
    try {
      const response = await apiClient.patch(`/users/${id}/permissions`, {
        permissions,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  deleteUser: async (id: string) => {
    const warning = window.confirm(
      'Are you sure you want to delete this user? This action cannot be undone.',
    );
    if (!warning) {
      return;
    }
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },
};
