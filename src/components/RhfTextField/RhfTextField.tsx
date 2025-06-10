import React, { useMemo, useCallback, useState, memo } from "react";
import { IconButton, TextField } from "@mui/material";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfTextFieldProps } from "./RhfTextField.types";
import { getErrorText, hasError } from "../../types/base";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RhfTextField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  defaultValue,
  error,
  variant = "outlined",
  rows,
  type,
  fullWidth = true,
  helperText,
  ...rest
}: RhfTextFieldProps<TFieldValues, TName>) => {
  const [stateType, setStateType] = useState(type);

  const {
    field: { onChange, value, ref },
  } = useController({ control, name, defaultValue });

  const displayText = getErrorText(error, helperText);
  const isError = hasError(error);

  const toggleVisibility = useCallback(() => {
    setStateType((prevType) => (prevType === "password" ? "text" : "password"));
  }, []);

  const slotProps = useMemo(() => {
    if (rest.slotProps?.input || type !== "password") {
      return rest.slotProps;
    }

    return {
      ...rest.slotProps,
      input: {
        endAdornment: (
          <IconButton onClick={toggleVisibility}>
            {stateType === "password" ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        ),
        ...rest.slotProps?.input,
      },
    };
  }, [rest.slotProps, type, stateType, toggleVisibility]);

  const filteredRest = useMemo(() => {
    const { slotProps: restInputProps, ...otherRest } = rest;
    return otherRest;
  }, [rest]);

  return (
    <TextField
      label={label}
      value={value}
      error={isError}
      fullWidth={fullWidth}
      multiline={!!rows}
      rows={rows}
      type={stateType}
      slotProps={slotProps}
      helperText={displayText}
      onChange={onChange}
      inputRef={ref}
      variant={variant}
      {...filteredRest}
    />
  );
};

RhfTextField.displayName = "RhfTextField";

export default memo(RhfTextField);
