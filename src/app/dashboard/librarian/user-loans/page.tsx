import { UserLoans } from '@/components/dashboard/librarian/user-loans/user-loans';
import { RouteGuard } from '@/components/route-guard/route-guard';

export default async function UserLoansPage() {
  return (
    <RouteGuard>
      <section>
        <UserLoans />
      </section>
    </RouteGuard>
  );
}
