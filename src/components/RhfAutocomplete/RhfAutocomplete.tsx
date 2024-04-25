import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import React from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import {
  RhfAutocompleteOption,
  RhfAutocompleteProps,
} from "./RhfAutocomplete.types";

const RhfAutocomplete = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  control,
  defaultValue,
  label,
  error,
  options,
  freeSolo = false,
  multiple = true,
  fullWidth = true,
  noOptionsText = "Nenhum resultado encontrado",
  variant = "outlined",
  helperText,
  textFieldProps,
  ...rest
}: RhfAutocompleteProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ...props },
  } = useController({ control, name, defaultValue });
  return (
    <FormControl error={!!error} fullWidth={fullWidth}>
      <Autocomplete
        options={options}
        fullWidth={fullWidth}
        freeSolo={freeSolo}
        value={value}
        multiple={multiple}
        noOptionsText={noOptionsText}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return (
              options.find((item) => item.value === option)?.label || option
            );
          }
          return option?.label;
        }}
        isOptionEqualToValue={(option, value) => option.value === value}
        onChange={(
          _,
          data: RhfAutocompleteOption & RhfAutocompleteOption[]
        ) => {
          if (multiple && Array.isArray(data)) {
            onChange((data || []).map((item) => item.value || item));
          } else if (data && typeof data === "object") {
            onChange(data?.value);
          }
        }}
        defaultValue={defaultValue}
        renderOption={
          rest.renderOption ||
          ((
            renderProps: React.HTMLAttributes<HTMLLIElement>,
            option: RhfAutocompleteOption & string
          ) => (
            <li {...renderProps} key={option.value}>
              {option?.label || option}
            </li>
          ))
        }
        renderInput={(params) => (
          <TextField
            {...textFieldProps}
            error={!!error}
            variant={variant}
            label={label}
            {...params}
          />
        )}
        {...props}
        {...rest}
      />
      <FormHelperText>{error?.message || helperText}</FormHelperText>
    </FormControl>
  );
};

export default RhfAutocomplete;
