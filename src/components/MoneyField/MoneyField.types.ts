import { TextFieldProps } from "@mui/material";

export type MoneyFieldProps = TextFieldProps & {
  currencySymbol?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  value: number;
  onChange?: (value: number) => void;
};
