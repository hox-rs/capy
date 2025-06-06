import React, { memo } from "react";
import {
  Slider,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
} from "@mui/material";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfSliderProps } from "./RhfSlider.types";
import { getErrorText, hasError } from "../../types/base";

const RhfSlider = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  defaultValue,
  error,
  helperText,
  disabled,
  min = 0,
  max = 100,
  step = 1,
  marks,
  orientation = "horizontal",
  valueLabelDisplay = "auto",
  size = "medium",
  color = "primary",
  ...rest
}: RhfSliderProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error: fieldError },
  } = useController({ control, name, defaultValue });

  const displayText = getErrorText(fieldError, helperText);
  const isError = hasError(fieldError);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    onChange(newValue);
  };

  return (
    <FormControl error={isError} disabled={disabled}>
      {label && (
        <FormLabel sx={{ mb: 1, color: isError ? "error.main" : "inherit" }}>
          {label}
        </FormLabel>
      )}
      <Box>
        <Slider
          {...rest}
          name={name}
          value={value ?? defaultValue ?? min}
          min={min}
          max={max}
          step={step}
          marks={marks}
          orientation={orientation}
          valueLabelDisplay={valueLabelDisplay}
          size={size}
          color={color}
          disabled={disabled}
          onChange={handleChange}
          ref={ref}
        />
      </Box>
      {displayText && <FormHelperText>{displayText}</FormHelperText>}
    </FormControl>
  );
};

RhfSlider.displayName = "RhfSlider";

export default memo(RhfSlider);
