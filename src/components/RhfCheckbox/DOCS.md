# RhfCheckbox - Documentação Completa

O `RhfCheckbox` é um componente que integra o Checkbox do Material-UI com React Hook Form, fornecendo uma solução completa para checkboxes com validação e gerenciamento de estado.

## Índice

- [Instalação e Importação](#instalação-e-importação)
- [Interface TypeScript](#interface-typescript)
- [Propriedades](#propriedades)
- [Exemplos Básicos](#exemplos-básicos)
- [Casos de Uso Avançados](#casos-de-uso-avançados)
- [Validação](#validação)
- [Acessibilidade](#acessibilidade)
- [Performance](#performance)
- [Solução de Problemas](#solução-de-problemas)

## Instalação e Importação

```bash
npm install @hox/capy react-hook-form @mui/material
```

```typescript
import { RhfCheckbox } from "@hox/capy";
import { useForm } from "react-hook-form";
```

## Interface TypeScript

```typescript
interface RhfCheckboxProps<TFieldValues, TName>
  extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Label para o checkbox */
  label: ReactNode | string;
  /** Props específicas do Material-UI Checkbox */
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  size?: "small" | "medium";
  icon?: ReactNode;
  checkedIcon?: ReactNode;
  indeterminate?: boolean;
  indeterminateIcon?: ReactNode;
  disableRipple?: boolean;
  centerRipple?: boolean;
  focusRipple?: boolean;
  disableFocusRipple?: boolean;
  disableTouchRipple?: boolean;
  touchRippleRef?: React.Ref<TouchRippleActions>;
  focusVisibleClassName?: string;
  onFocusVisible?: React.FocusEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
}
```

## Propriedades

### Propriedades Principais

| Propriedade    | Tipo                    | Obrigatório | Padrão  | Descrição                                |
| -------------- | ----------------------- | ----------- | ------- | ---------------------------------------- |
| `name`         | `string`                | ✅          | -       | Nome do campo para validação e submissão |
| `label`        | `ReactNode \| string`   | ✅          | -       | Label do checkbox                        |
| `control`      | `Control<TFieldValues>` | ✅          | -       | Controle do React Hook Form              |
| `defaultValue` | `boolean`               | ❌          | `false` | Valor inicial do checkbox                |
| `disabled`     | `boolean`               | ❌          | `false` | Estado desabilitado                      |
| `helperText`   | `string`                | ❌          | -       | Texto de ajuda                           |
| `error`        | `FieldError`            | ❌          | -       | Objeto de erro do React Hook Form        |

### Propriedades de Estilo

| Propriedade     | Tipo                                                                                   | Padrão      | Descrição            |
| --------------- | -------------------------------------------------------------------------------------- | ----------- | -------------------- |
| `color`         | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning'` | `'primary'` | Cor do checkbox      |
| `size`          | `'small' \| 'medium'`                                                                  | `'medium'`  | Tamanho do checkbox  |
| `indeterminate` | `boolean`                                                                              | `false`     | Estado indeterminado |

## Exemplos Básicos

### 1. Checkbox Simples

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfCheckbox } from "@hox/capy";

interface FormData {
  termsAccepted: boolean;
}

export const SimpleCheckbox = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Dados:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfCheckbox
        name="termsAccepted"
        label="Aceito os termos e condições"
        control={control}
        defaultValue={false}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};
```

### 2. Checkbox com Valor Padrão

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfCheckbox } from "@hox/capy";

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

export const NotificationForm = () => {
  const { control, handleSubmit } = useForm<NotificationSettings>({
    defaultValues: {
      emailNotifications: true, // Pré-selecionado
      smsNotifications: false,
      pushNotifications: true, // Pré-selecionado
    },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <h3>Configurações de Notificação</h3>

      <RhfCheckbox
        name="emailNotifications"
        label="Receber notificações por email"
        control={control}
        defaultValue={true}
        color="primary"
      />

      <RhfCheckbox
        name="smsNotifications"
        label="Receber notificações por SMS"
        control={control}
        defaultValue={false}
        color="secondary"
      />

      <RhfCheckbox
        name="pushNotifications"
        label="Receber notificações push"
        control={control}
        defaultValue={true}
        color="success"
      />

      <button type="submit">Salvar Configurações</button>
    </form>
  );
};
```

### 3. Checkbox com Diferentes Tamanhos

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfCheckbox } from "@hox/capy";
import { Box, Typography } from "@mui/material";

interface PreferencesForm {
  smallOption: boolean;
  mediumOption: boolean;
}

export const SizedCheckboxes = () => {
  const { control } = useForm<PreferencesForm>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Opções de Tamanho</Typography>

      <RhfCheckbox
        name="smallOption"
        label="Checkbox pequeno"
        control={control}
        size="small"
        color="primary"
      />

      <RhfCheckbox
        name="mediumOption"
        label="Checkbox médio"
        control={control}
        size="medium"
        color="primary"
      />
    </Box>
  );
};
```

## Casos de Uso Avançados

### 1. Formulário de Permissões com Validação

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfCheckbox } from "@hox/capy";
import { Box, Paper, Typography, Button } from "@mui/material";

const schema = yup.object({
  readPermission: yup.boolean(),
  writePermission: yup.boolean(),
  deletePermission: yup.boolean().when("writePermission", {
    is: true,
    then: (schema) =>
      schema.oneOf(
        [false],
        "Não é possível ter permissão de exclusão sem permissão de escrita"
      ),
  }),
  adminPermission: yup.boolean().when(["readPermission", "writePermission"], {
    is: (read: boolean, write: boolean) => !read || !write,
    then: (schema) =>
      schema.oneOf(
        [false],
        "Permissão de admin requer permissões de leitura e escrita"
      ),
  }),
});

interface PermissionsForm {
  readPermission: boolean;
  writePermission: boolean;
  deletePermission: boolean;
  adminPermission: boolean;
}

export const PermissionsManager = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PermissionsForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      readPermission: true,
      writePermission: false,
      deletePermission: false,
      adminPermission: false,
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: PermissionsForm) => {
    console.log("Permissões configuradas:", data);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h5" gutterBottom>
        Gerenciamento de Permissões
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <RhfCheckbox
            name="readPermission"
            label="Permissão de Leitura"
            control={control}
            color="info"
            helperText="Permite visualizar conteúdo"
          />

          <RhfCheckbox
            name="writePermission"
            label="Permissão de Escrita"
            control={control}
            color="warning"
            disabled={!watchedValues.readPermission}
            helperText={
              !watchedValues.readPermission
                ? "Requer permissão de leitura"
                : "Permite criar e editar conteúdo"
            }
          />

          <RhfCheckbox
            name="deletePermission"
            label="Permissão de Exclusão"
            control={control}
            color="error"
            disabled={!watchedValues.writePermission}
            error={errors.deletePermission}
            helperText={
              errors.deletePermission?.message ||
              (!watchedValues.writePermission
                ? "Requer permissão de escrita"
                : "Permite excluir conteúdo")
            }
          />

          <RhfCheckbox
            name="adminPermission"
            label="Permissão de Administrador"
            control={control}
            color="secondary"
            disabled={
              !watchedValues.readPermission || !watchedValues.writePermission
            }
            error={errors.adminPermission}
            helperText={
              errors.adminPermission?.message || "Acesso total ao sistema"
            }
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={Object.keys(errors).length > 0}
          >
            Salvar Permissões
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
```

### 2. Checkbox com Estado Indeterminado (Select All)

```typescript
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { RhfCheckbox } from "@hox/capy";
import { Box, Paper, Typography, Divider } from "@mui/material";

interface TaskSelection {
  selectAll: boolean;
  task1: boolean;
  task2: boolean;
  task3: boolean;
  task4: boolean;
}

export const TaskSelector = () => {
  const { control, setValue, handleSubmit } = useForm<TaskSelection>({
    defaultValues: {
      selectAll: false,
      task1: false,
      task2: false,
      task3: false,
      task4: false,
    },
  });

  const watchedValues = useWatch({ control });
  const tasks = ["task1", "task2", "task3", "task4"] as const;

  // Lógica para controlar o estado "select all"
  useEffect(() => {
    const selectedTasks = tasks.filter((task) => watchedValues[task]).length;
    const allSelected = selectedTasks === tasks.length;
    const someSelected = selectedTasks > 0 && selectedTasks < tasks.length;

    setValue("selectAll", allSelected);
  }, [
    watchedValues.task1,
    watchedValues.task2,
    watchedValues.task3,
    watchedValues.task4,
    setValue,
  ]);

  const handleSelectAll = (checked: boolean) => {
    tasks.forEach((task) => setValue(task, checked));
  };

  const getSelectAllState = () => {
    const selectedTasks = tasks.filter((task) => watchedValues[task]).length;
    return {
      checked: selectedTasks === tasks.length,
      indeterminate: selectedTasks > 0 && selectedTasks < tasks.length,
    };
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Seletor de Tarefas
      </Typography>

      <form onSubmit={handleSubmit(console.log)}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <RhfCheckbox
            name="selectAll"
            label="Selecionar Todas"
            control={control}
            indeterminate={getSelectAllState().indeterminate}
            onChange={(e) => handleSelectAll(e.target.checked)}
            color="primary"
            sx={{ fontWeight: "bold" }}
          />

          <Divider sx={{ my: 1 }} />

          <Box sx={{ pl: 2 }}>
            <RhfCheckbox
              name="task1"
              label="Revisar documentação"
              control={control}
              color="primary"
            />

            <RhfCheckbox
              name="task2"
              label="Implementar testes"
              control={control}
              color="primary"
            />

            <RhfCheckbox
              name="task3"
              label="Corrigir bugs"
              control={control}
              color="primary"
            />

            <RhfCheckbox
              name="task4"
              label="Deploy para produção"
              control={control}
              color="primary"
            />
          </Box>
        </Box>
      </form>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Tarefas selecionadas:{" "}
        {tasks.filter((task) => watchedValues[task]).length} de {tasks.length}
      </Typography>
    </Paper>
  );
};
```

### 3. Checkbox Customizado com Ícones

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfCheckbox } from "@hox/capy";
import {
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder,
  Bookmark,
  BookmarkBorder,
} from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";

interface CustomCheckboxForm {
  favorite: boolean;
  starred: boolean;
  bookmarked: boolean;
}

export const CustomIconCheckboxes = () => {
  const { control, handleSubmit } = useForm<CustomCheckboxForm>();

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Checkbox com Ícones Customizados
      </Typography>

      <form onSubmit={handleSubmit(console.log)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <RhfCheckbox
            name="favorite"
            label="Adicionar aos favoritos"
            control={control}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            color="error"
          />

          <RhfCheckbox
            name="starred"
            label="Marcar com estrela"
            control={control}
            icon={<StarBorder />}
            checkedIcon={<Star />}
            color="warning"
          />

          <RhfCheckbox
            name="bookmarked"
            label="Salvar nos bookmarks"
            control={control}
            icon={<BookmarkBorder />}
            checkedIcon={<Bookmark />}
            color="info"
          />
        </Box>
      </form>
    </Paper>
  );
};
```

### 4. Formulário de Configurações de Privacidade

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfCheckbox } from "@hox/capy";
import {
  Box,
  Paper,
  Typography,
  Button,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const privacySchema = yup.object({
  profileVisible: yup.boolean(),
  emailVisible: yup.boolean(),
  phoneVisible: yup.boolean().when("profileVisible", {
    is: false,
    then: (schema) =>
      schema.oneOf(
        [false],
        "Telefone não pode ser visível se o perfil estiver oculto"
      ),
  }),
  allowMessages: yup.boolean(),
  allowNotifications: yup.boolean(),
  shareData: yup.boolean(),
  marketingEmails: yup.boolean().when("shareData", {
    is: false,
    then: (schema) =>
      schema.oneOf(
        [false],
        "Emails de marketing requerem compartilhamento de dados"
      ),
  }),
});

interface PrivacySettings {
  profileVisible: boolean;
  emailVisible: boolean;
  phoneVisible: boolean;
  allowMessages: boolean;
  allowNotifications: boolean;
  shareData: boolean;
  marketingEmails: boolean;
}

export const PrivacySettingsForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<PrivacySettings>({
    resolver: yupResolver(privacySchema),
    mode: "onChange",
    defaultValues: {
      profileVisible: true,
      emailVisible: false,
      phoneVisible: false,
      allowMessages: true,
      allowNotifications: true,
      shareData: false,
      marketingEmails: false,
    },
  });

  const watchedValues = watch();
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Configurações de Privacidade
      </Typography>

      {hasErrors && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Por favor, corrija os erros antes de continuar.
        </Alert>
      )}

      <form onSubmit={handleSubmit(console.log)}>
        {/* Visibilidade do Perfil */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Visibilidade do Perfil</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <RhfCheckbox
                name="profileVisible"
                label="Perfil visível publicamente"
                control={control}
                color="primary"
                helperText="Permite que outros usuários vejam seu perfil"
              />

              <RhfCheckbox
                name="emailVisible"
                label="Email visível no perfil"
                control={control}
                color="warning"
                disabled={!watchedValues.profileVisible}
                helperText={
                  !watchedValues.profileVisible
                    ? "Requer perfil visível"
                    : "Mostra seu email no perfil público"
                }
              />

              <RhfCheckbox
                name="phoneVisible"
                label="Telefone visível no perfil"
                control={control}
                color="warning"
                disabled={!watchedValues.profileVisible}
                error={errors.phoneVisible}
                helperText={
                  errors.phoneVisible?.message ||
                  (!watchedValues.profileVisible
                    ? "Requer perfil visível"
                    : "Mostra seu telefone no perfil público")
                }
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Comunicação */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Comunicação</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <RhfCheckbox
                name="allowMessages"
                label="Permitir mensagens de outros usuários"
                control={control}
                color="info"
              />

              <RhfCheckbox
                name="allowNotifications"
                label="Receber notificações do sistema"
                control={control}
                color="info"
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Compartilhamento de Dados */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Compartilhamento de Dados</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <RhfCheckbox
                name="shareData"
                label="Compartilhar dados para melhorias"
                control={control}
                color="secondary"
                helperText="Ajuda a melhorar nossos serviços"
              />

              <RhfCheckbox
                name="marketingEmails"
                label="Receber emails de marketing"
                control={control}
                color="secondary"
                disabled={!watchedValues.shareData}
                error={errors.marketingEmails}
                helperText={
                  errors.marketingEmails?.message ||
                  (!watchedValues.shareData
                    ? "Requer compartilhamento de dados"
                    : "Ofertas e novidades por email")
                }
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={hasErrors}
            sx={{ flexGrow: 1 }}
          >
            Salvar Configurações
          </Button>

          {isDirty && (
            <Button variant="outlined" color="warning">
              Resetar
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};
```

## Validação

### Validação com Yup

```typescript
import * as yup from "yup";

const schema = yup.object({
  termsAccepted: yup
    .boolean()
    .oneOf([true], "Você deve aceitar os termos e condições"),

  privacyPolicy: yup
    .boolean()
    .oneOf([true], "Você deve aceitar a política de privacidade"),

  newsletter: yup.boolean(), // Opcional

  ageConfirmation: yup.boolean().when("termsAccepted", {
    is: true,
    then: (schema) =>
      schema.oneOf([true], "Confirmação de idade é obrigatória"),
  }),
});
```

### Validação Customizada

```typescript
import { useForm } from "react-hook-form";

const {
  control,
  formState: { errors },
} = useForm({
  mode: "onChange",
  rules: {
    termsAccepted: {
      required: "Aceite os termos para continuar",
      validate: (value) => value === true || "Os termos devem ser aceitos",
    },
  },
});
```

## Acessibilidade

### Recursos de Acessibilidade

```typescript
// Boas práticas de acessibilidade
<RhfCheckbox
  name="accessibleCheckbox"
  label="Checkbox acessível"
  control={control}
  // Labels descritivos são essenciais
  helperText="Esta opção ativa funcionalidades extras"
  // Cores contrastantes
  color="primary"
  // Estados claros
  disabled={false}
/>
```

### Navegação por Teclado

O componente suporta navegação completa por teclado:

- **Tab**: Navegar entre checkboxes
- **Espaço**: Marcar/desmarcar checkbox
- **Enter**: Marcar/desmarcar checkbox (quando focado)

### Screen Readers

O componente inclui suporte adequado para leitores de tela:

- Labels associados corretamente
- Estados de erro comunicados
- Texto de ajuda acessível

## Performance

### Otimização com React.memo

```typescript
import React, { memo } from "react";
import { RhfCheckbox } from "@hox/capy";

const OptimizedCheckbox = memo<CheckboxProps>(
  ({ name, label, control, ...props }) => {
    return (
      <RhfCheckbox name={name} label={label} control={control} {...props} />
    );
  }
);
```

### Uso do useWatch para Performance

```typescript
import { useWatch } from "react-hook-form";

// Em vez de watch() para observar valores específicos
const specificValue = useWatch({
  control,
  name: "specificCheckbox",
});

// Evita re-renders desnecessários
```

### Lazy Loading para Formulários Grandes

```typescript
import { lazy, Suspense } from "react";

const HeavyCheckboxForm = lazy(() => import("./HeavyCheckboxForm"));

const LazyCheckboxForm = () => (
  <Suspense fallback={<div>Carregando formulário...</div>}>
    <HeavyCheckboxForm />
  </Suspense>
);
```

## Solução de Problemas

### 1. Checkbox não responde a mudanças

**Problema**: O checkbox não atualiza quando clicado.

**Solução**:

```typescript
// ❌ Errado - não use value e onChange diretamente
<RhfCheckbox
  name="checkbox"
  control={control}
  value={someValue} // Remove isto
  onChange={someHandler} // Remove isto
/>

// ✅ Correto - deixe o React Hook Form gerenciar
<RhfCheckbox
  name="checkbox"
  control={control}
  defaultValue={false}
/>
```

### 2. Validação não funciona

**Problema**: Mensagens de erro não aparecem.

**Solução**:

```typescript
// ✅ Configure o mode adequadamente
const { control } = useForm({
  mode: "onChange", // ou 'onBlur', 'onSubmit'
});

// ✅ Use error do fieldState ou passe explicitamente
<RhfCheckbox name="checkbox" control={control} error={errors.checkbox} />;
```

### 3. Performance em formulários grandes

**Problema**: Formulário fica lento com muitos checkboxes.

**Solução**:

```typescript
// ✅ Use useWatch apenas para valores específicos
const criticalValue = useWatch({
  control,
  name: "criticalCheckbox",
});

// ✅ Memoize componentes que não mudam frequentemente
const StaticCheckbox = memo(RhfCheckbox);

// ✅ Considere dividir em seções menores
```

### 4. Checkbox indeterminado não funciona

**Problema**: Estado indeterminado não é exibido.

**Solução**:

```typescript
// ✅ Controle o estado indeterminado explicitamente
const [indeterminate, setIndeterminate] = useState(false);

<RhfCheckbox
  name="selectAll"
  control={control}
  indeterminate={indeterminate}
  // Atualize o estado baseado na lógica do seu app
/>;
```

### 5. Estilos customizados não aplicam

**Problema**: Customizações visuais não funcionam.

**Solução**:

```typescript
// ✅ Use sx prop para estilos customizados
<RhfCheckbox
  name="styled"
  control={control}
  sx={{
    color: "custom.main",
    "&.Mui-checked": {
      color: "custom.dark",
    },
  }}
/>

// ✅ Para mudanças mais profundas, use tema customizado
```

### 6. TypeScript apresenta erros

**Problema**: Erros de tipo com as props.

**Solução**:

```typescript
// ✅ Defina tipos explícitos para o formulário
interface FormData {
  checkbox: boolean; // Sempre boolean para checkboxes
}

const { control } = useForm<FormData>();

// ✅ Use as propriedades corretas
<RhfCheckbox<FormData, "checkbox">
  name="checkbox"
  control={control}
  label="Meu Checkbox"
/>;
```

### Mensagens de Erro Comuns

| Erro                                                     | Causa                                      | Solução                                              |
| -------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------- |
| `Cannot read property 'onChange' of undefined`           | Control não passado corretamente           | Verifique se `control` está sendo passado do useForm |
| `Warning: A component is changing an uncontrolled input` | Mudança entre controlled/uncontrolled      | Use `defaultValue` consistentemente                  |
| `Invalid hook call`                                      | RhfCheckbox usado fora de componente React | Mova o componente para dentro de uma função React    |
| `Type 'string' is not assignable to type 'boolean'`      | Tipo incorreto para valor do checkbox      | Use boolean para valores de checkbox                 |

### Dicas de Debug

```typescript
// 1. Monitore valores do formulário
const watchedValues = watch();
console.log("Form values:", watchedValues);

// 2. Verifique erros
console.log("Form errors:", errors);

// 3. Use React DevTools para inspecionar props

// 4. Teste isoladamente
const TestCheckbox = () => {
  const { control } = useForm();
  return <RhfCheckbox name="test" label="Teste" control={control} />;
};
```

---

Para mais exemplos e casos de uso, consulte nossa [documentação de componentes](../README.md) ou visite o [Storybook](https://storybook.example.com).
