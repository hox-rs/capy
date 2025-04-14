import React, { memo, useCallback, useMemo } from "react";
import { TextField } from "@mui/material";
import { MoneyFieldProps } from "./MoneyField.types";

const formatValue = (
  value: number | undefined,
  decimalSeparator: string,
  thousandSeparator: string
) => {
  if (value === undefined) {
    return "";
  }
  const fixedValue = value.toFixed(2);
  return fixedValue
    .replace(".", decimalSeparator)
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
};

const MoneyField = ({
  currencySymbol = "R$",
  decimalSeparator = ",",
  thousandSeparator = ".",
  value,
  onChange,
  ...props
}: MoneyFieldProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const onlyNumbers = value.replace(/^0+|[^0-9]+/g, "");
      onChange?.(onlyNumbers ? Number(onlyNumbers) / 100 : 0);
    },
    [onChange]
  );

  const transformedValue = useMemo(
    () => formatValue(value, decimalSeparator, thousandSeparator),
    [value, decimalSeparator, thousandSeparator]
  );

  const inputStyles = useMemo(
    () => ({
      "& input": {
        textAlign: "right",
      },
    }),
    []
  );

  const slotProps = useMemo(
    () => ({
      ...props.slotProps,
      input: {
        ...props.slotProps?.input,
        startAdornment: currencySymbol,
      },
    }),
    [currencySymbol, props.slotProps]
  );

  return (
    <TextField
      {...props}
      slotProps={slotProps}
      sx={inputStyles}
      value={transformedValue}
      onChange={handleChange}
    />
  );
};

export default memo(MoneyField);
