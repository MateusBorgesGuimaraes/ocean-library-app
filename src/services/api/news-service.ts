import { apiClient } from './base-api-client';

export const newsService = {
  getNewsById: async (id: string) => {
    const response = await apiClient.get(`/news/${id}`);
    return response.data;
  },

  getAllNews: async (params: void, page: number = 1, limit: number = 6) => {
    const response = await apiClient.get(`/news?page=${page}&limit=${limit}`);
    return {
      data: response.data.data,
      meta: {
        total: response.data.total,
        page: response.data.page,
        totalPages: response.data.totalPages,
      },
    };
  },
};
