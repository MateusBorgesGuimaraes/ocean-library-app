'use client';

import styles from './edit-event-form.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventsService } from '@/services/api/events-service';
import { Input } from '@/components/form-components/input/input';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { ApiError } from '@/services/api/utils/api-error';
import { useToastStore } from '@/store/toast-store';
import { editEventFormSchema } from '@/components/zod-schemas/edit-event-schema';
import React from 'react';
import { ImageInput } from '@/components/form-components/image-input/image-input';
import { ButtonForm } from '@/components/form-components/button-form/button-form';
import { LibraryEvent } from '@/services/api/types/event-types';

type EventFormData = {
  title: string;
  description: string;
  date: string;
  location: string;
  seats: number;
  banner?: FileList;
};

type EditEventFormProps = {
  initialData: LibraryEvent;
};

export const EditEventForm = ({ initialData }: EditEventFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentBanner, setCurrentBanner] = React.useState<string | undefined>(
    initialData.banner,
  );
  const { addToast } = useToastStore();

  const methods = useForm<EventFormData>({
    resolver: zodResolver(editEventFormSchema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description,
      date: new Date(initialData.date).toISOString().slice(0, 16),
      location: initialData.location,
      seats: initialData.seats,
    },
  });

  const onSubmit = async (data: EventFormData) => {
    setIsLoading(true);
    try {
      const changedFields: Partial<EventFormData> = {};

      if (data.title !== initialData.title) changedFields.title = data.title;
      if (data.description !== initialData.description)
        changedFields.description = data.description;
      if (data.date !== initialData.date) changedFields.date = data.date;
      if (data.location !== initialData.location)
        changedFields.location = data.location;
      if (data.seats !== initialData.seats) changedFields.seats = data.seats;

      if (Object.keys(changedFields).length > 0) {
        await eventsService.editEvent(initialData.id, changedFields);
      }

      if (data.banner?.[0]) {
        const formData = new FormData();
        formData.append('file', data.banner[0]);
        await eventsService.uploadEventBanner(initialData.id, formData);
      }

      addToast({
        title: 'Success',
        message: 'Event updated successfully!',
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
                initialValue={currentBanner}
                label="Event Banner"
                name="banner"
                accept="image/jpeg,image/png,image/webp"
                error={methods.formState.errors.banner?.message}
                height="200px"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <ButtonForm>
              {isLoading ? 'Updating...' : 'Update Event'}
            </ButtonForm>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
