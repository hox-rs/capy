import { FieldError, FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import { MoneyFieldProps } from "../MoneyField/MoneyField.types";
export type RhfMoneyFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: FieldError;
} & Omit<MoneyFieldProps, "error" | "value">;
