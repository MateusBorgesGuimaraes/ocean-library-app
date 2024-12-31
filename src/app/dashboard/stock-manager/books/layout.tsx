import { DynamicTitleHeaderStockBook } from '@/components/dynamic-headers/stock-dynamic-headers/dynamic-title-header-stock-book/dynamic-title-header-stock-book';

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        <DynamicTitleHeaderStockBook />
      </div>
      {children}
    </section>
  );
}
