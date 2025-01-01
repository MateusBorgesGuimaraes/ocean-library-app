import axios from 'axios';
import { apiClient } from './base-api-client';
import { ApiError } from './utils/api-error';

export const categoryService = {
  async getAllCategories() {
    const response = await apiClient.get('/category/all');
    return response.data;
  },

  async getAllCategoriesPagiation(
    params: void,
    page: number = 1,
    limit: number = 6,
  ) {
    const response = await apiClient.get(
      `/category?page=${page}&limit=${limit}`,
    );
    return {
      data: response.data.data,
      meta: {
        total: response.data.total,
        page: response.data.page,
        totalPages: response.data.totalPages,
      },
    };
  },

  async getCategoryById(id: string) {
    try {
      const response = await apiClient.get(`/category/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  async createCategory(name: string) {
    try {
      const response = await apiClient.post('/category', {
        name,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  async editCategory(id: string, name: string) {
    try {
      const response = await apiClient.patch(`/category/${id}`, {
        name,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  async deleteCategory(id: string) {
    try {
      const response = await apiClient.delete(`/category/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  async getCategoryByName(name: string) {
    try {
      const response = await apiClient.get(`/category/name/${name}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },
};
