import { ButtonProps } from "@mui/material";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";

/**
 * Props for RhfSimpleFile component
 * A simple file upload component that takes the same space as a TextField
 */
export interface RhfSimpleFileProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Accepted file types (e.g., "image/*", ".pdf,.doc") */
  accept?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Custom validation function for the file */
  validate?: (file: File) => string | boolean;
  /** Callback when file is selected */
  onFileChange?: (file: File | null) => void;
  /** Whether the input should be full width */
  fullWidth?: boolean;
  /** Text to display on the button when no file is selected */
  buttonText?: string;
  /** Text to display when a file is selected */
  selectedText?: string;
  /** Whether to show file size */
  showFileSize?: boolean;
  /** Props for the upload button */
  buttonProps?: Partial<ButtonProps>;
}
