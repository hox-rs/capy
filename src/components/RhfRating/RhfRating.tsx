import React, { memo } from "react";
import {
  Rating,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
} from "@mui/material";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfRatingProps } from "./RhfRating.types";
import { getErrorText, hasError } from "../../types/base";

const RhfRating = <
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
  max = 5,
  precision = 1,
  size = "medium",
  readOnly,
  ...rest
}: RhfRatingProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error: fieldError },
  } = useController({ control, name, defaultValue });

  const displayText = getErrorText(fieldError, helperText);
  const isError = hasError(fieldError);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: number | null
  ) => {
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
        <Rating
          {...rest}
          name={name}
          value={value ?? 0}
          max={max}
          precision={precision}
          size={size}
          readOnly={readOnly}
          disabled={disabled}
          onChange={handleChange}
          ref={ref}
        />
      </Box>
      {displayText && <FormHelperText>{displayText}</FormHelperText>}
    </FormControl>
  );
};

RhfRating.displayName = "RhfRating";

export default memo(RhfRating);
