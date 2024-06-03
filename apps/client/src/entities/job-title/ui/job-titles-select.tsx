import { SelectNumeric, SelectNumericProps } from '@shared/ui/select';

import { useGetJobTitles } from '../api';
import {
  filterJobTitlesByDepartment,
  jobTitleToSelectOption,
} from '../helpers';

type JobTitlesSelectProps = Omit<
  SelectNumericProps,
  'options' | 'children' | 'isLoading' | 'isError'
> & {
  departmentId?: number;
};

export const JobTitlesSelect = ({
  departmentId,
  ...props
}: JobTitlesSelectProps) => {
  const { jobTitles, isLoading, isError } = useGetJobTitles();

  const options = filterJobTitlesByDepartment(jobTitles, departmentId).map(
    jobTitleToSelectOption,
  );

  return (
    <SelectNumeric
      placeholder="Выберите должность"
      options={options}
      isLoading={isLoading}
      isError={isError}
      {...props}
    />
  );
};
