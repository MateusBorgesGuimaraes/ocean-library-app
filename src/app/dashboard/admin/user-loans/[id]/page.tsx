import { UserLoansAdmin } from '@/components/dashboard/admin/user-loans-admin/user-loans-admin';
import { RouteGuard } from '@/components/route-guard/route-guard';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserLoansPage(props: Params) {
  const params = await props.params;
  return (
    <RouteGuard>
      <section>
        <UserLoansAdmin id={params.id} />
        hfgdh
      </section>
    </RouteGuard>
  );
}
