import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/ui/form';
import { Input, PhoneInput } from '@shared/ui/input';
import { cn } from '@shared/utils';

import { SearchSubFormFormProps } from './types';

type ShortSearchWorkersFormProps = Omit<SearchSubFormFormProps, 'onReset'>;

export const ShortSearch = ({
  searchForm,
  onSubmit,
  className,
}: ShortSearchWorkersFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn('flex w-full flex-col gap-3', className)}
    >
      <fieldset className="w-full grid grid-cols-5 gap-2">
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
      </fieldset>
    </form>
  );
};
