import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { RhfDatePickerProps } from "./RhfDatePicker.types";
declare const RhfDatePicker: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, variant, fullWidth, helperText, ...rest }: RhfDatePickerProps<TFieldValues, TName>) => React.JSX.Element;
export default RhfDatePicker;
