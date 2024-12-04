import { create } from 'zustand';
import { Book } from '@/services/api/types/book-types';

type BookPreviewStore = {
  book: Book | null;
  setBook: (book: Book | null) => void;
  removeBook: () => void;
};

export const useBookPreviewStore = create<BookPreviewStore>((set) => ({
  book: null,
  setBook: (book) => set({ book }),
  removeBook: () => set({ book: null }),
}));
