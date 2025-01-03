import { DynamicTitleHeaderSocialEvents } from '@/components/dynamic-headers/social-dynamic-headers/dynamic-title-header-social-events/dynamic-title-header-social-events';
import { RouteGuard } from '@/components/route-guard/route-guard';

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <section>
        <div>
          <DynamicTitleHeaderSocialEvents />
        </div>
        {children}
      </section>
    </RouteGuard>
  );
}
