import { Select, SelectOption, SelectProps } from '@shared/ui/select';

import { RoleEnum } from '../model';

type RoleSelectProps = Omit<
  SelectProps,
  'options' | 'children' | 'isLoading' | 'isError' | 'placeholder'
>;

const roleOptions: SelectOption[] = [
  {
    value: RoleEnum.ADMIN,
    name: 'Администратор',
  },
  {
    value: RoleEnum.USER,
    name: 'Пользователь',
  },
];

export const RoleSelect = (props: RoleSelectProps) => {
  return (
    <Select options={roleOptions} placeholder="Выберите роль" {...props} />
  );
};
