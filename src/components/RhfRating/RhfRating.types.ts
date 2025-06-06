import { RatingProps } from "@mui/material";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";

/**
 * Props for RhfRating component extending Material-UI Rating
 * Provides integration with react-hook-form through standardized base props
 */
export type RhfRatingProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> &
  Omit<
    RatingProps,
    "name" | "value" | "defaultValue" | "onChange" | "disabled"
  >;
