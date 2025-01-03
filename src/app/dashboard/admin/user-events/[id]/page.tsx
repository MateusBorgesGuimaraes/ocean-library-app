import { UserEvents } from '@/components/dashboard/admin/user-events/user-events';
import { RouteGuard } from '@/components/route-guard/route-guard';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserEventsPage(props: Params) {
  const params = await props.params;
  return (
    <RouteGuard>
      <section>
        <UserEvents id={params.id} />
      </section>
    </RouteGuard>
  );
}
