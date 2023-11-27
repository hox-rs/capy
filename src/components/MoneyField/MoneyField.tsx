import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type MoneyFieldProps = TextFieldProps & {
  currencySymbol?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  value: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => void;
};

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
    console.log(cents);
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
    console.log(onlyNumbers);

    onChange?.(event, Number(onlyNumbers) / 100);
  };

  return (
    <TextField
      {...props}
      InputProps={{
        startAdornment: currencySymbol,
      }}
      // align right
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
