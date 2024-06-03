import { useState } from 'react';

import { Loader } from '@shared/ui/loader';
import { cn } from '@shared/utils';

import { ClearButton } from '../input';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from './select-primitives';

type SelectValueUnion = string | undefined;

export type SelectOption = {
  value: string;
  name: string;
};

type OwnSelectProps = {
  className?: string;
  onChange?: (value: SelectValueUnion) => void;
  value?: SelectValueUnion;
  defaultValue?: SelectValueUnion;
  hasError?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  placeholder?: string;
};

type SelectWithOptionsProps = {
  options?: SelectOption[];
  children?: never;
};

type SelectWithChildrenProps = {
  options?: never;
  children: React.ReactNode;
};

export type SelectProps = OwnSelectProps &
  (SelectWithOptionsProps | SelectWithChildrenProps);

export const Select = ({
  className,
  onChange,
  value,
  defaultValue,
  hasError,
  isLoading,
  isError,
  options,
  children,
  placeholder,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasContent = !isLoading && !isError;

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
        className={cn('w-full relative', className)}
      >
        <SelectValue placeholder={placeholder} />

        {value && (
          <ClearButton
            className="absolute right-0"
            onClear={() => onChange?.(undefined)}
          />
        )}
      </SelectTrigger>

      <SelectContent>
        {isLoading && (
          <div className="w-full py-4 flex items-center justify-center">
            <Loader size={'sm'} />
          </div>
        )}

        {hasContent &&
          options &&
          options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          ))}

        {hasContent && children && children}
      </SelectContent>
    </SelectRoot>
  );
};
