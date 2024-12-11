import { RoutePolicies } from '@/services/api/types/auth-types';
import { create } from 'zustand';

export type SimpleUser = {
  id: number;
  name: string;
  email: string;
  permissions: RoutePolicies[];
};

type UserStore = {
  user: SimpleUser | null;
  setUser: (user: SimpleUser | null) => void;
  removeUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));
