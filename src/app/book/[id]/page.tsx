import { BookBorrow } from '@/components/pages/book/book-borrow';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookPage(props: Params) {
  const params = await props.params;
  return (
    <section>
      <BookBorrow id={params.id} />
    </section>
  );
}
