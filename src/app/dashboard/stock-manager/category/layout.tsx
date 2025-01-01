// import { DynamicTitleHeaderStockBook } from '@/components/dynamic-headers/stock-dynamic-headers/dynamic-title-header-stock-book/dynamic-title-header-stock-book';

import { DynamicTitleHeaderStockCategory } from '@/components/dynamic-headers/stock-dynamic-headers/dynamic-title-header-stock-category/dynamic-title-header-stock-category';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        {/* <DynamicTitleHeaderStockBook /> */}
        <DynamicTitleHeaderStockCategory />
      </div>
      {children}
    </section>
  );
}
