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

export type LibraryEventGetAll = {
  id: number;
  title: string;
  date: string;
  location: string;
  banner: string;
  seats: number;
  registrations: number;
  availableSeats: number;
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

// usar o de baixo
export type UserRegistrationData = {
  userId: number;
  userName: string;
  totalRegistrations: number;
  events: UserEventRegistration[];
};

export type EventFormData = {
  title: string;
  description: string;
  date: string;
  location: string;
  seats: number;
  banner?: FileList;
};

export type EditEventFormData = Partial<Omit<EventFormData, 'banner'>>;

export type EventBannerData = {
  file: FileList;
};

export type EventRegistration = {
  id: number;
  userId: number;
  username: string;
  email: string;
  registeredAt: string;
  attended: boolean;
};

export type EventRegistrationDetails = {
  eventTitle: string;
  totalSeats: number;
  registeredUsers: number;
  availableSeats: number;
  registrations: EventRegistration[];
};
