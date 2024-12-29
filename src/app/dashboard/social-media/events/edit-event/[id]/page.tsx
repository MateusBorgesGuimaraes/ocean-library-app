import { EditEvents } from '@/components/dashboard/social-media/events/edit-events/edit-events';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditEventPage(props: Params) {
  const params = await props.params;
  return (
    <section>
      <EditEvents id={params.id} />
    </section>
  );
}
