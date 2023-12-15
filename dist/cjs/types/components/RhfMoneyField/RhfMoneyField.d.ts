import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { RhfMoneyFieldProps } from "./RhfMoneyField.types";
declare const RhfMoneyField: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, variant, rows, type, fullWidth, ...rest }: RhfMoneyFieldProps<TFieldValues, TName>) => React.JSX.Element;
export default RhfMoneyField;
