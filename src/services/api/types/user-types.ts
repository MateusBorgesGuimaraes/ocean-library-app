import { LibraryEventRegistration } from './event-types';
import { Loan } from './loan-types';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  permissions: UserPermissions[];
  loans: Loan[];
  events: LibraryEventRegistration[];
  createdAt: string;
  updatedAt: string;
};

export type CreatedUser = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'events' | 'loans'
>;

export enum UserPermissions {
  admin = 'admin',
  librarian = 'librarian',
  socialMedia = 'socialMedia',
  stockController = 'stockController',
  user = 'user',
}
