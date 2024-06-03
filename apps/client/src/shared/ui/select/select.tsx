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
import { SelectOption } from './types';

type SelectValueUnion = string | undefined;

export type OwnSelectProps = {
  className?: string;
  onChange?: (value: SelectValueUnion) => void;
  value?: SelectValueUnion;
  defaultValue?: SelectValueUnion;
  hasError?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  placeholder?: string;
  name?: string;
};

export type SelectWithOptionsProps = {
  options?: SelectOption[];
  children?: never;
};

export type SelectWithChildrenProps = {
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
  name,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasContent = !isLoading && !isError;

  return (
    <SelectRoot
      open={isOpen}
      onOpenChange={setIsOpen}
      value={value || ''}
      defaultValue={defaultValue}
      onValueChange={onChange}
      name={name}
    >
      <div className="relative">
        <SelectTrigger
          isOpen={isOpen}
          hasError={hasError}
          hasValue={!!value}
          className={cn('w-full relative', className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        {!!value && (
          <ClearButton
            className="absolute right-0 top-0 m-1 h-[calc(100%-8px)]"
            onClear={() => onChange?.(undefined)}
          />
        )}
      </div>

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
