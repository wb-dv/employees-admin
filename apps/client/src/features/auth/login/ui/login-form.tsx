import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@shared/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/ui/form';
import { Input, PasswordInput } from '@shared/ui/input';

import { useLogin } from '../api';
import { LoginSchema, defaultLoginValues, loginSchema } from '../model';

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues,
  });

  const { login } = useLogin();

  const onSubmit = (data: LoginSchema) => {
    console.log('login values: ', data);
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
                  placeholder="Enter email"
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};
