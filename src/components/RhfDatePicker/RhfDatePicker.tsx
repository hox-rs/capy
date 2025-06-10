import React, { memo } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfDatePickerProps } from "./RhfDatePicker.types";
import { getErrorText, hasError } from "../../types/base";

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

  const displayText = getErrorText(error, helperText);
  const isError = hasError(error);

  return (
    <DatePicker
      label={label}
      value={value}
      slotProps={{
        textField: {
          helperText: displayText,
          error: isError,
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

RhfDatePicker.displayName = "RhfDatePicker";

export default memo(RhfDatePicker);
