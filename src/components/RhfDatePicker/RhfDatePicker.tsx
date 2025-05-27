import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfDatePickerProps } from "./RhfDatePicker.types";

const RhfDatePicker = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  defaultValue,
  error,
  fullWidth = true,
  helperText,
  ...rest
}: RhfDatePickerProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref, ...props },
  } = useController({ control, name, defaultValue });
  return (
    <DatePicker
      label={label}
      value={value}
      slotProps={{
        textField: {
          helperText: error?.message || helperText,
          error: !!error,
          fullWidth,
          ...rest?.slotProps?.textField,
        },
        ...rest?.slotProps,
      }}
      onChange={onChange}
      inputRef={ref}
      {...props}
      {...rest}
    ></DatePicker>
  );
};

export default RhfDatePicker;
