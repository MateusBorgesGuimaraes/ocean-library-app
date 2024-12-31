'use client';

import React from 'react';
import styles from './create-event-form.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventsService } from '@/services/api/events-service';
import { Input } from '@/components/form-components/input/input';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { ApiError } from '@/services/api/utils/api-error';
import { useToastStore } from '@/store/toast-store';
import { eventFormSchema } from '@/components/zod-schemas/create-event-schema';
import { ImageInput } from '@/components/form-components/image-input/image-input';
import { ButtonForm } from '@/components/form-components/button-form/button-form';

type EventFormData = {
  title: string;
  description: string;
  date: string;
  location: string;
  seats: number;
  banner: FileList;
};

export const CreateEventForm = () => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const { addToast } = useToastStore();

  const methods = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
  });

  const onSubmit = async (data: EventFormData) => {
    try {
      const eventResponse = await eventsService.createEvent({
        title: data.title,
        description: data.description,
        date: data.date,
        location: data.location,
        seats: +data.seats,
      });

      if (data.banner && data.banner[0]) {
        const formData = new FormData();
        formData.append('file', data.banner[0]);

        await eventsService.uploadEventBanner(eventResponse.id, formData);
      }

      addToast({
        title: 'Success',
        message: 'Event created successfully!',
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
              <Input label="Date" type="datetime-local" name="date" />
              {methods.formState.errors.date && (
                <ErrorComponent
                  message={methods.formState.errors.date.message}
                />
              )}
            </div>

            <div>
              <Input label="Location" type="text" name="location" />
              {methods.formState.errors.location && (
                <ErrorComponent
                  message={methods.formState.errors.location.message}
                />
              )}
            </div>

            <div>
              <Input label="Seats" type="number" name="seats" />
              {methods.formState.errors.seats && (
                <ErrorComponent
                  message={methods.formState.errors.seats.message}
                />
              )}
            </div>

            <div>
              <Input label="Description" type="textarea" name="description" />
              {methods.formState.errors.description && (
                <ErrorComponent
                  message={methods.formState.errors.description.message}
                />
              )}
            </div>
          </div>

          <div className={styles.inputImageContainer}>
            <div className={styles.fileInputContainer}>
              <ImageInput
                label="Event Banner"
                name="banner"
                required
                accept="image/jpeg,image/png,image/webp"
                error={methods.formState.errors.banner?.message}
                height="200px"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <ButtonForm>Create Event</ButtonForm>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
