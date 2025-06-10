import { ButtonGroupProps } from "@mui/material";
import { ReactNode } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps, BaseOption } from "../../types/base";

/**
 * Option interface for RhfButtonGroup extending BaseOption
 */
export type RhfButtonGroupOption = BaseOption;

/**
 * Props for RhfButtonGroup component extending Material-UI ButtonGroup
 * Provides integration with react-hook-form through standardized base props
 */
export type RhfButtonGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> & {
  /** Label for the button group - overrides base label to accept ReactNode */
  label?: ReactNode | string;
  /** Array of button options */
  options: RhfButtonGroupOption[];
  /** Whether selection is exclusive (single select) */
  exclusive?: boolean;
  /** Whether the button group should be full width */
  fullWidth?: boolean;
} & Omit<
    ButtonGroupProps,
    "onChange" | "value" | "name" | "disabled" | "defaultValue"
  >;
