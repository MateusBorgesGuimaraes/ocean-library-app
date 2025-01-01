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
  category: Category;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type BookSearchResult = {
  data: BookSearchItem[];
  meta: SearchMeta;
};

export type BookSearchResultFull = {
  data: Book[];
  meta: SearchMeta;
};

export type BookSearchItem = {
  id: number;
  title: string;
};

export type SearchMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CreatedBook = Omit<
  Book,
  'id' | 'createdAt' | 'updatedAt' | 'availability'
>;

export type BookFormData = {
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  availability: boolean;
  year: number;
  category: number;
  quantity: number;
  synopsis: string;
  cover?: FileList;
};

export type EditBookFormData = Partial<
  Omit<BookFormData, 'cover' | 'categoryId'>
>;
