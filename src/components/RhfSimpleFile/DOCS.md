# RhfSimpleFile - Campo de Upload Simples com React Hook Form

## Visão Geral

O `RhfSimpleFile` é um componente de upload de arquivo simples integrado com React Hook Form. Ele oferece uma alternativa compacta ao `RhfFileUpload`, ocupando o mesmo espaço que um `TextField` e sendo ideal para upload de um único arquivo em formulários.

## Importação

```tsx
import { RhfSimpleFile } from "@hox-rs/capy";
```

## Tipo TypeScript

```tsx
interface RhfSimpleFileProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  accept?: string;
  maxSize?: number;
  validate?: (file: File) => string | boolean;
  onFileChange?: (file: File | null) => void;
  fullWidth?: boolean;
  buttonText?: string;
  selectedText?: string;
  showFileSize?: boolean;
  buttonProps?: Partial<ButtonProps>;
}
```

## Props Principais

| Prop           | Tipo                                | Obrigatório | Padrão                   | Descrição                                             |
| -------------- | ----------------------------------- | ----------- | ------------------------ | ----------------------------------------------------- |
| `name`         | `string`                            | ✅          | -                        | Nome do campo usado nas validações e no useForm       |
| `control`      | `Control`                           | ✅          | -                        | Objeto control do react-hook-form                     |
| `label`        | `string`                            | ❌          | -                        | Rótulo do campo                                       |
| `defaultValue` | `File \| null`                      | ❌          | `null`                   | Valor padrão do campo                                 |
| `error`        | `FieldError`                        | ❌          | -                        | Objeto de erro do react-hook-form                     |
| `helperText`   | `string`                            | ❌          | -                        | Texto de ajuda exibido abaixo do campo                |
| `disabled`     | `boolean`                           | ❌          | `false`                  | Se o campo está desabilitado                          |
| `accept`       | `string`                            | ❌          | -                        | Tipos de arquivo aceitos (ex: "image/\*", ".pdf")     |
| `maxSize`      | `number`                            | ❌          | -                        | Tamanho máximo do arquivo em bytes                    |
| `validate`     | `(file: File) => string \| boolean` | ❌          | -                        | Função de validação customizada                       |
| `onFileChange` | `(file: File \| null) => void`      | ❌          | -                        | Callback chamado quando arquivo é selecionado         |
| `fullWidth`    | `boolean`                           | ❌          | `true`                   | Se o campo ocupa toda a largura disponível            |
| `buttonText`   | `string`                            | ❌          | `"Selecionar arquivo"`   | Texto do botão quando nenhum arquivo está selecionado |
| `selectedText` | `string`                            | ❌          | `"Arquivo selecionado:"` | Texto exibido quando um arquivo está selecionado      |
| `showFileSize` | `boolean`                           | ❌          | `true`                   | Se deve exibir o tamanho do arquivo                   |
| `buttonProps`  | `Partial<ButtonProps>`              | ❌          | -                        | Props adicionais para o botão de upload               |

## Exemplos de Uso

### Uso Básico

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfSimpleFile } from "@hox-rs/capy";
import { Box, Button } from "@mui/material";

interface FormData {
  document: File | null;
}

export function BasicFileUploadExample() {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      document: null,
    },
  });

  const selectedFile = watch("document");

  const onSubmit = (data: FormData) => {
    console.log("Arquivo selecionado:", data.document);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      <RhfSimpleFile
        name="document"
        control={control}
        label="Documento"
        buttonText="Escolher arquivo"
      />

      <Button
        type="submit"
        variant="contained"
        disabled={!selectedFile}
        sx={{ mt: 2 }}
      >
        Upload
      </Button>
    </Box>
  );
}
```

### Upload de Imagem com Validação

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfSimpleFile } from "@hox-rs/capy";
import { Box } from "@mui/material";

interface FormData {
  avatar: File | null;
}

export function ImageUploadExample() {
  const { control, handleSubmit } = useForm<FormData>();

  const validateImage = (file: File): string | boolean => {
    // Validação customizada
    if (!file.type.startsWith("image/")) {
      return "Apenas imagens são permitidas";
    }

    if (file.size > 2 * 1024 * 1024) {
      // 2MB
      return "Imagem muito grande. Máximo 2MB";
    }

    return true;
  };

  const onSubmit = (data: FormData) => {
    console.log("Avatar:", data.avatar);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      <RhfSimpleFile
        name="avatar"
        control={control}
        label="Avatar"
        accept="image/*"
        maxSize={2 * 1024 * 1024} // 2MB
        validate={validateImage}
        buttonText="Selecionar imagem"
        selectedText="Imagem selecionada:"
        showFileSize={true}
      />
    </Box>
  );
}
```

### Upload de Documento com Callback

```tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RhfSimpleFile } from "@hox-rs/capy";
import { Box, Typography } from "@mui/material";

interface FormData {
  contract: File | null;
}

export function DocumentUploadExample() {
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const { control } = useForm<FormData>();

  const handleFileChange = (file: File | null) => {
    if (file) {
      setUploadStatus(
        `Arquivo "${file.name}" selecionado (${(file.size / 1024).toFixed(
          1
        )} KB)`
      );
    } else {
      setUploadStatus("Nenhum arquivo selecionado");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <RhfSimpleFile
        name="contract"
        control={control}
        label="Contrato"
        accept=".pdf,.doc,.docx"
        maxSize={10 * 1024 * 1024} // 10MB
        onFileChange={handleFileChange}
        buttonText="Selecionar contrato"
        helperText="Apenas arquivos PDF e Word até 10MB"
      />

      {uploadStatus && (
        <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
          {uploadStatus}
        </Typography>
      )}
    </Box>
  );
}
```

### Botão Personalizado

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfSimpleFile } from "@hox-rs/capy";
import { Box } from "@mui/material";

interface FormData {
  attachment: File | null;
}

export function CustomButtonExample() {
  const { control } = useForm<FormData>();

  return (
    <Box sx={{ p: 2 }}>
      <RhfSimpleFile
        name="attachment"
        control={control}
        label="Anexo"
        buttonText="📎 Anexar arquivo"
        selectedText="✅ Arquivo anexado:"
        showFileSize={false}
        buttonProps={{
          variant: "contained",
          color: "secondary",
          size: "large",
        }}
      />
    </Box>
  );
}
```

### Campo Compacto (Não Full Width)

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfSimpleFile } from "@hox-rs/capy";
import { Box, Grid } from "@mui/material";

interface FormData {
  profilePicture: File | null;
  resume: File | null;
}

export function CompactExample() {
  const { control } = useForm<FormData>();

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <RhfSimpleFile
            name="profilePicture"
            control={control}
            label="Foto de Perfil"
            accept="image/*"
            fullWidth={false}
            buttonText="Escolher..."
          />
        </Grid>
        <Grid item xs={6}>
          <RhfSimpleFile
            name="resume"
            control={control}
            label="Currículo"
            accept=".pdf"
            fullWidth={false}
            buttonText="Upload..."
          />
        </Grid>
      </Grid>
    </Box>
  );
}
```

## Validação

### Validação Automática

O componente oferece validação automática para:

- **Tipo de arquivo**: Baseado na prop `accept`
- **Tamanho do arquivo**: Baseado na prop `maxSize`

```tsx
<RhfSimpleFile
  name="document"
  control={control}
  accept=".pdf,.doc,.docx"
  maxSize={5 * 1024 * 1024} // 5MB
/>
```

### Validação Customizada

Use a prop `validate` para validações específicas:

```tsx
const validateFile = (file: File): string | boolean => {
  // Exemplo: validar nome do arquivo
  if (file.name.includes(" ")) {
    return "Nome do arquivo não pode conter espaços";
  }

  // Exemplo: validar extensão específica
  if (!file.name.endsWith(".pdf")) {
    return "Apenas arquivos PDF são permitidos";
  }

  return true; // Válido
};

<RhfSimpleFile name="document" control={control} validate={validateFile} />;
```

## Estados do Componente

### Estado Vazio

Quando nenhum arquivo está selecionado, o componente exibe um botão de upload.

### Estado com Arquivo

Quando um arquivo está selecionado, o componente mostra:

- Ícone do tipo de arquivo (imagem ou documento)
- Nome do arquivo
- Tamanho do arquivo (se `showFileSize` for `true`)
- Botão para remover o arquivo

### Estado de Erro

Erros de validação são exibidos como `FormHelperText` vermelho abaixo do componente.

### Estado Desabilitado

Quando `disabled` é `true`, o botão fica cinza e não responde a cliques.

## Acessibilidade

- O input de arquivo possui `aria-label` apropriado
- O botão de remoção tem `aria-label` descritivo
- Estados de erro são anunciados por leitores de tela
- Suporte completo a navegação por teclado

## Comparação com RhfFileUpload

| Característica  | RhfSimpleFile                  | RhfFileUpload                |
| --------------- | ------------------------------ | ---------------------------- |
| **Tamanho**     | Compacto (altura de TextField) | Grande (área de drag'n'drop) |
| **Arquivos**    | Apenas 1 arquivo               | Múltiplos arquivos           |
| **Drag'n'Drop** | ❌                             | ✅                           |
| **Preview**     | Ícone simples                  | Preview completo de imagens  |
| **Progress**    | ❌                             | ✅                           |
| **Uso ideal**   | Formulários compactos          | Upload de múltiplas imagens  |

## Notas Importantes

1. **Arquivo único**: Este componente é otimizado para upload de um único arquivo
2. **Validação client-side**: As validações ocorrem no cliente e devem ser complementadas com validação no servidor
3. **Tipos aceitos**: Use a prop `accept` para restringir tipos de arquivo
4. **Performance**: Arquivos grandes podem impactar a performance - considere usar `maxSize`
5. **Compatibilidade**: Funciona em todos os navegadores modernos que suportam a File API
