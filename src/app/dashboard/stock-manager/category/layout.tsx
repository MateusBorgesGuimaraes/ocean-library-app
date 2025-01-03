// import { DynamicTitleHeaderStockBook } from '@/components/dynamic-headers/stock-dynamic-headers/dynamic-title-header-stock-book/dynamic-title-header-stock-book';

import { DynamicTitleHeaderStockCategory } from '@/components/dynamic-headers/stock-dynamic-headers/dynamic-title-header-stock-category/dynamic-title-header-stock-category';
import { RouteGuard } from '@/components/route-guard/route-guard';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <section>
        <div>
          <DynamicTitleHeaderStockCategory />
        </div>
        {children}
      </section>
    </RouteGuard>
  );
}
