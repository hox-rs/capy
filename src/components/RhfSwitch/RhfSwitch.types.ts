import { FormControlLabelProps, SwitchProps } from "@mui/material";
import { ReactNode } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";

/**
 * Props for RhfSwitch component extending Material-UI Switch
 * Provides integration with react-hook-form through standardized base props
 */
export type RhfSwitchProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> & {
  /** Label for the switch - overrides base label to accept ReactNode */
  label: ReactNode | string;
  /** Label placement for the FormControlLabel */
  labelPlacement?: FormControlLabelProps["labelPlacement"];
} & Omit<SwitchProps, "name" | "disabled" | "defaultValue">;
