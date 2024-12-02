import React from "react";
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
    field: { onChange, value, ref, ...props },
  } = useController({ control, name, defaultValue });

  return (
    <MoneyField
      label={label}
      error={Boolean(error)}
      fullWidth={fullWidth}
      multiline={!!rows}
      rows={rows}
      helperText={error && <>{error.message}</>}
      onChange={onChange}
      inputRef={ref}
      variant={variant}
      {...props}
      {...rest}
      value={value}
    />
  );
};

export default RhfMoneyField;
