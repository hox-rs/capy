import React, { ReactNode } from 'react';
import { FieldValues, FieldPath, UseControllerProps, FieldError } from 'react-hook-form';
import { AutocompleteProps, CheckboxProps, SwitchProps, TextFieldProps } from '@mui/material';
import { DatePickerProps, DateTimePickerProps } from '@mui/x-date-pickers';

type RhfAutocompleteOption = {
    label: string;
    value: string;
};
type RhfAutocompleteProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: (FieldError & FieldError[]) | undefined;
    label: string;
    variant?: "standard" | "outlined" | "filled";
    helperText?: string;
    options: RhfAutocompleteOption[];
} & Omit<AutocompleteProps<any, boolean, boolean, boolean>, "options" | "renderInput" | "onChange" | "value">;

declare const RhfAutocomplete: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, control, defaultValue, label, error, options, freeSolo, multiple, fullWidth, noOptionsText, variant, helperText, ...rest }: RhfAutocompleteProps<TFieldValues, TName>) => React.JSX.Element;

type RhfCheckboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: FieldError;
    label: ReactNode | string;
} & CheckboxProps;

declare const RhfCheckbox: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, ...props }: RhfCheckboxProps<TFieldValues, TName>) => React.JSX.Element;

type RhfDatePickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: FieldError;
    label: string;
    variant?: "outlined" | "standard" | "filled";
    fullWidth?: boolean;
    helperText?: string;
} & Omit<DatePickerProps<Date>, "renderInput" | "value" | "error" | "onChange">;

declare const RhfDatePicker: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, variant, fullWidth, helperText, ...rest }: RhfDatePickerProps<TFieldValues, TName>) => React.JSX.Element;

type RhfDateTimePickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: FieldError;
    label: string;
    variant?: "outlined" | "standard" | "filled";
    fullWidth?: boolean;
    helperText?: string;
} & Omit<DateTimePickerProps<Date>, "renderInput" | "value" | "error" | "onChange">;

declare const RhfDateTimePicker: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, variant, fullWidth, helperText, ...rest }: RhfDateTimePickerProps<TFieldValues, TName>) => React.JSX.Element;

type RhfSwitchProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: FieldError;
    label: ReactNode | string;
} & SwitchProps;

declare const RhfSwitch: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, ...props }: RhfSwitchProps<TFieldValues, TName>) => React.JSX.Element;

type RhfTextFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: FieldError;
} & Omit<TextFieldProps, "error">;

declare const RhfTextField: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, variant, rows, type, fullWidth, ...rest }: RhfTextFieldProps<TFieldValues, TName>) => React.JSX.Element;

type MoneyFieldProps = TextFieldProps & {
    currencySymbol?: string;
    decimalSeparator?: string;
    thousandSeparator?: string;
    value: number;
    onChange?: (value: number) => void;
};

declare const MoneyField: ({ currencySymbol, decimalSeparator, thousandSeparator, value, onChange, ...props }: MoneyFieldProps) => React.JSX.Element;

type RhfMoneyFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: FieldError;
} & Omit<MoneyFieldProps, "error">;

declare const RhfMoneyField: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, variant, rows, type, fullWidth, ...rest }: RhfMoneyFieldProps<TFieldValues, TName>) => React.JSX.Element;

export { MoneyField, type MoneyFieldProps, RhfAutocomplete, type RhfAutocompleteOption, type RhfAutocompleteProps, RhfCheckbox, type RhfCheckboxProps, RhfDatePicker, type RhfDatePickerProps, RhfDateTimePicker, RhfMoneyField, type RhfMoneyFieldProps, RhfSwitch, type RhfSwitchProps, RhfTextField, type RhfTextFieldProps };
