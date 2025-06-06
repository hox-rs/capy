# RhfMoneyField

O `RhfMoneyField` é um componente de campo monetário integrado ao React Hook Form que fornece formatação automática de valores, validação e gerenciamento de estado simplificado para formulários complexos.

## Características Principais

- ✅ Integração nativa com React Hook Form
- ✅ Formatação automática em tempo real (da direita para a esquerda)
- ✅ Suporte a múltiplas moedas (R$, $, €, etc.)
- ✅ Validação integrada com react-hook-form
- ✅ Separadores decimais e de milhares customizáveis
- ✅ Mensagens de erro automáticas
- ✅ Suporte completo a TypeScript
- ✅ Acessibilidade nativa

## Interface TypeScript

```typescript
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseRhfFieldProps } from "../../types/base";
import { MoneyFieldProps } from "../MoneyField/MoneyField.types";

export type RhfMoneyFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> &
  Omit<
    MoneyFieldProps,
    | "error"
    | "value"
    | "name"
    | "label"
    | "helperText"
    | "disabled"
    | "defaultValue"
  >;
```

## Props Principais

| Prop                | Tipo                                   | Padrão       | Descrição                                    |
| ------------------- | -------------------------------------- | ------------ | -------------------------------------------- |
| `name`              | `string`                               | -            | **Obrigatório.** Nome do campo no formulário |
| `control`           | `Control<TFieldValues>`                | -            | **Obrigatório.** Controle do react-hook-form |
| `label`             | `string`                               | -            | Rótulo do campo                              |
| `defaultValue`      | `number`                               | -            | Valor padrão inicial                         |
| `currencySymbol`    | `string`                               | `"R$"`       | Símbolo da moeda                             |
| `decimalSeparator`  | `string`                               | `","`        | Separador decimal                            |
| `thousandSeparator` | `string`                               | `"."`        | Separador de milhares                        |
| `disabled`          | `boolean`                              | `false`      | Desabilita o campo                           |
| `fullWidth`         | `boolean`                              | `true`       | Campo ocupa toda a largura                   |
| `variant`           | `"outlined" \| "filled" \| "standard"` | `"outlined"` | Variante visual                              |
| `helperText`        | `string`                               | -            | Texto de ajuda personalizado                 |

## Exemplos de Uso

### Exemplo Básico

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfMoneyField } from "@hox/capy";

interface FormData {
  preco: number;
}

function ExemploBasico() {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      preco: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados:", data);
    console.log("Preço:", data.preco); // valor em número
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfMoneyField
        name="preco"
        control={control}
        label="Preço do Produto"
        helperText="Digite o valor em reais"
      />

      <button type="submit">Enviar</button>

      {/* Preview do valor */}
      <p>Valor atual: {watch("preco")}</p>
    </form>
  );
}
```

### Exemplo com Validações Yup

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfMoneyField } from "@hox/capy";

const schema = yup.object({
  preco: yup
    .number()
    .required("Preço é obrigatório")
    .min(0.01, "Preço deve ser maior que zero")
    .max(999999.99, "Preço não pode exceder R$ 999.999,99"),
  desconto: yup
    .number()
    .min(0, "Desconto não pode ser negativo")
    .test(
      "desconto-menor-preco",
      "Desconto não pode ser maior que o preço",
      function (value) {
        const { preco } = this.parent;
        return !value || value <= preco;
      }
    ),
  frete: yup
    .number()
    .min(0, "Frete não pode ser negativo")
    .max(500, "Frete não pode exceder R$ 500,00"),
});

interface FormData {
  preco: number;
  desconto: number;
  frete: number;
}

function ExemploComValidacoes() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      preco: 0,
      desconto: 0,
      frete: 0,
    },
  });

  const valores = watch();
  const precoFinal = valores.preco - valores.desconto + valores.frete;

  const onSubmit = (data: FormData) => {
    console.log("Dados válidos:", data);
    console.log("Preço final:", precoFinal);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfMoneyField
        name="preco"
        control={control}
        label="Preço do Produto"
        helperText="Valor base do produto"
      />

      <RhfMoneyField
        name="desconto"
        control={control}
        label="Desconto"
        helperText="Valor do desconto a ser aplicado"
      />

      <RhfMoneyField
        name="frete"
        control={control}
        label="Frete"
        helperText="Custo do frete (máx. R$ 500,00)"
      />

      <div
        style={{
          margin: "16px 0",
          padding: "16px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h3>Resumo:</h3>
        <p>Preço: R$ {valores.preco?.toFixed(2).replace(".", ",") || "0,00"}</p>
        <p>
          Desconto: R${" "}
          {valores.desconto?.toFixed(2).replace(".", ",") || "0,00"}
        </p>
        <p>Frete: R$ {valores.frete?.toFixed(2).replace(".", ",") || "0,00"}</p>
        <p>
          <strong>Total: R$ {precoFinal.toFixed(2).replace(".", ",")}</strong>
        </p>
      </div>

      <button type="submit">Salvar Produto</button>
    </form>
  );
}
```

### Exemplo com Diferentes Moedas

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfMoneyField } from "@hox/capy";
import { Stack, Typography } from "@mui/material";

interface FormData {
  precoReal: number;
  precoDolar: number;
  precoEuro: number;
}

function ExemploMultiMoedas() {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      precoReal: 0,
      precoDolar: 0,
      precoEuro: 0,
    },
  });

  const valores = watch();

  // Cotações fictícias
  const cotacoes = { usd: 5.2, eur: 5.5 };
  const totalEmReais =
    valores.precoReal +
    valores.precoDolar * cotacoes.usd +
    valores.precoEuro * cotacoes.eur;

  const onSubmit = (data: FormData) => {
    console.log("Preços em diferentes moedas:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Preços Internacionais
      </Typography>

      <Stack spacing={3}>
        <RhfMoneyField
          name="precoReal"
          control={control}
          label="Preço em Reais"
          currencySymbol="R$"
          decimalSeparator=","
          thousandSeparator="."
        />

        <RhfMoneyField
          name="precoDolar"
          control={control}
          label="Preço em Dólares"
          currencySymbol="$"
          decimalSeparator="."
          thousandSeparator=","
          helperText={`Equivale a R$ ${(valores.precoDolar * cotacoes.usd)
            .toFixed(2)
            .replace(".", ",")}`}
        />

        <RhfMoneyField
          name="precoEuro"
          control={control}
          label="Preço em Euros"
          currencySymbol="€"
          decimalSeparator=","
          thousandSeparator=" "
          helperText={`Equivale a R$ ${(valores.precoEuro * cotacoes.eur)
            .toFixed(2)
            .replace(".", ",")}`}
        />

        <div
          style={{
            padding: "16px",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
          }}
        >
          <Typography variant="h6">
            Total em Reais: R$ {totalEmReais.toFixed(2).replace(".", ",")}
          </Typography>
        </div>

        <button type="submit">Salvar Preços</button>
      </Stack>
    </form>
  );
}
```

### Exemplo de Formulário de Orçamento

```tsx
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfMoneyField } from "@hox/capy";
import { Button, Stack, Typography, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const itemSchema = yup.object({
  descricao: yup.string().required("Descrição é obrigatória"),
  quantidade: yup
    .number()
    .required("Quantidade é obrigatória")
    .min(1, "Mínimo 1"),
  preco: yup
    .number()
    .required("Preço é obrigatório")
    .min(0.01, "Preço deve ser maior que zero"),
});

const schema = yup.object({
  cliente: yup.string().required("Cliente é obrigatório"),
  itens: yup.array(itemSchema).min(1, "Adicione pelo menos um item"),
  desconto: yup.number().min(0, "Desconto não pode ser negativo"),
  impostos: yup.number().min(0, "Impostos não podem ser negativos"),
});

interface Item {
  descricao: string;
  quantidade: number;
  preco: number;
}

interface FormData {
  cliente: string;
  itens: Item[];
  desconto: number;
  impostos: number;
}

function FormularioOrcamento() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      cliente: "",
      itens: [{ descricao: "", quantidade: 1, preco: 0 }],
      desconto: 0,
      impostos: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  const valores = watch();

  const subtotal =
    valores.itens?.reduce((acc, item) => {
      return acc + (item.quantidade * item.preco || 0);
    }, 0) || 0;

  const total = subtotal - (valores.desconto || 0) + (valores.impostos || 0);

  const onSubmit = (data: FormData) => {
    console.log("Orçamento:", data);
    console.log("Total calculado:", total);
  };

  const adicionarItem = () => {
    append({ descricao: "", quantidade: 1, preco: 0 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom>
        Formulário de Orçamento
      </Typography>

      <Stack spacing={3}>
        {/* Itens do orçamento */}
        <Typography variant="h6">Itens</Typography>

        {fields.map((field, index) => (
          <Paper key={field.id} sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <div style={{ flex: 2 }}>
                <input
                  placeholder="Descrição do item"
                  {...control.register(`itens.${index}.descricao` as const)}
                  style={{ width: "100%", padding: "8px" }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <input
                  type="number"
                  placeholder="Qtd"
                  {...control.register(`itens.${index}.quantidade` as const, {
                    valueAsNumber: true,
                  })}
                  style={{ width: "100%", padding: "8px" }}
                />
              </div>

              <div style={{ flex: 2 }}>
                <RhfMoneyField
                  name={`itens.${index}.preco` as const}
                  control={control}
                  label="Preço Unitário"
                  size="small"
                />
              </div>

              <div style={{ flex: 1 }}>
                <Typography variant="body2">
                  Total: R${" "}
                  {(
                    (valores.itens?.[index]?.quantidade || 0) *
                    (valores.itens?.[index]?.preco || 0)
                  )
                    .toFixed(2)
                    .replace(".", ",")}
                </Typography>
              </div>

              {fields.length > 1 && (
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Stack>
          </Paper>
        ))}

        <Button
          startIcon={<AddIcon />}
          onClick={adicionarItem}
          variant="outlined"
        >
          Adicionar Item
        </Button>

        {/* Valores adicionais */}
        <Typography variant="h6">Ajustes</Typography>

        <RhfMoneyField
          name="desconto"
          control={control}
          label="Desconto"
          helperText="Valor total do desconto"
        />

        <RhfMoneyField
          name="impostos"
          control={control}
          label="Impostos"
          helperText="Valor total dos impostos"
        />

        {/* Resumo */}
        <Paper sx={{ p: 2, bgcolor: "grey.100" }}>
          <Typography variant="h6">Resumo do Orçamento</Typography>
          <Stack spacing={1}>
            <Typography>
              Subtotal: R$ {subtotal.toFixed(2).replace(".", ",")}
            </Typography>
            <Typography>
              Desconto: R${" "}
              {(valores.desconto || 0).toFixed(2).replace(".", ",")}
            </Typography>
            <Typography>
              Impostos: R${" "}
              {(valores.impostos || 0).toFixed(2).replace(".", ",")}
            </Typography>
            <Typography variant="h6" sx={{ borderTop: 1, pt: 1 }}>
              Total: R$ {total.toFixed(2).replace(".", ",")}
            </Typography>
          </Stack>
        </Paper>

        <Button type="submit" variant="contained" size="large">
          Gerar Orçamento
        </Button>
      </Stack>
    </form>
  );
}
```

### Exemplo com Validação Condicional

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfMoneyField } from "@hox/capy";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";

const schema = yup.object({
  tipoCliente: yup.string().required("Tipo de cliente é obrigatório"),
  valor: yup
    .number()
    .required("Valor é obrigatório")
    .when("tipoCliente", {
      is: "vip",
      then: (schema) =>
        schema.min(1000, "Clientes VIP devem ter pedido mínimo de R$ 1.000,00"),
      otherwise: (schema) => schema.min(0.01, "Valor deve ser maior que zero"),
    }),
  taxaServico: yup.number().when("tipoCliente", {
    is: "corporativo",
    then: (schema) =>
      schema.min(50, "Taxa de serviço mínima para corporativo: R$ 50,00"),
    otherwise: (schema) => schema.min(0, "Taxa não pode ser negativa"),
  }),
});

interface FormData {
  tipoCliente: "comum" | "vip" | "corporativo";
  valor: number;
  taxaServico: number;
}

function ExemploValidacaoCondicional() {
  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      tipoCliente: "comum",
      valor: 0,
      taxaServico: 0,
    },
  });

  const tipoCliente = watch("tipoCliente");
  const valor = watch("valor");

  // Ajusta taxa de serviço automaticamente baseada no tipo de cliente
  React.useEffect(() => {
    if (tipoCliente === "vip") {
      setValue("taxaServico", 0); // VIP não paga taxa
    } else if (tipoCliente === "corporativo") {
      setValue("taxaServico", Math.max(50, valor * 0.1)); // 10% com mínimo de R$ 50
    } else {
      setValue("taxaServico", valor * 0.05); // 5% para clientes comuns
    }
  }, [tipoCliente, valor, setValue]);

  const onSubmit = (data: FormData) => {
    console.log("Pedido:", data);
  };

  const getValorMinimo = () => {
    switch (tipoCliente) {
      case "vip":
        return "R$ 1.000,00";
      case "corporativo":
        return "R$ 0,01";
      case "comum":
        return "R$ 0,01";
      default:
        return "R$ 0,01";
    }
  };

  const getTaxaInfo = () => {
    switch (tipoCliente) {
      case "vip":
        return "Isento de taxa de serviço";
      case "corporativo":
        return "Taxa: 10% (mín. R$ 50,00)";
      case "comum":
        return "Taxa: 5% do valor";
      default:
        return "";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Tipo de Cliente</FormLabel>
          <RadioGroup
            value={tipoCliente}
            onChange={(e) => setValue("tipoCliente", e.target.value as any)}
          >
            <FormControlLabel value="comum" control={<Radio />} label="Comum" />
            <FormControlLabel value="vip" control={<Radio />} label="VIP" />
            <FormControlLabel
              value="corporativo"
              control={<Radio />}
              label="Corporativo"
            />
          </RadioGroup>
        </FormControl>

        <RhfMoneyField
          name="valor"
          control={control}
          label="Valor do Pedido"
          helperText={`Valor mínimo: ${getValorMinimo()}`}
        />

        <RhfMoneyField
          name="taxaServico"
          control={control}
          label="Taxa de Serviço"
          helperText={getTaxaInfo()}
          disabled={tipoCliente === "vip"}
        />

        <div
          style={{
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
          }}
        >
          <h3>Resumo do Pedido</h3>
          <p>Tipo: {tipoCliente.toUpperCase()}</p>
          <p>Valor: R$ {valor.toFixed(2).replace(".", ",")}</p>
          <p>Taxa: R$ {watch("taxaServico").toFixed(2).replace(".", ",")}</p>
          <p>
            <strong>
              Total: R${" "}
              {(valor + watch("taxaServico")).toFixed(2).replace(".", ",")}
            </strong>
          </p>
        </div>

        <button type="submit">Finalizar Pedido</button>
      </Stack>
    </form>
  );
}
```

### Exemplo com Watch e Cálculos Dinâmicos

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfMoneyField } from "@hox/capy";
import { Stack, Paper, Typography, Alert } from "@mui/material";

interface FormData {
  capital: number;
  taxaJuros: number;
  periodo: number;
}

function CalculadoraJurosCompostos() {
  const { control, watch } = useForm<FormData>({
    defaultValues: {
      capital: 1000,
      taxaJuros: 0.01, // 1% ao mês = 0.01
      periodo: 12,
    },
  });

  const valores = watch();

  // Fórmula dos juros compostos: M = C * (1 + i)^t
  const montante =
    valores.capital * Math.pow(1 + valores.taxaJuros, valores.periodo);
  const juros = montante - valores.capital;
  const percentualGanho = (montante / valores.capital - 1) * 100;

  const getRecomendacao = () => {
    if (percentualGanho > 100) {
      return {
        tipo: "success",
        mensagem: "Excelente investimento! Retorno superior a 100%",
      };
    } else if (percentualGanho > 50) {
      return {
        tipo: "info",
        mensagem: "Bom investimento com retorno interessante",
      };
    } else if (percentualGanho > 20) {
      return { tipo: "warning", mensagem: "Investimento moderado" };
    } else {
      return {
        tipo: "error",
        mensagem: "Retorno baixo, considere outras opções",
      };
    }
  };

  const recomendacao = getRecomendacao();

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Calculadora de Juros Compostos</Typography>

      <RhfMoneyField
        name="capital"
        control={control}
        label="Capital Inicial"
        helperText="Valor do investimento inicial"
      />

      <div>
        <Typography gutterBottom>Taxa de Juros Mensal (%)</Typography>
        <input
          type="number"
          step="0.01"
          value={(valores.taxaJuros * 100).toFixed(2)}
          onChange={(e) => {
            const percent = parseFloat(e.target.value) || 0;
            // Atualizar através do control não é direto, usamos setValue seria melhor
            // Este é um exemplo simplificado
          }}
          style={{ width: "100%", padding: "8px" }}
        />
        <Typography variant="caption">
          Atual: {(valores.taxaJuros * 100).toFixed(2)}% ao mês
        </Typography>
      </div>

      <div>
        <Typography gutterBottom>Período (meses)</Typography>
        <input
          type="number"
          value={valores.periodo}
          onChange={(e) => {
            // Similar ao anterior, exemplo simplificado
          }}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <Paper sx={{ p: 3, bgcolor: "grey.50" }}>
        <Typography variant="h6" gutterBottom>
          Resultado da Simulação
        </Typography>

        <Stack spacing={2}>
          <div>
            <Typography variant="body2" color="textSecondary">
              Capital Inicial:
            </Typography>
            <Typography variant="h6">
              R$ {valores.capital.toFixed(2).replace(".", ",")}
            </Typography>
          </div>

          <div>
            <Typography variant="body2" color="textSecondary">
              Juros Ganhos:
            </Typography>
            <Typography variant="h6" color="success.main">
              R$ {juros.toFixed(2).replace(".", ",")}
            </Typography>
          </div>

          <div>
            <Typography variant="body2" color="textSecondary">
              Montante Final:
            </Typography>
            <Typography variant="h5" color="primary.main">
              R$ {montante.toFixed(2).replace(".", ",")}
            </Typography>
          </div>

          <div>
            <Typography variant="body2" color="textSecondary">
              Percentual de Ganho:
            </Typography>
            <Typography variant="h6">{percentualGanho.toFixed(2)}%</Typography>
          </div>
        </Stack>
      </Paper>

      <Alert severity={recomendacao.tipo as any}>{recomendacao.mensagem}</Alert>

      <Paper sx={{ p: 2, bgcolor: "info.light", color: "info.contrastText" }}>
        <Typography variant="body2">
          <strong>Simulação:</strong> Investindo R${" "}
          {valores.capital.toFixed(2).replace(".", ",")}a {(
            valores.taxaJuros * 100
          ).toFixed(2)}% ao mês durante {valores.periodo} meses, você terá R$ {montante
            .toFixed(2)
            .replace(".", ",")} no final.
        </Typography>
      </Paper>
    </Stack>
  );
}
```

## Integração com React Hook Form

### useController Personalizado

```tsx
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { RhfMoneyField } from "@hox/capy";

interface CustomMoneyFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  label: string;
  min?: number;
  max?: number;
  currency?: "BRL" | "USD" | "EUR";
}

function CustomMoneyField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  min = 0,
  max = Infinity,
  currency = "BRL",
}: CustomMoneyFieldProps<TFieldValues, TName>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const currencyConfig = {
    BRL: { symbol: "R$", decimal: ",", thousand: "." },
    USD: { symbol: "$", decimal: ".", thousand: "," },
    EUR: { symbol: "€", decimal: ",", thousand: " " },
  };

  const config = currencyConfig[currency];

  const handleChange = (newValue: number) => {
    if (newValue < min) return;
    if (newValue > max) return;
    onChange(newValue);
  };

  return (
    <RhfMoneyField
      name={name}
      control={control}
      label={label}
      currencySymbol={config.symbol}
      decimalSeparator={config.decimal}
      thousandSeparator={config.thousand}
      helperText={
        error?.message ||
        `Valor entre ${config.symbol} ${min.toFixed(2)} e ${
          config.symbol
        } ${max.toFixed(2)}`
      }
    />
  );
}

// Uso
function ExemploCustomField() {
  const { control } = useForm<{ preco: number }>();

  return (
    <CustomMoneyField
      name="preco"
      control={control}
      label="Preço em Dólares"
      min={1}
      max={10000}
      currency="USD"
    />
  );
}
```

### Integração com Validação Complexa

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfMoneyField } from "@hox/capy";

// Schema com validações cruzadas complexas
const schema = yup.object({
  salario: yup
    .number()
    .required("Salário é obrigatório")
    .min(1320, "Salário deve ser pelo menos o mínimo nacional"), // salário mínimo 2024

  aluguel: yup
    .number()
    .required("Aluguel é obrigatório")
    .test(
      "aluguel-salario",
      "Aluguel não pode exceder 30% do salário",
      function (value) {
        const { salario } = this.parent;
        return !value || !salario || value <= salario * 0.3;
      }
    ),

  financiamento: yup
    .number()
    .min(0, "Financiamento não pode ser negativo")
    .test(
      "comprometimento-total",
      "Aluguel + financiamento não podem exceder 40% do salário",
      function (value) {
        const { salario, aluguel } = this.parent;
        const total = (aluguel || 0) + (value || 0);
        return !salario || total <= salario * 0.4;
      }
    ),

  cartaoCredito: yup
    .number()
    .min(0, "Dívida do cartão não pode ser negativa")
    .test(
      "divida-total",
      "Dívidas totais não podem exceder 20% do salário",
      function (value) {
        const { salario } = this.parent;
        return !value || !salario || value <= salario * 0.2;
      }
    ),
});

interface FormData {
  salario: number;
  aluguel: number;
  financiamento: number;
  cartaoCredito: number;
}

function AnaliseOrcamentaria() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      salario: 0,
      aluguel: 0,
      financiamento: 0,
      cartaoCredito: 0,
    },
  });

  const valores = watch();

  const gastosTotais =
    valores.aluguel + valores.financiamento + valores.cartaoCredito;
  const sobra = valores.salario - gastosTotais;
  const percentualCompromertido =
    valores.salario > 0 ? (gastosTotais / valores.salario) * 100 : 0;

  const getStatusOrcamento = () => {
    if (percentualCompromertido <= 30)
      return { cor: "success", texto: "Excelente" };
    if (percentualCompromertido <= 50)
      return { cor: "warning", texto: "Atenção" };
    if (percentualCompromertido <= 70)
      return { cor: "error", texto: "Crítico" };
    return { cor: "error", texto: "Insustentável" };
  };

  const status = getStatusOrcamento();

  const onSubmit = (data: FormData) => {
    console.log("Análise orçamentária:", data);
    console.log("Status:", status.texto);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom>
        Análise Orçamentária
      </Typography>

      <Stack spacing={3}>
        <RhfMoneyField
          name="salario"
          control={control}
          label="Salário Líquido"
          helperText="Salário após descontos"
        />

        <RhfMoneyField
          name="aluguel"
          control={control}
          label="Aluguel"
          helperText="Máximo recomendado: 30% do salário"
        />

        <RhfMoneyField
          name="financiamento"
          control={control}
          label="Financiamento Imobiliário"
          helperText="Parcela mensal do financiamento"
        />

        <RhfMoneyField
          name="cartaoCredito"
          control={control}
          label="Cartão de Crédito"
          helperText="Fatura mensal média"
        />

        <Paper
          sx={{
            p: 3,
            bgcolor: `${status.cor}.light`,
            color: `${status.cor}.contrastText`,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Análise do Orçamento
          </Typography>

          <Stack spacing={1}>
            <Typography>
              Salário: R$ {valores.salario.toFixed(2).replace(".", ",")}
            </Typography>
            <Typography>
              Gastos Totais: R$ {gastosTotais.toFixed(2).replace(".", ",")}
            </Typography>
            <Typography>
              Sobra: R$ {sobra.toFixed(2).replace(".", ",")}
            </Typography>
            <Typography>
              Comprometimento: {percentualCompromertido.toFixed(1)}%
            </Typography>
            <Typography variant="h6">Status: {status.texto}</Typography>
          </Stack>
        </Paper>

        <button type="submit">Salvar Análise</button>
      </Stack>
    </form>
  );
}
```

## Acessibilidade

### ARIA e Labels

```tsx
<RhfMoneyField
  name="valor"
  control={control}
  label="Valor da Transação"
  aria-label="Campo para inserir valor da transação em reais"
  aria-describedby="valor-help"
  helperText="Digite apenas números, a formatação será aplicada automaticamente"
  inputProps={{
    "aria-valuetext": `${watch("valor")} reais`,
    role: "textbox",
    "aria-required": true,
  }}
/>
```

### Validação com Leitores de Tela

```tsx
const {
  control,
  formState: { errors },
} = useForm<FormData>();

<RhfMoneyField
  name="preco"
  control={control}
  label="Preço"
  aria-invalid={!!errors.preco}
  aria-describedby={errors.preco ? "preco-error" : "preco-help"}
  inputProps={{
    "aria-errormessage": errors.preco ? "preco-error" : undefined,
  }}
/>;

{
  errors.preco && (
    <div id="preco-error" role="alert" aria-live="polite">
      {errors.preco.message}
    </div>
  );
}
```

## Performance e Otimização

### Memoização de Componentes

```tsx
import React, { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { RhfMoneyField } from "@hox/capy";

interface ItemFormProps {
  index: number;
  onRemove: (index: number) => void;
}

const ItemForm = memo<ItemFormProps>(({ index, onRemove }) => {
  const { control } = useForm();

  const handleRemove = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  return (
    <div>
      <RhfMoneyField
        name={`itens.${index}.preco`}
        control={control}
        label={`Preço do Item ${index + 1}`}
      />
      <button onClick={handleRemove}>Remover</button>
    </div>
  );
});
```

### Debounce para Cálculos Pesados

```tsx
import { useDebouncedCallback } from "use-debounce";

function FormularioComCalculos() {
  const { control, watch } = useForm<FormData>();
  const [resultado, setResultado] = useState<number>(0);

  const calcularResultado = useDebouncedCallback(
    async (valores: FormData) => {
      // Simulação de cálculo pesado
      const resultado = await new Promise<number>((resolve) => {
        setTimeout(() => {
          resolve(valores.valor1 * valores.valor2 * 1.15);
        }, 100);
      });
      setResultado(resultado);
    },
    300 // 300ms de delay
  );

  const valores = watch();

  useEffect(() => {
    calcularResultado(valores);
  }, [valores, calcularResultado]);

  return (
    <form>
      <RhfMoneyField name="valor1" control={control} label="Valor 1" />

      <RhfMoneyField name="valor2" control={control} label="Valor 2" />

      <div>Resultado: R$ {resultado.toFixed(2).replace(".", ",")}</div>
    </form>
  );
}
```

## Troubleshooting

### Problemas Comuns

#### 1. Erro de Validação não Aparece

**Problema:** Mensagens de erro do yup não aparecem no campo.

**Solução:**

```tsx
// ✅ Certifique-se de usar o resolver
const { control } = useForm({
  resolver: yupResolver(schema),
  mode: "onChange", // ou 'onBlur'
});

// ✅ Verifique se o name corresponde ao schema
const schema = yup.object({
  preco: yup.number().required("Campo obrigatório"), // deve corresponder ao name
});

<RhfMoneyField
  name="preco" // deve corresponder ao schema
  control={control}
  label="Preço"
/>;
```

#### 2. defaultValue não Funciona

**Problema:** Valor padrão não é aplicado.

**Solução:**

```tsx
// ✅ Defina defaultValues no useForm
const { control } = useForm<FormData>({
  defaultValues: {
    preco: 100.5, // valor padrão no formulário
  },
});

// ❌ Não use defaultValue diretamente no campo
<RhfMoneyField
  name="preco"
  control={control}
  // defaultValue={100} // não funciona com react-hook-form
/>;
```

#### 3. Valor não Atualiza em watch()

**Problema:** watch() não reflete mudanças imediatas.

**Solução:**

```tsx
const { control, watch } = useForm<FormData>({
  mode: "onChange", // força atualização a cada mudança
});

// ✅ Use watch com dependências
const valor = watch("preco");
useEffect(() => {
  console.log("Valor mudou:", valor);
}, [valor]);
```

#### 4. Performance Lenta com Muitos Campos

**Problema:** Formulário lento com muitos RhfMoneyField.

**Solução:**

```tsx
// ✅ Use mode apropriado
const { control } = useForm<FormData>({
  mode: "onBlur", // só valida quando sai do campo
});

// ✅ Memoize componentes pesados
const MemoizedForm = memo(() => {
  return <div>{/* muitos campos aqui */}</div>;
});
```

### Integração com APIs

```tsx
import { useQuery, useMutation } from "@tanstack/react-query";

function FormularioComAPI() {
  const { control, handleSubmit, reset } = useForm<FormData>();

  // Busca dados iniciais
  const { data: produtoInicial } = useQuery({
    queryKey: ["produto", id],
    queryFn: () => fetchProduto(id),
    onSuccess: (data) => {
      reset(data); // preenche o formulário
    },
  });

  // Salva dados
  const mutation = useMutation({
    mutationFn: (data: FormData) => saveProduto(data),
    onSuccess: () => {
      alert("Produto salvo com sucesso!");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfMoneyField
        name="preco"
        control={control}
        label="Preço"
        disabled={mutation.isLoading}
      />

      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
```

## Padrões Avançados

### Hook Personalizado para Formulários Monetários

```tsx
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface UseMoneyFormOptions<T> {
  schema?: yup.ObjectSchema<any>;
  defaultValues?: Partial<T>;
  onSubmit?: (data: T) => void;
  currency?: "BRL" | "USD" | "EUR";
}

function useMoneyForm<T extends Record<string, any>>({
  schema,
  defaultValues,
  onSubmit,
  currency = "BRL",
}: UseMoneyFormOptions<T>) {
  const form = useForm<T>({
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues: defaultValues as any,
    mode: "onChange",
  });

  const values = useWatch({ control: form.control });

  const currencyConfig = {
    BRL: { symbol: "R$", decimal: ",", thousand: "." },
    USD: { symbol: "$", decimal: ".", thousand: "," },
    EUR: { symbol: "€", decimal: ",", thousand: " " },
  };

  const formatMoney = (value: number) => {
    const config = currencyConfig[currency];
    return `${config.symbol} ${value
      .toFixed(2)
      .replace(".", config.decimal)
      .replace(/\B(?=(\d{3})+(?!\d))/g, config.thousand)}`;
  };

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit?.(data);
  });

  return {
    ...form,
    values,
    formatMoney,
    currencyConfig: currencyConfig[currency],
    handleSubmit,
  };
}

// Uso do hook
function ExemploHookPersonalizado() {
  const schema = yup.object({
    preco: yup.number().required().min(0.01),
  });

  const { control, values, formatMoney, currencyConfig, handleSubmit } =
    useMoneyForm({
      schema,
      defaultValues: { preco: 0 },
      onSubmit: (data) => console.log(data),
      currency: "BRL",
    });

  return (
    <form onSubmit={handleSubmit}>
      <RhfMoneyField
        name="preco"
        control={control}
        label="Preço"
        currencySymbol={currencyConfig.symbol}
        decimalSeparator={currencyConfig.decimal}
        thousandSeparator={currencyConfig.thousand}
      />

      <p>Valor formatado: {formatMoney(values.preco || 0)}</p>

      <button type="submit">Enviar</button>
    </form>
  );
}
```

O `RhfMoneyField` oferece uma solução completa e integrada para formulários que necessitam de campos monetários com validação robusta, formatação automática e excelente experiência do usuário.
