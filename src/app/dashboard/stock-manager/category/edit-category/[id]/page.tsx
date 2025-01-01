import { EditCategory } from '@/components/dashboard/stock-manager/category/edit-category/edit-category';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCategoryPage(props: Params) {
  const params = await props.params;
  return (
    <section>
      <EditCategory id={params.id} />
    </section>
  );
}
