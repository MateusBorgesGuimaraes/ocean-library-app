import { DynamicTitleHeaderSocialEvents } from '@/components/dynamic-headers/social-dynamic-headers/dynamic-title-header-social-events/dynamic-title-header-social-events';

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        <DynamicTitleHeaderSocialEvents />
      </div>
      {children}
    </section>
  );
}
