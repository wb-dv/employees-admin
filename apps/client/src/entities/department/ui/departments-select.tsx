import { useState } from 'react';

import { Loader } from '@shared/ui/loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/ui/select';
import { cn } from '@shared/utils';

import { useGetDepartments } from '../api';

type DepartmentValue = number | null;

type DepartmentsSelectProps = {
  className?: string;
  onChange?: (value: DepartmentValue) => void;
  defaultValue?: DepartmentValue;
  value?: DepartmentValue;
};

export const DepartmentsSelect = ({
  className,
  onChange: onChangeProp,
  value: valueProp,
  defaultValue: defaultValueProp,
}: DepartmentsSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { departments, isLoading, isError } = useGetDepartments();

  const value = valueProp ? String(valueProp) : '';

  const defaultValue = defaultValueProp ? String(defaultValueProp) : '';

  const onChange = (value: string) => {
    const numberValue = Number(value);

    onChangeProp?.(isNaN(numberValue) ? null : numberValue);
  };

  return (
    <Select
      open={isOpen}
      onOpenChange={setIsOpen}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
    >
      <SelectTrigger isOpen={isOpen} className={cn('w-full', className)}>
        <SelectValue placeholder="Выберите отдел" />
      </SelectTrigger>

      <SelectContent>
        {isLoading && (
          <div className="w-full py-4 flex items-center justify-center">
            <Loader size={'sm'} />
          </div>
        )}

        {!isLoading &&
          !isError &&
          departments?.map((department) => (
            <SelectItem key={department.id} value={String(department.id)}>
              {department.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
