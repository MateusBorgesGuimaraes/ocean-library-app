'use client';

import React from 'react';
import styles from './create-category-form.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/form-components/input/input';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { ApiError } from '@/services/api/utils/api-error';
import { useToastStore } from '@/store/toast-store';
import { ButtonForm } from '@/components/form-components/button-form/button-form';
import { categoryService } from '@/services/api/category-service';
import { categoryFormSchema } from '@/components/zod-schemas/create-category-form-schema';

type CategoryFormData = {
  name: string;
};

export const CreateCategoryForm = () => {
  const { addToast } = useToastStore();

  const methods = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const categoryResponse = await categoryService.createCategory(data.name);
      addToast({
        title: 'Success',
        message: 'Category created successfully!',
        type: 'success',
        duration: 5000,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        addToast({
          title: 'Error',
          message:
            error.message || 'An error occurred while creating the event',
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
              Create Category
            </ButtonForm>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
