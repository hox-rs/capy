import { DateTimePickerProps } from "@mui/x-date-pickers";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";

/**
 * Props for RhfDateTimePicker component extending Material-UI DateTimePicker
 * Provides integration with react-hook-form through standardized base props
 */
export type RhfDateTimePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> & {
  /** Whether the date time picker should be full width */
  fullWidth?: boolean;
} & Omit<
    DateTimePickerProps<never>,
    | "renderInput"
    | "value"
    | "error"
    | "onChange"
    | "label"
    | "helperText"
    | "disabled"
    | "defaultValue"
  >;
