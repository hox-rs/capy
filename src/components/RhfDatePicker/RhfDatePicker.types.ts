import { DatePickerProps } from "@mui/x-date-pickers";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";

/**
 * Props for RhfDatePicker component extending Material-UI DatePicker
 * Provides integration with react-hook-form through standardized base props
 */
export type RhfDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> & {
  /** Whether the date picker should be full width */
  fullWidth?: boolean;
} & Omit<
    DatePickerProps<never>,
    | "renderInput"
    | "value"
    | "error"
    | "onChange"
    | "label"
    | "helperText"
    | "disabled"
    | "defaultValue"
  >;
