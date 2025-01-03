import { UsersLoans } from '@/components/dashboard/librarian/users-loans/users-loans';
import { RouteGuard } from '@/components/route-guard/route-guard';

export default async function UsersLoansPage() {
  return (
    <RouteGuard>
      <div>
        <UsersLoans />
      </div>
    </RouteGuard>
  );
}
