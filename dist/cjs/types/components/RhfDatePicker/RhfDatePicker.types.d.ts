import { DatePickerProps } from "@mui/x-date-pickers";
import { FieldError, FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
export type RhfDatePickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: FieldError;
    label: string;
    variant?: "outlined" | "standard" | "filled";
    fullWidth?: boolean;
    helperText?: string;
} & Omit<DatePickerProps<Date>, "renderInput" | "value" | "error" | "onChange">;
