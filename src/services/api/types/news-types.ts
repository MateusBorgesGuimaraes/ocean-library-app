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

export type NewsFormData = {
  title: string;
  content: string;
  tags: string[];
  coverImage: FileList;
};

export type EditNewsFormData = Partial<Omit<NewsFormData, 'coverImage'>>;
