import { TextFieldProps } from "@mui/material";
import { FieldError, FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
export type RhfTextFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: FieldError;
} & Omit<TextFieldProps, "error">;
