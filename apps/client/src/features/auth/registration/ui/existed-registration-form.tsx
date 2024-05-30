import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PasswordInput,
} from '@shared/ui';

import {
  ExistedRegisterSchema,
  RegistrationFormParams,
  existedRegisterSchema,
  getDefaultExistedRegisterValues,
  useExistedRegistration,
} from '../model';

type ExistedRegistrationFormProps =
  RegistrationFormParams<ExistedRegisterSchema> & {
    existedEmail?: string;
  };

export const ExistedRegistrationForm = ({
  existedEmail,
  onSubmit: onSubmitProp,
  onSuccess,
  onError,
}: ExistedRegistrationFormProps) => {
  const form = useForm({
    resolver: zodResolver(existedRegisterSchema),
    defaultValues: getDefaultExistedRegisterValues(
      existedEmail ? { email: existedEmail } : undefined,
    ),
  });

  const { register, isPending } = useExistedRegistration({
    onSuccess,
    onError,
  });

  const onSubmit = (data: ExistedRegisterSchema) => {
    onSubmitProp?.(data);
    register({ data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={'email'}
          render={({ field, fieldState: { invalid } }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  hasError={invalid}
                  placeholder="Введите email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'password'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Введите пароль" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
};
