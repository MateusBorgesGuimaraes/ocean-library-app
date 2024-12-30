import { DynamicTitleHeaderSocialNews } from '@/components/dynamic-headers/social-dynamic-headers/dynamic-title-header-social-news/dynamic-title-header-social-news';

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        <DynamicTitleHeaderSocialNews />
      </div>
      {children}
    </section>
  );
}
