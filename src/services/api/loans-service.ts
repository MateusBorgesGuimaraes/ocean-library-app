import { apiClient } from './base-api-client';

export const loanService = {
  async createLoan(userId: string, bookId: string) {
    try {
      const response = await apiClient.post(`/loans`, {
        userId,
        bookId,
      });

      return response.data;
    } catch (error) {
      console.error('Loan failed:', error);
      throw error;
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

  async getAllLoans(status: string, page: number, limit: number) {
    try {
      const response = await apiClient.get(
        `/loans/findAll?status=${status}&page=${page}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      console.error('Loan failed:', error);
      throw error;
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

  async getUserLoans(userId: string) {
    try {
      const response = await apiClient.get(`/loans/user/${userId}`);
      return response.data;
    } catch (error) {
      return error;
    }
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
