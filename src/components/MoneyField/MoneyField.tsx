"use client";

import React from "react";
import { TextField } from "@mui/material";
import { MoneyFieldProps } from "./MoneyField.types";

const MoneyField = ({
  currencySymbol = "R$",
  decimalSeparator = ",",
  thousandSeparator = ".",
  value,
  onChange,
  ...props
}: MoneyFieldProps) => {
  const formatValue = (value: string) => {
    // only numbers and remove left zeros that are not needed
    const onlyNumbers = Number(value)
      .toFixed(2)
      .replace(/\D/g, "")
      .replace(/^0+/, "");
    // left pad only if there is less than 3 digits
    const leftZeros = onlyNumbers.padStart(3, "0");
    const cents = leftZeros.slice(-2);
    const integer = leftZeros.slice(0, -2);
    const integerWithThousandSeparator = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSeparator
    );

    return `${integerWithThousandSeparator}${decimalSeparator}${cents}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const onlyNumbers = value.replace(/\D/g, "").replace(/^0+/, "");

    console.log();

    onChange?.(Number(onlyNumbers) / 100);
  };

  return (
    <TextField
      {...props}
      InputProps={{
        startAdornment: currencySymbol,
      }}
      sx={{
        "& input": {
          textAlign: "right",
        },
      }}
      value={formatValue(String(value))}
      onChange={handleChange}
    />
  );
};

export default MoneyField;
