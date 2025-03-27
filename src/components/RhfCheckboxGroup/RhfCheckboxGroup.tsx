import React from "react";
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
  row,
}: RhfCheckboxGroupProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
  } = useController({ control, name, defaultValue });

  return (
    <FormControl error={!!error}>
      <FormLabel>{label}</FormLabel>
      <FormGroup sx={{ pl: 1 }} row={row}>
        {options.map((option) => (
          <FormControlLabel
            key={option.label}
            control={
              <Checkbox
                checked={value?.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...value, option.value]);
                  } else {
                    onChange(value.filter((v: string) => v !== option.value));
                  }
                }}
                slotProps={{
                  input: {
                    ref,
                  },
                }}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default RhfCheckboxGroup;
