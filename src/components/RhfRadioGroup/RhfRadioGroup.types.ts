import {
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

export type RhfRadioGroupOption = {
  value: string | boolean | number;
  label: string;
  disabled?: boolean;
};

export type RhfRadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
  error?: FieldError;
  label: string;
  options: RhfRadioGroupOption[];
  disabled?: boolean;
};
