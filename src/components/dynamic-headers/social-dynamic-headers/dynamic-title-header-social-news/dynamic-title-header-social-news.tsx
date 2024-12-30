'use client';

import { usePathname } from 'next/navigation';
import { TitleHeaderActions } from '@/components/title-header-actions/title-header-actions';
import { icons } from '../../../../../public/assets/assets';

type ValidPaths =
  | '/dashboard/social-media/news'
  | '/dashboard/social-media/news/create-news'
  | '/dashboard/social-media/news/search-news';

const paths: Record<ValidPaths, string> = {
  '/dashboard/social-media/news': 'All News',
  '/dashboard/social-media/news/create-news': 'Create News',
  '/dashboard/social-media/news/search-news': 'Search News',
};

const getTitleFromPath = (pathname: string): string => {
  const editnewsPattern = /^\/dashboard\/social-media\/news\/edit-news\/\d+$/;

  if (editnewsPattern.test(pathname)) {
    return 'Edit News';
  }

  if (pathname in paths) {
    return paths[pathname as ValidPaths];
  }
  return 'All News';
};

export function DynamicTitleHeaderSocialNews() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  const links = [
    {
      href: '/dashboard/social-media/news/create-news',
      alt: 'create icon',
      icon: icons.addItemIcon,
    },
    {
      href: '/dashboard/social-media/news',
      alt: 'list all icon',
      icon: icons.listItemsIcon,
    },
    {
      href: '/dashboard/social-media/news/search-news',
      alt: 'search icon',
      icon: icons.searchItemsIcon,
    },
  ];

  return <TitleHeaderActions title={title} links={links} />;
}
