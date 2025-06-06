import React, { ReactNode } from 'react';
import { FieldValues, FieldPath, Control, FieldError, Merge } from 'react-hook-form';
import { InputBaseProps, AutocompleteProps, CheckboxProps, FormControlLabelProps, SwitchProps, TextFieldProps, RadioGroupProps, ButtonGroupProps, ButtonProps, RatingProps, SliderProps, FormControlProps } from '@mui/material';
import { DatePickerProps, DateTimePickerProps } from '@mui/x-date-pickers';

/**
 * Base props for all RHF components providing common error handling and form integration
 */
interface BaseRhfFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
    /** Field name used in validations and useForm */
    name: TName;
    /** react-hook-form control object */
    control: Control<TFieldValues>;
    /** Error object from react-hook-form */
    error?: FieldError;
    /** Label for the field */
    label?: string;
    /** Helper text displayed below the field */
    helperText?: string;
    /** Whether the field is disabled */
    disabled?: boolean;
    /** Default value for the field */
    defaultValue?: TFieldValues[TName];
}
/**
 * Utility function to get the appropriate helper text
 * Error message takes precedence over helperText
 */
declare const getErrorText: (error?: FieldError, helperText?: string) => string | undefined;
/**
 * Utility function to determine if the field is in error state
 */
declare const hasError: (error?: FieldError) => boolean;
/**
 * Common option interface for components that use options (Select, Autocomplete, etc.)
 */
interface BaseOption {
    /** Display label for the option */
    label: string;
    /** Value of the option */
    value: string | number | boolean;
    /** Whether this option is disabled */
    disabled?: boolean;
}

type RhfAutocompleteOption = BaseOption;
type RhfAutocompleteProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseRhfFieldProps<TFieldValues, TName> & {
    /** Specific error type for autocomplete that can handle arrays */
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    /** Variant of the TextField input */
    variant?: "standard" | "outlined" | "filled";
    /** Props to pass to the underlying TextField input */
    InputProps?: InputBaseProps;
    /** Array of autocomplete options */
    options: RhfAutocompleteOption[];
} & Omit<AutocompleteProps<any, boolean, boolean, boolean>, "options" | "renderInput" | "onChange" | "value">;

declare const _default$f: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, control, defaultValue, label, error, options, freeSolo, multiple, fullWidth, noOptionsText, variant, helperText, InputProps, ...rest }: RhfAutocompleteProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

/**
 * Props for RhfCheckbox component extending Material-UI Checkbox
 * Provides integration with react-hook-form through standardized base props
 */
type RhfCheckboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseRhfFieldProps<TFieldValues, TName> & {
    /** Label for the checkbox - overrides base label to accept ReactNode */
    label: ReactNode | string;
} & Omit<CheckboxProps, "name" | "disabled" | "defaultValue">;

declare const _default$e: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, helperText, ...props }: RhfCheckboxProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

/**
 * Props for RhfDatePicker component extending Material-UI DatePicker
 * Provides integration with react-hook-form through standardized base props
 */
type RhfDatePickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseRhfFieldProps<TFieldValues, TName> & {
    /** Whether the date picker should be full width */
    fullWidth?: boolean;
} & Omit<DatePickerProps<never>, "renderInput" | "value" | "error" | "onChange" | "label" | "helperText" | "disabled" | "defaultValue">;

declare const _default$d: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, fullWidth, helperText, ...rest }: RhfDatePickerProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

/**
 * Props for RhfDateTimePicker component extending Material-UI DateTimePicker
 * Provides integration with react-hook-form through standardized base props
 */
type RhfDateTimePickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseRhfFieldProps<TFieldValues, TName> & {
    /** Whether the date time picker should be full width */
    fullWidth?: boolean;
} & Omit<DateTimePickerProps<never>, "renderInput" | "value" | "error" | "onChange" | "label" | "helperText" | "disabled" | "defaultValue">;

declare const _default$c: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, fullWidth, helperText, ...rest }: RhfDateTimePickerProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

/**
 * Props for RhfSwitch component extending Material-UI Switch
 * Provides integration with react-hook-form through standardized base props
 */
type RhfSwitchProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseRhfFieldProps<TFieldValues, TName> & {
    /** Label for the switch - overrides base label to accept ReactNode */
    label: ReactNode | string;
    /** Label placement for the FormControlLabel */
    labelPlacement?: FormControlLabelProps["labelPlacement"];
} & Omit<SwitchProps, "name" | "disabled" | "defaultValue">;

declare const _default$b: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, helperText, labelPlacement, ...props }: RhfSwitchProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

/**
 * Props for RhfTextField component extending Material-UI TextField
 * Provides integration with react-hook-form through standardized base props
 */
type RhfTextFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseRhfFieldProps<TFieldValues, TName> & Omit<TextFieldProps, "error" | "name" | "label" | "helperText" | "disabled" | "defaultValue">;

declare const _default$a: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, variant, rows, type, fullWidth, helperText, ...rest }: RhfTextFieldProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

type MoneyFieldProps = Omit<TextFieldProps, "onChange"> & {
    currencySymbol?: string;
    decimalSeparator?: string;
    thousandSeparator?: string;
    value: number | undefined;
    onChange?: (value: number) => void;
};

declare const _default$9: React.MemoExoticComponent<{
    ({ currencySymbol, decimalSeparator, thousandSeparator, value, onChange, ...props }: MoneyFieldProps): React.JSX.Element;
    displayName: string;
}>;

/**
 * Props for RhfMoneyField component extending MoneyField
 * Provides integration with react-hook-form through standardized base props
 */
type RhfMoneyFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseRhfFieldProps<TFieldValues, TName> & Omit<MoneyFieldProps, "error" | "value" | "name" | "label" | "helperText" | "disabled" | "defaultValue">;

declare const _default$8: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, helperText, variant, rows, type, fullWidth, ...rest }: RhfMoneyFieldProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

interface RhfCheckboxGroupOption extends BaseOption {
    /** Value must be string for checkbox groups */
    value: string;
}
interface RhfCheckboxGroupProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> extends BaseRhfFieldProps<TFieldValues, TName> {
    /** Array of checkbox options */
    options: RhfCheckboxGroupOption[];
    /** Display checkboxes in a row instead of column */
    row?: boolean;
}

declare const _default$7: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, options, control, defaultValue, error, helperText, disabled, row, }: RhfCheckboxGroupProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

type RhfRadioGroupOption = BaseOption;
type RhfRadioGroupProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseRhfFieldProps<TFieldValues, TName> & {
    /** Array of radio options */
    options: RhfRadioGroupOption[];
};

declare const _default$6: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, options, control, defaultValue, error, helperText, disabled, ...rest }: RadioGroupProps & RhfRadioGroupProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

/**
 * Option interface for RhfButtonGroup extending BaseOption
 */
type RhfButtonGroupOption = BaseOption;
/**
 * Props for RhfButtonGroup component extending Material-UI ButtonGroup
 * Provides integration with react-hook-form through standardized base props
 */
type RhfButtonGroupProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseRhfFieldProps<TFieldValues, TName> & {
    /** Label for the button group - overrides base label to accept ReactNode */
    label?: ReactNode | string;
    /** Array of button options */
    options: RhfButtonGroupOption[];
    /** Whether selection is exclusive (single select) */
    exclusive?: boolean;
    /** Whether the button group should be full width */
    fullWidth?: boolean;
} & Omit<ButtonGroupProps, "onChange" | "value" | "name" | "disabled" | "defaultValue">;

declare const _default$5: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, options, control, defaultValue, error, helperText, variant, color, size, exclusive, orientation, disabled, fullWidth, ...rest }: RhfButtonGroupProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

/**
 * File object interface for uploaded files
 */
interface UploadedFile {
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
interface RhfFileUploadProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> extends BaseRhfFieldProps<TFieldValues, TName> {
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

declare const _default$4: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, helperText, disabled, accept, maxFiles, maxSize, multiple, showPreview, validate, onFilesChange, showProgress, onUpload, fullWidth, height, placeholder, }: RhfFileUploadProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

/**
 * Props for RhfSimpleFile component
 * A simple file upload component that takes the same space as a TextField
 */
interface RhfSimpleFileProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> extends BaseRhfFieldProps<TFieldValues, TName> {
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

declare const _default$3: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, helperText, disabled, accept, maxSize, validate, onFileChange, fullWidth, buttonText, selectedText, showFileSize, buttonProps, }: RhfSimpleFileProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

/**
 * Props for RhfRating component extending Material-UI Rating
 * Provides integration with react-hook-form through standardized base props
 */
type RhfRatingProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseRhfFieldProps<TFieldValues, TName> & Omit<RatingProps, "name" | "value" | "defaultValue" | "onChange" | "disabled">;

declare const _default$2: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, helperText, disabled, max, precision, size, readOnly, ...rest }: RhfRatingProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

/**
 * Props for RhfSlider component extending Material-UI Slider
 * Provides integration with react-hook-form through standardized base props
 */
type RhfSliderProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseRhfFieldProps<TFieldValues, TName> & Omit<SliderProps, "name" | "value" | "defaultValue" | "onChange" | "disabled">;

declare const _default$1: React.MemoExoticComponent<{
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, error, helperText, disabled, min, max, step, marks, orientation, valueLabelDisplay, size, color, ...rest }: RhfSliderProps<TFieldValues, TName>): React.JSX.Element;
    displayName: string;
}>;

/**
 * Color format types supported by RhfColorPicker
 */
type ColorFormat = "hex" | "rgb" | "hsl";
/**
 * Predefined color preset
 */
interface ColorPreset {
    label: string;
    value: string;
    group?: string;
}
/**
 * Size variants for the color picker
 */
type ColorPickerSize = "small" | "medium" | "large";
/**
 * Props for RhfColorPicker component
 * Provides color selection with presets and configurable output formats
 */
interface RhfColorPickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> extends BaseRhfFieldProps<TFieldValues, TName> {
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

declare const RhfColorPicker: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, label, control, defaultValue, helperText, disabled, format, presets, size, showAlpha, showInput, showPresets, placeholder, containerProps, onColorChange, ...rest }: RhfColorPickerProps<TFieldValues, TName>) => React.JSX.Element;
declare const _default: typeof RhfColorPicker;

/**
 * Shared constants and default configurations for RHF components
 */
/**
 * Default props for common Material-UI components
 */
declare const DEFAULT_FIELD_PROPS: {
    variant: "outlined";
    fullWidth: boolean;
    size: "medium";
};
/**
 * Default date picker formats
 */
declare const DATE_FORMATS: {
    readonly DATE: "DD/MM/YYYY";
    readonly DATETIME: "DD/MM/YYYY HH:mm";
    readonly TIME: "HH:mm";
};
/**
 * Default autocomplete configurations
 */
declare const AUTOCOMPLETE_DEFAULTS: {
    readonly noOptionsText: "Nenhuma opção encontrada";
    readonly loadingText: "Carregando...";
    readonly clearText: "Limpar";
    readonly closeText: "Fechar";
    readonly openText: "Abrir";
};
/**
 * Default money field configurations
 */
declare const MONEY_FIELD_DEFAULTS: {
    readonly prefix: "R$ ";
    readonly thousandSeparator: ".";
    readonly decimalSeparator: ",";
    readonly precision: 2;
    readonly allowNegative: false;
};
/**
 * Common error messages
 */
declare const ERROR_MESSAGES: {
    readonly REQUIRED: "Campo obrigatório";
    readonly INVALID_EMAIL: "Email inválido";
    readonly INVALID_DATE: "Data inválida";
    readonly MIN_LENGTH: (min: number) => string;
    readonly MAX_LENGTH: (max: number) => string;
    readonly MIN_VALUE: (min: number) => string;
    readonly MAX_VALUE: (max: number) => string;
};
/**
 * Component sizes mapping
 */
declare const COMPONENT_SIZES: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};
/**
 * Component variants mapping
 */
declare const COMPONENT_VARIANTS: {
    readonly outlined: "outlined";
    readonly filled: "filled";
    readonly standard: "standard";
};

export { AUTOCOMPLETE_DEFAULTS, COMPONENT_SIZES, COMPONENT_VARIANTS, DATE_FORMATS, DEFAULT_FIELD_PROPS, ERROR_MESSAGES, MONEY_FIELD_DEFAULTS, _default$9 as MoneyField, _default$f as RhfAutocomplete, _default$5 as RhfButtonGroup, _default$e as RhfCheckbox, _default$7 as RhfCheckboxGroup, _default as RhfColorPicker, _default$d as RhfDatePicker, _default$c as RhfDateTimePicker, _default$4 as RhfFileUpload, _default$8 as RhfMoneyField, _default$6 as RhfRadioGroup, _default$2 as RhfRating, _default$3 as RhfSimpleFile, _default$1 as RhfSlider, _default$b as RhfSwitch, _default$a as RhfTextField, getErrorText, hasError };
export type { BaseOption, BaseRhfFieldProps, ColorFormat, ColorPickerSize, ColorPreset, MoneyFieldProps, RhfAutocompleteOption, RhfAutocompleteProps, RhfButtonGroupOption, RhfButtonGroupProps, RhfCheckboxGroupOption, RhfCheckboxGroupProps, RhfCheckboxProps, RhfColorPickerProps, RhfDatePickerProps, RhfDateTimePickerProps, RhfFileUploadProps, RhfMoneyFieldProps, RhfRadioGroupOption, RhfRadioGroupProps, RhfRatingProps, RhfSimpleFileProps, RhfSliderProps, RhfSwitchProps, RhfTextFieldProps, UploadedFile };
