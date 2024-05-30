import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { cn } from '@shared/utils';

import { Input, InputProps } from './input';

interface PasswordInputProps extends Omit<InputProps, 'type'> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword((show) => !show);

    const SwitchIcon = showPassword ? EyeOff : Eye;
    const inputType = showPassword ? 'text' : 'password';

    return (
      <div className="relative">
        <Input
          className={cn('pr-8', className)}
          type={inputType}
          ref={ref}
          {...props}
        />

        <div className="absolute h-full right-0 top-0 flex flex-col justify-center pr-2">
          <SwitchIcon
            onClick={toggleShowPassword}
            className="size-5 cursor-pointer hover:text-teal-500 transition-colors"
          />
        </div>
      </div>
    );
  },
);
