import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";
import { MoneyFieldProps } from "../MoneyField/MoneyField.types";

/**
 * Props for RhfMoneyField component extending MoneyField
 * Provides integration with react-hook-form through standardized base props
 */
export type RhfMoneyFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> &
  Omit<
    MoneyFieldProps,
    | "error"
    | "value"
    | "name"
    | "label"
    | "helperText"
    | "disabled"
    | "defaultValue"
  >;
