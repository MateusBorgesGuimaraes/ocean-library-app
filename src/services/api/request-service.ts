import { apiClient } from './base-api-client';
import { CreatedRequest, RequestBook } from './types/request-types';

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
};
