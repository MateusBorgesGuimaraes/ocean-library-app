import { DynamicTitleHeaderSocialNews } from '@/components/dynamic-headers/social-dynamic-headers/dynamic-title-header-social-news/dynamic-title-header-social-news';
import { RouteGuard } from '@/components/route-guard/route-guard';

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <section>
        <div>
          <DynamicTitleHeaderSocialNews />
        </div>
        {children}
      </section>
    </RouteGuard>
  );
}
