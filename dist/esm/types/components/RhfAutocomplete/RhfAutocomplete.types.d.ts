import { AutocompleteProps } from "@mui/material";
import { FieldError, FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
export type RhfAutocompleteOption = {
    label: string;
    value: string;
};
export type RhfAutocompleteProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: (FieldError & FieldError[]) | undefined;
    label: string;
    variant?: "standard" | "outlined" | "filled";
    helperText?: string;
    options: RhfAutocompleteOption[];
} & Omit<AutocompleteProps<any, boolean, boolean, boolean>, "options" | "renderInput" | "onChange" | "value">;
