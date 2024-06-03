import { Select, SelectProps } from './select';

type SelectNumericValue = number | undefined;

export type SelectNumericProps = SelectProps & {
  value?: SelectNumericValue;
  defaultValue?: SelectNumericValue;
  onChange?: (value: SelectNumericValue) => void;
};

export const SelectNumeric = ({
  value: valueProp,
  defaultValue: defaultValueProp,
  onChange: onChangeProp,
  ...props
}: SelectNumericProps) => {
  const value = valueProp ? String(valueProp) : '';

  const defaultValue = defaultValueProp ? String(defaultValueProp) : '';

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
