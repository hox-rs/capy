import { SliderProps } from "@mui/material";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";

/**
 * Props for RhfSlider component extending Material-UI Slider
 * Provides integration with react-hook-form through standardized base props
 */
export type RhfSliderProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> &
  Omit<
    SliderProps,
    "name" | "value" | "defaultValue" | "onChange" | "disabled"
  >;
