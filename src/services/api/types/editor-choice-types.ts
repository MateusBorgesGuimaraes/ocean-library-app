import { Book } from './book-types';

export type EditorChoice = {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  displayOrder: number;
  book: Book;
};
