export type RequestBook = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  genre: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatedRequest = Omit<RequestBook, 'createdAt' | 'updatedAt'>;
