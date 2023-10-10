import { CheckboxProps } from "@mui/material";
import { ReactNode } from "react";
import { FieldError, FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
export type RhfCheckboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: FieldError;
    label: ReactNode | string;
} & CheckboxProps;
