# RhfAutocomplete

O `RhfAutocomplete` é um componente de autocomplete integrado com react-hook-form que permite seleção única ou múltipla com busca dinâmica. É baseado no componente Autocomplete do Material-UI.

## Características Principais

- ✅ Integração completa com react-hook-form
- ✅ Suporte a seleção única e múltipla
- ✅ Busca dinâmica com filtros customizáveis
- ✅ Suporte a freeSolo (entrada livre)
- ✅ Validação automática de erros
- ✅ Opções desabilitadas
- ✅ Renderização customizada de opções
- ✅ TypeScript completo

## Instalação e Configuração

### Pré-requisitos

```bash
npm install @hox-rs/capy @mui/material react-hook-form
```

### Peer Dependencies Necessárias

```bash
npm install @emotion/react @emotion/styled
```

## Interface TypeScript

```typescript
export type RhfAutocompleteOption = BaseOption;

export type RhfAutocompleteProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> & {
  /** Tipo de erro específico para autocomplete que pode lidar com arrays */
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  /** Variante do TextField de entrada */
  variant?: "standard" | "outlined" | "filled";
  /** Props para passar para o TextField subjacente */
  InputProps?: InputBaseProps;
  /** Array de opções do autocomplete */
  options: RhfAutocompleteOption[];
} & Omit<
    AutocompleteProps<any, boolean, boolean, boolean>,
    "options" | "renderInput" | "onChange" | "value"
  >;
```

## Props Principais

| Prop            | Tipo                                   | Padrão                          | Descrição                                      |
| --------------- | -------------------------------------- | ------------------------------- | ---------------------------------------------- |
| `name`          | `string`                               | -                               | Nome do campo para react-hook-form             |
| `control`       | `Control`                              | -                               | Objeto control do useForm                      |
| `options`       | `RhfAutocompleteOption[]`              | -                               | Array de opções disponíveis                    |
| `label`         | `string`                               | -                               | Label do campo                                 |
| `multiple`      | `boolean`                              | `true`                          | Permite seleção múltipla                       |
| `freeSolo`      | `boolean`                              | `false`                         | Permite entrada livre (sem validação de opção) |
| `fullWidth`     | `boolean`                              | `true`                          | Campo ocupa toda a largura                     |
| `variant`       | `"standard" \| "outlined" \| "filled"` | `"outlined"`                    | Variante visual do campo                       |
| `noOptionsText` | `string`                               | `"Nenhum resultado encontrado"` | Texto quando não há opções                     |
| `disabled`      | `boolean`                              | `false`                         | Desabilita o campo                             |
| `helperText`    | `string`                               | -                               | Texto de ajuda                                 |
| `error`         | `FieldError`                           | -                               | Objeto de erro do react-hook-form              |
| `defaultValue`  | `any`                                  | -                               | Valor inicial do campo                         |

## Exemplos de Uso

### Exemplo Básico - Seleção Única

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfAutocomplete } from "@hox-rs/capy";

interface FormData {
  cidade: string;
}

const opcoesCidades = [
  { value: "sp", label: "São Paulo" },
  { value: "rj", label: "Rio de Janeiro" },
  { value: "mg", label: "Belo Horizonte" },
  { value: "pr", label: "Curitiba" },
];

function FormularioCidade() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Cidade selecionada:", data.cidade);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfAutocomplete
        name="cidade"
        control={control}
        label="Selecione uma cidade"
        options={opcoesCidades}
        multiple={false}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Exemplo com Seleção Múltipla

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfAutocomplete } from "@hox-rs/capy";

interface FormData {
  habilidades: string[];
}

const opcoesHabilidades = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "docker", label: "Docker" },
];

function FormularioHabilidades() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      habilidades: ["react", "typescript"],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Habilidades selecionadas:", data.habilidades);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfAutocomplete
        name="habilidades"
        control={control}
        label="Selecione suas habilidades"
        options={opcoesHabilidades}
        multiple={true}
        defaultValue={["react", "typescript"]}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Exemplo com FreeSolo (Entrada Livre)

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfAutocomplete } from "@hox-rs/capy";

interface FormData {
  tags: string[];
}

const tagsSugeridas = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Full Stack" },
];

function FormularioTags() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Tags:", data.tags);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfAutocomplete
        name="tags"
        control={control}
        label="Tags (você pode criar novas)"
        options={tagsSugeridas}
        multiple={true}
        freeSolo={true}
        helperText="Selecione das opções ou digite novas tags"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Exemplo com Validações

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfAutocomplete } from "@hox-rs/capy";

const schema = yup.object({
  tecnologias: yup
    .array()
    .of(yup.string())
    .min(2, "Selecione pelo menos 2 tecnologias")
    .max(5, "Máximo de 5 tecnologias permitidas")
    .required("Campo obrigatório"),
});

interface FormData {
  tecnologias: string[];
}

const opcoesTecnologias = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
];

function FormularioComValidacao() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados válidos:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfAutocomplete
        name="tecnologias"
        control={control}
        label="Tecnologias"
        options={opcoesTecnologias}
        multiple={true}
        error={errors.tecnologias}
        helperText="Selecione entre 2 e 5 tecnologias"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Exemplo com Opções Desabilitadas

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfAutocomplete } from "@hox-rs/capy";

interface FormData {
  plano: string;
}

const opcoesPlanos = [
  { value: "basic", label: "Básico", disabled: false },
  { value: "premium", label: "Premium", disabled: false },
  { value: "enterprise", label: "Enterprise", disabled: true }, // Indisponível
  { value: "ultimate", label: "Ultimate", disabled: true },
];

function FormularioPlanos() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Plano selecionado:", data.plano);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfAutocomplete
        name="plano"
        control={control}
        label="Escolha seu plano"
        options={opcoesPlanos}
        multiple={false}
        helperText="Alguns planos estão temporariamente indisponíveis"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Exemplo com Renderização Customizada

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { RhfAutocomplete } from "@hox-rs/capy";
import { Avatar, Chip } from "@mui/material";

interface Usuario {
  value: string;
  label: string;
  email: string;
  avatar?: string;
}

interface FormData {
  colaboradores: string[];
}

const usuarios: Usuario[] = [
  {
    value: "1",
    label: "João Silva",
    email: "joao@empresa.com",
    avatar: "/avatars/joao.jpg",
  },
  {
    value: "2",
    label: "Maria Santos",
    email: "maria@empresa.com",
    avatar: "/avatars/maria.jpg",
  },
  {
    value: "3",
    label: "Pedro Costa",
    email: "pedro@empresa.com",
  },
];

function FormularioColaboradores() {
  const { control, handleSubmit } = useForm<FormData>();

  const renderOption = (props: any, option: Usuario) => (
    <li {...props} key={option.value}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar src={option.avatar} sx={{ width: 24, height: 24 }}>
          {option.label.charAt(0)}
        </Avatar>
        <div>
          <div>{option.label}</div>
          <div style={{ fontSize: "0.8em", color: "gray" }}>{option.email}</div>
        </div>
      </div>
    </li>
  );

  const onSubmit = (data: FormData) => {
    console.log("Colaboradores selecionados:", data.colaboradores);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfAutocomplete
        name="colaboradores"
        control={control}
        label="Selecionar colaboradores"
        options={usuarios}
        multiple={true}
        renderOption={renderOption}
        helperText="Busque por nome ou email"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Exemplo com Busca em API

```typescript
import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { RhfAutocomplete } from "@hox-rs/capy";
import { debounce } from "lodash";

interface FormData {
  cep: string;
}

interface Endereco {
  value: string;
  label: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
}

function FormularioCEP() {
  const { control, handleSubmit } = useForm<FormData>();
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar endereços na API
  const buscarEnderecos = async (termo: string) => {
    if (termo.length < 3) {
      setEnderecos([]);
      return;
    }

    setLoading(true);
    try {
      // Simula chamada à API (substitua pela sua API real)
      const response = await fetch(`/api/enderecos?q=${termo}`);
      const data = await response.json();

      const enderecosFormatados = data.map((item: any) => ({
        value: item.cep,
        label: `${item.logradouro}, ${item.bairro} - ${item.cidade}/${item.uf}`,
        logradouro: item.logradouro,
        bairro: item.bairro,
        cidade: item.cidade,
        uf: item.uf,
      }));

      setEnderecos(enderecosFormatados);
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
      setEnderecos([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce para evitar muitas chamadas à API
  const debouncedBusca = useMemo(() => debounce(buscarEnderecos, 300), []);

  const onSubmit = (data: FormData) => {
    console.log("CEP selecionado:", data.cep);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfAutocomplete
        name="cep"
        control={control}
        label="Buscar endereço"
        options={enderecos}
        multiple={false}
        freeSolo={true}
        loading={loading}
        onInputChange={(_, value) => debouncedBusca(value)}
        noOptionsText={
          loading ? "Buscando..." : "Digite pelo menos 3 caracteres"
        }
        helperText="Digite o nome da rua, bairro ou cidade"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

## Casos de Uso Comuns

### 1. Seleção de Categorias

```typescript
// Para e-commerce, blogs, etc.
const categorias = [
  { value: "eletronicos", label: "Eletrônicos" },
  { value: "roupas", label: "Roupas e Acessórios" },
  { value: "casa", label: "Casa e Jardim" },
];
```

### 2. Seleção de Usuários/Colaboradores

```typescript
// Para sistemas de gestão, atribuição de tarefas
const usuarios = [
  { value: "1", label: "João Silva (Desenvolvedor)" },
  { value: "2", label: "Maria Santos (Designer)" },
];
```

### 3. Tags e Palavras-chave

```typescript
// Para sistemas de blog, classificação
// Usar com freeSolo=true para permitir criação de novas tags
```

### 4. Localização Geográfica

```typescript
// Estados, cidades, países
const estados = [
  { value: "SP", label: "São Paulo" },
  { value: "RJ", label: "Rio de Janeiro" },
];
```

### 5. Seleção de Produtos/Serviços

```typescript
// Para pedidos, orçamentos
const produtos = [
  { value: "prod1", label: "Produto A - R$ 99,90" },
  { value: "prod2", label: "Produto B - R$ 149,90" },
];
```

## Integração com APIs

### Padrão Recomendado para APIs

```typescript
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { RhfAutocomplete } from "@hox-rs/capy";

interface ApiOption {
  id: string;
  nome: string;
  // outros campos...
}

function ComponenteComAPI() {
  const { control } = useForm();
  const [opcoes, setOpcoes] = useState<RhfAutocompleteOption[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarOpcoes = useCallback(async (termo: string) => {
    if (!termo) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/buscar?q=${encodeURIComponent(termo)}`
      );
      const dados: ApiOption[] = await response.json();

      const opcoesFormatadas = dados.map((item) => ({
        value: item.id,
        label: item.nome,
      }));

      setOpcoes(opcoesFormatadas);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <RhfAutocomplete
      name="itemSelecionado"
      control={control}
      label="Buscar item"
      options={opcoes}
      loading={loading}
      onInputChange={(_, valor) => buscarOpcoes(valor)}
      freeSolo={false}
      multiple={false}
    />
  );
}
```

## Troubleshooting

### Problemas Comuns e Soluções

#### 1. **Valor não aparece selecionado**

```typescript
// ❌ Problema: defaultValue não corresponde aos values das options
<RhfAutocomplete
  defaultValue="abc"
  options={[{ value: "123", label: "Item" }]}
/>

// ✅ Solução: Certifique-se que defaultValue corresponde ao value
<RhfAutocomplete
  defaultValue="123"
  options={[{ value: "123", label: "Item" }]}
/>
```

#### 2. **Erro de tipo com multiple**

```typescript
// ❌ Problema: Tipo incorreto para multiple
interface FormData {
  items: string; // Deveria ser array
}

// ✅ Solução: Use array para multiple=true
interface FormData {
  items: string[]; // Correto para multiple
}
```

#### 3. **Opções não filtram corretamente**

```typescript
// ✅ Solução: Use a prop filterOptions se necessário
<RhfAutocomplete
  options={opcoes}
  filterOptions={(options, { inputValue }) =>
    options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )
  }
/>
```

#### 4. **Performance com muitas opções**

```typescript
// ✅ Solução: Use virtualização ou paginação
<RhfAutocomplete
  options={opcoes}
  limitTags={3}
  getLimitTagsText={(more) => `+${more} mais`}
  // Considere implementar busca server-side
/>
```

#### 5. **Problemas com freeSolo e validação**

```typescript
// ✅ Solução: Configure validação adequada para freeSolo
const schema = yup.object({
  campo: yup.mixed().test("valid-option", "Opção inválida", function (value) {
    if (!value) return true; // Permite vazio

    // Para freeSolo, aceita strings livres
    if (typeof value === "string") return true;

    // Para opções pré-definidas, valida se existe
    return opcoes.some((opt) => opt.value === value);
  }),
});
```

#### 6. **Valor não persiste após submit**

```typescript
// ✅ Solução: Verifique se está usando o control corretamente
const { control } = useForm({
  defaultValues: {
    campo: [], // Para multiple
    // ou
    campo: "", // Para single
  },
});
```

### Dicas de Performance

1. **Use memo para opções estáticas:**

```typescript
const opcoes = useMemo(
  () => [
    { value: "1", label: "Opção 1" },
    { value: "2", label: "Opção 2" },
  ],
  []
);
```

2. **Implemente debounce para busca:**

```typescript
const debouncedSearch = useMemo(() => debounce(buscarAPI, 300), []);
```

3. **Use limitTags para múltipla seleção:**

```typescript
<RhfAutocomplete
  multiple
  limitTags={2}
  getLimitTagsText={(more) => `+${more} mais`}
/>
```

## Acessibilidade

O componente segue as diretrizes de acessibilidade:

- ✅ Suporte completo a navegação por teclado
- ✅ Labels apropriados para screen readers
- ✅ Estados de foco visíveis
- ✅ Descrições de erro acessíveis
- ✅ ARIA attributes corretos

## Compatibilidade

- ✅ React 19.1.0+
- ✅ TypeScript 5.0+
- ✅ Material-UI 7.0+
- ✅ react-hook-form 7.0+

## Recursos Adicionais

- [Documentação do Material-UI Autocomplete](https://mui.com/components/autocomplete/)
- [Documentação do react-hook-form](https://react-hook-form.com/)
- [Exemplos no Storybook](https://capy.hox.dev.br)

---

**Última atualização:** Dezembro 2024
**Versão da biblioteca:** 5.0.1
