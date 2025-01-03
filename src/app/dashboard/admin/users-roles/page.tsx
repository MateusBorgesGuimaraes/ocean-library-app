import { UserRoles } from '@/components/dashboard/admin/user-roles/user-roles';
import { RouteGuard } from '@/components/route-guard/route-guard';

export default function UsersRolesPage() {
  return (
    <RouteGuard>
      <section>
        <UserRoles />
      </section>
    </RouteGuard>
  );
}
