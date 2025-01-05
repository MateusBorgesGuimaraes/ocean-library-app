'use client';

import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { checkAuth } = useAuth();

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    init();
  }, [checkAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
