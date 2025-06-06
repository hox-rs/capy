import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";
import { FormControlProps } from "@mui/material";

/**
 * Color format types supported by RhfColorPicker
 */
export type ColorFormat = "hex" | "rgb" | "hsl";

/**
 * Predefined color preset
 */
export interface ColorPreset {
  label: string;
  value: string;
  group?: string;
}

/**
 * Size variants for the color picker
 */
export type ColorPickerSize = "small" | "medium" | "large";

/**
 * Props for RhfColorPicker component
 * Provides color selection with presets and configurable output formats
 */
export interface RhfColorPickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  /**
   * Output format for the color value
   * @default "hex"
   */
  format?: ColorFormat;

  /**
   * Predefined color presets to display
   */
  presets?: ColorPreset[];

  /**
   * Size of the color picker
   * @default "medium"
   */
  size?: ColorPickerSize;

  /**
   * Show alpha channel control
   * @default false
   */
  showAlpha?: boolean;

  /**
   * Show color input field
   * @default true
   */
  showInput?: boolean;

  /**
   * Show preset colors
   * @default true
   */
  showPresets?: boolean;

  /**
   * Custom placeholder text for input
   */
  placeholder?: string;

  /**
   * Additional props for the container
   */
  containerProps?: Omit<FormControlProps, "error" | "disabled" | "fullWidth">;

  /**
   * Callback when color changes
   */
  onColorChange?: (color: string) => void;
}
