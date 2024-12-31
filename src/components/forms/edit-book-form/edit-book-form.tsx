'use client';

import styles from './edit-book-form.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventsService } from '@/services/api/events-service';
import { Input } from '@/components/form-components/input/input';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { ApiError } from '@/services/api/utils/api-error';
import { useToastStore } from '@/store/toast-store';
import React from 'react';
import { ImageInput } from '@/components/form-components/image-input/image-input';
import { ButtonForm } from '@/components/form-components/button-form/button-form';
import { Book } from '@/services/api/types/book-types';
import { editBookFormSchema } from '@/components/zod-schemas/edit-book-schema';
import { booksService } from '@/services/api/books-service';

type BookFormData = {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  year: number;
  quantity: number;
  synopsis: string;
  cover?: FileList;
};

type EditBookFormProps = {
  initialData: Book;
};

export const EditBookForm = ({ initialData }: EditBookFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentCover, setCurrentCover] = React.useState<string | undefined>(
    initialData.cover,
  );
  const { addToast } = useToastStore();

  const methods = useForm<BookFormData>({
    resolver: zodResolver(editBookFormSchema),
    defaultValues: {
      title: initialData.title,
      author: initialData.author,
      publisher: initialData.publisher,
      isbn: initialData.isbn,
      year: +initialData.year,
      quantity: +initialData.quantity,
      synopsis: initialData.synopsis,
    },
  });

  const onSubmit = async (data: BookFormData) => {
    console.log('data', data);
    setIsLoading(true);
    try {
      const changedFields: Partial<BookFormData> = {};

      if (data.title !== initialData.title) changedFields.title = data.title;
      if (data.author !== initialData.author)
        changedFields.author = data.author;
      if (data.publisher !== initialData.publisher)
        changedFields.publisher = data.publisher;
      if (data.isbn !== initialData.isbn) changedFields.isbn = data.isbn;
      if (data.year !== initialData.year) changedFields.year = data.year;
      if (data.quantity !== initialData.quantity)
        changedFields.quantity = data.quantity;
      if (data.synopsis !== initialData.synopsis)
        changedFields.synopsis = data.synopsis;

      if (Object.keys(changedFields).length > 0) {
        await booksService.editBook(initialData.id, changedFields);
      }

      if (data.cover?.[0]) {
        const formData = new FormData();
        formData.append('file', data.cover[0]);
        await booksService.uploadCover(initialData.id, formData);
      }

      addToast({
        title: 'Success',
        message: 'Book updated successfully!',
        type: 'success',
        duration: 5000,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        addToast({
          title: 'Error',
          message:
            error.message || 'An error occurred while updating the event',
          type: 'error',
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

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
                <Input label="isbn" type="text" name="isbn" />
                {methods.formState.errors.isbn && (
                  <ErrorComponent
                    message={methods.formState.errors.isbn.message}
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
                initialValue={currentCover}
                label="Book cover"
                name="cover"
                accept="image/jpeg,image/png,image/webp"
                error={methods.formState.errors.cover?.message}
                width="240px"
                height="324px"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <ButtonForm>{isLoading ? 'Updating...' : 'Update Book'}</ButtonForm>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
