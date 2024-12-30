'use client';

import { usePathname } from 'next/navigation';
import { TitleHeaderActions } from '@/components/title-header-actions/title-header-actions';
import { icons } from '../../../../../public/assets/assets';

type ValidPaths =
  | '/dashboard/social-media/events'
  | '/dashboard/social-media/events/create-event'
  | '/dashboard/social-media/events/search-event';

const paths: Record<ValidPaths, string> = {
  '/dashboard/social-media/events': 'All Events',
  '/dashboard/social-media/events/create-event': 'Create Event',
  '/dashboard/social-media/events/search-event': 'Search Events',
};

const getTitleFromPath = (pathname: string): string => {
  const editEventPattern =
    /^\/dashboard\/social-media\/events\/edit-event\/\d+$/;

  const eventsRegistrationsPattern =
    /^\/dashboard\/social-media\/events\/events-registrations\/\d+$/;

  if (editEventPattern.test(pathname)) {
    return 'Edit Event';
  }

  if (eventsRegistrationsPattern.test(pathname)) {
    return 'Event Registrations';
  }

  if (pathname in paths) {
    return paths[pathname as ValidPaths];
  }
  return 'All Events';
};

export function DynamicTitleHeaderSocialEvents() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  const links = [
    {
      href: '/dashboard/social-media/events/create-event',
      alt: 'create icon',
      icon: icons.addItemIcon,
    },
    {
      href: '/dashboard/social-media/events',
      alt: 'list all icon',
      icon: icons.listItemsIcon,
    },
    {
      href: '/dashboard/social-media/events/search-event',
      alt: 'search icon',
      icon: icons.searchItemsIcon,
    },
  ];

  return <TitleHeaderActions title={title} links={links} />;
}
