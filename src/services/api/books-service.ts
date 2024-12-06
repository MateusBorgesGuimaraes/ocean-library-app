import { apiClient } from './base-api-client';
import { Book } from './types/book-types';

export const booksService = {
  async getLatestBooks(): Promise<Book[]> {
    const response = await apiClient.get('/books/latest');
    return response.data;
  },

  async getBookById(id: string): Promise<Book> {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },
};
