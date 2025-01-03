import { UserLoan } from '@/components/dashboard/librarian/user-loan/user-loan';
import { RouteGuard } from '@/components/route-guard/route-guard';
type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserLoanPage(props: Params) {
  const params = await props.params;
  return (
    <RouteGuard>
      <section>
        <UserLoan id={params.id} />
      </section>
    </RouteGuard>
  );
}
