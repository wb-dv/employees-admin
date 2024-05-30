import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { routes } from '@shared/config/router';
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

import { useLogin } from '../api';
import { LoginSchema, defaultLoginValues, loginSchema } from '../model';

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues,
  });

  const navigate = useNavigate();

  const { login } = useLogin({
    onSuccess: () => {
      navigate(routes.index);
    },
  });

  const onSubmit = (data: LoginSchema) => {
    login({ data });
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

        <Button type="submit">Войти</Button>
      </form>
    </Form>
  );
};
