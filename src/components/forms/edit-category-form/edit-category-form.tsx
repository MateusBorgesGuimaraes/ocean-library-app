'use client';

import React from 'react';
import styles from './edit-category-form.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/form-components/input/input';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { ApiError } from '@/services/api/utils/api-error';
import { useToastStore } from '@/store/toast-store';
import { ButtonForm } from '@/components/form-components/button-form/button-form';
import { categoryService } from '@/services/api/category-service';
import { categoryFormSchema } from '@/components/zod-schemas/create-category-form-schema';
import { Category } from '@/services/api/types/book-types';

type CategoryFormData = {
  name: string;
};

type EditCategoryFormProps = {
  initialData: Category;
};

export const EditCategoryForm = ({ initialData }: EditCategoryFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { addToast } = useToastStore();

  const methods = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: initialData.name,
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);
    try {
      const changedFields: Partial<CategoryFormData> = {};

      if (data.name !== initialData.name) changedFields.name = data.name;

      if (Object.keys(changedFields).length === 0) return;

      if (!changedFields.name) return;

      await categoryService.editCategory(
        String(initialData.id),
        changedFields.name,
      );

      addToast({
        title: 'Success',
        message: 'Category updated successfully!',
        type: 'success',
        duration: 5000,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        addToast({
          title: 'Error',
          message:
            error.message || 'An error occurred while updating the category',
          type: 'error',
          duration: 5000,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formInputs}>
          <div className={styles.inputTextsContainer}>
            <div>
              <Input label="Name" type="text" name="name" />
              {methods.formState.errors.name && (
                <ErrorComponent
                  message={methods.formState.errors.name.message}
                />
              )}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <ButtonForm
              borderRadius=".5rem"
              fontSize="1.25rem"
              padding="0.75rem 2rem"
            >
              Update Category
            </ButtonForm>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
