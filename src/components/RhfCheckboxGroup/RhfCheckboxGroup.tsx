import React, { memo } from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfCheckboxGroupProps } from "./RhfCheckboxGroup.types";
import { getErrorText, hasError } from "../../types/base";

const RhfCheckboxGroup = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  options,
  control,
  defaultValue,
  error,
  helperText,
  disabled,
  row,
}: RhfCheckboxGroupProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
  } = useController({ control, name, defaultValue });

  // Ensure value is treated as string array for checkbox groups
  const currentValue: string[] = Array.isArray(value) ? value : [];
  const errorText = getErrorText(error, helperText);
  const isError = hasError(error);

  return (
    <FormControl error={isError} disabled={disabled}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormGroup sx={{ pl: 1 }} row={row}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={currentValue.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...currentValue, option.value]);
                  } else {
                    onChange(
                      currentValue.filter((v: string) => v !== option.value)
                    );
                  }
                }}
                disabled={option.disabled || disabled}
                slotProps={{
                  input: {
                    ref,
                  },
                }}
              />
            }
            label={option.label}
            disabled={option.disabled || disabled}
          />
        ))}
      </FormGroup>
      {errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

RhfCheckboxGroup.displayName = "RhfCheckboxGroup";

export default memo(RhfCheckboxGroup);
