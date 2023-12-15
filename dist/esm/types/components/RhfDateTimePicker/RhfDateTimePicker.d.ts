import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { RhfDateTimePickerProps } from "./RhfDateTimePicker.types";
declare const RhfDateTimePicker: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, variant, fullWidth, helperText, ...rest }: RhfDateTimePickerProps<TFieldValues, TName>) => React.JSX.Element;
export default RhfDateTimePicker;
