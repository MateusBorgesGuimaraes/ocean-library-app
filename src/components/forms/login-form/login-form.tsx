import styles from './login-form.module.css';
import { ButtonForm } from '@/components/form-components/button-form/button-form';
import { Input } from '@/components/form-components/input/input';
import { LoginInfos } from '@/services/api/types/auth-types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/components/zod-schemas/login-schema';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { authService } from '@/services/api/auth-service';
import { useUserStore } from '@/store/user-store';
import { useUserLoansStore } from '@/store/user-loans-store';
import { loanService } from '@/services/api/loans-service';
import { useToastStore } from '@/store/toast-store';
import { ApiError } from '@/services/api/utils/api-error';
import { eventsService } from '@/services/api/events-service';
import { useUserEventStore } from '@/store/user-event-store';

type LoginProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginForm = ({ closeModal }: LoginProps) => {
  const { setUser } = useUserStore();
  const { setUserLoans } = useUserLoansStore();
  const { setUserEvents } = useUserEventStore();
  const addToast = useToastStore((state) => state.addToast);

  const methods = useForm<LoginInfos>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInfos) {
    try {
      const response = await authService.postUserData(data);

      if (response) {
        setUser(response);
        closeModal(false);
        addToast({
          title: 'Login successful!',
          message: 'You are now logged in.',
          type: 'success',
          duration: 5000,
        });

        const loans = await loanService.getUserLoans(String(response.id));

        if (loans.status === 404) {
          return;
        }

        if (loans) {
          setUserLoans(loans);
        }

        const events = await eventsService.getAllUserEventsRegistrations(
          String(response.id),
        );

        if (events.status === 404) {
          return;
        }

        if(events) {
          setUserEvents(events);
        }

      }
    } catch (error) {
      if (error instanceof ApiError) {
        addToast({
          title: 'Erro!',
          message: error.message,
          type: 'error',
          duration: 5000,
        });
      } 
      // else {
      //   console.log('error', error)
      //   addToast({
      //     title: 'Erro!',
      //     message: 'An unexpected error occurred',
      //     type: 'error',
      //     duration: 5000,
      //   });
      // }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.loginFormInputs}>
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

        <ButtonForm>sign in</ButtonForm>
      </form>
    </FormProvider>
  );
};
