import { DynamicTitleHeader } from '@/components/DynamicTitleHeader/DynamicTitleHeader';

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        <DynamicTitleHeader />
      </div>
      {children}
    </section>
  );
}
