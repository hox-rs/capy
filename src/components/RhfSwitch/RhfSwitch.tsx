import {
  FormControl,
  FormControlLabel,
  Switch,
  FormHelperText,
} from "@mui/material";
import React, { memo } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfSwitchProps } from "./RhfSwitch.types";
import { getErrorText, hasError } from "../../types/base";

const RhfSwitch = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  defaultValue,
  error,
  helperText,
  labelPlacement = "end",
  ...props
}: RhfSwitchProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error: fieldError },
  } = useController({ control, name, defaultValue });

  const displayText = getErrorText(fieldError, helperText);
  const isError = hasError(fieldError);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControl error={isError}>
      <FormControlLabel
        control={
          <Switch
            {...props}
            checked={value}
            onChange={handleChange}
            slotProps={{
              input: {
                ref,
              },
            }}
          />
        }
        labelPlacement={labelPlacement}
        label={label}
      />
      <FormHelperText>{displayText}</FormHelperText>
    </FormControl>
  );
};

RhfSwitch.displayName = "RhfSwitch";

export default memo(RhfSwitch);
