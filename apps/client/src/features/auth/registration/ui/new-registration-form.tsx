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
  NewRegisterSchema,
  RegistrationFormParams,
  getDefaultNewRegisterValues,
  newRegisterSchema,
  useNewRegistration,
} from '../model';

type NewRegistrationFormProps = RegistrationFormParams<NewRegisterSchema> & {
  defaultEmail?: string;
};

export const NewRegistrationForm = ({
  defaultEmail,
}: NewRegistrationFormProps) => {
  const form = useForm({
    resolver: zodResolver(newRegisterSchema),
    defaultValues: getDefaultNewRegisterValues(
      defaultEmail ? { email: defaultEmail } : {},
    ),
  });

  const { register, isPending } = useNewRegistration();

  const onSubmit = (data: NewRegisterSchema) => {
    register({ data });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6"
      >
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
          render={({ field, fieldState: { invalid } }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PasswordInput
                  hasError={invalid}
                  placeholder="Введите пароль"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'firstname'}
          render={({ field, fieldState: { invalid } }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input
                  hasError={invalid}
                  placeholder="Введите имя"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'lastname'}
          render={({ field, fieldState: { invalid } }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input
                  hasError={invalid}
                  placeholder="Введите фамилию"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'patronymic'}
          render={({ field, fieldState: { invalid } }) => (
            <FormItem>
              <FormLabel>Отчество</FormLabel>
              <FormControl>
                <Input
                  hasError={invalid}
                  placeholder="Введите отчество"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'phone'}
          render={({ field, fieldState: { invalid } }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input
                  hasError={invalid}
                  placeholder="Введите телефон"
                  {...field}
                />
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
