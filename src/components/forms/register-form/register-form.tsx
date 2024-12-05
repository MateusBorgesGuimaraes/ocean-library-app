import { Input } from '@/components/form-components/input/input';
import styles from './register-form.module.css';
import { ButtonForm } from '@/components/form-components/button-form/button-form';
import { RegisterInfos } from '@/services/api/types/auth-types';
import { registerSchema } from '@/components/zod-schemas/register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { ErrorComponent } from '@/components/form-components/error-component/error-component';
import { authService } from '@/services/api/auth-service';

export const RegisterForm = () => {
  const methods = useForm<RegisterInfos>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInfos) {
    const response = await authService.postRegisterData(data);

    console.log(response);
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
            <Input label="Senha" type="password" name="password" />
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
