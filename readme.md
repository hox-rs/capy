# HOX Capy React Components Library

[![npm version](https://badge.fury.io/js/@hox-rs%2Fcapy.svg)](https://badge.fury.io/js/@hox-rs%2Fcapy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.1.0-0081CB?logo=material-ui)](https://mui.com/)
[![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7.56.4-EC5990?logo=reacthookform)](https://react-hook-form.com/)
[![Storybook](https://img.shields.io/badge/-Storybook-FF4785?logo=storybook&logoColor=white)](https://capy.hox.dev.br)
[![Jest](https://img.shields.io/badge/tested%20with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Coverage](https://img.shields.io/badge/coverage-89%25-brightgreen.svg)](https://github.com/hox-rs/capy)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Esta é uma biblioteca criada com React, TypeScript, Rollup, Storybook, Jest e React Testing Library. Foi desenvolvida para uso interno da empresa, não sendo destinada a ser uma biblioteca pública, mas sinta-se livre para usá-la como desejar.
A intenção é encapsular e integrar casos de uso comuns das rotinas da HOX, para que o desenvolvedor não precise se preocupar com os detalhes dos componentes e possa focar na lógica de negócio da aplicação.

Os componentes são documentados usando Storybook no seguinte link: [HOX Capy UI Library](https://capy.hox.dev.br).

## Sumário de Componentes

### Componentes de Formulário (React Hook Form)

- **[RhfTextField](src/components/RhfTextField/DOCS.md)** - Campo de texto integrado com react-hook-form
- **[RhfAutocomplete](src/components/RhfAutocomplete/DOCS.md)** - Campo de autocomplete com múltipla seleção
- **[RhfDatePicker](src/components/RhfDatePicker/DOCS.md)** - Seletor de data
- **[RhfDateTimePicker](src/components/RhfDateTimePicker/DOCS.md)** - Seletor de data e hora
- **[RhfCheckbox](src/components/RhfCheckbox/DOCS.md)** - Checkbox individual
- **[RhfSwitch](src/components/RhfSwitch/DOCS.md)** - Switch/toggle
- **[RhfCheckboxGroup](src/components/RhfCheckboxGroup/DOCS.md)** - Grupo de checkboxes para seleção múltipla
- **[RhfRadioGroup](src/components/RhfRadioGroup/DOCS.md)** - Grupo de radio buttons para seleção única
- **[RhfMoneyField](src/components/RhfMoneyField/DOCS.md)** - Campo monetário com formatação brasileira
- **[RhfButtonGroup](src/components/RhfButtonGroup/DOCS.md)** - Grupo de botões para seleção
- **[RhfFileUpload](src/components/RhfFileUpload/DOCS.md)** - Upload de arquivos com drag'n'drop
- **[RhfSimpleFile](src/components/RhfSimpleFile/DOCS.md)** - Upload simples de arquivo único
- **[RhfRating](src/components/RhfRating/DOCS.md)** - Campo de avaliação/rating
- **[RhfSlider](src/components/RhfSlider/DOCS.md)** - Slider para valores numéricos
- **[RhfColorPicker](src/components/RhfColorPicker/DOCS.md)** - Seletor de cores

### Componentes Utilitários

- **[MoneyField](src/components/MoneyField/DOCS.md)** - Campo monetário independente (sem react-hook-form)

### Documentação Adicional

- **[Guia de Integração](docs/INTEGRACAO.md)** - Como configurar e integrar a biblioteca
- **[Guia de Tipos TypeScript](docs/TYPESCRIPT_GUIDE.md)** - Documentação dos tipos e interfaces
- **[Validações](docs/VALIDACOES.md)** - Cookbook de validações com Yup
- **[FAQ](docs/FAQ.md)** - Perguntas frequentes e troubleshooting
- **[Contribuição](docs/CONTRIBUICAO.md)** - Como contribuir para o projeto

## Pré-requisitos

Antes de usar a biblioteca, certifique-se de ter instalado:

- **Node.js** >= 20
- **React** >= 19.1.0
- **react-dom** >= 19.1.0

### Peer Dependencies Principais

A biblioteca depende de algumas bibliotecas externas que devem ser instaladas no seu projeto:

```bash
npm install @emotion/react @emotion/styled @mui/material @mui/icons-material @mui/x-date-pickers react-hook-form
```

ou com yarn:

```bash
yarn add @emotion/react @emotion/styled @mui/material @mui/icons-material @mui/x-date-pickers react-hook-form
```

**Nota:** Dependendo dos componentes que você usar, podem ser necessárias dependências adicionais. Consulte a documentação específica de cada componente para mais detalhes.

## Instalação

Você pode instalar esta biblioteca usando npm:

```bash
npm install @hox-rs/capy
```

ou yarn:

```bash
yarn add @hox-rs/capy
```

## Configuração Inicial

### 1. Provider do Material-UI

Envolva sua aplicação com o ThemeProvider do Material-UI:

```tsx
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Sua aplicação aqui */}
    </ThemeProvider>
  );
}
```

### 2. Provider de Localização (para componentes de data)

Para usar componentes de data, configure o LocalizationProvider:

```tsx
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      {/* Sua aplicação aqui */}
    </LocalizationProvider>
  );
}
```

## Uso

Para usar esta biblioteca em seu projeto, importe os componentes necessários e utilize-os em seus componentes React.

Não se esqueça de instalar as peer dependencies, dependendo dos componentes que você precisar usar.
Atualmente, a maioria dos componentes são wrappers do Material-UI e React Hook Form, sendo essas as dependências mais comuns, mas você pode verificar o arquivo package.json para ver todas elas.

### Exemplo Básico

Exemplo de uso integrando um TextField do Material-UI com React Hook Form:

```tsx
import React from "react";
import { RhfTextField } from "@hox-rs/capy";
import { useForm } from "react-hook-form";

function App() {
  const { control, handleSubmit } = useForm({
    // Comumente usamos yup resolver aqui para validações,
    // mas opcionalmente você pode usar "rules" diretamente no componente
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfTextField
          name="fullName"
          label="Nome"
          control={control}
          defaultValue=""
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
```

### Exemplo com Validação

```tsx
import React from "react";
import { RhfTextField, RhfMoneyField } from "@hox-rs/capy";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  amount: yup
    .number()
    .min(0, "Valor deve ser positivo")
    .required("Valor é obrigatório"),
});

function FormularioCompleto() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfTextField
        name="fullName"
        label="Nome Completo"
        control={control}
        error={errors.fullName}
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

      <RhfMoneyField
        name="amount"
        label="Valor"
        control={control}
        error={errors.amount}
        currencySymbol="R$"
        fullWidth
        margin="normal"
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
```

Para mais exemplos, consulte a documentação do Storybook e a documentação específica de cada componente.

## Componentes Mais Utilizados

- **RhfTextField**: Campo de texto básico com integração react-hook-form
- **RhfAutocomplete**: Seleção com busca e múltiplas opções
- **RhfMoneyField**: Campos monetários com formatação brasileira (R$)
- **RhfDatePicker**: Seleção de datas com calendário
- **RhfCheckboxGroup**: Grupos de opções com seleção múltipla

## Contribuindo

Como mencionado anteriormente, esta biblioteca foi criada para ser usada e mantida internamente, mas sinta-se livre para contribuir se desejar. Basta abrir um pull request e nós revisaremos o mais breve possível.

### Para Contribuidores Internos

1. Consulte o [Guia de Contribuição](docs/CONTRIBUICAO.md) para detalhes sobre padrões de código
2. Todos os novos componentes devem incluir:
   - Testes unitários
   - Documentação completa
   - Stories do Storybook
   - Exemplos de uso
3. Mantenha a compatibilidade com TypeScript
4. Siga os padrões de nomenclatura existentes

## Licença

Esta biblioteca está licenciada sob a Licença MIT.
