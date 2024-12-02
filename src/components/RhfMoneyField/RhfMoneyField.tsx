import React, { useMemo } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfMoneyFieldProps } from "./RhfMoneyField.types";
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
  variant = "outlined",
  rows,
  type,
  fullWidth = true,
  ...rest
}: RhfMoneyFieldProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref, ...fieldProps },
  } = useController({
    control,
    name,
    defaultValue,
  });

  const helperText = useMemo(
    () => (error ? error.message : undefined),
    [error]
  );

  return (
    <MoneyField
      label={label}
      error={Boolean(error)}
      fullWidth={fullWidth}
      helperText={helperText}
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

export default RhfMoneyField;
