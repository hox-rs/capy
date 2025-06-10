// Base interfaces for RHF components standardization
import { Control, FieldError, FieldPath, FieldValues } from "react-hook-form";

/**
 * Base props for all RHF components providing common error handling and form integration
 */
export interface BaseRhfFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  /** Field name used in validations and useForm */
  name: TName;
  /** react-hook-form control object */
  control: Control<TFieldValues>;
  /** Error object from react-hook-form */
  error?: FieldError;
  /** Label for the field */
  label?: string;
  /** Helper text displayed below the field */
  helperText?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Default value for the field */
  defaultValue?: TFieldValues[TName];
}

/**
 * Utility function to get the appropriate helper text
 * Error message takes precedence over helperText
 */
export const getErrorText = (
  error?: FieldError,
  helperText?: string
): string | undefined => {
  if (error?.message) {
    return error.message;
  }
  return helperText;
};

/**
 * Utility function to determine if the field is in error state
 */
export const hasError = (error?: FieldError): boolean => {
  return !!error;
};

/**
 * Common option interface for components that use options (Select, Autocomplete, etc.)
 */
export interface BaseOption {
  /** Display label for the option */
  label: string;
  /** Value of the option */
  value: string | number | boolean;
  /** Whether this option is disabled */
  disabled?: boolean;
}
