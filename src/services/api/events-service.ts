import { apiClient } from './base-api-client';

export const eventsService = {
  getEventsById: async (id: string) => {
    const response = await apiClient.get(`/library-events/${id}`);
    return response.data;
  },
};
