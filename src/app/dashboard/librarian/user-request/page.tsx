import { UserRequest } from '@/components/dashboard/librarian/user-request/user-request';
import { RouteGuard } from '@/components/route-guard/route-guard';

export default async function UserRequestPage() {
  return (
    <RouteGuard>
      <section>
        <UserRequest />
      </section>
    </RouteGuard>
  );
}
