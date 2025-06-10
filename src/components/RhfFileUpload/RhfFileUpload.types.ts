import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";

/**
 * File object interface for uploaded files
 */
export interface UploadedFile {
  /** Unique identifier for the file */
  id: string;
  /** Original file object */
  file: File;
  /** Preview URL for images */
  preview?: string;
  /** Upload progress (0-100) */
  progress?: number;
  /** Whether the file upload is complete */
  uploaded?: boolean;
  /** Error message if upload failed */
  error?: string;
}

/**
 * Props for RhfFileUpload component
 * Provides file upload functionality with preview and validation
 */
export interface RhfFileUploadProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Accepted file types (e.g., "image/*", ".pdf,.doc") */
  accept?: string;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Whether to allow multiple files */
  multiple?: boolean;
  /** Whether to show image previews */
  showPreview?: boolean;
  /** Custom validation function for files */
  validate?: (files: File[]) => string | boolean;
  /** Callback when files are selected */
  onFilesChange?: (files: UploadedFile[]) => void;
  /** Whether to show upload progress */
  showProgress?: boolean;
  /** Custom upload handler */
  onUpload?: (file: File) => Promise<void>;
  /** Whether the upload area should be full width */
  fullWidth?: boolean;
  /** Height of the upload area */
  height?: number | string;
  /** Placeholder text when no files are selected */
  placeholder?: string;
}
