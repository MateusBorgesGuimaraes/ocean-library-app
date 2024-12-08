import { News } from '@/components/pages/news/news';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewsPage({ params }: Params) {
  const { id } = await params;
  return (
    <section>
      <News id={id} />
    </section>
  );
}
