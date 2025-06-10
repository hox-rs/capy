import { CheckboxProps } from "@mui/material";
import { ReactNode } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";

/**
 * Props for RhfCheckbox component extending Material-UI Checkbox
 * Provides integration with react-hook-form through standardized base props
 */
export type RhfCheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> & {
  /** Label for the checkbox - overrides base label to accept ReactNode */
  label: ReactNode | string;
} & Omit<CheckboxProps, "name" | "disabled" | "defaultValue">;
