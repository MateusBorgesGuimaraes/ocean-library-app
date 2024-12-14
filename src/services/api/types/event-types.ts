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
  availableSeats: number;
  registeredUsers: number;
  createdAt: string;
  updatedAt: string;
};

export type LibraryEventRegistration = {
  id: number;
  event: LibraryEvent;
  user: User;
  registeredAt: Date;
};

type Event = {
  id: number;
  title: string;
  description: string;
  banner: string;
  date: string;
  location: string;
  seats: number;
};

export type UserEventRegistration = {
  registrationId: number;
  event: Event;
  registeredAt: string;
  attended: boolean;
};

export type UserRegistrationData = {
  userId: number;
  userName: string;
  totalRegistrations: number;
  events: UserEventRegistration[];
};
