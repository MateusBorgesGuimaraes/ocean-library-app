import { EventHome } from '@/components/pages/event/event-home';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventPage({ params }: Params) {
  const { id } = await params;
  return (
    <section>
      <EventHome eventId={id} />
    </section>
  );
}
