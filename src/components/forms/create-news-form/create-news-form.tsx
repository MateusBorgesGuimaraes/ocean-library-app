'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './create-news-form.module.css';
import { Input } from '@/components/form-components/input/input';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { ApiError } from '@/services/api/utils/api-error';
import { useToastStore } from '@/store/toast-store';
import React from 'react';
import { ImageInput } from '@/components/form-components/image-input/image-input';
import { ButtonForm } from '@/components/form-components/button-form/button-form';

import { newsService } from '@/services/api/news-service';
import { TagsInput } from '@/components/form-components/tags-input/tags-input';
import { NewsFormData } from '@/services/api/types/news-types';
import { newsFormSchema } from '@/components/zod-schemas/create-news-schema';

export const CreateNewsForm = () => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const { addToast } = useToastStore();

  const methods = useForm<NewsFormData>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
      coverImage: undefined,
    },
  });

  const onSubmit = async (data: NewsFormData) => {
    try {
      const newsResponse = await newsService.createNews({
        title: data.title,
        content: data.content,
        tags: data.tags,
      });

      if (data.coverImage?.[0]) {
        const formData = new FormData();
        formData.append('file', data.coverImage[0]);
        await newsService.uploadNewsCover(newsResponse.id, formData);
      }

      addToast({
        title: 'Success',
        message: 'News created successfully!',
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
          message: error.message || 'An error occurred while creating the news',
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
              <Input label="title" type="text" name="title" />
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
                label="cover image"
                name="coverImage"
                required
                accept="image/jpeg,image/png,image/webp"
                error={methods.formState.errors.coverImage?.message}
                height="300px"
                width="300px"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <ButtonForm>Create News</ButtonForm>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
