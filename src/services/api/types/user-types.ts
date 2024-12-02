import { LibraryEventRegistration } from './event-types';
import { Loan } from './loan-types';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  loans: Loan[];
  events: LibraryEventRegistration[];
  createdAt: string;
  updatedAt: string;
};

export type CreatedUser = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'events' | 'loans'
>;
