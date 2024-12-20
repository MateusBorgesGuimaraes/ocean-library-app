import axios from 'axios';
import { apiClient } from './base-api-client';
import { Loan } from './types/loan-types';
import { ApiError } from './utils/api-error';

export const loanService = {
  async createLoan(userId: string, bookId: string): Promise<Loan | null> {
    try {
      const response = await apiClient.post(`/loans`, {
        userId,
        bookId,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      console.error('Unexpected error in createLoan:', error);
      return null;
    }
  },

  async getLoanById(id: string) {
    try {
      const response = await apiClient.get(`/loans/${id}`);
      return response.data;
    } catch (error) {
      console.error('Loan failed:', error);
      throw error;
    }
  },

  async getAllLoans(
    params: string = '',
    page: number = 1,
    limit: number = 6,
  ): Promise<{
    data: Loan[];
    meta: { total: number; page: number; totalPages: number };
  } | null> {
    try {
      const response = await apiClient.get(
        `/loans/findAll?status=${params}&page=${page}&limit=${limit}`,
      );
      return {
        data: response.data.data,
        meta: {
          total: response.data.meta.total,
          page: response.data.meta.page,
          totalPages: response.data.meta.totalPages,
        },
      };
    } catch (error) {
      console.error('Loan failed:', error);
      return null; // Return null instead of throwing to match hook expectations
    }
  },

  async pickUpLoan(id: string) {
    try {
      const response = await apiClient.put(`/loans/${id}/pickup`);
      return response.data;
    } catch (error) {
      console.error('Loan failed:', error);
      throw error;
    }
  },

  async cancelLoan(id: string) {
    try {
      const response = await apiClient.delete(`/loans/${id}/cancel`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  async renewLoan(id: string) {
    try {
      const response = await apiClient.put(`/loans/${id}/renew`);
      return response.data;
    } catch (error) {
      console.error('Loan failed:', error);
      throw error;
    }
  },

  async returnLoan(id: string) {
    try {
      const response = await apiClient.put(`/loans/${id}/return`);
      return response.data;
    } catch (error) {
      console.error('Loan failed:', error);
      throw error;
    }
  },

  async getUserLoans(userId: string, page: number = 1, limit: number = 6) {
    const response = await apiClient.get(
      `/loans/user/${userId}?page=${page}&limit=${limit}`,
    );
    return response.data;
  },

  async getUserLoansByEmail(email: string) {
    try {
      const response = await apiClient.get(
        `/loans/search/email?email=${email}`,
      );
      return response.data;
    } catch (error) {
      console.error('Loan failed:', error);
      throw error;
    }
  },

  async getLoansStatistics() {
    try {
      const response = await apiClient.get(`/loans/statistics`);
      return response.data;
    } catch (error) {
      console.error('Loan failed:', error);
      throw error;
    }
  },

  async getLoanDirectly(bookId: string, userId: string) {
    try {
      const response = await apiClient.get(
        `/loans/directly/${bookId}/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Loan failed:', error);
      throw error;
    }
  },
};
