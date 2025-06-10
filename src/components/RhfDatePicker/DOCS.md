# RhfDatePicker

O `RhfDatePicker` é um componente de seleção de data integrado com react-hook-form. É baseado no DatePicker do Material-UI X Date Pickers e oferece uma interface amigável para seleção de datas.

## Características Principais

- ✅ Integração completa com react-hook-form
- ✅ Suporte a diferentes formatos de data
- ✅ Localização em português brasileiro
- ✅ Validação automática de erros
- ✅ Configuração de data mínima e máxima
- ✅ TypeScript completo
- ✅ Compatível com date-fns

## Instalação e Configuração

### Pré-requisitos

```bash
npm install @hox-rs/capy @mui/material @mui/x-date-pickers react-hook-form date-fns
```

### Peer Dependencies Necessárias

```bash
npm install @emotion/react @emotion/styled
```

### Configuração do LocalizationProvider

**IMPORTANTE:** O componente deve estar envolvido por um `LocalizationProvider` para funcionar corretamente.

```typescript
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      {/* Seus componentes aqui */}
    </LocalizationProvider>
  );
}
```

## Interface TypeScript

```typescript
export type RhfDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> & {
  /** Se o seletor de data deve ser de largura total */
  fullWidth?: boolean;
} & Omit<
    DatePickerProps<never>,
    | "renderInput"
    | "value"
    | "error"
    | "onChange"
    | "label"
    | "helperText"
    | "disabled"
    | "defaultValue"
  >;
```

## Props Principais

| Prop           | Tipo         | Padrão                     | Descrição                          |
| -------------- | ------------ | -------------------------- | ---------------------------------- |
| `name`         | `string`     | -                          | Nome do campo para react-hook-form |
| `control`      | `Control`    | -                          | Objeto control do useForm          |
| `label`        | `string`     | -                          | Label do campo                     |
| `fullWidth`    | `boolean`    | `true`                     | Campo ocupa toda a largura         |
| `disabled`     | `boolean`    | `false`                    | Desabilita o campo                 |
| `helperText`   | `string`     | -                          | Texto de ajuda                     |
| `error`        | `FieldError` | -                          | Objeto de erro do react-hook-form  |
| `defaultValue` | `Date`       | -                          | Data inicial do campo              |
| `minDate`      | `Date`       | -                          | Data mínima selecionável           |
| `maxDate`      | `Date`       | -                          | Data máxima selecionável           |
| `format`       | `string`     | -                          | Formato de exibição da data        |
| `views`        | `Array`      | `['year', 'month', 'day']` | Visualizações disponíveis          |

## Exemplos de Uso

### Exemplo Básico

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { RhfDatePicker } from "@hox-rs/capy";

interface FormData {
  dataAniversario: Date;
}

function FormularioAniversario() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Data de aniversário:", data.dataAniversario);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfDatePicker
          name="dataAniversario"
          control={control}
          label="Data de Aniversário"
          defaultValue={new Date()}
        />
        <button type="submit">Enviar</button>
      </form>
    </LocalizationProvider>
  );
}
```

### Exemplo com Validações

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfDatePicker } from "@hox-rs/capy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

const schema = yup.object({
  dataEvento: yup
    .date()
    .min(new Date(), "A data deve ser futura")
    .max(
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 ano no futuro
      "A data deve ser no máximo 1 ano no futuro"
    )
    .required("Data é obrigatória"),
});

interface FormData {
  dataEvento: Date;
}

function FormularioEvento() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const hoje = new Date();
  const umAnoFuturo = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

  const onSubmit = (data: FormData) => {
    console.log("Data do evento:", data.dataEvento);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfDatePicker
          name="dataEvento"
          control={control}
          label="Data do Evento"
          error={errors.dataEvento}
          minDate={hoje}
          maxDate={umAnoFuturo}
          helperText="Selecione uma data futura para o evento"
        />
        <button type="submit">Enviar</button>
      </form>
    </LocalizationProvider>
  );
}
```

### Exemplo com Data de Nascimento

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfDatePicker } from "@hox-rs/capy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { subYears } from "date-fns";

interface FormData {
  dataNascimento: Date;
}

function FormularioCadastro() {
  const { control, handleSubmit } = useForm<FormData>();

  const hoje = new Date();
  const data100AnosAtras = subYears(hoje, 100);
  const data18AnosAtras = subYears(hoje, 18);

  const onSubmit = (data: FormData) => {
    console.log("Data de nascimento:", data.dataNascimento);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfDatePicker
          name="dataNascimento"
          control={control}
          label="Data de Nascimento"
          minDate={data100AnosAtras}
          maxDate={data18AnosAtras}
          defaultValue={data18AnosAtras}
          helperText="Você deve ter pelo menos 18 anos"
          openTo="year"
          views={["year", "month", "day"]}
        />
        <button type="submit">Enviar</button>
      </form>
    </LocalizationProvider>
  );
}
```

### Exemplo com Formato Customizado

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfDatePicker } from "@hox-rs/capy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

interface FormData {
  dataRelatorio: Date;
}

function FormularioRelatorio() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Data do relatório:", data.dataRelatorio);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfDatePicker
          name="dataRelatorio"
          control={control}
          label="Data do Relatório"
          format="dd/MM/yyyy"
          defaultValue={new Date()}
          helperText="Formato: DD/MM/AAAA"
        />
        <button type="submit">Enviar</button>
      </form>
    </LocalizationProvider>
  );
}
```

### Exemplo com Apenas Mês e Ano

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfDatePicker } from "@hox-rs/capy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

interface FormData {
  mesReferencia: Date;
}

function FormularioMensal() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Mês de referência:", data.mesReferencia);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfDatePicker
          name="mesReferencia"
          control={control}
          label="Mês de Referência"
          views={["year", "month"]}
          openTo="month"
          format="MM/yyyy"
          defaultValue={new Date()}
          helperText="Selecione apenas mês e ano"
        />
        <button type="submit">Enviar</button>
      </form>
    </LocalizationProvider>
  );
}
```

## Casos de Uso Comuns

### 1. Formulários de Cadastro

```typescript
// Data de nascimento, data de admissão
<RhfDatePicker
  name="dataNascimento"
  label="Data de Nascimento"
  maxDate={new Date()} // Não permite datas futuras
/>
```

### 2. Agendamentos

```typescript
// Agendamento de consultas, eventos
<RhfDatePicker
  name="dataAgendamento"
  label="Data do Agendamento"
  minDate={new Date()} // Apenas datas futuras
  disablePast
/>
```

### 3. Relatórios e Filtros

```typescript
// Data inicial e final para relatórios
<RhfDatePicker
  name="dataInicial"
  label="Data Inicial"
  maxDate={dataFinal} // Não pode ser após data final
/>
```

### 4. Vencimentos e Prazos

```typescript
// Data de vencimento de contratos, boletos
<RhfDatePicker
  name="dataVencimento"
  label="Data de Vencimento"
  minDate={new Date()}
  format="dd/MM/yyyy"
/>
```

## Integração com date-fns

### Formatação e Validação

```typescript
import { format, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// Formatação para exibição
const formatarData = (data: Date) => {
  return format(data, "dd/MM/yyyy", { locale: ptBR });
};

// Validação personalizada
const validarData = (data: Date) => {
  return isValid(data) && data instanceof Date;
};

// Parse de string ISO
const parseData = (dataString: string) => {
  return parseISO(dataString);
};
```

### Cálculos com Datas

```typescript
import { addDays, subDays, differenceInDays } from "date-fns";

// Adicionar/subtrair dias
const proximaSemana = addDays(new Date(), 7);
const semanaPassada = subDays(new Date(), 7);

// Diferença entre datas
const diasEntre = differenceInDays(dataFinal, dataInicial);
```

## Troubleshooting

### Problemas Comuns e Soluções

#### 1. **LocalizationProvider não configurado**

```typescript
// ❌ Erro: Date adapter not found
<RhfDatePicker name="data" control={control} />

// ✅ Solução: Sempre envolver com LocalizationProvider
<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
  <RhfDatePicker name="data" control={control} />
</LocalizationProvider>
```

#### 2. **Data inválida no formulário**

```typescript
// ❌ Problema: Valor inválido passado
const { control } = useForm({
  defaultValues: {
    data: "2023-12-25", // String em vez de Date
  },
});

// ✅ Solução: Use objeto Date
const { control } = useForm({
  defaultValues: {
    data: new Date("2023-12-25"),
  },
});
```

#### 3. **Formato de data incorreto**

```typescript
// ✅ Configure o formato correto para o Brasil
<RhfDatePicker
  name="data"
  control={control}
  format="dd/MM/yyyy" // Formato brasileiro
/>
```

#### 4. **Validação de data futura**

```typescript
// ✅ Use date-fns para validações complexas
const schema = yup.object({
  dataEvento: yup
    .date()
    .min(new Date(), "Data deve ser futura")
    .test(
      "not-weekend",
      "Não é possível agendar em fins de semana",
      (value) => {
        if (!value) return true;
        const dia = value.getDay();
        return dia !== 0 && dia !== 6; // 0 = domingo, 6 = sábado
      }
    ),
});
```

#### 5. **Performance com muitas validações**

```typescript
// ✅ Use useMemo para cálculos de data pesados
const limiteDatas = useMemo(
  () => ({
    min: subYears(new Date(), 100),
    max: addYears(new Date(), 10),
  }),
  []
);

<RhfDatePicker minDate={limiteDatas.min} maxDate={limiteDatas.max} />;
```

#### 6. **Timezone issues**

```typescript
// ✅ Para trabalhar apenas com datas (sem horário)
import { startOfDay } from "date-fns";

const apenasData = startOfDay(new Date());
```

## Acessibilidade

O componente segue as diretrizes de acessibilidade:

- ✅ Navegação por teclado completa
- ✅ Labels apropriados para screen readers
- ✅ Estados de foco visíveis
- ✅ Suporte a ARIA attributes
- ✅ Anúncio de mudanças de valor

## Localização

### Configuração para Português Brasileiro

```typescript
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

// Configuração global
<LocalizationProvider
  dateAdapter={AdapterDateFns}
  adapterLocale={ptBR}
  localeText={{
    clearButtonLabel: "Limpar",
    okButtonLabel: "OK",
    cancelButtonLabel: "Cancelar",
    todayButtonLabel: "Hoje",
  }}
>
  {/* Seus componentes */}
</LocalizationProvider>;
```

### Formatos de Data Brasileiros

```typescript
// Formato padrão brasileiro
format = "dd/MM/yyyy";

// Com dia da semana
format = "EEEE, dd/MM/yyyy";

// Formato abreviado
format = "dd/MM/yy";

// Apenas mês e ano
format = "MM/yyyy";
```

## Dicas de UX

### 1. **Labels Descritivos**

```typescript
<RhfDatePicker label="Data de Nascimento" helperText="DD/MM/AAAA" />
```

### 2. **Valores Padrão Inteligentes**

```typescript
// Para data de nascimento, comece alguns anos atrás
defaultValue={subYears(new Date(), 25)}

// Para agendamentos, comece amanhã
defaultValue={addDays(new Date(), 1)}
```

### 3. **Limitações Claras**

```typescript
<RhfDatePicker
  minDate={new Date()}
  helperText="Apenas datas futuras são permitidas"
/>
```

### 4. **Feedback Visual**

```typescript
// Use error states para feedback imediato
error={errors.data}
```

## Compatibilidade

- ✅ React 19.1.0+
- ✅ TypeScript 5.0+
- ✅ Material-UI X Date Pickers 8.0+
- ✅ react-hook-form 7.0+
- ✅ date-fns 4.0+

## Recursos Adicionais

- [Documentação do Material-UI X Date Pickers](https://mui.com/x/react-date-pickers/)
- [Documentação do date-fns](https://date-fns.org/)
- [Documentação do react-hook-form](https://react-hook-form.com/)
- [Exemplos no Storybook](https://capy.hox.dev.br)

---

**Próximo:** [RhfDateTimePicker](../RhfDateTimePicker/DOCS.md) - Para seleção de data e hora
**Última atualização:** Dezembro 2024
**Versão da biblioteca:** 5.0.0
