'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventsService } from '@/services/api/events-service';
import styles from './edit-news-form.module.css';
import { Input } from '@/components/form-components/input/input';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { ApiError } from '@/services/api/utils/api-error';
import { useToastStore } from '@/store/toast-store';
import { editEventFormSchema } from '@/components/zod-schemas/edit-event-schema';
import React from 'react';
import { ImageInput } from '@/components/form-components/image-input/image-input';
import { ButtonForm } from '@/components/form-components/button-form/button-form';
import { LibraryEvent } from '@/services/api/types/event-types';
import { News } from '@/services/api/types/news-types';
import { editNewsFormSchema } from '@/components/zod-schemas/edit-news-schema';
import { newsService } from '@/services/api/news-service';
import { TagsInput } from '@/components/form-components/tags-input/tags-input';

type NewsFormData = {
  title: string;
  content: string;
  tags: string[];
  coverImage?: FileList;
};

type EditNewsFormProps = {
  initialData: News;
};

export const EditNewsForm = ({ initialData }: EditNewsFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentCover, setCurrentCover] = React.useState<string | undefined>(
    initialData.coverImage,
  );
  const { addToast } = useToastStore();

  const methods = useForm<NewsFormData>({
    resolver: zodResolver(editNewsFormSchema),
    defaultValues: {
      title: initialData.title,
      content: initialData.content,
      tags: initialData.tags,
    },
  });

  const onSubmit = async (data: NewsFormData) => {
    setIsLoading(true);
    try {
      const changedFields: Partial<NewsFormData> = {};

      if (data.title !== initialData.title) changedFields.title = data.title;
      if (data.content !== initialData.content)
        changedFields.content = data.content;
      if (data.tags !== initialData.tags) changedFields.tags = data.tags;

      if (Object.keys(changedFields).length > 0) {
        await newsService.editNews(initialData.id, changedFields);
      }

      if (data.coverImage?.[0]) {
        const formData = new FormData();
        formData.append('file', data.coverImage[0]);
        await newsService.uploadNewsCover(initialData.id, formData);
      }

      addToast({
        title: 'Success',
        message: 'News updated successfully!',
        type: 'success',
        duration: 5000,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        addToast({
          title: 'Error',
          message: error.message || 'An error occurred while updating the News',
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
              <TagsInput label="tags" name="tags" />
              {methods.formState.errors.tags && (
                <ErrorComponent
                  message={methods.formState.errors.tags.message}
                />
              )}
            </div>
            <div>
              <Input label="content" type="textarea" name="content" />
              {methods.formState.errors.content && (
                <ErrorComponent
                  message={methods.formState.errors.content.message}
                />
              )}
            </div>
          </div>

          <div className={styles.inputImageContainer}>
            <div className={styles.fileInputContainer}>
              <ImageInput
                initialValue={currentCover}
                label="cover image"
                name="coverImage"
                accept="image/jpeg,image/png,image/webp"
                error={methods.formState.errors.coverImage?.message}
                height="300px"
                width="300px"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <ButtonForm>{isLoading ? 'Updating...' : 'Update News'}</ButtonForm>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
