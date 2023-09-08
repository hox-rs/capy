import { MouseEventHandler } from "react";

export interface ButtonProps {
  text?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
