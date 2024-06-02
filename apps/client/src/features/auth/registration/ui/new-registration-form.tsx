import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DepartmentsSelect } from '@entities/department';
import { JobTitlesSelect } from '@entities/job-title';

import { Button } from '@shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/ui/form';
import { Input, PasswordInput, PhoneInput } from '@shared/ui/input';

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
    mode: 'onSubmit',
  });

  const departmentId = form.watch('departamentId');

  const { register, isPending } = useNewRegistration();

  const onSubmit = (data: NewRegisterSchema) => {
    console.log('register data: ', data);
    // register({ data });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6"
      >
        <fieldset className="w-full grid grid-cols-3 gap-2">
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
            name={'patronymic'}
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel>Отчество (при наличии)</FormLabel>
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
        </fieldset>

        <fieldset className="w-full grid grid-cols-2 gap-2">
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
            name={'phone'}
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <PhoneInput
                    hasError={invalid}
                    placeholder="Введите телефон"
                    {...field}
                    onChange={(value) => (
                      console.log(value), field.onChange(value)
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <fieldset className="w-full grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name={'departamentId'}
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel>Отдел</FormLabel>
                <FormControl>
                  <DepartmentsSelect value={value} onChange={onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'jobTitleId'}
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel>Должность</FormLabel>
                <FormControl>
                  <JobTitlesSelect
                    departmentId={departmentId}
                    value={value}
                    onChange={onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

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

        <Button disabled={isPending} type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
};
