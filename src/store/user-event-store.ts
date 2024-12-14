import {
  UserEventRegistration,
  UserRegistrationData,
} from '@/services/api/types/event-types';
import { create } from 'zustand';

type UserEventStore = {
  userEvents: UserRegistrationData | null;
  setUserEvents: (userEvents: UserRegistrationData) => void;
  removeUserEvents: () => void;
  addUserEvent: (userEvent: UserEventRegistration) => void;
  removeUserEvent: (eventId: number) => void;
  updateUserEvent: (userEvent: UserRegistrationData) => void;
};

export const useUserEventStore = create<UserEventStore>((set) => ({
  userEvents: null,

  setUserEvents: (userEvents) => set({ userEvents }),

  removeUserEvents: () => set({ userEvents: null }),

  addUserEvent: (userEvent) =>
    set((state) => {
      if (!state.userEvents) return state;

      return {
        userEvents: {
          ...state.userEvents,
          events: [...state.userEvents.events, userEvent],
          totalRegistrations: state.userEvents.totalRegistrations + 1,
        },
      };
    }),

  removeUserEvent: (eventId) =>
    set((state) => {
      if (!state.userEvents) return state;

      const updatedEvents = state.userEvents.events.filter(
        (event) => event.event.id !== eventId,
      );

      return {
        userEvents: {
          ...state.userEvents,
          events: updatedEvents,
          totalRegistrations: updatedEvents.length,
        },
      };
    }),

  updateUserEvent: (userEvent) => set({ userEvents: userEvent }),
}));
