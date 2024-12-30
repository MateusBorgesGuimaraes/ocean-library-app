import axios from 'axios';
import { apiClient } from './base-api-client';
import { EditNewsFormData, NewsFormData } from './types/news-types';
import { ApiError } from './utils/api-error';

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

  createNews: async (newsData: Omit<NewsFormData, 'coverImage'>) => {
    try {
      const response = await apiClient.post('/news', newsData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  uploadNewsCover: async (newsId: number, formData: FormData) => {
    try {
      const response = await apiClient.post(
        `/news/upload-cover-image/${newsId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  editNews: async (eventId: number, eventData: EditNewsFormData) => {
    try {
      const response = await apiClient.patch(`/news/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  deleteNews: async (eventId: number) => {
    try {
      const response = await apiClient.delete(`/news/${eventId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  searchNewsByTitle: async (title: string) => {
    try {
      const response = await apiClient.get(`/news/search/title?title=${title}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },
};
