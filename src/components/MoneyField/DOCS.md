# MoneyField

O `MoneyField` é um componente de campo monetário baseado no Material-UI TextField que fornece formatação automática de valores em tempo real com suporte a diferentes moedas e separadores regionais.

## Características Principais

- ✅ Formatação automática em tempo real (da direita para a esquerda)
- ✅ Suporte a múltiplas moedas (R$, $, €, etc.)
- ✅ Separadores decimais e de milhares customizáveis
- ✅ Validação de entrada (apenas números)
- ✅ Alinhamento de texto à direita
- ✅ Integração completa com Material-UI
- ✅ Acessibilidade nativa

## Interface TypeScript

```typescript
import { TextFieldProps } from "@mui/material";

export type MoneyFieldProps = Omit<TextFieldProps, "onChange"> & {
  currencySymbol?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  value: number | undefined;
  onChange?: (value: number) => void;
};
```

## Props Principais

| Prop                | Tipo                                   | Padrão       | Descrição                                            |
| ------------------- | -------------------------------------- | ------------ | ---------------------------------------------------- |
| `value`             | `number \| undefined`                  | -            | **Obrigatório.** Valor monetário em formato numérico |
| `onChange`          | `(value: number) => void`              | -            | Callback chamado quando o valor é alterado           |
| `currencySymbol`    | `string`                               | `"R$"`       | Símbolo da moeda                                     |
| `decimalSeparator`  | `string`                               | `","`        | Separador decimal                                    |
| `thousandSeparator` | `string`                               | `"."`        | Separador de milhares                                |
| `label`             | `string`                               | -            | Rótulo do campo                                      |
| `disabled`          | `boolean`                              | `false`      | Desabilita o campo                                   |
| `fullWidth`         | `boolean`                              | `false`      | Campo ocupa toda a largura                           |
| `variant`           | `"outlined" \| "filled" \| "standard"` | `"outlined"` | Variante visual                                      |

## Exemplos de Uso

### Exemplo Básico (Real Brasileiro)

```tsx
import React, { useState } from "react";
import { MoneyField } from "@hox/capy";

function ExemploBasico() {
  const [valor, setValor] = useState<number>(0);

  return (
    <MoneyField
      label="Valor"
      value={valor}
      onChange={setValor}
      fullWidth
      helperText="Digite o valor em reais"
    />
  );
}
```

### Exemplo com Dólar Americano

```tsx
import React, { useState } from "react";
import { MoneyField } from "@hox/capy";

function ExemploDolar() {
  const [valor, setValor] = useState<number>(0);

  return (
    <MoneyField
      label="Price"
      value={valor}
      onChange={setValor}
      currencySymbol="$"
      decimalSeparator="."
      thousandSeparator=","
      fullWidth
      helperText="Enter price in dollars"
    />
  );
}
```

### Exemplo com Euro

```tsx
import React, { useState } from "react";
import { MoneyField } from "@hox/capy";

function ExemploEuro() {
  const [valor, setValor] = useState<number>(0);

  return (
    <MoneyField
      label="Prix"
      value={valor}
      onChange={setValor}
      currencySymbol="€"
      decimalSeparator=","
      thousandSeparator=" "
      fullWidth
      helperText="Saisissez le prix en euros"
    />
  );
}
```

### Exemplo com Valor Inicial

```tsx
import React, { useState } from "react";
import { MoneyField } from "@hox/capy";

function ExemploValorInicial() {
  const [preco, setPreco] = useState<number>(1250.75);

  return (
    <MoneyField
      label="Preço do Produto"
      value={preco}
      onChange={setPreco}
      fullWidth
      variant="filled"
      helperText={`Valor em número: ${preco}`}
    />
  );
}
```

### Exemplo de Formulário Completo

```tsx
import React, { useState } from "react";
import { MoneyField } from "@hox/capy";
import { Box, Button, Typography } from "@mui/material";

interface ProdutoForm {
  nome: string;
  preco: number;
  desconto: number;
  frete: number;
}

function FormularioProduto() {
  const [produto, setProduto] = useState<ProdutoForm>({
    nome: "",
    preco: 0,
    desconto: 0,
    frete: 0,
  });

  const precoFinal = produto.preco - produto.desconto + produto.frete;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Produto:", produto);
    console.log("Preço final:", precoFinal);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ "& > *": { mb: 2 } }}>
      <Typography variant="h6">Cadastro de Produto</Typography>

      <MoneyField
        label="Preço do Produto"
        value={produto.preco}
        onChange={(value) => setProduto((prev) => ({ ...prev, preco: value }))}
        fullWidth
        required
      />

      <MoneyField
        label="Desconto"
        value={produto.desconto}
        onChange={(value) =>
          setProduto((prev) => ({ ...prev, desconto: value }))
        }
        fullWidth
        helperText="Valor do desconto a ser aplicado"
      />

      <MoneyField
        label="Frete"
        value={produto.frete}
        onChange={(value) => setProduto((prev) => ({ ...prev, frete: value }))}
        fullWidth
        helperText="Custo do frete"
      />

      <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
        <Typography variant="h6">
          Preço Final: R$ {precoFinal.toFixed(2).replace(".", ",")}
        </Typography>
      </Box>

      <Button type="submit" variant="contained" fullWidth>
        Salvar Produto
      </Button>
    </Box>
  );
}
```

### Exemplo com Estados Diferentes

```tsx
import React, { useState } from "react";
import { MoneyField } from "@hox/capy";
import { Stack } from "@mui/material";

function ExemploEstados() {
  const [valor1, setValor1] = useState<number>(100.5);
  const [valor2, setValor2] = useState<number>(0);

  return (
    <Stack spacing={3}>
      <MoneyField
        label="Campo Normal"
        value={valor1}
        onChange={setValor1}
        fullWidth
      />

      <MoneyField
        label="Campo Desabilitado"
        value={valor1}
        onChange={setValor1}
        disabled
        fullWidth
      />

      <MoneyField
        label="Campo Obrigatório"
        value={valor2}
        onChange={setValor2}
        required
        fullWidth
        error={valor2 === 0}
        helperText={valor2 === 0 ? "Campo obrigatório" : ""}
      />

      <MoneyField
        label="Campo Compacto"
        value={valor1}
        onChange={setValor1}
        size="small"
        variant="standard"
      />
    </Stack>
  );
}
```

## Comportamento de Formatação

### Formatação Automática

O componente formata automaticamente o valor conforme o usuário digita:

- **Entrada:** `123456` → **Saída:** `1.234,56`
- **Entrada:** `1000` → **Saída:** `10,00`
- **Entrada:** `50` → **Saída:** `0,50`

### Lógica de Entrada

1. Remove todos os caracteres não numéricos
2. Divide por 100 para obter o valor com centavos
3. Aplica formatação com separadores
4. Alinha texto à direita

```tsx
// Exemplo de como o valor é processado
const entrada = "123456"; // usuário digita
const numeroLimpo = "123456"; // remove caracteres especiais
const valorNumerico = 1234.56; // divide por 100
const valorFormatado = "1.234,56"; // aplica formatação
```

## Integração com Formulários

### Estado Local Simples

```tsx
import React, { useState } from "react";
import { MoneyField } from "@hox/capy";

function ExemploEstadoLocal() {
  const [orcamento, setOrcamento] = useState<number>(0);

  const handleSalvar = () => {
    // valor já vem em formato numérico
    console.log("Orçamento:", orcamento);

    // Para API, enviar como number
    fetch("/api/orcamento", {
      method: "POST",
      body: JSON.stringify({ valor: orcamento }),
    });
  };

  return (
    <>
      <MoneyField
        label="Orçamento Disponível"
        value={orcamento}
        onChange={setOrcamento}
        fullWidth
      />
      <button onClick={handleSalvar}>Salvar</button>
    </>
  );
}
```

### Context API

```tsx
import React, { createContext, useContext, useState } from "react";
import { MoneyField } from "@hox/capy";

interface FinanceiroContext {
  receita: number;
  despesa: number;
  setReceita: (value: number) => void;
  setDespesa: (value: number) => void;
  saldo: number;
}

const FinanceiroContext = createContext<FinanceiroContext>(
  {} as FinanceiroContext
);

function FinanceiroProvider({ children }: { children: React.ReactNode }) {
  const [receita, setReceita] = useState<number>(0);
  const [despesa, setDespesa] = useState<number>(0);

  const saldo = receita - despesa;

  return (
    <FinanceiroContext.Provider
      value={{
        receita,
        despesa,
        setReceita,
        setDespesa,
        saldo,
      }}
    >
      {children}
    </FinanceiroContext.Provider>
  );
}

function FormularioFinanceiro() {
  const { receita, despesa, setReceita, setDespesa, saldo } =
    useContext(FinanceiroContext);

  return (
    <div>
      <MoneyField
        label="Receita Mensal"
        value={receita}
        onChange={setReceita}
        fullWidth
      />

      <MoneyField
        label="Despesa Mensal"
        value={despesa}
        onChange={setDespesa}
        fullWidth
      />

      <p>Saldo: R$ {saldo.toFixed(2).replace(".", ",")}</p>
    </div>
  );
}
```

## Personalização e Estilos

### Customização com sx

```tsx
import { MoneyField } from "@hox/capy";

function ExemploCustomizado() {
  const [valor, setValor] = useState<number>(0);

  return (
    <MoneyField
      label="Valor Customizado"
      value={valor}
      onChange={setValor}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#f5f5f5",
          "& fieldset": {
            borderColor: "#2196f3",
            borderWidth: 2,
          },
          "&:hover fieldset": {
            borderColor: "#1976d2",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#1976d2",
          fontWeight: "bold",
        },
        "& input": {
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#2e7d32",
        },
      }}
    />
  );
}
```

### Tema Material-UI

```tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MoneyField } from "@hox/capy";

const tema = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input[type="text"]:has(+ span)': {
            // para MoneyField
            textAlign: "right",
            fontFamily: "monospace",
            fontSize: "1.1rem",
            fontWeight: "bold",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={tema}>
      <MoneyField label="Com Tema" value={100} onChange={() => {}} />
    </ThemeProvider>
  );
}
```

## Acessibilidade

### ARIA Labels

```tsx
<MoneyField
  label="Valor do Pagamento"
  value={valor}
  onChange={setValor}
  aria-label="Campo para inserir valor do pagamento em reais"
  aria-describedby="pagamento-help"
  helperText="Digite apenas números, a formatação será aplicada automaticamente"
  id="pagamento-help"
/>
```

### Navegação por Teclado

- **Tab:** Navega para o próximo campo
- **Shift+Tab:** Navega para o campo anterior
- **Números (0-9):** Inserção de valores
- **Backspace/Delete:** Remove dígitos
- **Enter:** Submete formulário (se aplicável)

### Screen Readers

O componente é totalmente compatível com screen readers:

```tsx
<MoneyField
  label="Preço do Produto"
  value={150.75}
  onChange={setPreco}
  aria-label="Campo de preço do produto em reais"
  inputProps={{
    "aria-describedby": "preco-formato",
    role: "textbox",
    "aria-valuetext": `${valor} reais`,
  }}
  helperText="Formato automático: R$ 0.000,00"
  id="preco-formato"
/>
```

## Troubleshooting

### Problemas Comuns

#### 1. Valor não atualiza visualmente

**Problema:** O campo não mostra a formatação correta.

**Solução:**

```tsx
// ❌ Incorreto - passar string
<MoneyField value="100,50" onChange={setValor} />

// ✅ Correto - passar number
<MoneyField value={100.50} onChange={setValor} />
```

#### 2. Formato não corresponde à região

**Problema:** Separadores não estão corretos para a região.

**Solução:**

```tsx
// Para Brasil
<MoneyField
  decimalSeparator=","
  thousandSeparator="."
  currencySymbol="R$"
/>

// Para Estados Unidos
<MoneyField
  decimalSeparator="."
  thousandSeparator=","
  currencySymbol="$"
/>
```

#### 3. Valor muito grande

**Problema:** Campo não aceita valores muito grandes.

**Solução:**

```tsx
// JavaScript suporta números até Number.MAX_SAFE_INTEGER
const VALOR_MAXIMO = 999999999.99;

<MoneyField
  value={Math.min(valor, VALOR_MAXIMO)}
  onChange={(v) => setValor(Math.min(v, VALOR_MAXIMO))}
  inputProps={{
    maxLength: 12, // limita caracteres visualmente
  }}
/>;
```

#### 4. Performance com muitas renderizações

**Problema:** Campo re-renderiza muito frequentemente.

**Solução:**

```tsx
import { useCallback, memo } from "react";

const CampoMoney = memo(() => {
  const [valor, setValor] = useState(0);

  const handleChange = useCallback((newValue: number) => {
    setValor(newValue);
  }, []);

  return <MoneyField value={valor} onChange={handleChange} label="Valor" />;
});
```

### Validações Personalizadas

#### Valor mínimo e máximo

```tsx
interface ValidatedMoneyFieldProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
}

function ValidatedMoneyField({
  value,
  onChange,
  min = 0,
  max = Infinity,
  label,
}: ValidatedMoneyFieldProps) {
  const [error, setError] = useState<string>("");

  const handleChange = (newValue: number) => {
    if (newValue < min) {
      setError(`Valor mínimo: R$ ${min.toFixed(2).replace(".", ",")}`);
    } else if (newValue > max) {
      setError(`Valor máximo: R$ ${max.toFixed(2).replace(".", ",")}`);
    } else {
      setError("");
    }
    onChange(newValue);
  };

  return (
    <MoneyField
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={
        error ||
        `Valor entre R$ ${min.toFixed(2).replace(".", ",")} e R$ ${max
          .toFixed(2)
          .replace(".", ",")}`
      }
    />
  );
}
```

#### Validação de múltiplos

```tsx
function CampoMultiploDe5() {
  const [valor, setValor] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleChange = (newValue: number) => {
    if (newValue % 5 !== 0) {
      setError("Valor deve ser múltiplo de R$ 5,00");
    } else {
      setError("");
    }
    setValor(newValue);
  };

  return (
    <MoneyField
      label="Valor (múltiplo de R$ 5)"
      value={valor}
      onChange={handleChange}
      error={!!error}
      helperText={error}
    />
  );
}
```

## Performance e Boas Práticas

### Otimização de Re-renderizações

```tsx
// ✅ Use React.memo para componentes que recebem MoneyField
const FormularioMemo = memo(function Formulario({ onSubmit }) {
  const [valor, setValor] = useState(0);

  return <MoneyField value={valor} onChange={setValor} label="Valor" />;
});

// ✅ Use useCallback para handlers
const handleValorChange = useCallback((novoValor: number) => {
  setValor(novoValor);
  // outras operações
}, []);
```

### Debounce para APIs

```tsx
import { useDebouncedCallback } from "use-debounce";

function CampoComAPI() {
  const [valor, setValor] = useState<number>(0);

  const salvarValor = useDebouncedCallback(
    async (valor: number) => {
      await fetch("/api/salvar-valor", {
        method: "POST",
        body: JSON.stringify({ valor }),
      });
    },
    500 // aguarda 500ms após parar de digitar
  );

  const handleChange = (novoValor: number) => {
    setValor(novoValor);
    salvarValor(novoValor);
  };

  return (
    <MoneyField
      value={valor}
      onChange={handleChange}
      label="Valor"
      helperText="Salvando automaticamente..."
    />
  );
}
```

### Gerenciamento de Estado Complexo

```tsx
import { useReducer } from "react";

interface CalculadoraState {
  valorPrincipal: number;
  desconto: number;
  imposto: number;
  total: number;
}

type CalculadoraAction =
  | { type: "SET_PRINCIPAL"; valor: number }
  | { type: "SET_DESCONTO"; valor: number }
  | { type: "SET_IMPOSTO"; valor: number };

function calculadoraReducer(
  state: CalculadoraState,
  action: CalculadoraAction
): CalculadoraState {
  const novoState = { ...state };

  switch (action.type) {
    case "SET_PRINCIPAL":
      novoState.valorPrincipal = action.valor;
      break;
    case "SET_DESCONTO":
      novoState.desconto = action.valor;
      break;
    case "SET_IMPOSTO":
      novoState.imposto = action.valor;
      break;
  }

  // Recalcula o total automaticamente
  novoState.total =
    novoState.valorPrincipal - novoState.desconto + novoState.imposto;

  return novoState;
}

function CalculadoraPreco() {
  const [state, dispatch] = useReducer(calculadoraReducer, {
    valorPrincipal: 0,
    desconto: 0,
    imposto: 0,
    total: 0,
  });

  return (
    <div>
      <MoneyField
        label="Valor Principal"
        value={state.valorPrincipal}
        onChange={(valor) => dispatch({ type: "SET_PRINCIPAL", valor })}
      />

      <MoneyField
        label="Desconto"
        value={state.desconto}
        onChange={(valor) => dispatch({ type: "SET_DESCONTO", valor })}
      />

      <MoneyField
        label="Imposto"
        value={state.imposto}
        onChange={(valor) => dispatch({ type: "SET_IMPOSTO", valor })}
      />

      <MoneyField
        label="Total"
        value={state.total}
        onChange={() => {}} // readonly
        disabled
      />
    </div>
  );
}
```

## Casos de Uso Comuns

### E-commerce

```tsx
function ProdutoForm() {
  const [produto, setProduto] = useState({
    preco: 0,
    precoPromocional: 0,
    custoFrete: 0,
  });

  const economia = produto.preco - produto.precoPromocional;
  const precoFinal = produto.precoPromocional + produto.custoFrete;

  return (
    <div>
      <MoneyField
        label="Preço Original"
        value={produto.preco}
        onChange={(preco) => setProduto((prev) => ({ ...prev, preco }))}
      />

      <MoneyField
        label="Preço Promocional"
        value={produto.precoPromocional}
        onChange={(precoPromocional) =>
          setProduto((prev) => ({ ...prev, precoPromocional }))
        }
        error={produto.precoPromocional > produto.preco}
        helperText={
          produto.precoPromocional > produto.preco
            ? "Não pode ser maior que o preço original"
            : ""
        }
      />

      <MoneyField
        label="Frete"
        value={produto.custoFrete}
        onChange={(custoFrete) =>
          setProduto((prev) => ({ ...prev, custoFrete }))
        }
      />

      <div>
        <p>Economia: R$ {economia.toFixed(2).replace(".", ",")}</p>
        <p>Preço Final: R$ {precoFinal.toFixed(2).replace(".", ",")}</p>
      </div>
    </div>
  );
}
```

### Controle Financeiro

```tsx
function ControleFinanceiro() {
  const [movimentos, setMovimentos] = useState<
    Array<{
      id: string;
      tipo: "receita" | "despesa";
      valor: number;
      descricao: string;
    }>
  >([]);

  const [novoMovimento, setNovoMovimento] = useState({
    tipo: "receita" as const,
    valor: 0,
    descricao: "",
  });

  const saldoTotal = movimentos.reduce((acc, mov) => {
    return mov.tipo === "receita" ? acc + mov.valor : acc - mov.valor;
  }, 0);

  const adicionarMovimento = () => {
    if (novoMovimento.valor > 0) {
      setMovimentos((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...novoMovimento,
        },
      ]);
      setNovoMovimento({ tipo: "receita", valor: 0, descricao: "" });
    }
  };

  return (
    <div>
      <h2>Controle Financeiro</h2>

      <MoneyField
        label="Valor"
        value={novoMovimento.valor}
        onChange={(valor) => setNovoMovimento((prev) => ({ ...prev, valor }))}
      />

      <button onClick={adicionarMovimento}>
        Adicionar {novoMovimento.tipo}
      </button>

      <div>
        <h3>Saldo Total: R$ {saldoTotal.toFixed(2).replace(".", ",")}</h3>
        {saldoTotal < 0 && <p style={{ color: "red" }}>⚠️ Saldo negativo!</p>}
      </div>
    </div>
  );
}
```

### Calculadora de Empréstimo

```tsx
function CalculadoraEmprestimo() {
  const [dados, setDados] = useState({
    valorEmprestimo: 0,
    taxaJuros: 0.05, // 5% ao mês
    parcelas: 12,
  });

  const valorParcela =
    dados.valorEmprestimo > 0
      ? (dados.valorEmprestimo *
          dados.taxaJuros *
          Math.pow(1 + dados.taxaJuros, dados.parcelas)) /
        (Math.pow(1 + dados.taxaJuros, dados.parcelas) - 1)
      : 0;

  const valorTotal = valorParcela * dados.parcelas;
  const jurosTotal = valorTotal - dados.valorEmprestimo;

  return (
    <div>
      <h2>Calculadora de Empréstimo</h2>

      <MoneyField
        label="Valor do Empréstimo"
        value={dados.valorEmprestimo}
        onChange={(valorEmprestimo) =>
          setDados((prev) => ({ ...prev, valorEmprestimo }))
        }
        fullWidth
      />

      <div>
        <h3>Resultado:</h3>
        <p>Valor da Parcela: R$ {valorParcela.toFixed(2).replace(".", ",")}</p>
        <p>Valor Total: R$ {valorTotal.toFixed(2).replace(".", ",")}</p>
        <p>Juros Total: R$ {jurosTotal.toFixed(2).replace(".", ",")}</p>
      </div>
    </div>
  );
}
```

## Migração e Compatibilidade

### Migração de TextField comum

```tsx
// ❌ Antes - TextField comum
<TextField
  label="Valor"
  value={valor}
  onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
  inputProps={{
    inputMode: 'numeric',
    pattern: '[0-9]*'
  }}
/>

// ✅ Depois - MoneyField
<MoneyField
  label="Valor"
  value={valor}
  onChange={setValue}
/>
```

### Integração com bibliotecas existentes

```tsx
// Com Formik
import { useFormik } from "formik";

const formik = useFormik({
  initialValues: { preco: 0 },
  onSubmit: (values) => console.log(values),
});

<MoneyField
  label="Preço"
  value={formik.values.preco}
  onChange={(value) => formik.setFieldValue("preco", value)}
/>;

// Com Zustand
import { useStore } from "./store";

function ComponenteComZustand() {
  const { preco, setPreco } = useStore();

  return <MoneyField label="Preço" value={preco} onChange={setPreco} />;
}
```

## Recursos Avançados

### Hook personalizado para conversão

```tsx
import { useState, useCallback } from "react";

function useMoneyValue(initialValue: number = 0) {
  const [value, setValue] = useState<number>(initialValue);

  const setMoneyValue = useCallback((newValue: number) => {
    setValue(Math.max(0, newValue)); // impede valores negativos
  }, []);

  const formatDisplay = useCallback(
    (val: number = value) => {
      return `R$ ${val.toFixed(2).replace(".", ",")}`;
    },
    [value]
  );

  const reset = useCallback(() => setValue(0), []);

  return {
    value,
    setValue: setMoneyValue,
    formatDisplay,
    reset,
    isZero: value === 0,
    isPositive: value > 0,
  };
}

// Uso do hook
function ExemploComHook() {
  const dinheiro = useMoneyValue(100);

  return (
    <div>
      <MoneyField
        label="Valor"
        value={dinheiro.value}
        onChange={dinheiro.setValue}
      />
      <p>Formatado: {dinheiro.formatDisplay()}</p>
      <button onClick={dinheiro.reset}>Reset</button>
    </div>
  );
}
```

Este componente MoneyField oferece uma solução completa para entrada de valores monetários com formatação automática, sendo ideal para aplicações financeiras, e-commerce e qualquer sistema que necessite de campos monetários profissionais e bem formatados.
