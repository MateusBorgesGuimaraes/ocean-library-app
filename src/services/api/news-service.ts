import { apiClient } from './base-api-client';

export const newsService = {
  getNewsById: async (id: string) => {
    const response = await apiClient.get(`/news/${id}`);
    return response.data;
  },
};
