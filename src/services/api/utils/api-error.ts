import { AxiosError } from 'axios';

// Define a structured error response
export interface ApiErrorResponse {
  message: string;
  status: number;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
}

export class ApiError extends Error {
  status: number;
  errors?: Array<{
    field?: string;
    message: string;
  }>;

  constructor(error: AxiosError<ApiErrorResponse>) {
    super(
      error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred',
    );

    this.name = 'ApiError';
    this.status = error.response?.status || 500;
    this.errors = error.response?.data?.errors;
  }
}
