export type Book = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  cover: string;
  isbn: string;
  synopsis: string;
  availability: boolean;
  category: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type CreatedBook = Omit<
  Book,
  'id' | 'createdAt' | 'updatedAt' | 'availability'
>;
