import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import React, { useCallback, memo } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfCheckboxProps } from "./RhfCheckbox.types";
import { getErrorText, hasError } from "../../types/base";

const RhfCheckbox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  defaultValue,
  error,
  helperText,
  ...props
}: RhfCheckboxProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error: fieldError },
  } = useController({ control, name, defaultValue });

  const displayText = getErrorText(fieldError, helperText);
  const isError = hasError(fieldError);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked);
    },
    [onChange]
  );

  return (
    <FormControl error={isError}>
      <FormControlLabel
        control={
          <Checkbox
            {...props}
            checked={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            slotProps={{
              input: {
                ref,
              },
            }}
          />
        }
        label={label}
      />
      <FormHelperText>{displayText}</FormHelperText>
    </FormControl>
  );
};

RhfCheckbox.displayName = "RhfCheckbox";

export default memo(RhfCheckbox);
