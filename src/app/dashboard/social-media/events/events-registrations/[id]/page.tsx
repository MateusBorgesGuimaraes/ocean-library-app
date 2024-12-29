import { EventRegistrations } from '@/components/dashboard/social-media/events/event-registrations/event-registrations';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventsRegistrationsPage(props: Params) {
  const params = await props.params;
  return (
    <section>
      <EventRegistrations id={params.id} />
    </section>
  );
}
