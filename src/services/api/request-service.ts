import axios from 'axios';
import { apiClient } from './base-api-client';
import { CreatedRequest, RequestBook } from './types/request-types';
import { ApiError } from './utils/api-error';

export const requestService = {
  async postRequest(requestData: CreatedRequest): Promise<RequestBook> {
    const response = await apiClient.post('/requests', {
      title: requestData.title,
      author: requestData.author,
      publisher: requestData.publisher,
      year: +requestData.year,
      genre: requestData.genre,
    });

    return response.data;
  },

  async getAllRequests(params: void, page: number = 1, limit: number = 6) : Promise<{ data: RequestBook[]; meta: { total: number; page: number; totalPages: number }; }> {
    const response = await apiClient.get(
      `/requests?page=${page}&limit=${limit}`,
    );
    return {
      data: response.data.data,
      meta: {
        total: response.data.meta.totalItems,
        page: response.data.meta.currentPage,
        totalPages: response.data.meta.totalPages,
      },
    };
  },

  async removeRequest(id: string): Promise<void> {
    try {
      await apiClient.delete(`/requests/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
    }
  },
};
