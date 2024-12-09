import { apiClient } from './base-api-client';
import { Book, BookSearchResult } from './types/book-types';

export const booksService = {
  async getLatestBooks(): Promise<Book[]> {
    const response = await apiClient.get('/books/latest');
    return response.data;
  },

  async getBookById(id: string): Promise<Book> {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },

  async getSimpleBooksByTitle(title: string): Promise<BookSearchResult | null> {
    const response = await apiClient.get(`/books/search-simple?title=${title}`);

    if (!response.data) {
      return null;
    }
    return response.data;
  },
};
