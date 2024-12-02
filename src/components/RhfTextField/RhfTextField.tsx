import React from "react";
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
  const [stateType, setStateType] = React.useState(type);
  const {
    field: { onChange, value, ref, ...props },
  } = useController({ control, name, defaultValue });

  const InputProps =
    rest.InputProps || type === "password"
      ? {
          endAdornment: (
            <IconButton
              onClick={() =>
                setStateType(stateType === "password" ? "text" : "password")
              }
            >
              {stateType === "password" ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
        }
      : {};

  return (
    <TextField
      label={label}
      value={value}
      error={Boolean(error)}
      fullWidth={fullWidth}
      multiline={!!rows}
      rows={rows}
      type={stateType}
      InputProps={InputProps}
      helperText={error && <>{error.message}</>}
      onChange={onChange}
      inputRef={ref}
      variant={variant}
      {...props}
      {...rest}
    />
  );
};

export default RhfTextField;
