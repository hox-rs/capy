# RhfButtonGroup

O `RhfButtonGroup` é um componente que integra o Material-UI ButtonGroup com o React Hook Form, oferecendo uma interface elegante para seleção de opções através de botões. Suporta tanto seleção única (exclusive) quanto múltipla (non-exclusive).

## Características Principais

- ✅ Integração completa com react-hook-form
- ✅ Suporte a seleção única e múltipla
- ✅ Orientação horizontal e vertical
- ✅ Múltiplas variantes e cores
- ✅ Opções desabilitadas individualmente
- ✅ Suporte a diferentes tipos de valores (string, number, boolean)
- ✅ Validação de erro automática
- ✅ Acessibilidade completa

## Instalação

```bash
npm install @mui/material react-hook-form
# ou
yarn add @mui/material react-hook-form
```

## Uso Básico

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfButtonGroup } from "@hox-rs/capy";

function ExemploBasico() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfButtonGroup
        name="opcao"
        label="Escolha uma opção"
        control={control}
        options={[
          { label: "Opção 1", value: "opcao1" },
          { label: "Opção 2", value: "opcao2" },
          { label: "Opção 3", value: "opcao3" },
        ]}
        defaultValue="opcao1"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

## Props

| Prop             | Tipo                                  | Padrão         | Descrição                                    |
| ---------------- | ------------------------------------- | -------------- | -------------------------------------------- |
| **name**         | `string`                              | -              | Nome do campo no formulário (obrigatório)    |
| **control**      | `Control`                             | -              | Controle do react-hook-form (obrigatório)    |
| **options**      | `RhfButtonGroupOption[]`              | -              | Array de opções para os botões (obrigatório) |
| **label**        | `ReactNode \| string`                 | -              | Label do grupo de botões                     |
| **exclusive**    | `boolean`                             | `true`         | Se verdadeiro, permite apenas uma seleção    |
| **orientation**  | `'horizontal' \| 'vertical'`          | `'horizontal'` | Orientação do grupo de botões                |
| **variant**      | `'text' \| 'outlined' \| 'contained'` | `'outlined'`   | Variante dos botões                          |
| **color**        | Material-UI colors                    | `'primary'`    | Cor dos botões                               |
| **size**         | `'small' \| 'medium' \| 'large'`      | `'medium'`     | Tamanho dos botões                           |
| **fullWidth**    | `boolean`                             | `false`        | Se verdadeiro, ocupa toda a largura          |
| **disabled**     | `boolean`                             | `false`        | Desabilita todos os botões                   |
| **defaultValue** | `any \| any[]`                        | -              | Valor padrão do campo                        |
| **error**        | `FieldError`                          | -              | Objeto de erro do react-hook-form            |
| **helperText**   | `string`                              | -              | Texto de ajuda                               |

### Interface RhfButtonGroupOption

```typescript
interface RhfButtonGroupOption {
  label: string; // Texto exibido no botão
  value: string | number | boolean; // Valor do botão
  disabled?: boolean; // Se verdadeiro, botão fica desabilitado
}
```

## Exemplos Avançados

### Seleção Múltipla

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfButtonGroup } from "@hox-rs/capy";

function SelecaoMultipla() {
  const { control, handleSubmit, watch } = useForm();
  const valores = watch("recursos");

  const onSubmit = (data) => {
    console.log("Recursos selecionados:", data.recursos);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfButtonGroup
        name="recursos"
        label="Selecione os recursos desejados"
        control={control}
        exclusive={false} // Permite seleção múltipla
        options={[
          { label: "WiFi", value: "wifi" },
          { label: "Ar Condicionado", value: "ar" },
          { label: "Estacionamento", value: "estacionamento" },
          { label: "Piscina", value: "piscina" },
        ]}
        defaultValue={["wifi", "ar"]}
      />

      <p>Selecionados: {valores?.length || 0} itens</p>
      <button type="submit">Confirmar</button>
    </form>
  );
}
```

### Orientação Vertical

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfButtonGroup } from "@hox-rs/capy";

function OrientacaoVertical() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <RhfButtonGroup
        name="prioridade"
        label="Selecione a prioridade"
        control={control}
        orientation="vertical"
        variant="contained"
        color="secondary"
        size="large"
        options={[
          { label: "🔴 Alta", value: "alta" },
          { label: "🟡 Média", value: "media" },
          { label: "🟢 Baixa", value: "baixa" },
        ]}
        defaultValue="media"
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
```

### Com Validação

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfButtonGroup } from "@hox-rs/capy";

const schema = yup.object().shape({
  categoria: yup.string().required("Selecione uma categoria"),
  tags: yup.array().min(1, "Selecione pelo menos uma tag"),
});

function ComValidacao() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Dados válidos:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfButtonGroup
        name="categoria"
        label="Categoria do produto"
        control={control}
        error={errors.categoria}
        options={[
          { label: "Eletrônicos", value: "eletronicos" },
          { label: "Roupas", value: "roupas" },
          { label: "Casa", value: "casa" },
          { label: "Esportes", value: "esportes" },
        ]}
      />

      <RhfButtonGroup
        name="tags"
        label="Tags do produto"
        control={control}
        exclusive={false}
        error={errors.tags}
        options={[
          { label: "Novo", value: "novo" },
          { label: "Promoção", value: "promocao" },
          { label: "Bestseller", value: "bestseller" },
          { label: "Limitado", value: "limitado" },
        ]}
        defaultValue={[]}
      />

      <button type="submit">Criar Produto</button>
    </form>
  );
}
```

### Opções Desabilitadas e Condicionais

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfButtonGroup } from "@hox-rs/capy";

function OpcoesCondicionais() {
  const { control, handleSubmit, watch } = useForm();
  const plano = watch("plano");

  const opcoesPagamento = [
    { label: "PIX", value: "pix" },
    { label: "Cartão", value: "cartao" },
    {
      label: "Boleto",
      value: "boleto",
      disabled: plano === "premium", // Boleto não disponível para premium
    },
    {
      label: "Débito Automático",
      value: "debito",
      disabled: plano !== "premium", // Só disponível para premium
    },
  ];

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <RhfButtonGroup
        name="plano"
        label="Escolha seu plano"
        control={control}
        options={[
          { label: "Básico", value: "basico" },
          { label: "Padrão", value: "padrao" },
          { label: "Premium", value: "premium" },
        ]}
        defaultValue="basico"
      />

      <RhfButtonGroup
        name="pagamento"
        label="Forma de pagamento"
        control={control}
        options={opcoesPagamento}
        helperText={
          plano === "premium"
            ? "Débito automático disponível para planos Premium"
            : "Upgrade para Premium para mais opções"
        }
      />

      <button type="submit">Finalizar</button>
    </form>
  );
}
```

### Tipos de Valores Mistos

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfButtonGroup } from "@hox-rs/capy";

function TiposMistos() {
  const { control, handleSubmit, watch } = useForm();
  const configuracao = watch("configuracao");

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <RhfButtonGroup
        name="configuracao"
        label="Configuração"
        control={control}
        options={[
          { label: "Automático", value: true }, // boolean
          { label: "Manual", value: false }, // boolean
        ]}
        defaultValue={true}
      />

      <RhfButtonGroup
        name="qualidade"
        label="Qualidade de vídeo"
        control={control}
        options={[
          { label: "Baixa", value: 480 }, // number
          { label: "Média", value: 720 }, // number
          { label: "Alta", value: 1080 }, // number
          { label: "4K", value: 2160 }, // number
        ]}
        defaultValue={720}
        disabled={!configuracao} // Desabilita se não for automático
      />

      <RhfButtonGroup
        name="formato"
        label="Formato de saída"
        control={control}
        options={[
          { label: "MP4", value: "mp4" }, // string
          { label: "AVI", value: "avi" }, // string
          { label: "MOV", value: "mov" }, // string
        ]}
        defaultValue="mp4"
      />

      <button type="submit">Processar Vídeo</button>
    </form>
  );
}
```

### Full Width e Responsivo

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { Box, Container } from "@mui/material";
import { RhfButtonGroup } from "@hox-rs/capy";

function FullWidthResponsivo() {
  const { control, handleSubmit } = useForm();

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit(console.log)}>
        <Box sx={{ mb: 3 }}>
          <RhfButtonGroup
            name="dispositivo"
            label="Otimizar para"
            control={control}
            fullWidth
            options={[
              { label: "📱 Mobile", value: "mobile" },
              { label: "💻 Desktop", value: "desktop" },
              { label: "📺 TV", value: "tv" },
            ]}
            defaultValue="mobile"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <RhfButtonGroup
            name="tema"
            label="Tema da interface"
            control={control}
            fullWidth
            variant="contained"
            exclusive={false}
            orientation="horizontal"
            options={[
              { label: "🌞 Claro", value: "light" },
              { label: "🌙 Escuro", value: "dark" },
              { label: "🎨 Auto", value: "auto" },
            ]}
            defaultValue={["light"]}
          />
        </Box>

        <button type="submit">Salvar Preferências</button>
      </form>
    </Container>
  );
}
```

## Casos de Uso Comuns

### 1. Filtros de Busca

```tsx
function FiltrosBusca() {
  const { control } = useForm();

  return (
    <>
      <RhfButtonGroup
        name="categoria"
        label="Categoria"
        control={control}
        options={[
          { label: "Todos", value: "todos" },
          { label: "Produtos", value: "produtos" },
          { label: "Serviços", value: "servicos" },
          { label: "Eventos", value: "eventos" },
        ]}
        defaultValue="todos"
      />

      <RhfButtonGroup
        name="filtros"
        label="Filtros adicionais"
        control={control}
        exclusive={false}
        options={[
          { label: "Em promoção", value: "promocao" },
          { label: "Novo", value: "novo" },
          { label: "Mais vendido", value: "popular" },
        ]}
        defaultValue={[]}
      />
    </>
  );
}
```

### 2. Configurações de Usuário

```tsx
function ConfiguracaoUsuario() {
  const { control } = useForm();

  return (
    <>
      <RhfButtonGroup
        name="notificacoes"
        label="Notificações"
        control={control}
        exclusive={false}
        orientation="vertical"
        options={[
          { label: "📧 Email", value: "email" },
          { label: "📱 Push", value: "push" },
          { label: "📱 SMS", value: "sms" },
          { label: "🔔 In-app", value: "inapp" },
        ]}
        defaultValue={["email", "push"]}
      />

      <RhfButtonGroup
        name="privacidade"
        label="Nível de privacidade"
        control={control}
        color="secondary"
        options={[
          { label: "🌍 Público", value: "publico" },
          { label: "👥 Amigos", value: "amigos" },
          { label: "🔒 Privado", value: "privado" },
        ]}
        defaultValue="amigos"
      />
    </>
  );
}
```

### 3. Sistema de Avaliação

```tsx
function SistemaAvaliacao() {
  const { control } = useForm();

  return (
    <>
      <RhfButtonGroup
        name="satisfacao"
        label="Como você avalia nosso atendimento?"
        control={control}
        variant="contained"
        color="primary"
        options={[
          { label: "😤 Péssimo", value: 1 },
          { label: "😐 Ruim", value: 2 },
          { label: "🙂 Bom", value: 3 },
          { label: "😊 Ótimo", value: 4 },
          { label: "🤩 Excelente", value: 5 },
        ]}
      />

      <RhfButtonGroup
        name="recomendaria"
        label="Você nos recomendaria?"
        control={control}
        variant="outlined"
        options={[
          { label: "👍 Sim", value: true },
          { label: "👎 Não", value: false },
        ]}
      />
    </>
  );
}
```

## Acessibilidade

O componente segue as melhores práticas de acessibilidade:

- **ARIA Labels**: Cada botão possui labels apropriados
- **Keyboard Navigation**: Navegação completa via teclado
- **Screen Readers**: Suporte completo a leitores de tela
- **Focus Management**: Gerenciamento adequado do foco
- **State Announcement**: Estados são anunciados corretamente

```tsx
// Exemplo com foco em acessibilidade
<RhfButtonGroup
  name="acessibilidade"
  label="Opções de acessibilidade"
  control={control}
  options={[
    { label: "Alto contraste", value: "contrast" },
    { label: "Texto grande", value: "largetext" },
    { label: "Leitor de tela", value: "screenreader" },
  ]}
  // O componente automaticamente adiciona:
  // - role="group"
  // - aria-labelledby
  // - aria-pressed para cada botão
  // - keyboard navigation
/>
```

## Performance e Otimização

### Memoização

O componente já é otimizado com `memo()`, mas você pode otimizar ainda mais:

```tsx
import React, { useMemo } from "react";
import { RhfButtonGroup } from "@hox-rs/capy";

function ComponenteOtimizado() {
  const { control } = useForm();

  // Memoize opções pesadas ou calculadas
  const opcoes = useMemo(
    () => [
      { label: "Opção A", value: "a" },
      { label: "Opção B", value: "b" },
      { label: "Opção C", value: "c" },
    ],
    []
  );

  return <RhfButtonGroup name="opcao" control={control} options={opcoes} />;
}
```

### Opções Dinâmicas

Para opções que mudam frequentemente:

```tsx
function OpcoesDinamicas() {
  const { control, watch } = useForm();
  const categoria = watch("categoria");

  const opcoesFiltradas = useMemo(() => {
    // Filtra opções baseado na categoria selecionada
    return todasOpcoes.filter(
      (opcao) => opcao.categoria === categoria || !categoria
    );
  }, [categoria]);

  return (
    <RhfButtonGroup
      name="subcategoria"
      control={control}
      options={opcoesFiltradas}
    />
  );
}
```

## Troubleshooting

### Problemas Comuns

#### 1. Valor não está sendo atualizado

**Problema**: O componente não reflete mudanças de valor.

**Solução**:

```tsx
// ❌ Incorreto - não usar value diretamente
<RhfButtonGroup value={minhaVariavel} />

// ✅ Correto - usar defaultValue ou control
<RhfButtonGroup
  control={control}
  defaultValue={minhaVariavel}
/>
```

#### 2. Seleção múltipla não funciona

**Problema**: Múltiplos valores não são selecionados.

**Solução**:

```tsx
// ❌ Incorreto
<RhfButtonGroup exclusive={true} />

// ✅ Correto
<RhfButtonGroup
  exclusive={false}
  defaultValue={[]} // Array vazio para seleção múltipla
/>
```

#### 3. Validação não aparece

**Problema**: Mensagens de erro não são exibidas.

**Solução**:

```tsx
const {
  control,
  formState: { errors }, // Certifique-se de extrair errors
} = useForm();

<RhfButtonGroup
  control={control}
  error={errors.nomeDoCampo} // Passe o erro específico
/>;
```

#### 4. Tipos TypeScript incorretos

**Problema**: Erros de tipo com valores mistos.

**Solução**:

```tsx
// ✅ Defina tipos corretamente
interface FormData {
  opcao: string;
  multiplos: string[];
  numero: number;
}

const { control } = useForm<FormData>();
```

#### 5. Performance com muitas opções

**Problema**: Lentidão com muitas opções.

**Solução**:

```tsx
// ✅ Use virtualization para muitas opções
import { AutoSizer, List } from "react-virtualized";

// Ou considere usar RhfAutocomplete para muitas opções
<RhfAutocomplete
  options={muitasOpcoes}
  // ...
/>;
```

### Dicas de Debug

```tsx
function DebugRhfButtonGroup() {
  const { control, watch } = useForm();
  const valor = watch("debug");

  console.log("Valor atual:", valor);
  console.log("Tipo do valor:", typeof valor);
  console.log("É array?", Array.isArray(valor));

  return (
    <RhfButtonGroup
      name="debug"
      control={control}
      options={[
        { label: "A", value: "a" },
        { label: "B", value: "b" },
      ]}
      onChange={(newValue) => {
        console.log("Mudança detectada:", newValue);
      }}
    />
  );
}
```

## Integração com Outras Bibliotecas

### Com React Query

```tsx
import { useQuery } from "react-query";

function ComReactQuery() {
  const { control } = useForm();

  const { data: opcoes, isLoading } = useQuery(
    "opcoes-buttongroup",
    fetchOpcoes
  );

  if (isLoading) return <div>Carregando...</div>;

  return (
    <RhfButtonGroup
      name="opcaoRemota"
      control={control}
      options={opcoes || []}
    />
  );
}
```

### Com Material-UI Themes

```tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          // Customizações globais para ButtonGroup
        },
      },
    },
  },
});

function ComThemeCustomizado() {
  return (
    <ThemeProvider theme={theme}>
      <RhfButtonGroup
      // suas props
      />
    </ThemeProvider>
  );
}
```

## Migração e Compatibilidade

### Migração de outros componentes

Se você está migrando de outros componentes de seleção:

```tsx
// Migração de RadioGroup
// ❌ Antes
<RhfRadioGroup
  options={opcoes}
  // ...
/>

// ✅ Depois
<RhfButtonGroup
  exclusive={true} // Equivale ao comportamento de radio
  options={opcoes}
  // ...
/>

// Migração de CheckboxGroup
// ❌ Antes
<RhfCheckboxGroup
  options={opcoes}
  // ...
/>

// ✅ Depois
<RhfButtonGroup
  exclusive={false} // Equivale ao comportamento de checkbox
  options={opcoes}
  // ...
/>
```

---

**Nota**: Este componente requer Material-UI 5.0+ e React Hook Form 7.0+ para funcionar corretamente. Para dúvidas ou problemas, consulte a documentação do [Material-UI ButtonGroup](https://mui.com/components/button-group/) e [React Hook Form](https://react-hook-form.com/).
