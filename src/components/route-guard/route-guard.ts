'use client';

import { RoutePolicies } from '@/services/api/types/auth-types';
import { useUserStore } from '@/store/user-store';
import { usePathname, redirect } from 'next/navigation';
import { useEffect } from 'react';

const routePermissions: Record<string, RoutePolicies[]> = {
  '/dashboard/admin': [RoutePolicies.admin],
  '/dashboard/librarian': [RoutePolicies.librarian],
  '/dashboard/social-media': [RoutePolicies.socialMedia],
  '/dashboard/stock': [RoutePolicies.stockController],
};

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const pathname = usePathname();

  console.log('pathname', pathname);

  useEffect(() => {
    if (!user) {
      redirect('/');
    }

    const requiredPermissions = Object.entries(routePermissions).find(
      ([route]) => pathname.startsWith(route),
    )?.[1];

    if (
      requiredPermissions &&
      !requiredPermissions.some((p) => user.permissions.includes(p)) &&
      !user.permissions.includes(RoutePolicies.admin)
    ) {
      redirect('/unauthorized');
    }
  }, [user, pathname]);

  return children;
};
