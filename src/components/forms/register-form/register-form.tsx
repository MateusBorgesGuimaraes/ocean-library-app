import { Input } from '@/components/form-components/input/input';
import styles from './register-form.module.css';
import { ButtonForm } from '@/components/form-components/button-form/button-form';
import { RegisterInfos } from '@/services/api/types/auth-types';
import { registerSchema } from '@/components/zod-schemas/register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { authService } from '@/services/api/auth-service';
import { useUserStore } from '@/store/user-store';
import { useToastStore } from '@/store/toast-store';
import { ApiError } from '@/services/api/utils/api-error';

type RegisterProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RegisterForm = ({ closeModal }: RegisterProps) => {
  const { setUser } = useUserStore();
  const addToast = useToastStore((state) => state.addToast);
  const methods = useForm<RegisterInfos>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInfos) {
    try {
      const response = await authService.postRegisterData(data);

      if (response) {
        setUser(response);
        closeModal(false);
        addToast({
          title: 'Register successful!',
          message: 'You are now logged in.',
          type: 'success',
          duration: 5000,
        });
      }
    } catch (error) {
      closeModal(false);
      if (error instanceof ApiError) {
        addToast({
          title: 'Registration Error',
          message: error.message || 'An error occurred during registration',
          type: 'error',
          duration: 5000,
        });
      } else {
        addToast({
          title: 'Unexpected Error',
          message: 'An unexpected error occurred',
          type: 'error',
          duration: 5000,
        });
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.registerFormInputs}>
          <div>
            <Input label="Name" type="name" name="name" />
            {methods.formState.errors.name && (
              <ErrorComponent message={methods.formState.errors.name.message} />
            )}
          </div>

          <div>
            <Input label="Email" type="email" name="email" />
            {methods.formState.errors.email && (
              <ErrorComponent
                message={methods.formState.errors.email.message}
              />
            )}
          </div>

          <div>
            <Input label="Password" type="password" name="password" />
            {methods.formState.errors.password && (
              <ErrorComponent
                message={methods.formState.errors.password.message}
              />
            )}
          </div>
        </div>

        <ButtonForm>register</ButtonForm>
      </form>
    </FormProvider>
  );
};
