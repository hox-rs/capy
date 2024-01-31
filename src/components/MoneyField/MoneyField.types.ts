import { TextFieldProps } from "@mui/material";

export type MoneyFieldProps = Omit<TextFieldProps, "onChange"> & {
  currencySymbol?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  value: number;
  onChange?: (value: number) => void;
};
