import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user-store';
import { authService } from '@/services/api/auth-service';

export const useAuth = () => {
  const router = useRouter();
  const { user, setUser, removeUser } = useUserStore();

  const checkAuth = async () => {
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
    } catch (error) {
      removeUser();
      router.push('/');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { user, checkAuth };
};
