import { Book } from './book-types';
import { LibraryEvent } from './event-types';
import { News } from './news-types';

export type EditorChoice = {
  books: Book[];
  news: News[];
  events: LibraryEvent[];
};
