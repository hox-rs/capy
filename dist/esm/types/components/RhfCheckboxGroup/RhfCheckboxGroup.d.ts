import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { RhfCheckboxGroupProps } from "./RhfCheckboxGroup.types";
declare const RhfCheckboxGroup: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, options, control, defaultValue, error, row, }: RhfCheckboxGroupProps<TFieldValues, TName>) => React.JSX.Element;
export default RhfCheckboxGroup;
