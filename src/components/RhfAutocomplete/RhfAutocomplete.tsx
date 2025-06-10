import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import React, { memo } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import {
  RhfAutocompleteOption,
  RhfAutocompleteProps,
} from "./RhfAutocomplete.types";
import { getErrorText, hasError } from "../../types/base";

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
  InputProps,
  ...rest
}: RhfAutocompleteProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ...props },
  } = useController({ control, name, defaultValue });

  const displayText = getErrorText(error, helperText);
  const isError = hasError(error);

  return (
    <FormControl error={isError} fullWidth={fullWidth}>
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
          } else {
            onChange(data);
          }
        }}
        defaultValue={defaultValue}
        renderOption={
          rest.renderOption ||
          ((
            renderProps: React.HTMLAttributes<HTMLLIElement>,
            option: RhfAutocompleteOption & string
          ) => (
            <li {...renderProps} key={String(option.value)}>
              {option?.label || option}
            </li>
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            slotProps={{
              input: {
                ...params.InputProps,
                ...InputProps,
                endAdornment: (
                  <>
                    {params.InputProps?.endAdornment}
                    {InputProps?.endAdornment}
                  </>
                ),
              },
            }}
            error={isError}
            variant={variant}
            label={label}
          />
        )}
        {...props}
        {...rest}
      />
      {displayText && <FormHelperText>{displayText}</FormHelperText>}
    </FormControl>
  );
};

RhfAutocomplete.displayName = "RhfAutocomplete";

export default memo(RhfAutocomplete);
