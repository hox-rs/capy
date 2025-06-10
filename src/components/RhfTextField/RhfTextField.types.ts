import { TextFieldProps } from "@mui/material";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";

/**
 * Props for RhfTextField component extending Material-UI TextField
 * Provides integration with react-hook-form through standardized base props
 */
export type RhfTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> &
  Omit<
    TextFieldProps,
    "error" | "name" | "label" | "helperText" | "disabled" | "defaultValue"
  >;
