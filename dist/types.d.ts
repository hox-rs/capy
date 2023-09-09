import React, { MouseEventHandler } from 'react';

interface ButtonProps {
    text?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

declare const Button: ({ disabled, onClick, text }: ButtonProps) => React.JSX.Element;

export { Button };
