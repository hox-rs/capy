import React, { useMemo, useCallback, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfTextFieldProps } from "./RhfTextField.types";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  ...rest
}: RhfTextFieldProps<TFieldValues, TName>) => {
  const [stateType, setStateType] = useState(type);

  const {
    field: { onChange, value, ref },
  } = useController({ control, name, defaultValue });

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

  const helperText = useMemo(
    () => (error ? error.message : undefined),
    [error]
  );

  const filteredRest = useMemo(() => {
    const { slotProps: restInputProps, ...otherRest } = rest;
    return otherRest;
  }, [rest]);

  return (
    <TextField
      label={label}
      value={value}
      error={Boolean(error)}
      fullWidth={fullWidth}
      multiline={!!rows}
      rows={rows}
      type={stateType}
      slotProps={slotProps}
      helperText={helperText}
      onChange={onChange}
      inputRef={ref}
      variant={variant}
      {...filteredRest}
    />
  );
};

export default RhfTextField;
