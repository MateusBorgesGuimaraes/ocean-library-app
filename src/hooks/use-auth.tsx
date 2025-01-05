import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user-store';
import { authService } from '@/services/api/auth-service';

export const useAuth = () => {
  const router = useRouter();
  const { user, setUser, removeUser } = useUserStore();

  const checkAuth = useCallback(async () => {
    try {
      if (user) return;

      if (!authService.isAuthenticated()) {
        removeUser();
        return;
      }

      const userData = await authService.autoLogin();
      if (userData) {
        setUser(userData);
      } else {
        removeUser();
        router.push('/');
      }
    } catch {
      removeUser();
      router.push('/');
    }
  }, [user, setUser, removeUser, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { user, checkAuth };
};
