import { TitleHeaderActions } from '@/components/title-header-actions/title-header-actions';
import { icons } from '../../../../../public/assets/assets';

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        <TitleHeaderActions
          title="Events"
          links={[
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
          ]}
        />
      </div>
      {children}
    </section>
  );
}
