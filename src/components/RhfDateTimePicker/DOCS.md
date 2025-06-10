# RhfDateTimePicker

O `RhfDateTimePicker` é um componente de seleção de data e hora integrado com react-hook-form. É baseado no DateTimePicker do Material-UI X Date Pickers e oferece uma interface completa para seleção de data e horário.

## Características Principais

- ✅ Integração completa com react-hook-form
- ✅ Seleção de data e hora em um único componente
- ✅ Suporte a diferentes formatos de data/hora
- ✅ Localização em português brasileiro
- ✅ Validação automática de erros
- ✅ Configuração de data/hora mínima e máxima
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
export type RhfDateTimePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> & {
  /** Se o seletor de data/hora deve ser de largura total */
  fullWidth?: boolean;
} & Omit<
    DateTimePickerProps<never>,
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

| Prop           | Tipo         | Padrão                                         | Descrição                          |
| -------------- | ------------ | ---------------------------------------------- | ---------------------------------- |
| `name`         | `string`     | -                                              | Nome do campo para react-hook-form |
| `control`      | `Control`    | -                                              | Objeto control do useForm          |
| `label`        | `string`     | -                                              | Label do campo                     |
| `fullWidth`    | `boolean`    | `true`                                         | Campo ocupa toda a largura         |
| `disabled`     | `boolean`    | `false`                                        | Desabilita o campo                 |
| `helperText`   | `string`     | -                                              | Texto de ajuda                     |
| `error`        | `FieldError` | -                                              | Objeto de erro do react-hook-form  |
| `defaultValue` | `Date`       | -                                              | Data/hora inicial do campo         |
| `minDateTime`  | `Date`       | -                                              | Data/hora mínima selecionável      |
| `maxDateTime`  | `Date`       | -                                              | Data/hora máxima selecionável      |
| `format`       | `string`     | -                                              | Formato de exibição da data/hora   |
| `views`        | `Array`      | `['year', 'month', 'day', 'hours', 'minutes']` | Visualizações disponíveis          |
| `ampm`         | `boolean`    | `false`                                        | Usar formato 12h (AM/PM)           |

## Exemplos de Uso

### Exemplo Básico

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { RhfDateTimePicker } from "@hox-rs/capy";

interface FormData {
  dataHoraEvento: Date;
}

function FormularioEvento() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Data e hora do evento:", data.dataHoraEvento);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfDateTimePicker
          name="dataHoraEvento"
          control={control}
          label="Data e Hora do Evento"
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
import { RhfDateTimePicker } from "@hox-rs/capy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { addHours, isBefore } from "date-fns";

const schema = yup.object({
  dataHoraReuniao: yup
    .date()
    .min(
      addHours(new Date(), 1),
      "A reunião deve ser agendada com pelo menos 1 hora de antecedência"
    )
    .test(
      "horario-comercial",
      "Agende apenas em horário comercial (8h às 18h)",
      (value) => {
        if (!value) return true;
        const hora = value.getHours();
        return hora >= 8 && hora <= 18;
      }
    )
    .test(
      "nao-fim-semana",
      "Não é possível agendar reuniões em fins de semana",
      (value) => {
        if (!value) return true;
        const dia = value.getDay();
        return dia !== 0 && dia !== 6;
      }
    )
    .required("Data e hora são obrigatórias"),
});

interface FormData {
  dataHoraReuniao: Date;
}

function FormularioReuniao() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const agora = new Date();
  const proximaHora = addHours(agora, 1);

  const onSubmit = (data: FormData) => {
    console.log("Reunião agendada para:", data.dataHoraReuniao);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfDateTimePicker
          name="dataHoraReuniao"
          control={control}
          label="Data e Hora da Reunião"
          error={errors.dataHoraReuniao}
          minDateTime={proximaHora}
          helperText="Horário comercial: 8h às 18h, segunda a sexta"
        />
        <button type="submit">Agendar Reunião</button>
      </form>
    </LocalizationProvider>
  );
}
```

### Exemplo com Agendamento de Consulta

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfDateTimePicker } from "@hox-rs/capy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { addDays, setHours, setMinutes } from "date-fns";

interface FormData {
  dataHoraConsulta: Date;
}

function FormularioConsulta() {
  const { control, handleSubmit } = useForm<FormData>();

  // Configurar horários disponíveis (8h às 17h, de segunda a sexta)
  const hoje = new Date();
  const proximoDiaUtil = addDays(hoje, 1);
  const horarioMinimo = setMinutes(setHours(proximoDiaUtil, 8), 0);
  const horarioMaximo = setMinutes(setHours(addDays(hoje, 30), 17), 0);

  const onSubmit = (data: FormData) => {
    console.log("Consulta agendada para:", data.dataHoraConsulta);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfDateTimePicker
          name="dataHoraConsulta"
          control={control}
          label="Data e Hora da Consulta"
          minDateTime={horarioMinimo}
          maxDateTime={horarioMaximo}
          format="dd/MM/yyyy HH:mm"
          minutesStep={30} // Agendamentos de 30 em 30 minutos
          helperText="Disponível de segunda a sexta, das 8h às 17h"
        />
        <button type="submit">Agendar</button>
      </form>
    </LocalizationProvider>
  );
}
```

### Exemplo com Formato 12h (AM/PM)

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfDateTimePicker } from "@hox-rs/capy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

interface FormData {
  dataHoraEvento: Date;
}

function FormularioEventoAMPM() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Evento agendado para:", data.dataHoraEvento);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfDateTimePicker
          name="dataHoraEvento"
          control={control}
          label="Data e Hora do Evento"
          ampm={true}
          format="dd/MM/yyyy hh:mm a"
          defaultValue={new Date()}
          helperText="Formato 12 horas (AM/PM)"
        />
        <button type="submit">Enviar</button>
      </form>
    </LocalizationProvider>
  );
}
```

### Exemplo com Diferentes Visualizações

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfDateTimePicker } from "@hox-rs/capy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

interface FormData {
  dataHoraPrecisa: Date;
  dataHoraSimples: Date;
}

function FormularioVisualizacoes() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Dados:", data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Com segundos */}
        <RhfDateTimePicker
          name="dataHoraPrecisa"
          control={control}
          label="Data/Hora Precisa (com segundos)"
          views={["year", "month", "day", "hours", "minutes", "seconds"]}
          format="dd/MM/yyyy HH:mm:ss"
          defaultValue={new Date()}
        />

        {/* Apenas hora e minuto */}
        <RhfDateTimePicker
          name="dataHoraSimples"
          control={control}
          label="Data/Hora Simples"
          views={["year", "month", "day", "hours", "minutes"]}
          format="dd/MM/yyyy HH:mm"
          defaultValue={new Date()}
        />

        <button type="submit">Enviar</button>
      </form>
    </LocalizationProvider>
  );
}
```

### Exemplo com Múltiplos Campos de Data/Hora

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfDateTimePicker } from "@hox-rs/capy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { addHours } from "date-fns";

interface FormData {
  dataHoraInicio: Date;
  dataHoraFim: Date;
}

function FormularioPeriodo() {
  const { control, handleSubmit, watch } = useForm<FormData>();

  const dataHoraInicio = watch("dataHoraInicio");

  const onSubmit = (data: FormData) => {
    console.log("Período:", data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfDateTimePicker
          name="dataHoraInicio"
          control={control}
          label="Data/Hora de Início"
          minDateTime={new Date()}
          defaultValue={new Date()}
        />

        <RhfDateTimePicker
          name="dataHoraFim"
          control={control}
          label="Data/Hora de Fim"
          minDateTime={
            dataHoraInicio ? addHours(dataHoraInicio, 1) : new Date()
          }
          defaultValue={
            dataHoraInicio
              ? addHours(dataHoraInicio, 2)
              : addHours(new Date(), 2)
          }
          helperText="Deve ser pelo menos 1 hora após o início"
        />

        <button type="submit">Enviar</button>
      </form>
    </LocalizationProvider>
  );
}
```

## Casos de Uso Comuns

### 1. Agendamentos Médicos

```typescript
<RhfDateTimePicker
  name="consulta"
  label="Data e Hora da Consulta"
  minDateTime={addHours(new Date(), 24)} // 24h de antecedência
  minutesStep={15} // Intervalos de 15 minutos
/>
```

### 2. Eventos e Reuniões

```typescript
<RhfDateTimePicker
  name="reuniao"
  label="Data e Hora da Reunião"
  views={["year", "month", "day", "hours", "minutes"]}
  format="dd/MM/yyyy HH:mm"
/>
```

### 3. Prazos e Entregas

```typescript
<RhfDateTimePicker
  name="prazoEntrega"
  label="Prazo de Entrega"
  minDateTime={new Date()}
  helperText="Data limite para entrega"
/>
```

### 4. Log de Atividades

```typescript
<RhfDateTimePicker
  name="timestamp"
  label="Data/Hora da Atividade"
  views={["year", "month", "day", "hours", "minutes", "seconds"]}
  format="dd/MM/yyyy HH:mm:ss"
/>
```

## Trabalhando com Fusos Horários

### Exemplo com Timezone

```typescript
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

function FormularioComTimezone() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    // Converter para UTC antes de enviar
    const utcDateTime = zonedTimeToUtc(data.dataHora, "America/Sao_Paulo");
    console.log("UTC:", utcDateTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfDateTimePicker
          name="dataHora"
          control={control}
          label="Data/Hora (Brasília)"
          helperText="Horário de Brasília será convertido para UTC"
        />
        <button type="submit">Enviar</button>
      </form>
    </LocalizationProvider>
  );
}
```

## Troubleshooting

### Problemas Comuns e Soluções

#### 1. **LocalizationProvider não configurado**

```typescript
// ❌ Erro: Date adapter not found
<RhfDateTimePicker name="dataHora" control={control} />

// ✅ Solução: Sempre envolver com LocalizationProvider
<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
  <RhfDateTimePicker name="dataHora" control={control} />
</LocalizationProvider>
```

#### 2. **Formato de data/hora incorreto**

```typescript
// ❌ Problema: Formato não reconhecido
format = "YYYY-MM-DD HH:mm";

// ✅ Solução: Use format do date-fns
format = "yyyy-MM-dd HH:mm";
```

#### 3. **Validação de horário comercial**

```typescript
// ✅ Validação customizada para horário comercial
const validarHorarioComercial = (dateTime: Date) => {
  const hora = dateTime.getHours();
  const diaSemana = dateTime.getDay();

  // Segunda a sexta (1-5), 8h às 18h
  return diaSemana >= 1 && diaSemana <= 5 && hora >= 8 && hora <= 18;
};

const schema = yup.object({
  dataHora: yup
    .date()
    .test(
      "horario-comercial",
      "Apenas horário comercial",
      validarHorarioComercial
    ),
});
```

#### 4. **Performance com validações complexas**

```typescript
// ✅ Use useMemo para cálculos pesados
const limitesHorario = useMemo(() => {
  const agora = new Date();
  return {
    min: addHours(agora, 1),
    max: addMonths(agora, 6),
  };
}, []);
```

#### 5. **Problemas com minutesStep**

```typescript
// ✅ Configure intervalos apropriados
<RhfDateTimePicker
  minutesStep={15} // 15, 30, ou 60 minutos
  views={["year", "month", "day", "hours", "minutes"]}
/>
```

### Comparação: DatePicker vs DateTimePicker

| Aspecto          | RhfDatePicker        | RhfDateTimePicker     |
| ---------------- | -------------------- | --------------------- |
| **Uso**          | Apenas data          | Data + hora           |
| **Casos de uso** | Aniversários, prazos | Agendamentos, eventos |
| **Precisão**     | Dia                  | Minuto/segundo        |
| **Complexidade** | Simples              | Média                 |
| **UX**           | Mais rápido          | Mais completo         |

### Quando usar cada um:

**Use RhfDatePicker quando:**

- ✅ Apenas a data importa
- ✅ Data de nascimento, vencimentos
- ✅ Relatórios por período
- ✅ UX mais simples

**Use RhfDateTimePicker quando:**

- ✅ Hora é importante
- ✅ Agendamentos específicos
- ✅ Eventos com horário
- ✅ Logs precisos

## Acessibilidade

O componente segue as diretrizes de acessibilidade:

- ✅ Navegação por teclado completa
- ✅ Labels apropriados para screen readers
- ✅ Estados de foco visíveis
- ✅ Suporte a ARIA attributes
- ✅ Anúncio de mudanças de valor

## Integração com Backend

### Formato de Envio

```typescript
// Enviar para o backend
const enviarParaAPI = (data: FormData) => {
  const payload = {
    dataHora: data.dataHora.toISOString(), // ISO 8601
    // ou
    timestamp: data.dataHora.getTime(), // Unix timestamp
  };

  fetch("/api/evento", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

// Receber do backend
const receberDoAPI = async () => {
  const response = await fetch("/api/evento/123");
  const data = await response.json();

  return {
    dataHora: new Date(data.dataHora), // Parse ISO string
  };
};
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

**Anterior:** [RhfDatePicker](../RhfDatePicker/DOCS.md) - Para seleção apenas de data
**Última atualização:** Dezembro 2024
**Versão da biblioteca:** 5.0.0
