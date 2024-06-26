import * as React from 'react';

import { cn } from '@shared/utils';

import { ClearButton } from './clear-button';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, type, onClear, value, name, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            'focus:border-teal-600 transition-colors',
            {
              'border-red-400 focus:border-red-400': hasError,
            },
            className,
          )}
          value={value}
          name={name}
          ref={ref}
          {...props}
        />

        {onClear && (
          <ClearButton className="absolute right-0" onClear={onClear} />
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
