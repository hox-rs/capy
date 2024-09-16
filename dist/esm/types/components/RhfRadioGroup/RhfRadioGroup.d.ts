import React from "react";
import { RadioGroupProps } from "@mui/material";
import { FieldPath, FieldValues } from "react-hook-form";
import { RhfRadioGroupProps } from "./RhfRadioGroup.types";
declare const RhfRadioGroup: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, options, control, defaultValue, error, disabled, ...rest }: RadioGroupProps & RhfRadioGroupProps<TFieldValues, TName>) => React.JSX.Element;
export default RhfRadioGroup;
