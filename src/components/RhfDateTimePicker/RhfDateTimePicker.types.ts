import { DateTimePickerProps } from "@mui/x-date-pickers";
import {
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

export type RhfDateTimePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
  error?: FieldError;
  label: string;
  fullWidth?: boolean;
  helperText?: string;
} & Omit<
    DateTimePickerProps<never>,
    "renderInput" | "value" | "error" | "onChange"
  >;
