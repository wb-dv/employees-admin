import { useState } from 'react';

import { Loader } from '@shared/ui/loader';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@shared/ui/select';
import { cn } from '@shared/utils';

import { useGetJobTitles } from '../api';

type JobTitleValue = number | null;

type JobTitlesSelectProps = {
  className?: string;
  onChange?: (value: JobTitleValue) => void;
  defaultValue?: JobTitleValue;
  value?: JobTitleValue;
  departmentId?: number;
  hasError?: boolean;
};

export const JobTitlesSelect = ({
  departmentId,
  value: valueProp,
  onChange: onChangeProp,
  defaultValue: defaultValueProp,
  className,
  hasError,
}: JobTitlesSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { jobTitles, isLoading, isError } = useGetJobTitles();

  const value = valueProp ? String(valueProp) : '';

  const defaultValue = defaultValueProp ? String(defaultValueProp) : '';

  const onChange = (value: string) => {
    const numberValue = Number(value);

    onChangeProp?.(isNaN(numberValue) ? null : numberValue);
  };

  const filteredJobTitles = departmentId
    ? jobTitles?.filter((jobTitle) => jobTitle.departamentId === departmentId)
    : jobTitles;

  return (
    <SelectRoot
      open={isOpen}
      onOpenChange={setIsOpen}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
    >
      <SelectTrigger
        isOpen={isOpen}
        hasError={hasError}
        className={cn('w-full', className)}
      >
        <SelectValue placeholder="Выберите отдел" />
      </SelectTrigger>

      <SelectContent>
        {isLoading && (
          <div className="w-full py-4 flex items-center justify-center">
            <Loader size={'sm'} />
          </div>
        )}

        {!isLoading && !isError && filteredJobTitles?.length ? (
          filteredJobTitles?.map((jobTitle) => (
            <SelectItem key={jobTitle.id} value={String(jobTitle.id)}>
              {jobTitle.name}
            </SelectItem>
          ))
        ) : (
          <div className="w-full py-4 flex items-center justify-center">
            Нет опций
          </div>
        )}
      </SelectContent>
    </SelectRoot>
  );
};
