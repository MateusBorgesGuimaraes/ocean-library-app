import { UserLoan } from '@/components/dashboard/librarian/user-loan/user-loan';
type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserLoanPage(props: Params) {
  const params = await props.params;
  return (
    <section>
      <UserLoan id={params.id} />
    </section>
  );
}
