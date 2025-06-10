import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps, BaseOption } from "../../types/base";

export type RhfRadioGroupOption = BaseOption;

export type RhfRadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> & {
  /** Array of radio options */
  options: RhfRadioGroupOption[];
};
