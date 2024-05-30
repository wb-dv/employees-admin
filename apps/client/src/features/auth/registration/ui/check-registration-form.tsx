import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useHasAccount } from '@entities/account';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@shared/ui';

import {
  CheckRegistrationSchema,
  checkRegistrationSchema,
  getDefaultCheckRegistrationValues,
} from '../model';

export const CheckRegistrationForm = () => {
  const form = useForm({
    resolver: zodResolver(checkRegistrationSchema),
    defaultValues: getDefaultCheckRegistrationValues(),
  });

  const { checkHasAccount, isPending } = useHasAccount();

  const onSubmit = (data: CheckRegistrationSchema) => {
    checkHasAccount({ data });
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

        <Button disabled={isPending} type="submit">
          Продолжить
        </Button>
      </form>
    </Form>
  );
};
