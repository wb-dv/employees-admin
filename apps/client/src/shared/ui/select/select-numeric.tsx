import {
  OwnSelectProps,
  Select,
  SelectWithChildrenProps,
  SelectWithOptionsProps,
} from './select';

type SelectNumericValue = number | undefined;

export type SelectNumericProps = Omit<
  OwnSelectProps,
  'value' | 'defaultValue' | 'onChange'
> & {
  value: SelectNumericValue;
  defaultValue?: SelectNumericValue;
  onChange?: (value: SelectNumericValue) => void;
} & (SelectWithChildrenProps | SelectWithOptionsProps);

export const SelectNumeric = ({
  value: valueProp,
  defaultValue: defaultValueProp,
  onChange: onChangeProp,
  ...props
}: SelectNumericProps) => {
  const value = valueProp ? String(valueProp) : undefined;

  const defaultValue = defaultValueProp ? String(defaultValueProp) : undefined;

  const onChange = (value: string | undefined) => {
    if (!value) {
      onChangeProp?.(undefined);
      return;
    }

    const numberValue = Number(value);

    onChangeProp?.(isNaN(numberValue) ? undefined : numberValue);
  };

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      {...props}
    />
  );
};
