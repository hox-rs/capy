import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfDateTimePickerProps } from "./RhfDateTimePicker.types";

const RhfDateTimePicker = <
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
}: RhfDateTimePickerProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref, ...props },
  } = useController({ control, name, defaultValue });
  return (
    <DateTimePicker
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
    ></DateTimePicker>
  );
};

export default RhfDateTimePicker;
