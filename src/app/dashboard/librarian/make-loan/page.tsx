import { MakeLoan } from '@/components/dashboard/librarian/make-loan/make-loan';
import { RouteGuard } from '@/components/route-guard/route-guard';

export default async function MakeLoanPage() {
  return (
    <RouteGuard>
      <section>
        <MakeLoan />
      </section>
    </RouteGuard>
  );
}
