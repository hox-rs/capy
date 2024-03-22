import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { RhfSwitchProps } from "./RhfSwitch.types";
declare const RhfSwitch: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, labelPlacement, ...props }: RhfSwitchProps<TFieldValues, TName>) => React.JSX.Element;
export default RhfSwitch;
