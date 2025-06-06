import { AutocompleteProps, InputBaseProps } from "@mui/material";
import { FieldPath, FieldValues, Merge, FieldError } from "react-hook-form";
import { BaseRhfFieldProps, BaseOption } from "../../types/base";

export type RhfAutocompleteOption = BaseOption;

export type RhfAutocompleteProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> & {
  /** Specific error type for autocomplete that can handle arrays */
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  /** Variant of the TextField input */
  variant?: "standard" | "outlined" | "filled";
  /** Props to pass to the underlying TextField input */
  InputProps?: InputBaseProps;
  /** Array of autocomplete options */
  options: RhfAutocompleteOption[];
} & Omit<
    AutocompleteProps<any, boolean, boolean, boolean>,
    "options" | "renderInput" | "onChange" | "value"
  >;
