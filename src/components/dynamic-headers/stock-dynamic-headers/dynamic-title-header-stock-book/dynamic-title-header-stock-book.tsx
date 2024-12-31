'use client';

import { usePathname } from 'next/navigation';
import { TitleHeaderActions } from '@/components/title-header-actions/title-header-actions';
import { icons } from '../../../../../public/assets/assets';

type ValidPaths =
  | '/dashboard/stock-manager/books'
  | '/dashboard/stock-manager/books/create-book'
  | '/dashboard/stock-manager/books/search-books';

const paths: Record<ValidPaths, string> = {
  '/dashboard/stock-manager/books': 'All Books',
  '/dashboard/stock-manager/books/create-book': 'Create Book',
  '/dashboard/stock-manager/books/search-books': 'Search Books',
};

const getTitleFromPath = (pathname: string): string => {
  const editBookPattern = /^\/dashboard\/stock-manager\/books\/edit-book\/\d+$/;

  if (editBookPattern.test(pathname)) {
    return 'Edit Book';
  }

  if (pathname in paths) {
    return paths[pathname as ValidPaths];
  }
  return 'All Books';
};

export function DynamicTitleHeaderStockBook() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  const links = [
    {
      href: '/dashboard/stock-manager/books/create-book',
      alt: 'create icon',
      icon: icons.addItemIcon,
    },
    {
      href: '/dashboard/stock-manager/books',
      alt: 'list all icon',
      icon: icons.listItemsIcon,
    },
    {
      href: '/dashboard/stock-manager/books/search-books',
      alt: 'search icon',
      icon: icons.searchItemsIcon,
    },
  ];

  return <TitleHeaderActions title={title} links={links} />;
}
