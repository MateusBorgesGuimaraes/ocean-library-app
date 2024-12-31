'use client';

import React from 'react';
import styles from './create-book-form.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/form-components/input/input';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { ApiError } from '@/services/api/utils/api-error';
import { useToastStore } from '@/store/toast-store';
import { ImageInput } from '@/components/form-components/image-input/image-input';
import { ButtonForm } from '@/components/form-components/button-form/button-form';
import { booksService } from '@/services/api/books-service';
import { bookFormSchema } from '@/components/zod-schemas/create-book-form-schema';

type BookFormData = {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  year: number;
  categoryId: number;
  quantity: number;
  synopsis: string;
  cover: FileList;
};

export const CreateBookForm = () => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const { addToast } = useToastStore();

  const methods = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
  });

  const onSubmit = async (data: BookFormData) => {
    try {
      const bookResponse = await booksService.createBook({
        title: data.title,
        author: data.author,
        publisher: data.publisher,
        isbn: data.isbn,
        year: +data.year,
        categoryId: +data.categoryId,
        quantity: +data.quantity,
        synopsis: data.synopsis,
        availability: true,
      });

      if (data.cover && data.cover[0]) {
        const formData = new FormData();
        formData.append('file', data.cover[0]);
        await booksService.uploadCover(bookResponse.id, formData);
      }

      addToast({
        title: 'Success',
        message: 'Book created successfully!',
        type: 'success',
        duration: 5000,
      });

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      methods.reset();
      setPreviewUrl(null);
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

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formInputs}>
          <div className={styles.inputTextsContainer}>
            <div>
              <Input label="Title" type="text" name="title" />
              {methods.formState.errors.title && (
                <ErrorComponent
                  message={methods.formState.errors.title.message}
                />
              )}
            </div>

            <div>
              <Input label="Author" type="text" name="author" />
              {methods.formState.errors.author && (
                <ErrorComponent
                  message={methods.formState.errors.author.message}
                />
              )}
            </div>

            <div>
              <Input label="isbn" type="text" name="isbn" />
              {methods.formState.errors.isbn && (
                <ErrorComponent
                  message={methods.formState.errors.isbn.message}
                />
              )}
            </div>

            <div className={styles.twoInputsContainer}>
              <div>
                <Input label="publisher" type="text" name="publisher" />
                {methods.formState.errors.publisher && (
                  <ErrorComponent
                    message={methods.formState.errors.publisher.message}
                  />
                )}
              </div>
              <div>
                <Input label="year" type="number" name="year" />
                {methods.formState.errors.year && (
                  <ErrorComponent
                    message={methods.formState.errors.year.message}
                  />
                )}
              </div>
            </div>

            <div className={styles.twoInputsContainer}>
              <div>
                <Input label="Category Id" type="number" name="categoryId" />
                {methods.formState.errors.categoryId && (
                  <ErrorComponent
                    message={methods.formState.errors.categoryId.message}
                  />
                )}
              </div>
              <div>
                <Input label="quantity" type="number" name="quantity" />
                {methods.formState.errors.quantity && (
                  <ErrorComponent
                    message={methods.formState.errors.quantity.message}
                  />
                )}
              </div>
            </div>

            <div>
              <Input label="synopsis" type="textarea" name="synopsis" />
              {methods.formState.errors.synopsis && (
                <ErrorComponent
                  message={methods.formState.errors.synopsis.message}
                />
              )}
            </div>
          </div>

          <div className={styles.inputImageContainer}>
            <div className={styles.fileInputContainer}>
              <ImageInput
                label="Cover"
                name="cover"
                required
                accept="image/jpeg,image/png,image/webp"
                error={methods.formState.errors.cover?.message}
                width="240px"
                height="324px"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <ButtonForm>Create Book</ButtonForm>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
