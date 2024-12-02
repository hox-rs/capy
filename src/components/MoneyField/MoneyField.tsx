import React, { memo, useMemo } from "react";
import { TextField } from "@mui/material";
import { MoneyFieldProps } from "./MoneyField.types";

const formatValue = (
  value: number | undefined,
  decimalSeparator: string,
  thousandSeparator: string
) => {
  if (!value) {
    return "";
  }

  const fixedValue = (Math.round(value * 100) / 100).toFixed(2);

  // Divide a parte inteira e decimal
  const [integerPart, decimalPart] = fixedValue.split(".");

  // Adiciona o separador de milhar à parte inteira
  const integerWithThousandSeparator = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator
  );

  // Junta todas as partes
  return `${integerWithThousandSeparator}${decimalSeparator}${decimalPart}`;
};

const MoneyField = memo(
  ({
    currencySymbol = "R$",
    decimalSeparator = ",",
    thousandSeparator = ".",
    value,
    onChange,
    ...props
  }: MoneyFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const onlyNumbers = value.replace(/^0+|[^0-9]+/g, "");
      onChange?.(onlyNumbers ? Number(onlyNumbers) / 100 : 0);
    };

    const transformedValue = useMemo(
      () => formatValue(value, decimalSeparator, thousandSeparator),
      [value, decimalSeparator, thousandSeparator]
    );

    return (
      <TextField
        {...props}
        slotProps={{
          input: {
            startAdornment: currencySymbol,
          },
        }}
        sx={{
          "& input": {
            textAlign: "right",
          },
        }}
        value={transformedValue}
        onChange={handleChange}
      />
    );
  }
);

MoneyField.displayName = "MoneyField";

export default MoneyField;
