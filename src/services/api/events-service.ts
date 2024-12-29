import axios from 'axios';
import { apiClient } from './base-api-client';
import { ApiError } from './utils/api-error';
import { EditEventFormData, EventFormData } from './types/event-types';

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

  getAllEvents: async (params: void, page = 1, limit = 4) => {
    try {
      const response = await apiClient.get(
        `/library-events?page=${page}&limit=${limit}`,
      );
      return {
        data: response.data.data,
        meta: {
          total: response.data.total,
          page: response.data.page,
          totalPages: response.data.totalPages,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  createEvent: async (eventData: Omit<EventFormData, 'banner'>) => {
    try {
      const response = await apiClient.post('/library-events', eventData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  uploadEventBanner: async (eventId: number, formData: FormData) => {
    try {
      const response = await apiClient.post(
        `/library-events/upload-banner/${eventId}`,
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

  deleteEvent: async (eventId: number) => {
    try {
      const response = await apiClient.delete(`/library-events/${eventId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  editEvent: async (eventId: number, eventData: EditEventFormData) => {
    try {
      const response = await apiClient.patch(
        `/library-events/${eventId}`,
        eventData,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  searchEventByTitle: async (title: string) => {
    try {
      const response = await apiClient.get(
        `/library-events/search/title?title=${title}`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  getAllEventsRegistrationsByEventId: async (id: string) => {
    try {
      const response = await apiClient.get(
        `/library-events/${id}/registrations`,
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
