import { EditNews } from '@/components/dashboard/social-media/news/edit-news/edit-news';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditNewsPage(props: Params) {
  const params = await props.params;
  return (
    <section>
      <EditNews id={params.id} />
    </section>
  );
}
