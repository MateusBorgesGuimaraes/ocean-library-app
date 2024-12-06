import styles from './request-form.module.css';
import { ButtonForm } from '@/components/form-components/button-form/button-form';
import { Input } from '@/components/form-components/input/input';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { CreatedRequest } from '@/services/api/types/request-types';
import { requestSchema } from '@/components/zod-schemas/request-schema';

export const RequestForm = () => {
  const methods = useForm<CreatedRequest>({
    resolver: zodResolver(requestSchema),
  });

  async function onSubmit(data: CreatedRequest) {
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.requestFormInputs}>
          <div>
            <Input label="Title" type="text" name="title" />
            {methods.formState.errors.title && (
              <ErrorComponent
                message={methods.formState.errors.title.message}
              />
            )}
          </div>
          <div>
            <Input label="author" type="author" name="author" />
            {methods.formState.errors.author && (
              <ErrorComponent
                message={methods.formState.errors.author.message}
              />
            )}
          </div>

          <div>
            <Input label="publisher" type="publisher" name="publisher" />
            {methods.formState.errors.publisher && (
              <ErrorComponent
                message={methods.formState.errors.publisher.message}
              />
            )}
          </div>

          <div>
            <Input label="year" type="year" name="year" />
            {methods.formState.errors.year && (
              <ErrorComponent message={methods.formState.errors.year.message} />
            )}
          </div>

          <div>
            <Input label="genre" type="genre" name="genre" />
            {methods.formState.errors.genre && (
              <ErrorComponent
                message={methods.formState.errors.genre.message}
              />
            )}
          </div>
        </div>

        <ButtonForm>request</ButtonForm>
      </form>
    </FormProvider>
  );
};
