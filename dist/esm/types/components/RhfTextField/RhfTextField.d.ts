import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { RhfTextFieldProps } from "./RhfTextField.types";
declare const RhfTextField: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, variant, rows, type, fullWidth, ...rest }: RhfTextFieldProps<TFieldValues, TName>) => React.JSX.Element;
export default RhfTextField;
