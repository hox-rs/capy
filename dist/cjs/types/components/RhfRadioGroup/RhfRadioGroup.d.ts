import React from "react";
import { RadioGroupProps } from "@mui/material";
import { FieldPath, FieldValues } from "react-hook-form";
import { RhfRadioGroupProps } from "./RhfRadioGroup.types";
declare const RhfRadioGroup: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, options, control, defaultValue, error, disabled, ...rest }: RadioGroupProps & import("react-hook-form").UseControllerProps<TFieldValues, TName> & {
    error?: import("react-hook-form").FieldError | undefined;
    label: string;
    options: import("./RhfRadioGroup.types").RhfRadioGroupOption[];
    disabled?: boolean | undefined;
}) => React.JSX.Element;
export default RhfRadioGroup;
