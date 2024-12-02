import { User } from './user-types';

export type LibraryEvent = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  banner: string;
  seats: number;
  registrations: LibraryEventRegistration[];
  createdAt: string;
  updatedAt: string;
};

export type LibraryEventRegistration = {
  id: number;
  event: LibraryEvent;
  user: User;
  registeredAt: Date;
};
