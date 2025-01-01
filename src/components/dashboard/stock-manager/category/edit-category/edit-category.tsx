'use client';

import { EditCategoryForm } from '@/components/forms/edit-category-form/edit-category-form';
import { categoryService } from '@/services/api/category-service';
import { Category } from '@/services/api/types/book-types';
import React from 'react';

type EditCategoryProps = {
  id: string;
};

export const EditCategory = ({ id }: EditCategoryProps) => {
  const [category, setCategory] = React.useState<Category>();

  React.useEffect(() => {
    const fetchEvent = async () => {
      const response = await categoryService.getCategoryById(id);
      setCategory(response);
    };
    fetchEvent();
  }, [id]);

  if (!category) {
    return null;
  }

  return (
    <div>
      <EditCategoryForm initialData={category} />
    </div>
  );
};
