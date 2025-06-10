import React, { memo } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfDateTimePickerProps } from "./RhfDateTimePicker.types";
import { getErrorText, hasError } from "../../types/base";

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

  const displayText = getErrorText(error, helperText);
  const isError = hasError(error);

  return (
    <DateTimePicker
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
    ></DateTimePicker>
  );
};

RhfDateTimePicker.displayName = "RhfDateTimePicker";

export default memo(RhfDateTimePicker);
