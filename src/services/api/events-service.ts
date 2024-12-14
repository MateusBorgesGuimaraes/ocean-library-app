import axios from 'axios';
import { apiClient } from './base-api-client';
import { ApiError } from './utils/api-error';

export const eventsService = {
  getEventsById: async (id: string) => {
    const response = await apiClient.get(`/library-events/${id}`);
    return response.data;
  },

  registerUserToEvent: async (eventId: string, userId: number) => {
    try {
      const response = await apiClient.post(
        `/library-events/${eventId}/register`,
        {
          userId,
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

  cancelRegistrationToEvent: async (eventId: string, userId: number) => {
    try {
      const response = await apiClient.delete(
        `/library-events/${eventId}/registrations/${userId}`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  getAllUserEventsRegistrations: async (userId: string) => {
    try {
      const response = await apiClient.get(
        `/library-events/user/${userId}/events`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },
};
