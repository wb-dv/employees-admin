import { RoleSelect } from '@entities/account';
import { DepartmentsSelect } from '@entities/department';
import { JobTitlesSelect } from '@entities/job-title';

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

import { UseSearchWorkersParams, useSearchWorkers } from '../model';

type SearchWorkersFormProps = UseSearchWorkersParams & {
  className?: string;
};

export const SearchWorkersForm = ({
  className,
  onSearch,
}: SearchWorkersFormProps) => {
  const { searchForm, reset } = useSearchWorkers({ onSearch });

  const departmentId = searchForm.watch('departamentId');

  return (
    <Form {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit(() => {})}
        className={cn('flex w-full flex-col gap-3', className)}
      >
        <fieldset className="w-full grid grid-cols-3 gap-2">
          <FormField
            control={searchForm.control}
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
            control={searchForm.control}
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
            control={searchForm.control}
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
        </fieldset>

        <fieldset className="w-full grid grid-cols-4 gap-2">
          <FormField
            control={searchForm.control}
            name={'account.email'}
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
            control={searchForm.control}
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
            control={searchForm.control}
            name={'dateOfBirth'}
            render={({ field: { onChange, value } }) => (
              <FormItem className="flex flex-col justify-end gap-2 h-min">
                <FormLabel>День рождения</FormLabel>
                <FormControl>
                  <DatePicker onChange={onChange} value={value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={searchForm.control}
            name={'dateOfEmployed'}
            render={({ field: { onChange, value } }) => (
              <FormItem className="flex flex-col justify-end gap-2 h-min">
                <FormLabel>Дата приема</FormLabel>
                <FormControl>
                  <DatePicker onChange={onChange} value={value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <fieldset className="w-full grid grid-cols-3 gap-2">
          <FormField
            control={searchForm.control}
            name={'departamentId'}
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => (
              <FormItem>
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
            control={searchForm.control}
            name={'jobTitleId'}
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => (
              <FormItem>
                <FormLabel>Должность</FormLabel>
                <FormControl>
                  <JobTitlesSelect
                    departmentId={departmentId}
                    value={value}
                    onChange={(value) => {
                      onChange(value);
                      console.log('value: ', value);
                    }}
                    hasError={invalid}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={searchForm.control}
            name={'account.role'}
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => (
              <FormItem>
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
        </fieldset>

        <div className="w-full flex items-center justify-end">
          <Button type="button" onClick={reset}>
            Сброс
          </Button>
        </div>
      </form>
    </Form>
  );
};
