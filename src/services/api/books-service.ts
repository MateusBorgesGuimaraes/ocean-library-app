import axios from 'axios';
import { apiClient } from './base-api-client';
import {
  Book,
  BookFormData,
  BookSearchResult,
  BookSearchResultFull,
  EditBookFormData,
} from './types/book-types';
import { ApiError } from './utils/api-error';

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

  async advancedSearch(query: string): Promise<BookSearchResultFull | null> {
    const response = await apiClient.get(`/books/search?${query}`);

    if (!response.data) {
      return null;
    }
    return response.data;
  },

  async getAllBooks(params: void, page = 1, limit = 4) {
    try {
      const response = await apiClient.get(
        `/books?page=${page}&limit=${limit}`,
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

  async deleteBook(id: string) {
    try {
      const response = await apiClient.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  async createBook(bookData: Omit<BookFormData, 'cover'>) {
    try {
      const response = await apiClient.post('/books', bookData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },

  async uploadCover(bookId: number, formData: FormData) {
    try {
      const response = await apiClient.post(
        `/books/upload-cover/${bookId}`,
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

  editBook: (bookId: number, bookData: EditBookFormData) => {
    try {
      return apiClient.patch(`/books/${bookId}`, bookData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
    }
  },

  searchBookByTitle: async (title: string) => {
    try {
      const response = await apiClient.get(`/books/search?title=${title}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(error);
      }
      return null;
    }
  },
};
