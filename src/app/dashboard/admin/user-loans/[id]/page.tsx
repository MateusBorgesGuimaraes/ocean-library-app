import { UserLoansAdmin } from '@/components/dashboard/admin/user-loans-admin/user-loans-admin';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserLoansPage(props: Params) {
  const params = await props.params;
  return (
    <section>
      <UserLoansAdmin id={params.id} />
      hfgdh
    </section>
  );
}
