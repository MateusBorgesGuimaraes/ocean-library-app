'use client';

import { usePathname } from 'next/navigation';
import { TitleHeaderActions } from '@/components/title-header-actions/title-header-actions';
import { icons } from '../../../../../public/assets/assets';

type ValidPaths =
  | '/dashboard/stock-manager/category'
  | '/dashboard/stock-manager/category/create-category'
  | '/dashboard/stock-manager/category/search-category';

const paths: Record<ValidPaths, string> = {
  '/dashboard/stock-manager/category': 'All Categories',
  '/dashboard/stock-manager/category/create-category': 'Create Category',
  '/dashboard/stock-manager/category/search-category': 'Search Category',
};

const getTitleFromPath = (pathname: string): string => {
  const editBookPattern =
    /^\/dashboard\/stock-manager\/category\/edit-category\/\d+$/;

  if (editBookPattern.test(pathname)) {
    return 'Edit Category';
  }

  if (pathname in paths) {
    return paths[pathname as ValidPaths];
  }
  return 'All Categories';
};

export function DynamicTitleHeaderStockCategory() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  const links = [
    {
      href: '/dashboard/stock-manager/category/create-category',
      alt: 'create icon',
      icon: icons.addItemIcon,
    },
    {
      href: '/dashboard/stock-manager/category',
      alt: 'list all icon',
      icon: icons.listItemsIcon,
    },
    {
      href: '/dashboard/stock-manager/category/search-category',
      alt: 'search icon',
      icon: icons.searchItemsIcon,
    },
  ];

  return <TitleHeaderActions title={title} links={links} />;
}
