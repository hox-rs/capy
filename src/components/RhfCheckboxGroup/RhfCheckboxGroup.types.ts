import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps, BaseOption } from "../../types/base";

export interface RhfCheckboxGroupOption extends BaseOption {
  /** Value must be string for checkbox groups */
  value: string;
}

export interface RhfCheckboxGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Array of checkbox options */
  options: RhfCheckboxGroupOption[];
  /** Display checkboxes in a row instead of column */
  row?: boolean;
}
