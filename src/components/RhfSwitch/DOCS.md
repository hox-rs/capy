# RhfSwitch - Documentação Completa

O `RhfSwitch` é um componente que integra o Switch do Material-UI com React Hook Form, fornecendo uma solução elegante para controles de alternância (toggle) com validação e gerenciamento de estado.

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
import { RhfSwitch } from "@hox/capy";
import { useForm } from "react-hook-form";
```

## Interface TypeScript

```typescript
interface RhfSwitchProps<TFieldValues, TName>
  extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Label para o switch */
  label: ReactNode | string;
  /** Posicionamento do label */
  labelPlacement?: "end" | "start" | "top" | "bottom";
  /** Props específicas do Material-UI Switch */
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  size?: "small" | "medium";
  edge?: "start" | "end" | false;
  disableRipple?: boolean;
  centerRipple?: boolean;
  focusRipple?: boolean;
  disableFocusRipple?: boolean;
  disableTouchRipple?: boolean;
  touchRippleRef?: React.Ref<TouchRippleActions>;
  focusVisibleClassName?: string;
  onFocusVisible?: React.FocusEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
  icon?: ReactNode;
  checkedIcon?: ReactNode;
  thumb?: ReactNode;
  track?: ReactNode;
}
```

## Propriedades

### Propriedades Principais

| Propriedade      | Tipo                                    | Obrigatório | Padrão  | Descrição                                |
| ---------------- | --------------------------------------- | ----------- | ------- | ---------------------------------------- |
| `name`           | `string`                                | ✅          | -       | Nome do campo para validação e submissão |
| `label`          | `ReactNode \| string`                   | ✅          | -       | Label do switch                          |
| `control`        | `Control<TFieldValues>`                 | ✅          | -       | Controle do React Hook Form              |
| `defaultValue`   | `boolean`                               | ❌          | `false` | Valor inicial do switch                  |
| `disabled`       | `boolean`                               | ❌          | `false` | Estado desabilitado                      |
| `helperText`     | `string`                                | ❌          | -       | Texto de ajuda                           |
| `error`          | `FieldError`                            | ❌          | -       | Objeto de erro do React Hook Form        |
| `labelPlacement` | `'end' \| 'start' \| 'top' \| 'bottom'` | ❌          | `'end'` | Posicionamento do label                  |

### Propriedades de Estilo

| Propriedade | Tipo                                                                                   | Padrão      | Descrição               |
| ----------- | -------------------------------------------------------------------------------------- | ----------- | ----------------------- |
| `color`     | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning'` | `'primary'` | Cor do switch           |
| `size`      | `'small' \| 'medium'`                                                                  | `'medium'`  | Tamanho do switch       |
| `edge`      | `'start' \| 'end' \| false`                                                            | `false`     | Posicionamento na borda |

## Exemplos Básicos

### 1. Switch Simples

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfSwitch } from "@hox/capy";

interface SettingsForm {
  darkMode: boolean;
}

export const SimpleSwitch = () => {
  const { control, handleSubmit, watch } = useForm<SettingsForm>({
    defaultValues: {
      darkMode: false,
    },
  });

  const isDarkMode = watch("darkMode");

  const onSubmit = (data: SettingsForm) => {
    console.log("Configurações:", data);
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#333",
        padding: 20,
        transition: "all 0.3s",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfSwitch
          name="darkMode"
          label="Modo Escuro"
          control={control}
          color="primary"
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};
```

### 2. Switch com Diferentes Posicionamentos

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfSwitch } from "@hox/capy";
import { Box, Paper, Typography } from "@mui/material";

interface LayoutSettings {
  leftLabel: boolean;
  rightLabel: boolean;
  topLabel: boolean;
  bottomLabel: boolean;
}

export const LabelPositionSwitches = () => {
  const { control } = useForm<LayoutSettings>();

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Posicionamento do Label
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <RhfSwitch
          name="leftLabel"
          label="Label à esquerda"
          control={control}
          labelPlacement="start"
          color="primary"
        />

        <RhfSwitch
          name="rightLabel"
          label="Label à direita"
          control={control}
          labelPlacement="end"
          color="secondary"
        />

        <RhfSwitch
          name="topLabel"
          label="Label no topo"
          control={control}
          labelPlacement="top"
          color="success"
        />

        <RhfSwitch
          name="bottomLabel"
          label="Label na base"
          control={control}
          labelPlacement="bottom"
          color="warning"
        />
      </Box>
    </Paper>
  );
};
```

### 3. Switches com Diferentes Tamanhos e Cores

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfSwitch } from "@hox/capy";
import { Box, Paper, Typography, Grid } from "@mui/material";

interface VariationSettings {
  primarySmall: boolean;
  primaryMedium: boolean;
  secondarySmall: boolean;
  secondaryMedium: boolean;
  successSmall: boolean;
  warningMedium: boolean;
}

export const SwitchVariations = () => {
  const { control } = useForm<VariationSettings>();

  const switches = [
    {
      name: "primarySmall",
      label: "Primário Pequeno",
      color: "primary",
      size: "small",
    },
    {
      name: "primaryMedium",
      label: "Primário Médio",
      color: "primary",
      size: "medium",
    },
    {
      name: "secondarySmall",
      label: "Secundário Pequeno",
      color: "secondary",
      size: "small",
    },
    {
      name: "secondaryMedium",
      label: "Secundário Médio",
      color: "secondary",
      size: "medium",
    },
    {
      name: "successSmall",
      label: "Sucesso Pequeno",
      color: "success",
      size: "small",
    },
    {
      name: "warningMedium",
      label: "Aviso Médio",
      color: "warning",
      size: "medium",
    },
  ] as const;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Variações de Switch
      </Typography>

      <Grid container spacing={2}>
        {switches.map((switchConfig) => (
          <Grid item xs={12} sm={6} key={switchConfig.name}>
            <RhfSwitch
              name={switchConfig.name}
              label={switchConfig.label}
              control={control}
              color={switchConfig.color}
              size={switchConfig.size}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
```

## Casos de Uso Avançados

### 1. Painel de Configurações de Aplicativo

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfSwitch } from "@hox/capy";
import {
  Box,
  Paper,
  Typography,
  Button,
  Alert,
  Divider,
  Chip,
} from "@mui/material";

const settingsSchema = yup.object({
  notifications: yup.boolean(),
  emailNotifications: yup.boolean().when("notifications", {
    is: false,
    then: (schema) =>
      schema.oneOf([false], "Notificações gerais devem estar ativas"),
  }),
  pushNotifications: yup.boolean().when("notifications", {
    is: false,
    then: (schema) =>
      schema.oneOf([false], "Notificações gerais devem estar ativas"),
  }),
  autoSave: yup.boolean(),
  backupToCloud: yup.boolean().when("autoSave", {
    is: false,
    then: (schema) =>
      schema.oneOf([false], "Auto-salvamento deve estar ativo para backup"),
  }),
  darkMode: yup.boolean(),
  reducedMotion: yup.boolean(),
  highContrast: yup.boolean(),
});

interface AppSettings {
  notifications: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  autoSave: boolean;
  backupToCloud: boolean;
  darkMode: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

export const AppSettingsPanel = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<AppSettings>({
    resolver: yupResolver(settingsSchema),
    mode: "onChange",
    defaultValues: {
      notifications: true,
      emailNotifications: true,
      pushNotifications: false,
      autoSave: true,
      backupToCloud: false,
      darkMode: false,
      reducedMotion: false,
      highContrast: false,
    },
  });

  const watchedValues = watch();
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: AppSettings) => {
    console.log("Configurações salvas:", data);
    // Aplicar configurações...
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Configurações do Aplicativo
      </Typography>

      {hasErrors && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Algumas configurações têm dependências que precisam ser corrigidas.
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Seção de Notificações */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Notificações
          </Typography>

          <RhfSwitch
            name="notifications"
            label="Habilitar notificações"
            control={control}
            color="primary"
            helperText="Controle principal para todas as notificações"
          />

          <Box sx={{ pl: 2, mt: 1 }}>
            <RhfSwitch
              name="emailNotifications"
              label="Notificações por email"
              control={control}
              color="info"
              disabled={!watchedValues.notifications}
              error={errors.emailNotifications}
              helperText={
                errors.emailNotifications?.message ||
                (!watchedValues.notifications
                  ? "Requer notificações habilitadas"
                  : "Receber updates por email")
              }
            />

            <RhfSwitch
              name="pushNotifications"
              label="Notificações push"
              control={control}
              color="info"
              disabled={!watchedValues.notifications}
              error={errors.pushNotifications}
              helperText={
                errors.pushNotifications?.message ||
                (!watchedValues.notifications
                  ? "Requer notificações habilitadas"
                  : "Notificações em tempo real")
              }
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Seção de Dados */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Dados e Backup
          </Typography>

          <RhfSwitch
            name="autoSave"
            label="Salvamento automático"
            control={control}
            color="success"
            helperText="Salva alterações automaticamente"
          />

          <Box sx={{ pl: 2, mt: 1 }}>
            <RhfSwitch
              name="backupToCloud"
              label="Backup na nuvem"
              control={control}
              color="warning"
              disabled={!watchedValues.autoSave}
              error={errors.backupToCloud}
              helperText={
                errors.backupToCloud?.message ||
                (!watchedValues.autoSave
                  ? "Requer salvamento automático"
                  : "Backup seguro na nuvem")
              }
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Seção de Acessibilidade */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Aparência e Acessibilidade
          </Typography>

          <RhfSwitch
            name="darkMode"
            label="Modo escuro"
            control={control}
            color="secondary"
            helperText="Interface com tema escuro"
          />

          <RhfSwitch
            name="reducedMotion"
            label="Reduzir movimento"
            control={control}
            color="info"
            helperText="Diminui animações para melhor acessibilidade"
          />

          <RhfSwitch
            name="highContrast"
            label="Alto contraste"
            control={control}
            color="info"
            helperText="Aumenta o contraste para melhor visibilidade"
          />
        </Box>

        {/* Status das configurações */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Configurações Ativas:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {Object.entries(watchedValues)
              .filter(([_, value]) => value)
              .map(([key, _]) => (
                <Chip
                  key={key}
                  label={key}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={hasErrors}
          fullWidth
          sx={{ mt: 2 }}
        >
          {isDirty ? "Salvar Alterações" : "Configurações Salvas"}
        </Button>
      </form>
    </Paper>
  );
};
```

### 2. Configurações de Dashboard Interativo

```typescript
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { RhfSwitch } from "@hox/capy";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";

interface DashboardConfig {
  showCharts: boolean;
  showMetrics: boolean;
  showNotifications: boolean;
  showActivity: boolean;
  liveUpdates: boolean;
  compactView: boolean;
  animatedTransitions: boolean;
}

export const InteractiveDashboard = () => {
  const { control, setValue } = useForm<DashboardConfig>({
    defaultValues: {
      showCharts: true,
      showMetrics: true,
      showNotifications: true,
      showActivity: false,
      liveUpdates: false,
      compactView: false,
      animatedTransitions: true,
    },
  });

  const config = useWatch({ control });

  // Simular aplicação das configurações em tempo real
  useEffect(() => {
    console.log("Aplicando configurações:", config);
  }, [config]);

  // Mock components do dashboard
  const ChartWidget = () => (
    <Card sx={{ height: config.compactView ? 200 : 300 }}>
      <CardContent>
        <Typography variant="h6">Gráficos</Typography>
        <LinearProgress variant="determinate" value={75} />
      </CardContent>
    </Card>
  );

  const MetricsWidget = () => (
    <Card sx={{ height: config.compactView ? 150 : 200 }}>
      <CardContent>
        <Typography variant="h6">Métricas</Typography>
        <Typography variant="h4" color="primary">
          85%
        </Typography>
      </CardContent>
    </Card>
  );

  const NotificationsWidget = () => (
    <Card sx={{ height: config.compactView ? 120 : 180 }}>
      <CardContent>
        <Typography variant="h6">Notificações</Typography>
        <Typography variant="body2">3 novas mensagens</Typography>
      </CardContent>
    </Card>
  );

  const ActivityWidget = () => (
    <Card sx={{ height: config.compactView ? 150 : 220 }}>
      <CardContent>
        <Typography variant="h6">Atividade Recente</Typography>
        <Typography variant="body2">Última atualização: agora</Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 2 }}>
      {/* Painel de Configurações */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Configurações do Dashboard
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" gutterBottom>
              Widgets
            </Typography>
            <RhfSwitch
              name="showCharts"
              label="Gráficos"
              control={control}
              size="small"
              color="primary"
            />
            <RhfSwitch
              name="showMetrics"
              label="Métricas"
              control={control}
              size="small"
              color="primary"
            />
            <RhfSwitch
              name="showNotifications"
              label="Notificações"
              control={control}
              size="small"
              color="primary"
            />
            <RhfSwitch
              name="showActivity"
              label="Atividade"
              control={control}
              size="small"
              color="primary"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" gutterBottom>
              Comportamento
            </Typography>
            <RhfSwitch
              name="liveUpdates"
              label="Updates ao vivo"
              control={control}
              size="small"
              color="success"
            />
            <RhfSwitch
              name="compactView"
              label="Visualização compacta"
              control={control}
              size="small"
              color="info"
            />
            <RhfSwitch
              name="animatedTransitions"
              label="Transições animadas"
              control={control}
              size="small"
              color="secondary"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Dashboard Dinâmico */}
      <Grid container spacing={2}>
        {config.showCharts && (
          <Grid item xs={12} md={6}>
            <ChartWidget />
          </Grid>
        )}

        {config.showMetrics && (
          <Grid item xs={12} sm={6} md={3}>
            <MetricsWidget />
          </Grid>
        )}

        {config.showNotifications && (
          <Grid item xs={12} sm={6} md={3}>
            <NotificationsWidget />
          </Grid>
        )}

        {config.showActivity && (
          <Grid item xs={12}>
            <ActivityWidget />
          </Grid>
        )}
      </Grid>

      {!config.showCharts &&
        !config.showMetrics &&
        !config.showNotifications &&
        !config.showActivity && (
          <Paper sx={{ p: 4, textAlign: "center", mt: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Nenhum widget selecionado
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ative pelo menos um widget nas configurações acima
            </Typography>
          </Paper>
        )}
    </Box>
  );
};
```

### 3. Sistema de Permissões com Hierarquia

```typescript
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfSwitch } from "@hox/capy";
import {
  Box,
  Paper,
  Typography,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import {
  ExpandMore,
  AdminPanelSettings,
  Security,
  Person,
} from "@mui/icons-material";

const permissionSchema = yup.object({
  // Admin permissions
  systemAdmin: yup.boolean(),
  userManagement: yup.boolean().when("systemAdmin", {
    is: true,
    then: (schema) =>
      schema.oneOf([true], "Admin do sistema deve ter gestão de usuários"),
  }),
  systemConfig: yup.boolean().when("systemAdmin", {
    is: true,
    then: (schema) =>
      schema.oneOf([true], "Admin do sistema deve ter configuração do sistema"),
  }),

  // Content permissions
  contentManager: yup.boolean(),
  createContent: yup.boolean().when("contentManager", {
    is: true,
    then: (schema) =>
      schema.oneOf([true], "Gestor de conteúdo deve poder criar conteúdo"),
  }),
  editContent: yup.boolean().when("contentManager", {
    is: true,
    then: (schema) =>
      schema.oneOf([true], "Gestor de conteúdo deve poder editar conteúdo"),
  }),
  deleteContent: yup.boolean().when(["contentManager", "editContent"], {
    is: (manager: boolean, edit: boolean) => manager && !edit,
    then: (schema) =>
      schema.oneOf([false], "Não é possível deletar sem poder editar"),
  }),

  // User permissions
  viewProfiles: yup.boolean(),
  editOwnProfile: yup.boolean().when("viewProfiles", {
    is: true,
    then: (schema) =>
      schema.oneOf(
        [true],
        "Visualizar perfis deve incluir editar próprio perfil"
      ),
  }),
});

interface Permissions {
  systemAdmin: boolean;
  userManagement: boolean;
  systemConfig: boolean;
  contentManager: boolean;
  createContent: boolean;
  editContent: boolean;
  deleteContent: boolean;
  viewProfiles: boolean;
  editOwnProfile: boolean;
}

export const PermissionHierarchy = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useForm<Permissions>({
    resolver: yupResolver(permissionSchema),
    mode: "onChange",
    defaultValues: {
      systemAdmin: false,
      userManagement: false,
      systemConfig: false,
      contentManager: false,
      createContent: false,
      editContent: false,
      deleteContent: false,
      viewProfiles: true,
      editOwnProfile: true,
    },
  });

  const permissions = useWatch({ control });
  const hasErrors = Object.keys(errors).length > 0;

  // Auto-activate dependent permissions
  React.useEffect(() => {
    if (permissions.systemAdmin) {
      setValue("userManagement", true);
      setValue("systemConfig", true);
    }
  }, [permissions.systemAdmin, setValue]);

  React.useEffect(() => {
    if (permissions.contentManager) {
      setValue("createContent", true);
      setValue("editContent", true);
    }
  }, [permissions.contentManager, setValue]);

  React.useEffect(() => {
    if (permissions.viewProfiles) {
      setValue("editOwnProfile", true);
    }
  }, [permissions.viewProfiles, setValue]);

  const getPermissionLevel = () => {
    if (permissions.systemAdmin)
      return { level: "Admin", color: "error", icon: <AdminPanelSettings /> };
    if (permissions.contentManager)
      return { level: "Gestor", color: "warning", icon: <Security /> };
    if (permissions.viewProfiles)
      return { level: "Usuário", color: "info", icon: <Person /> };
    return { level: "Limitado", color: "default", icon: null };
  };

  const permissionInfo = getPermissionLevel();

  return (
    <Paper sx={{ p: 3, maxWidth: 700 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography variant="h5">Sistema de Permissões</Typography>
        <Chip
          icon={permissionInfo.icon}
          label={`Nível: ${permissionInfo.level}`}
          color={permissionInfo.color as any}
          variant="outlined"
        />
      </Box>

      {hasErrors && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Existem conflitos nas permissões selecionadas.
        </Alert>
      )}

      {/* Admin Permissions */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <AdminPanelSettings color="error" />
            Permissões de Administrador
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Permissões de administrador concedem acesso total ao sistema.
          </Alert>

          <RhfSwitch
            name="systemAdmin"
            label="Administrador do Sistema"
            control={control}
            color="error"
            helperText="Acesso completo a todas as funcionalidades"
          />

          <Box sx={{ pl: 2, mt: 1 }}>
            <RhfSwitch
              name="userManagement"
              label="Gestão de Usuários"
              control={control}
              color="error"
              disabled={permissions.systemAdmin}
              error={errors.userManagement}
              helperText={
                permissions.systemAdmin
                  ? "Incluído automaticamente com admin do sistema"
                  : errors.userManagement?.message ||
                    "Criar, editar e remover usuários"
              }
            />

            <RhfSwitch
              name="systemConfig"
              label="Configuração do Sistema"
              control={control}
              color="error"
              disabled={permissions.systemAdmin}
              error={errors.systemConfig}
              helperText={
                permissions.systemAdmin
                  ? "Incluído automaticamente com admin do sistema"
                  : errors.systemConfig?.message ||
                    "Alterar configurações globais"
              }
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Content Permissions */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Security color="warning" />
            Permissões de Conteúdo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RhfSwitch
            name="contentManager"
            label="Gestor de Conteúdo"
            control={control}
            color="warning"
            disabled={permissions.systemAdmin}
            helperText={
              permissions.systemAdmin
                ? "Incluído automaticamente com admin do sistema"
                : "Permissões completas para gestão de conteúdo"
            }
          />

          <Box sx={{ pl: 2, mt: 1 }}>
            <RhfSwitch
              name="createContent"
              label="Criar Conteúdo"
              control={control}
              color="warning"
              disabled={permissions.systemAdmin || permissions.contentManager}
              error={errors.createContent}
              helperText={
                permissions.systemAdmin || permissions.contentManager
                  ? "Incluído automaticamente"
                  : errors.createContent?.message || "Criar novos conteúdos"
              }
            />

            <RhfSwitch
              name="editContent"
              label="Editar Conteúdo"
              control={control}
              color="warning"
              disabled={permissions.systemAdmin || permissions.contentManager}
              error={errors.editContent}
              helperText={
                permissions.systemAdmin || permissions.contentManager
                  ? "Incluído automaticamente"
                  : errors.editContent?.message ||
                    "Modificar conteúdos existentes"
              }
            />

            <RhfSwitch
              name="deleteContent"
              label="Excluir Conteúdo"
              control={control}
              color="error"
              disabled={
                permissions.systemAdmin ||
                permissions.contentManager ||
                !permissions.editContent
              }
              error={errors.deleteContent}
              helperText={
                permissions.systemAdmin || permissions.contentManager
                  ? "Incluído automaticamente"
                  : !permissions.editContent
                  ? "Requer permissão de edição"
                  : errors.deleteContent?.message ||
                    "Remover conteúdos permanentemente"
              }
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* User Permissions */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Person color="info" />
            Permissões de Usuário
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RhfSwitch
            name="viewProfiles"
            label="Visualizar Perfis"
            control={control}
            color="info"
            disabled={permissions.systemAdmin}
            helperText={
              permissions.systemAdmin
                ? "Incluído automaticamente"
                : "Ver perfis de outros usuários"
            }
          />

          <Box sx={{ pl: 2, mt: 1 }}>
            <RhfSwitch
              name="editOwnProfile"
              label="Editar Próprio Perfil"
              control={control}
              color="info"
              disabled={permissions.systemAdmin || permissions.viewProfiles}
              error={errors.editOwnProfile}
              helperText={
                permissions.systemAdmin || permissions.viewProfiles
                  ? "Incluído automaticamente"
                  : errors.editOwnProfile?.message ||
                    "Modificar informações pessoais"
              }
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
```

### 4. Toggle de Recursos com Preview

```typescript
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { RhfSwitch } from "@hox/capy";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  DarkMode,
  Animation,
  Notifications,
  Settings,
  Close,
} from "@mui/icons-material";

interface FeatureToggles {
  darkTheme: boolean;
  animations: boolean;
  soundEffects: boolean;
  notifications: boolean;
  compactMode: boolean;
  advancedMode: boolean;
}

export const FeatureTogglePreview = () => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const { control } = useForm<FeatureToggles>({
    defaultValues: {
      darkTheme: false,
      animations: true,
      soundEffects: false,
      notifications: true,
      compactMode: false,
      advancedMode: false,
    },
  });

  const features = useWatch({ control });

  const previewStyle = {
    backgroundColor: features.darkTheme ? "#121212" : "#ffffff",
    color: features.darkTheme ? "#ffffff" : "#000000",
    transition: features.animations ? "all 0.3s ease" : "none",
    padding: features.compactMode ? 1 : 2,
  };

  const handleFeatureToggle = (feature: keyof FeatureToggles) => {
    if (features.soundEffects) {
      // Simular som de toggle
      console.log("🔊 Toggle sound effect");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {/* Painel de Configurações */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Configurações de Interface
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <RhfSwitch
                name="darkTheme"
                label="Tema Escuro"
                control={control}
                color="secondary"
                icon={<DarkMode />}
                onChange={() => handleFeatureToggle("darkTheme")}
                helperText="Ativa o modo escuro da interface"
              />

              <RhfSwitch
                name="animations"
                label="Animações"
                control={control}
                color="primary"
                icon={<Animation />}
                onChange={() => handleFeatureToggle("animations")}
                helperText="Habilita transições e animações"
              />

              <RhfSwitch
                name="soundEffects"
                label="Efeitos Sonoros"
                control={control}
                color="info"
                onChange={() => handleFeatureToggle("soundEffects")}
                helperText="Sons de feedback para ações"
              />

              <RhfSwitch
                name="notifications"
                label="Notificações"
                control={control}
                color="warning"
                icon={<Notifications />}
                onChange={() => handleFeatureToggle("notifications")}
                helperText="Alertas e notificações do sistema"
              />

              <RhfSwitch
                name="compactMode"
                label="Modo Compacto"
                control={control}
                color="success"
                onChange={() => handleFeatureToggle("compactMode")}
                helperText="Interface mais densa com menos espaçamento"
              />

              <RhfSwitch
                name="advancedMode"
                label="Modo Avançado"
                control={control}
                color="error"
                icon={<Settings />}
                onChange={() => handleFeatureToggle("advancedMode")}
                helperText="Mostra configurações e opções avançadas"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Preview da Interface */}
        <Grid item xs={12} md={6}>
          <Paper sx={previewStyle}>
            <Typography variant="h6" gutterBottom>
              Preview da Interface
            </Typography>

            <Card
              sx={{
                mb: 2,
                backgroundColor: features.darkTheme ? "#1e1e1e" : "#f5f5f5",
                transition: features.animations ? "all 0.3s ease" : "none",
              }}
            >
              <CardContent sx={{ padding: features.compactMode ? 1 : 2 }}>
                <Typography variant="subtitle1">Exemplo de Card</Typography>
                <Typography variant="body2" color="text.secondary">
                  Este é um exemplo de como a interface ficará com suas
                  configurações.
                </Typography>

                {features.advancedMode && (
                  <Box
                    sx={{
                      mt: 1,
                      p: 1,
                      bgcolor: "action.hover",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="caption">
                      🔧 Modo Avançado: Configurações extras visíveis
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            {features.notifications && (
              <Card
                sx={{
                  mb: 2,
                  border: "1px solid",
                  borderColor: "warning.main",
                  backgroundColor: features.darkTheme ? "#2d2d00" : "#fff3cd",
                  transition: features.animations ? "all 0.3s ease" : "none",
                }}
              >
                <CardContent sx={{ padding: features.compactMode ? 1 : 2 }}>
                  <Typography variant="subtitle2" color="warning.main">
                    🔔 Notificação de Exemplo
                  </Typography>
                  <Typography variant="body2">
                    As notificações aparecerão assim na interface.
                  </Typography>
                </CardContent>
              </Card>
            )}

            <Typography variant="caption" color="text.secondary">
              Configurações ativas:{" "}
              {Object.values(features).filter(Boolean).length} de{" "}
              {Object.keys(features).length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Botão de Preview Mobile */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => setPreviewOpen(true)}
      >
        <Settings />
      </Fab>

      {/* Drawer de Preview Mobile */}
      <Drawer
        anchor="bottom"
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        PaperProps={{
          sx: {
            height: "50vh",
            ...previewStyle,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Preview Mobile</Typography>
            <IconButton onClick={() => setPreviewOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <List dense={features.compactMode}>
            <ListItem>
              <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>U</Avatar>
              <ListItemText
                primary="Usuário Exemplo"
                secondary={
                  features.advancedMode
                    ? "ID: 12345, Última atividade: agora"
                    : "Online agora"
                }
              />
            </ListItem>
            <ListItem>
              <Avatar sx={{ mr: 2, bgcolor: "secondary.main" }}>C</Avatar>
              <ListItemText
                primary="Chat Exemplo"
                secondary="Mensagem de exemplo"
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
```

## Validação

### Validação com Yup

```typescript
import * as yup from "yup";

const schema = yup.object({
  enabled: yup.boolean(),

  // Validação condicional
  advancedMode: yup.boolean().when("enabled", {
    is: true,
    then: (schema) =>
      schema.required("Modo avançado é obrigatório quando habilitado"),
  }),

  // Validação dependente
  autoBackup: yup.boolean().when("enabled", {
    is: false,
    then: (schema) =>
      schema.oneOf(
        [false],
        "Backup automático requer funcionalidade habilitada"
      ),
  }),
});
```

### Validação Customizada

```typescript
const {
  control,
  formState: { errors },
} = useForm({
  mode: "onChange",
  rules: {
    termsAccepted: {
      required: "Você deve aceitar os termos",
      validate: (value) => value === true || "Aceitar os termos é obrigatório",
    },
  },
});
```

## Acessibilidade

### Recursos de Acessibilidade

```typescript
// Exemplo com boa acessibilidade
<RhfSwitch
  name="accessibleSwitch"
  label="Switch acessível com descrição clara"
  control={control}
  helperText="Este switch controla uma funcionalidade importante"
  color="primary"
/>
```

### Navegação por Teclado

O RhfSwitch suporta navegação completa por teclado:

- **Tab**: Navegar entre switches
- **Espaço**: Alternar estado do switch
- **Enter**: Alternar estado do switch (quando focado)

### Screen Readers

O componente inclui suporte adequado para leitores de tela:

- Labels associados corretamente
- Estados de erro comunicados
- Texto de ajuda acessível
- Estado atual do switch anunciado

## Performance

### Otimização com React.memo

```typescript
import React, { memo } from "react";
import { RhfSwitch } from "@hox/capy";

const OptimizedSwitch = memo<SwitchProps>(
  ({ name, label, control, ...props }) => {
    return <RhfSwitch name={name} label={label} control={control} {...props} />;
  }
);
```

### Uso Eficiente do useWatch

```typescript
// ✅ Observar valores específicos
const darkMode = useWatch({
  control,
  name: "darkMode",
});

// ❌ Evitar observar todo o formulário desnecessariamente
const allValues = useWatch({ control }); // Use apenas quando necessário
```

### Debouncing para Switches com Efeitos

```typescript
import { useDebouncedCallback } from "use-debounce";

const DebouncedSwitch = () => {
  const { control } = useForm();

  const debouncedSave = useDebouncedCallback((value: boolean) => {
    // Salvar configuração
    console.log("Salvando:", value);
  }, 500);

  return (
    <RhfSwitch
      name="autoSave"
      label="Salvamento automático"
      control={control}
      onChange={(e) => debouncedSave(e.target.checked)}
    />
  );
};
```

## Solução de Problemas

### 1. Switch não responde a mudanças

**Problema**: O switch não atualiza quando clicado.

**Solução**:

```typescript
// ❌ Errado - não use value e onChange diretamente
<RhfSwitch
  name="switch"
  control={control}
  value={someValue} // Remove isto
  onChange={someHandler} // Remove isto
/>

// ✅ Correto - deixe o React Hook Form gerenciar
<RhfSwitch
  name="switch"
  control={control}
  defaultValue={false}
/>
```

### 2. Validação condicional não funciona

**Problema**: Validação baseada em outros campos não atualiza.

**Solução**:

```typescript
// ✅ Configure o mode adequadamente
const { control } = useForm({
  mode: "onChange", // Para validação em tempo real
});

// ✅ Use watch para observar dependências
const enabledValue = watch("enabled");

<RhfSwitch name="dependent" control={control} disabled={!enabledValue} />;
```

### 3. Performance lenta com muitos switches

**Problema**: Interface fica lenta com muitos switches.

**Solução**:

```typescript
// ✅ Use useWatch seletivamente
const criticalValue = useWatch({
  control,
  name: 'criticalSwitch',
});

// ✅ Memoize componentes estáticos
const StaticSwitch = memo(RhfSwitch);

// ✅ Divida em seções menores
const SwitchSection = memo(({ switches }) => (
  <div>
    {switches.map(switch => (
      <StaticSwitch key={switch.name} {...switch} />
    ))}
  </div>
));
```

### 4. Estilos customizados não aplicam

**Problema**: Customizações visuais não funcionam.

**Solução**:

```typescript
// ✅ Use sx prop para estilos customizados
<RhfSwitch
  name="styled"
  control={control}
  sx={{
    "& .MuiSwitch-switchBase": {
      color: "custom.main",
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "custom.dark",
    },
  }}
/>

// ✅ Para mudanças globais, use tema customizado
```

### 5. Label não aparece corretamente

**Problema**: Label do switch não é exibido.

**Solução**:

```typescript
// ✅ Certifique-se de passar a prop label
<RhfSwitch
  name="switch"
  label="Meu Switch" // Obrigatório
  control={control}
/>

// ✅ Para labels customizados
<RhfSwitch
  name="switch"
  label={<Typography variant="body2">Label Customizado</Typography>}
  control={control}
/>
```

### 6. TypeScript apresenta erros

**Problema**: Erros de tipo com as props.

**Solução**:

```typescript
// ✅ Defina tipos explícitos
interface FormData {
  switch: boolean; // Sempre boolean para switches
}

const { control } = useForm<FormData>();

// ✅ Use propriedades corretas
<RhfSwitch<FormData, "switch">
  name="switch"
  control={control}
  label="Meu Switch"
/>;
```

### Mensagens de Erro Comuns

| Erro                                                     | Causa                                    | Solução                                              |
| -------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| `Cannot read property 'onChange' of undefined`           | Control não passado                      | Verifique se `control` está sendo passado do useForm |
| `Warning: A component is changing an uncontrolled input` | Mudança entre controlled/uncontrolled    | Use `defaultValue` consistentemente                  |
| `Invalid hook call`                                      | RhfSwitch usado fora de componente React | Mova para dentro de uma função React                 |
| `Type 'string' is not assignable to type 'boolean'`      | Tipo incorreto para valor do switch      | Use boolean para valores de switch                   |

### Dicas de Debug

```typescript
// 1. Monitore valores do formulário
const watchedValues = watch();
console.log("Form values:", watchedValues);

// 2. Verifique erros
console.log("Form errors:", errors);

// 3. Use React DevTools para inspecionar props

// 4. Teste isoladamente
const TestSwitch = () => {
  const { control } = useForm();
  return <RhfSwitch name="test" label="Teste" control={control} />;
};
```

---

Para mais exemplos e casos de uso, consulte nossa [documentação de componentes](../README.md) ou visite o [Storybook](https://storybook.example.com).
