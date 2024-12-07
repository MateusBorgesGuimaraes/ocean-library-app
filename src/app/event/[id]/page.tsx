import { EventHome } from '@/components/pages/event/event-home';

type Params = {
  params: {
    id: string;
  };
};

export default async function EventPage({ params }: Params) {
  return (
    <section>
      <EventHome eventId={params.id} />
    </section>
  );
}
