import { apiClient } from './base-api-client';

export const categoryService = {
  async getAllCategories() {
    const response = await apiClient.get('/category');
    return response.data;
  },
};
