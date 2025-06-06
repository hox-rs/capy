import React, { memo } from "react";
import {
  RadioGroupProps,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfRadioGroupProps } from "./RhfRadioGroup.types";
import { getErrorText, hasError } from "../../types/base";

const RhfRadioGroup = <
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
  ...rest
}: RadioGroupProps & RhfRadioGroupProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref, ...props },
    fieldState: { error: fieldError },
  } = useController({ control, name, defaultValue });

  const displayText = getErrorText(fieldError, helperText);
  const isError = hasError(fieldError);

  return (
    <FormControl error={isError}>
      <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
      <RadioGroup
        sx={{ pl: 1 }}
        value={value}
        onChange={onChange}
        {...props}
        {...rest}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.label}
            value={option.value}
            control={<Radio inputRef={ref} />}
            label={option.label}
            disabled={option?.disabled || disabled}
          />
        ))}
      </RadioGroup>
      {displayText && <FormHelperText>{displayText}</FormHelperText>}
    </FormControl>
  );
};

RhfRadioGroup.displayName = "RhfRadioGroup";

export default memo(RhfRadioGroup);
