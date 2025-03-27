import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfCheckboxProps } from "./RhfCheckbox.types";

const RhfCheckbox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  defaultValue,
  error,
  ...props
}: RhfCheckboxProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
  } = useController({ control, name, defaultValue });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked);
    },
    [onChange]
  );

  const helperText = useMemo(() => error?.message, [error]);

  return (
    <FormControl error={!!error}>
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
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default RhfCheckbox;
