import React, { MouseEventHandler } from 'react';
import { FieldValues, FieldPath, UseControllerProps, FieldError } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';

interface ButtonProps {
    text?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

declare const Button: ({ disabled, onClick, text }: ButtonProps) => React.JSX.Element;

type RhfTextFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & {
    error?: FieldError;
} & Omit<TextFieldProps, "error">;

declare const RhfTextField: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, variant, rows, type, fullWidth, ...rest }: RhfTextFieldProps<TFieldValues, TName>) => React.JSX.Element;

export { Button, RhfTextField };
