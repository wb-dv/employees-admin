import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/ui/form';
import { Input } from '@shared/ui/input';

import {
  CheckRegistrationSchema,
  RegistrationFormParams,
  checkRegistrationSchema,
  getDefaultCheckRegistrationValues,
} from '../model';

type CheckRegistrationFormProps = Required<
  Pick<RegistrationFormParams<CheckRegistrationSchema>, 'onSubmit'>
> & {
  isPending?: boolean;
};

export const CheckRegistrationForm = ({
  onSubmit,
  isPending,
}: CheckRegistrationFormProps) => {
  const form = useForm({
    resolver: zodResolver(checkRegistrationSchema),
    defaultValues: getDefaultCheckRegistrationValues(),
  });

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
