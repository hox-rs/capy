import {
  ButtonGroup,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import React, { memo } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfButtonGroupProps } from "./RhfButtonGroup.types";
import { getErrorText, hasError } from "../../types/base";

const RhfButtonGroup = <
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
  variant = "outlined",
  color = "primary",
  size = "medium",
  exclusive = true,
  orientation = "horizontal",
  disabled,
  fullWidth = false,
  ...rest
}: RhfButtonGroupProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
  } = useController({ control, name, defaultValue });

  const handleButtonClick = (optionValue: string | number | boolean) => {
    if (exclusive) {
      // Single selection mode
      onChange(value === optionValue ? undefined : optionValue);
    } else {
      // Multiple selection mode
      const currentValues = Array.isArray(value) ? value : [];
      const hasValue = currentValues.some((v: any) => v === optionValue);
      if (hasValue) {
        onChange(currentValues.filter((v: any) => v !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    }
  };

  const isSelected = (optionValue: string | number | boolean) => {
    if (exclusive) {
      return value === optionValue;
    } else {
      return Array.isArray(value) && value.some((v: any) => v === optionValue);
    }
  };

  const displayText = getErrorText(error, helperText);
  const isError = hasError(error);

  return (
    <FormControl error={isError} fullWidth={fullWidth}>
      {label && <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>}
      <ButtonGroup
        variant={variant}
        color={color}
        size={size}
        orientation={orientation}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {options.map((option) => (
          <Button
            key={option.value.toString()}
            onClick={() => handleButtonClick(option.value)}
            disabled={option.disabled || disabled}
            variant={isSelected(option.value) ? "contained" : variant}
            aria-pressed={isSelected(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
      {displayText && <FormHelperText>{displayText}</FormHelperText>}
    </FormControl>
  );
};

RhfButtonGroup.displayName = "RhfButtonGroup";

export default memo(RhfButtonGroup);
