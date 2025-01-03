import { DynamicTitleHeaderStockBook } from '@/components/dynamic-headers/stock-dynamic-headers/dynamic-title-header-stock-book/dynamic-title-header-stock-book';
import { RouteGuard } from '@/components/route-guard/route-guard';

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <section>
        <div>
          <DynamicTitleHeaderStockBook />
        </div>
        {children}
      </section>
    </RouteGuard>
  );
}
