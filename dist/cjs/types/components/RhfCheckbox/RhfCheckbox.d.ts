import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { RhfCheckboxProps } from "./RhfCheckbox.types";
declare const RhfCheckbox: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, ...props }: RhfCheckboxProps<TFieldValues, TName>) => React.JSX.Element;
export default RhfCheckbox;
