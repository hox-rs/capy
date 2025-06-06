import React, { memo } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfMoneyFieldProps } from "./RhfMoneyField.types";
import { getErrorText, hasError } from "../../types/base";
import MoneyField from "../MoneyField";

const RhfMoneyField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  defaultValue,
  error,
  helperText,
  variant = "outlined",
  rows,
  type,
  fullWidth = true,
  ...rest
}: RhfMoneyFieldProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref, ...fieldProps },
    fieldState: { error: fieldError },
  } = useController({ control, name, defaultValue });

  const displayText = getErrorText(fieldError, helperText);
  const isError = hasError(fieldError);

  return (
    <MoneyField
      label={label}
      error={isError}
      fullWidth={fullWidth}
      helperText={displayText}
      onChange={onChange}
      inputRef={ref}
      variant={variant}
      {...(rows ? { multiline: true, rows } : {})}
      {...fieldProps}
      {...rest}
      value={value}
    />
  );
};

RhfMoneyField.displayName = "RhfMoneyField";

export default memo(RhfMoneyField);
