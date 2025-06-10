/**
 * Shared constants and default configurations for RHF components
 */

/**
 * Default props for common Material-UI components
 */
export const DEFAULT_FIELD_PROPS = {
  variant: "outlined" as const,
  fullWidth: true,
  size: "medium" as const,
};

/**
 * Default date picker formats
 */
export const DATE_FORMATS = {
  DATE: "DD/MM/YYYY",
  DATETIME: "DD/MM/YYYY HH:mm",
  TIME: "HH:mm",
} as const;

/**
 * Default autocomplete configurations
 */
export const AUTOCOMPLETE_DEFAULTS = {
  noOptionsText: "Nenhuma opção encontrada",
  loadingText: "Carregando...",
  clearText: "Limpar",
  closeText: "Fechar",
  openText: "Abrir",
} as const;

/**
 * Default money field configurations
 */
export const MONEY_FIELD_DEFAULTS = {
  prefix: "R$ ",
  thousandSeparator: ".",
  decimalSeparator: ",",
  precision: 2,
  allowNegative: false,
} as const;

/**
 * Common error messages
 */
export const ERROR_MESSAGES = {
  REQUIRED: "Campo obrigatório",
  INVALID_EMAIL: "Email inválido",
  INVALID_DATE: "Data inválida",
  MIN_LENGTH: (min: number) => `Mínimo de ${min} caracteres`,
  MAX_LENGTH: (max: number) => `Máximo de ${max} caracteres`,
  MIN_VALUE: (min: number) => `Valor mínimo: ${min}`,
  MAX_VALUE: (max: number) => `Valor máximo: ${max}`,
} as const;

/**
 * Component sizes mapping
 */
export const COMPONENT_SIZES = {
  small: "small",
  medium: "medium",
  large: "large",
} as const;

/**
 * Component variants mapping
 */
export const COMPONENT_VARIANTS = {
  outlined: "outlined",
  filled: "filled",
  standard: "standard",
} as const;
