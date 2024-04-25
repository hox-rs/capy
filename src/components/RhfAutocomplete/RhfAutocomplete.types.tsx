import { AutocompleteProps, TextFieldProps } from "@mui/material";
import {
  FieldError,
  FieldPath,
  FieldValues,
  Merge,
  UseControllerProps,
} from "react-hook-form";

export type RhfAutocompleteOption = {
  label: string;
  value: string;
};

export type RhfAutocompleteProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  label: string;
  variant?: "standard" | "outlined" | "filled";
  helperText?: string;
  textFieldProps?: Partial<TextFieldProps>;
  options: RhfAutocompleteOption[];
} & Omit<
    AutocompleteProps<any, boolean, boolean, boolean>,
    "options" | "renderInput" | "onChange" | "value"
  >;
