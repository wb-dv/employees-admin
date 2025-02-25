import { forwardRef } from 'react';
import ReactPhoneInput from 'react-phone-number-input/input';

import { Input, InputProps } from './input';

interface PhoneInputProps
  extends Omit<InputProps, 'type' | 'onChange' | 'value' | 'placeholder'> {
  onChange: (value: string | undefined) => void;
  value: string | undefined;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (props: PhoneInputProps, ref) => {
    return (
      <div className="flex items-center gap-1">
        <div className="w-12 flex items-center justify-center">+7</div>

        <ReactPhoneInput
          {...props}
          placeholder="800 555 35 35"
          country="RU"
          international
          ref={ref}
          inputComponent={Input}
        />
      </div>
    );
  },
);
