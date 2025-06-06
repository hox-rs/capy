# RhfTextField - Campo de Texto com React Hook Form

## Visão Geral

O `RhfTextField` é um wrapper do componente `TextField` do Material-UI integrado com React Hook Form. Ele fornece uma maneira simples e consistente de criar campos de texto em formulários, com gerenciamento automático de estado, validação e exibição de erros.

## Importação

```tsx
import { RhfTextField } from "@hox-rs/capy";
```

## Tipo TypeScript

```tsx
type RhfTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = BaseRhfFieldProps<TFieldValues, TName> &
  Omit<
    TextFieldProps,
    "error" | "name" | "label" | "helperText" | "disabled" | "defaultValue"
  >;
```

## Props Principais

| Prop           | Tipo                                   | Obrigatório | Padrão       | Descrição                                       |
| -------------- | -------------------------------------- | ----------- | ------------ | ----------------------------------------------- |
| `name`         | `string`                               | ✅          | -            | Nome do campo usado nas validações e no useForm |
| `control`      | `Control`                              | ✅          | -            | Objeto control do react-hook-form               |
| `label`        | `string`                               | ❌          | -            | Rótulo do campo                                 |
| `defaultValue` | `string`                               | ❌          | -            | Valor padrão do campo                           |
| `error`        | `FieldError`                           | ❌          | -            | Objeto de erro do react-hook-form               |
| `helperText`   | `string`                               | ❌          | -            | Texto de ajuda exibido abaixo do campo          |
| `disabled`     | `boolean`                              | ❌          | `false`      | Se o campo está desabilitado                    |
| `fullWidth`    | `boolean`                              | ❌          | `true`       | Se o campo ocupa toda a largura disponível      |
| `variant`      | `"outlined" \| "filled" \| "standard"` | ❌          | `"outlined"` | Variante visual do campo                        |
| `type`         | `string`                               | ❌          | `"text"`     | Tipo do input (text, email, password, etc.)     |
| `rows`         | `number`                               | ❌          | -            | Número de linhas para campos multiline          |

### Props Herdadas do Material-UI TextField

O componente herda todas as props do `TextField` do Material-UI, exceto aquelas listadas no `Omit` do tipo TypeScript.

## Exemplos de Uso

### Uso Básico

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfTextField } from "@hox-rs/capy";

function FormularioBasico() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfTextField
        name="nome"
        label="Nome Completo"
        control={control}
        defaultValue=""
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Campo de Email

```tsx
<RhfTextField
  name="email"
  label="Email"
  type="email"
  control={control}
  helperText="Digite seu melhor email"
/>
```

### Campo de Senha com Toggle

```tsx
<RhfTextField
  name="senha"
  label="Senha"
  type="password"
  control={control}
  helperText="Mínimo 8 caracteres"
/>
```

**Nota:** O componente automaticamente adiciona um botão de toggle para mostrar/ocultar a senha quando `type="password"`.

### Campo Multiline (Textarea)

```tsx
<RhfTextField
  name="descricao"
  label="Descrição"
  control={control}
  rows={4}
  helperText="Descreva detalhadamente o item"
/>
```

### Com Validação

```tsx
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

function FormularioComValidacao() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
    </form>
  );
}
```

### Campo com InputProps Customizadas

```tsx
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

<RhfTextField
  name="busca"
  label="Buscar"
  control={control}
  InputProps={{
    endAdornment: (
      <IconButton>
        <Search />
      </IconButton>
    ),
  }}
/>;
```

### Campo Desabilitado

```tsx
<RhfTextField
  name="codigo"
  label="Código (gerado automaticamente)"
  control={control}
  disabled
  value="AUTO_001"
/>
```

## Recursos Especiais

### Toggle de Senha Automático

Quando `type="password"` é usado, o componente automaticamente adiciona um botão de olho para mostrar/ocultar a senha:

```tsx
<RhfTextField name="senha" label="Senha" type="password" control={control} />
```

### Tratamento de Erros

O componente automaticamente exibe mensagens de erro do react-hook-form. A mensagem de erro tem prioridade sobre o `helperText`:

```tsx
// Se houver erro, a mensagem de erro será exibida
// Se não houver erro, o helperText será exibido
<RhfTextField
  name="campo"
  label="Campo"
  control={control}
  error={errors.campo}
  helperText="Este texto só aparece se não houver erro"
/>
```

## Integração com React Hook Form

### Usando com useForm

```tsx
const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  defaultValues: {
    nome: "",
    email: "",
  },
});
```

### Usando com useController Diretamente

O componente já usa `useController` internamente, mas você pode acessar o estado do campo:

```tsx
import { useController } from "react-hook-form";

const {
  field: { onChange, value, ref },
  fieldState: { error, invalid },
} = useController({
  name: "meuCampo",
  control,
  defaultValue: "",
});
```

## Validações Comuns

### Validações com Yup

```tsx
const schema = yup.object().shape({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),

  email: yup.string().email("Email inválido").required("Email é obrigatório"),

  telefone: yup
    .string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato: (11) 99999-9999"),

  cep: yup.string().matches(/^\d{5}-?\d{3}$/, "CEP inválido"),
});
```

### Validações com Rules

```tsx
<RhfTextField
  name="idade"
  label="Idade"
  type="number"
  control={control}
  rules={{
    required: "Idade é obrigatória",
    min: { value: 18, message: "Idade mínima 18 anos" },
    max: { value: 120, message: "Idade máxima 120 anos" },
  }}
/>
```

## Estilização

### Usando sx prop

```tsx
<RhfTextField
  name="campo"
  label="Campo Customizado"
  control={control}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
    },
  }}
/>
```

### Variantes de Estilo

```tsx
// Outlined (padrão)
<RhfTextField variant="outlined" />

// Filled
<RhfTextField variant="filled" />

// Standard
<RhfTextField variant="standard" />
```

## Troubleshooting

### Problema: Campo não atualiza valor

**Causa:** `control` não foi passado ou está undefined.

**Solução:**

```tsx
const { control } = useForm(); // Certifique-se de que control existe
<RhfTextField name="campo" control={control} />;
```

### Problema: Validação não funciona

**Causa:** `error` não está sendo passado do formState.

**Solução:**

```tsx
const {
  control,
  formState: { errors },
} = useForm();
<RhfTextField name="campo" control={control} error={errors.campo} />;
```

### Problema: defaultValue não funciona

**Causa:** Usar `value` em vez de `defaultValue`.

**Solução:**

```tsx
// ❌ Errado
<RhfTextField name="campo" control={control} value="inicial" />

// ✅ Correto
<RhfTextField name="campo" control={control} defaultValue="inicial" />

// ✅ Ou usar defaultValues no useForm
const { control } = useForm({
  defaultValues: { campo: "inicial" }
});
```

### Problema: TypeScript reclama dos tipos

**Causa:** Tipos genéricos não foram especificados.

**Solução:**

```tsx
interface FormData {
  nome: string;
  email: string;
}

const { control } = useForm<FormData>();

<RhfTextField<FormData, "nome"> name="nome" control={control} />;
```

## Casos de Uso Comuns

### 1. Formulário de Login

```tsx
interface LoginForm {
  email: string;
  senha: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().min(6).required(),
});

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <RhfTextField
        name="email"
        label="Email"
        type="email"
        control={control}
        error={errors.email}
        fullWidth
        margin="normal"
      />

      <RhfTextField
        name="senha"
        label="Senha"
        type="password"
        control={control}
        error={errors.senha}
        fullWidth
        margin="normal"
      />

      <Button type="submit" fullWidth>
        Entrar
      </Button>
    </form>
  );
}
```

### 2. Formulário de Endereço

```tsx
interface EnderecoForm {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

function FormularioEndereco() {
  const { control, handleSubmit, watch, setValue } = useForm<EnderecoForm>();
  const cep = watch("cep");

  // Buscar endereço por CEP
  useEffect(() => {
    if (cep?.length === 9) {
      buscarCEP(cep).then((endereco) => {
        setValue("rua", endereco.logradouro);
        setValue("bairro", endereco.bairro);
        setValue("cidade", endereco.localidade);
        setValue("estado", endereco.uf);
      });
    }
  }, [cep, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfTextField
        name="cep"
        label="CEP"
        control={control}
        helperText="Digite o CEP para buscar automaticamente"
      />

      <RhfTextField name="rua" label="Rua" control={control} fullWidth />

      <RhfTextField
        name="numero"
        label="Número"
        control={control}
        sx={{ width: "150px" }}
      />

      <RhfTextField
        name="complemento"
        label="Complemento"
        control={control}
        helperText="Opcional"
      />
    </form>
  );
}
```

### 3. Campo de Busca com Debounce

```tsx
function CampoBusca() {
  const { control, watch } = useForm();
  const busca = watch("busca");
  const [resultados, setResultados] = useState([]);

  // Debounce da busca
  useEffect(() => {
    const timer = setTimeout(() => {
      if (busca) {
        buscarItens(busca).then(setResultados);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [busca]);

  return (
    <RhfTextField
      name="busca"
      label="Buscar itens"
      control={control}
      InputProps={{
        endAdornment: (
          <IconButton>
            <Search />
          </IconButton>
        ),
      }}
      helperText={`${resultados.length} resultados encontrados`}
    />
  );
}
```

## Links Relacionados

- [Documentação do Material-UI TextField](https://mui.com/components/text-fields/)
- [Documentação do React Hook Form](https://react-hook-form.com/)
- [Exemplos no Storybook](https://capy.hox.dev.br/?path=/story/hox-capy-rhftextfield--standard)
- [RhfMoneyField](../RhfMoneyField/DOCS.md) - Para campos monetários
- [Validações](../../docs/VALIDACOES.md) - Cookbook de validações
