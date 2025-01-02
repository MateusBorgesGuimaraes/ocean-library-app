import { UserEvents } from '@/components/dashboard/admin/user-events/user-events';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserEventsPage(props: Params) {
  const params = await props.params;
  return (
    <section>
      <UserEvents id={params.id} />
    </section>
  );
}
