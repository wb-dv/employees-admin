import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { RoleGuard } from '@features/auth/permissions';

import { RoleSelect } from '@entities/account';
import { DepartmentsSelect } from '@entities/department';
import { JobTitlesSelect } from '@entities/job-title';

import { WorkerResponseDto } from '@shared/api';
import { Button } from '@shared/ui/button';
import { DatePicker } from '@shared/ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/ui/form';
import { Input, PhoneInput } from '@shared/ui/input';
import { cn } from '@shared/utils';

import { mapWorkerToSchema } from '../mappers/worker-to-schema';
import {
  WorkerFormSchema,
  getWorkerFormInitialValues,
  workerFormSchema,
} from '../model';

type WorkerFormProps = {
  worker?: WorkerResponseDto;
  defaultWorker?: WorkerResponseDto;
  onSubmit: (worker: WorkerFormSchema) => void;
  submitButtonText: string;
  isPending?: boolean;
  className?: string;
};

export const WorkerForm = ({
  worker,
  defaultWorker,
  onSubmit,
  submitButtonText,
  isPending,
  className,
}: WorkerFormProps) => {
  const form = useForm<WorkerFormSchema>({
    resolver: zodResolver(workerFormSchema),
    defaultValues: getWorkerFormInitialValues(
      defaultWorker && mapWorkerToSchema({ ...defaultWorker }),
    ),
    values:
      worker && getWorkerFormInitialValues(mapWorkerToSchema({ ...worker })),
  });

  const departmentId = form.watch('departamentId');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex w-full flex-col gap-6', className)}
        noValidate
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

        <fieldset className="w-full grid grid-cols-3 gap-2">
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
                  <PhoneInput {...field} hasError={invalid} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'dateOfBirth'}
            render={({ field: { onChange, value } }) => (
              <FormItem className="flex flex-col justify-end gap-2 h-min">
                <FormLabel>День рождения (необязательно)</FormLabel>
                <FormControl>
                  <DatePicker onChange={onChange} value={value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <fieldset className="w-full flex items-start gap-2">
          <FormField
            control={form.control}
            name={'departamentId'}
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => (
              <FormItem className="flex-1">
                <FormLabel>Отдел</FormLabel>
                <FormControl>
                  <DepartmentsSelect
                    value={value}
                    onChange={onChange}
                    hasError={invalid}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'jobTitleId'}
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => (
              <FormItem className="flex-1">
                <FormLabel>Должность</FormLabel>
                <FormControl>
                  <JobTitlesSelect
                    departmentId={departmentId}
                    value={value}
                    onChange={onChange}
                    hasError={invalid}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <RoleGuard
            requiredRole="ADMIN"
            component={
              <FormField
                control={form.control}
                name={'role'}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Роль</FormLabel>
                    <FormControl>
                      <RoleSelect
                        value={value}
                        onChange={onChange}
                        hasError={invalid}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            }
          />
        </fieldset>

        <Button disabled={isPending} type="submit">
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
};
