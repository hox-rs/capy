import React from "react";
import { ButtonProps } from "./Button.types";

const Button = ({ disabled, onClick, text }: ButtonProps) => {
  return (
    <button disabled={disabled} type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
