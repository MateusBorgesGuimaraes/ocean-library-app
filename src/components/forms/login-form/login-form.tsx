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

export const LoginForm = () => {
  const { setUser } = useUserStore();
  const methods = useForm<LoginInfos>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInfos) {
    const response = await authService.postUserData(data);

    if (response) {
      setUser(response);
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
