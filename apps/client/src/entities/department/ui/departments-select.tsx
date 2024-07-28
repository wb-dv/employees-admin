import { SelectNumeric, SelectNumericProps } from '@shared/ui/select';

import { useGetDepartments } from '../api';
import { departmentToSelectOption } from '../helpers';

type DepartmentsSelectProps = Omit<
  SelectNumericProps,
  'options' | 'children' | 'isLoading' | 'isError' | 'placeholder'
>;

export const DepartmentsSelect = (props: DepartmentsSelectProps) => {
  const { data: departments, isLoading, isError } = useGetDepartments();

  const options = departments?.map(departmentToSelectOption) || [];

  return (
    <SelectNumeric
      placeholder="Выберите отдел"
      options={options}
      isLoading={isLoading}
      isError={isError}
      {...props}
    />
  );
};
