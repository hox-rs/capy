import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { RhfAutocompleteProps } from "./RhfAutocomplete.types";
declare const RhfAutocomplete: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, control, defaultValue, label, error, options, freeSolo, multiple, fullWidth, noOptionsText, variant, helperText, textFieldProps, ...rest }: RhfAutocompleteProps<TFieldValues, TName>) => React.JSX.Element;
export default RhfAutocomplete;
