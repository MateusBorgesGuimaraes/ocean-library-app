import { BookBorrow } from '@/components/pages/book/book-borrow';

type Params = {
  params: {
    id: string;
  };
};

export default function BookPage({ params }: Params) {
  return (
    <section>
      <BookBorrow id={params.id} />
    </section>
  );
}
