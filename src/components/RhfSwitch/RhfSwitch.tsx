"use client";

import {
  FormControl,
  FormControlLabel,
  Switch,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfSwitchProps } from "./RhfSwitch.types";

const RhfSwitch = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  defaultValue,
  error,
  labelPlacement,
  ...props
}: RhfSwitchProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
  } = useController({ control, name, defaultValue });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControl error={!!error}>
      <FormControlLabel
        control={
          <Switch
            {...props}
            checked={value}
            onChange={handleChange}
            inputRef={ref}
          />
        }
        labelPlacement={labelPlacement}
        label={label}
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default RhfSwitch;
