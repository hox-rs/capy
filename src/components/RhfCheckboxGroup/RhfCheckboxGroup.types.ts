import {
  FieldError,
  FieldPath,
  FieldValues,
  Merge,
  UseControllerProps,
} from "react-hook-form";

export type RhfCheckboxGroupOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type RhfCheckboxGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  label: string;
  options: RhfCheckboxGroupOption[];
  disabled?: boolean;
  row?: boolean;
};
