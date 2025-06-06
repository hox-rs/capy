# Guia de Tipos TypeScript - HOX Capy

Este guia apresenta uma visão detalhada dos tipos TypeScript utilizados na biblioteca HOX Capy, incluindo interfaces base, tipos específicos de componentes e dicas para uso efetivo.

## Sumário

- [Tipos Base](#tipos-base)
- [Tipos por Componente](#tipos-por-componente)
- [Utilitários de Tipos](#utilitários-de-tipos)
- [Padrões de Uso](#padrões-de-uso)
- [Troubleshooting](#troubleshooting)

## Tipos Base

### BaseRhfFieldProps

Interface base para todos os componentes RHF da biblioteca:

```typescript
interface BaseRhfFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  /** Nome do campo usado em validações e useForm */
  name: TName;
  /** Objeto control do react-hook-form */
  control: Control<TFieldValues>;
  /** Objeto de erro do react-hook-form */
  error?: FieldError;
  /** Label para o campo */
  label?: string;
  /** Texto de ajuda exibido abaixo do campo */
  helperText?: string;
  /** Se o campo está desabilitado */
  disabled?: boolean;
  /** Valor padrão para o campo */
  defaultValue?: TFieldValues[TName];
}
```

### BaseOption

Interface para opções de componentes de seleção:

```typescript
interface BaseOption {
  /** Label de exibição para a opção */
  label: string;
  /** Valor da opção */
  value: string | number | boolean;
  /** Se esta opção está desabilitada */
  disabled?: boolean;
}
```

### Funções Utilitárias

```typescript
/** Obtém o texto de erro apropriado */
const getErrorText = (
  error?: FieldError,
  helperText?: string
): string | undefined => {
  if (error?.message) {
    return error.message;
  }
  return helperText;
};

/** Determina se o campo está em estado de erro */
const hasError = (error?: FieldError): boolean => {
  return !!error;
};
```

## Tipos por Componente

### RhfTextField

```typescript
interface RhfTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Props do TextField do Material-UI */
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  fullWidth?: boolean;
  margin?: "none" | "dense" | "normal";

  /** Props específicos do InputProps */
  InputProps?: Partial<OutlinedInputProps>;

  /** Callbacks */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
```

### RhfAutocomplete

```typescript
interface RhfAutocompleteOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface RhfAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Opções disponíveis para seleção */
  options: RhfAutocompleteOption[];

  /** Se permite seleção múltipla */
  multiple?: boolean;

  /** Se permite entrada livre (freeSolo) */
  freeSolo?: boolean;

  /** Texto quando não há opções */
  noOptionsText?: string;

  /** Texto durante carregamento */
  loadingText?: string;

  /** Se está carregando */
  loading?: boolean;

  /** Renderização customizada de opções */
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: RhfAutocompleteOption
  ) => React.ReactNode;

  /** Props do Material-UI */
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  fullWidth?: boolean;
  InputProps?: Partial<OutlinedInputProps>;
}
```

### RhfMoneyField

```typescript
interface RhfMoneyFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Símbolo da moeda */
  currencySymbol?: string;

  /** Separador decimal */
  decimalSeparator?: string;

  /** Separador de milhares */
  thousandSeparator?: string;

  /** Número de casas decimais */
  precision?: number;

  /** Se permite valores negativos */
  allowNegative?: boolean;

  /** Valor mínimo permitido */
  min?: number;

  /** Valor máximo permitido */
  max?: number;

  /** Props do Material-UI */
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  fullWidth?: boolean;
  margin?: "none" | "dense" | "normal";
  InputProps?: Partial<OutlinedInputProps>;
}
```

### RhfDatePicker

```typescript
interface RhfDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Data mínima selecionável */
  minDate?: Date;

  /** Data máxima selecionável */
  maxDate?: Date;

  /** Formato de exibição da data */
  format?: string;

  /** Se deve abrir ao focar */
  openOnFocus?: boolean;

  /** Props do Material-UI */
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  fullWidth?: boolean;

  /** Callbacks */
  onChange?: (date: Date | null) => void;
  onError?: (reason: string, value: Date | null) => void;
}
```

### RhfCheckboxGroup

```typescript
interface CheckboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface RhfCheckboxGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Opções de checkbox */
  options: CheckboxOption[];

  /** Direção do layout */
  row?: boolean;

  /** Props do Material-UI */
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium";
}
```

## Utilitários de Tipos

### Tipos de Formulário Tipados

Para criar formulários com tipos estáticos:

```typescript
// Definir tipo dos dados do formulário
interface FormData {
  nome: string;
  email: string;
  idade: number;
  cidade: string;
  aceitouTermos: boolean;
}

// Usar com useForm
const { control, handleSubmit } = useForm<FormData>();

// Componentes automaticamente tipados
<RhfTextField<FormData>
  name="nome" // Autocomplete e verificação de tipo
  control={control}
  label="Nome"
/>;
```

### Extensão de Props

Para criar componentes customizados:

```typescript
interface MeuComponenteProps<T extends FieldValues = FieldValues>
  extends RhfTextFieldProps<T> {
  minhaPropriedade?: string;
}

function MeuComponente<T extends FieldValues = FieldValues>({
  minhaPropriedade,
  ...props
}: MeuComponenteProps<T>) {
  return <RhfTextField {...props} />;
}
```

### Tipos de Validação

Com Yup:

```typescript
import * as yup from "yup";
import type { InferType } from "yup";

const schema = yup.object({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  idade: yup.number().min(18).required(),
});

// Inferir tipo automaticamente do schema
type FormData = InferType<typeof schema>;

// Usar no formulário
const { control } = useForm<FormData>({
  resolver: yupResolver(schema),
});
```

## Padrões de Uso

### 1. Formulário Básico Tipado

```typescript
interface UserFormData {
  name: string;
  email: string;
  age: number;
}

function UserForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  const onSubmit = (data: UserFormData) => {
    console.log(data); // Totalmente tipado
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfTextField<UserFormData>
        name="name" // TypeScript verifica se existe em UserFormData
        control={control}
        error={errors.name}
        label="Nome"
      />
    </form>
  );
}
```

### 2. Componente Reutilizável

```typescript
interface BaseFormProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
}

function AddressForm<T extends FieldValues>({
  control,
  errors
}: BaseFormProps<T>) {
  return (
    <>
      <RhfTextField
        name="street" as FieldPath<T>
        control={control}
        error={errors.street}
        label="Rua"
      />
      <RhfTextField
        name="city" as FieldPath<T>
        control={control}
        error={errors.city}
        label="Cidade"
      />
    </>
  );
}
```

### 3. Hook Customizado

```typescript
interface UseFormWithValidationResult<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  isValid: boolean;
}

function useFormWithValidation<T extends FieldValues>(
  schema: yup.Schema<T>
): UseFormWithValidationResult<T> {
  const form = useForm<T>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return {
    control: form.control,
    errors: form.formState.errors,
    handleSubmit: form.handleSubmit,
    isValid: form.formState.isValid,
  };
}
```

### 4. Opções Tipadas

```typescript
// Definir enum para opções
enum StatusOptions {
  ATIVO = "ativo",
  INATIVO = "inativo",
  PENDENTE = "pendente",
}

// Converter para formato de opções
const statusOptions: BaseOption[] = Object.entries(StatusOptions).map(
  ([key, value]) => ({
    label: key.charAt(0) + key.slice(1).toLowerCase(),
    value,
  })
);

// Usar no componente
<RhfAutocomplete
  name="status"
  control={control}
  options={statusOptions}
  label="Status"
/>;
```

## Troubleshooting

### Problemas Comuns

#### 1. Erro de Tipo no Nome do Campo

**Problema:**

```typescript
// Error: Argument of type '"campo_inexistente"' is not assignable to parameter of type keyof FormData
<RhfTextField name="campo_inexistente" ... />
```

**Solução:** Certifique-se de que o nome do campo existe no tipo:

```typescript
interface FormData {
  campo_existente: string;
}

<RhfTextField<FormData> name="campo_existente" ... />
```

#### 2. Problemas com Generics

**Problema:**

```typescript
// Error: Type instantiation is excessively deep and possibly infinite
```

**Solução:** Simplifique os tipos ou use type assertion:

```typescript
<RhfTextField name={"meuCampo" as FieldPath<FormData>} control={control} />
```

#### 3. Conflitos de Props do Material-UI

**Problema:** Props do Material-UI conflitando com props do componente.

**Solução:** Use namespacing específico:

```typescript
interface MyTextFieldProps extends Omit<RhfTextFieldProps, "variant"> {
  customVariant?: "special";
}
```

#### 4. Tipos de defaultValue

**Problema:** Erro ao definir defaultValue com tipo incorreto.

**Solução:** Certifique-se de que o tipo corresponde:

```typescript
interface FormData {
  valor: number;
}

<RhfMoneyField<FormData>
  name="valor"
  defaultValue={0} // number, não string
  control={control}
/>;
```

### Dicas de Performance

#### 1. Uso de Generic Constraints

```typescript
// Em vez de
function MeuComponente<T>(props: Props<T>) { ... }

// Use constraints
function MeuComponente<T extends FieldValues>(props: Props<T>) { ... }
```

#### 2. Memoização de Tipos

```typescript
// Cache tipos complexos
type FormDataKeys = keyof FormData;
const validKeys: FormDataKeys[] = ["name", "email", "age"];
```

#### 3. Inferência Automática

```typescript
// Deixe o TypeScript inferir quando possível
const { control } = useForm<FormData>(); // Tipo inferido automaticamente

<RhfTextField name="nome" control={control} />; // Generics inferidos
```

### Recursos Avançados

#### 1. Conditional Types

```typescript
type FieldType<T, K extends keyof T> = T[K] extends string
  ? "text"
  : T[K] extends number
  ? "number"
  : "text";

function AutoField<T extends FieldValues, K extends keyof T>({
  name,
  control,
}: {
  name: K;
  control: Control<T>;
}) {
  const fieldType: FieldType<T, K> =
    typeof control._defaultValues[name] === "number"
      ? ("number" as FieldType<T, K>)
      : ("text" as FieldType<T, K>);

  return <RhfTextField name={name} type={fieldType} control={control} />;
}
```

#### 2. Template Literal Types

```typescript
type FieldPrefix = "user" | "address" | "contact";
type FieldSuffix = "name" | "email" | "phone";
type FieldName = `${FieldPrefix}_${FieldSuffix}`;

interface DynamicFormData {
  [K in FieldName]: string;
}
```

---

**Última atualização:** Janeiro 2025
**Versão TypeScript:** 5.8.3+
**Compatibilidade:** React Hook Form 7.56.4+
