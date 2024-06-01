import InputMask from 'react-input-mask';

import { Input, InputProps } from './input';

interface PhoneInputProps extends Omit<InputProps, 'type'> {}

export const PhoneInput = (props: PhoneInputProps) => {
  return (
    <InputMask mask={'+7 (999) 999-99-99'} {...props}>
      {/* @ts-expect-error почему-то это не описано в типах, хотя в доке есть.... */}
      {(inputProps) => <Input {...inputProps} type="tel" />}
    </InputMask>
  );
};
