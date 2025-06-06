# Guia de Integração - HOX Capy

Este guia irá orientá-lo na configuração e integração da biblioteca HOX Capy em seu projeto React.

## Sumário

- [Instalação](#instalação)
- [Configuração Inicial](#configuração-inicial)
- [Configuração de Dependências](#configuração-de-dependências)
- [Configuração de Localização](#configuração-de-localização)
- [Estrutura de Projeto Recomendada](#estrutura-de-projeto-recomendada)
- [Primeiros Passos](#primeiros-passos)
- [Resolução de Problemas](#resolução-de-problemas)

## Instalação

### 1. Instalar a Biblioteca Principal

```bash
npm install @hox-rs/capy
```

ou com yarn:

```bash
yarn add @hox-rs/capy
```

### 2. Instalar Peer Dependencies

A biblioteca depende de algumas bibliotecas externas. Instale as dependências principais:

```bash
npm install @emotion/react @emotion/styled @mui/material @mui/icons-material @mui/x-date-pickers react-hook-form
```

ou com yarn:

```bash
yarn add @emotion/react @emotion/styled @mui/material @mui/icons-material @mui/x-date-pickers react-hook-form
```

### 3. Dependências Opcionais

Dependendo dos componentes que você usar, pode precisar de dependências adicionais:

#### Para validações com Yup:

```bash
npm install yup @hookform/resolvers
```

#### Para formatação de datas:

```bash
npm install date-fns
```

## Configuração Inicial

### 1. Configurar Material-UI Theme Provider

No arquivo raiz de sua aplicação (geralmente `App.tsx` ou `main.tsx`):

```tsx
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Criar tema customizado (opcional)
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS global */}
      {/* Sua aplicação aqui */}
    </ThemeProvider>
  );
}

export default App;
```

### 2. Configurar LocalizationProvider (Para Componentes de Data)

Se você planeja usar `RhfDatePicker` ou `RhfDateTimePicker`, configure o provedor de localização:

```tsx
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        {/* Sua aplicação aqui */}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
```

## Configuração de Dependências

### Verificar Compatibilidade de Versões

Certifique-se de que as versões das dependências sejam compatíveis:

```json
{
  "dependencies": {
    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@mui/material": "^7.1.0",
    "@mui/icons-material": "^7.1.0",
    "@mui/x-date-pickers": "^8.4.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-hook-form": "^7.56.4"
  }
}
```

### Resolução de Conflitos

Se encontrar conflitos de peer dependencies, você pode usar:

```bash
npm install --legacy-peer-deps
```

ou configurar `.npmrc`:

```
legacy-peer-deps=true
```

## Configuração de Localização

### 1. Configuração para pt-BR

Para uma experiência completa em português brasileiro:

```tsx
import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR } from "@mui/x-date-pickers";
import { ptBR as dateFnsPtBR } from "date-fns/locale";

const theme = createTheme(
  {
    // Suas configurações de tema
  },
  corePtBR // Adiciona localização pt-BR para Material-UI
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={dateFnsPtBR}
        localeText={
          ptBR.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        {/* Sua aplicação */}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
```

### 2. Configuração de Validações em Português

Com Yup, configure mensagens em português:

```tsx
import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "Campo obrigatório",
  },
  string: {
    email: "Email inválido",
    min: "Deve ter pelo menos ${min} caracteres",
  },
  number: {
    min: "Deve ser maior que ${min}",
    max: "Deve ser menor que ${max}",
  },
});
```

## Estrutura de Projeto Recomendada

```
src/
├── components/           # Componentes customizados
│   ├── forms/           # Formulários específicos
│   └── ui/              # Componentes de UI reutilizáveis
├── hooks/               # Hooks customizados
├── schemas/             # Schemas de validação (Yup)
├── types/               # Tipos TypeScript
├── utils/               # Utilitários
└── pages/               # Páginas da aplicação
```

### Exemplo de Schema de Validação

```tsx
// src/schemas/userSchema.ts
import * as yup from "yup";

export const userSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  idade: yup
    .number()
    .min(18, "Deve ser maior de idade")
    .required("Idade é obrigatória"),
});
```

### Exemplo de Componente de Formulário

```tsx
// src/components/forms/UserForm.tsx
import React from "react";
import { RhfTextField, RhfMoneyField } from "@hox-rs/capy";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../schemas/userSchema";

interface UserFormProps {
  onSubmit: (data: any) => void;
}

export function UserForm({ onSubmit }: UserFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfTextField
        name="nome"
        label="Nome Completo"
        control={control}
        error={errors.nome}
        fullWidth
        margin="normal"
      />

      <RhfTextField
        name="email"
        label="Email"
        type="email"
        control={control}
        error={errors.email}
        fullWidth
        margin="normal"
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
```

## Primeiros Passos

### 1. Criar seu Primeiro Formulário

Comece com um formulário simples:

```tsx
import React from "react";
import { RhfTextField } from "@hox-rs/capy";
import { useForm } from "react-hook-form";

function MeuPrimeiroFormulario() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfTextField
        name="nome"
        label="Seu Nome"
        control={control}
        defaultValue=""
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### 2. Explorar Componentes Disponíveis

Veja a documentação de cada componente:

- [RhfTextField](../src/components/RhfTextField/DOCS.md) - Para campos de texto
- [RhfAutocomplete](../src/components/RhfAutocomplete/DOCS.md) - Para seleção com busca
- [RhfMoneyField](../src/components/RhfMoneyField/DOCS.md) - Para valores monetários
- [RhfDatePicker](../src/components/RhfDatePicker/DOCS.md) - Para seleção de datas

### 3. Verificar Exemplos Práticos

Consulte a pasta [examples](./examples/) para formulários completos e casos de uso reais.

## Resolução de Problemas

### Problemas Comuns

#### 1. Erro de Peer Dependencies

**Problema:** Avisos sobre peer dependencies não resolvidas.

**Solução:**

```bash
npm install --legacy-peer-deps
```

#### 2. Conflitos de Versão do React

**Problema:** Diferentes versões do React causando problemas.

**Solução:** Certifique-se de que todas as dependências usem a mesma versão do React:

```bash
npm ls react
```

#### 3. Problemas de Tipagem TypeScript

**Problema:** Erros de tipos ao usar componentes.

**Solução:** Certifique-se de importar os tipos corretamente:

```tsx
import type { RhfTextFieldProps } from "@hox-rs/capy";
```

#### 4. LocalizationProvider não encontrado

**Problema:** Erro ao usar componentes de data.

**Solução:** Instale e configure o adapter de data:

```bash
npm install @mui/x-date-pickers date-fns
```

#### 5. Estilos não aplicados

**Problema:** Componentes aparecem sem estilo.

**Solução:** Certifique-se de que o ThemeProvider está configurado:

```tsx
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
```

### Ferramentas de Debug

#### 1. React Hook Form DevTools

```bash
npm install @hookform/devtools
```

```tsx
import { DevTool } from "@hookform/devtools";

function MeuFormulario() {
  const { control } = useForm();

  return (
    <>
      {/* Seu formulário */}
      <DevTool control={control} />
    </>
  );
}
```

#### 2. Verificação de Dependências

```bash
npm ls @hox-rs/capy
npm outdated
```

### Onde Buscar Ajuda

1. **Documentação de Componentes:** Cada componente tem sua própria documentação detalhada
2. **FAQ:** Consulte [FAQ.md](./FAQ.md) para perguntas frequentes
3. **Issues GitHub:** Para problemas específicos
4. **Storybook:** [HOX Capy UI Library](https://capy.hox.dev.br) para exemplos visuais

## Próximos Passos

Depois de integrar a biblioteca com sucesso:

1. Explore [exemplos avançados](./examples/)
2. Leia sobre [validações customizadas](./VALIDACOES.md)
3. Consulte a [referência de API](./API_REFERENCE.md)
4. Contribua para o projeto seguindo o [guia de contribuição](./CONTRIBUICAO.md)

---

**Última atualização:** Janeiro 2025
**Versão da biblioteca:** 4.0.0
