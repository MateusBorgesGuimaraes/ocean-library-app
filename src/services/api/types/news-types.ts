import { SearchMeta } from './book-types';

export type News = {
  id: number;
  title: string;
  content: string;
  coverImage: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreatedNews = Omit<
  News,
  'id' | 'createdAt' | 'updatedAt' | 'isActive'
>;

export type NewsSearch = {
  data: News[];
  meta: SearchMeta;
};
