import { EditBook } from '@/components/dashboard/stock-manager/books/edit-book/edit-book';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBookPage(props: Params) {
  const params = await props.params;
  return (
    <section>
      <EditBook id={params.id} />
    </section>
  );
}
