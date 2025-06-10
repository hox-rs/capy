# RhfFileUpload

O `RhfFileUpload` é um componente avançado de upload de arquivos que integra com React Hook Form, oferecendo funcionalidades como drag & drop, preview de imagens, validação de arquivos, progresso de upload e muito mais.

## Características Principais

- ✅ Integração completa com react-hook-form
- ✅ Drag & drop intuitivo
- ✅ Preview automático de imagens
- ✅ Validação de tipo e tamanho de arquivo
- ✅ Upload único ou múltiplo
- ✅ Barra de progresso de upload
- ✅ Validação customizável
- ✅ Callback de upload personalizado
- ✅ Interface responsiva e acessível

## Instalação

```bash
npm install @mui/material @mui/icons-material react-hook-form
# ou
yarn add @mui/material @mui/icons-material react-hook-form
```

## Uso Básico

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfFileUpload } from "@hox-rs/capy";

function ExemploBasico() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Arquivo selecionado:", data.arquivo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfFileUpload
        name="arquivo"
        label="Selecione um arquivo"
        control={control}
        accept="image/*,.pdf"
        maxSize={5 * 1024 * 1024} // 5MB
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

## Props

| Prop              | Tipo                             | Padrão                  | Descrição                                              |
| ----------------- | -------------------------------- | ----------------------- | ------------------------------------------------------ |
| **name**          | `string`                         | -                       | Nome do campo no formulário (obrigatório)              |
| **control**       | `Control`                        | -                       | Controle do react-hook-form (obrigatório)              |
| **label**         | `string`                         | -                       | Label do campo de upload                               |
| **accept**        | `string`                         | -                       | Tipos de arquivo aceitos (ex: "image/\*", ".pdf,.doc") |
| **maxFiles**      | `number`                         | `1`                     | Número máximo de arquivos                              |
| **maxSize**       | `number`                         | -                       | Tamanho máximo em bytes                                |
| **multiple**      | `boolean`                        | `false`                 | Permite seleção múltipla                               |
| **showPreview**   | `boolean`                        | `true`                  | Mostra preview de imagens                              |
| **validate**      | `function`                       | -                       | Função de validação customizada                        |
| **onFilesChange** | `function`                       | -                       | Callback quando arquivos são selecionados              |
| **showProgress**  | `boolean`                        | `false`                 | Mostra barra de progresso                              |
| **onUpload**      | `function`                       | -                       | Função de upload customizada                           |
| **fullWidth**     | `boolean`                        | `true`                  | Ocupa toda a largura                                   |
| **height**        | `number \| string`               | `200`                   | Altura da área de upload                               |
| **placeholder**   | `string`                         | `"Arraste arquivos..."` | Texto de placeholder                                   |
| **disabled**      | `boolean`                        | `false`                 | Desabilita o componente                                |
| **defaultValue**  | `UploadedFile \| UploadedFile[]` | -                       | Valor padrão                                           |
| **error**         | `FieldError`                     | -                       | Objeto de erro                                         |
| **helperText**    | `string`                         | -                       | Texto de ajuda                                         |

### Interface UploadedFile

```typescript
interface UploadedFile {
  id: string; // Identificador único
  file: File; // Objeto File nativo
  preview?: string; // URL de preview (para imagens)
  progress?: number; // Progresso de upload (0-100)
  uploaded?: boolean; // Se o upload foi concluído
  error?: string; // Mensagem de erro
}
```

## Exemplos Avançados

### Upload Múltiplo com Preview

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfFileUpload } from "@hox-rs/capy";

function UploadMultiplo() {
  const { control, handleSubmit, watch } = useForm();
  const arquivos = watch("galeria");

  const onSubmit = (data) => {
    console.log("Arquivos selecionados:", data.galeria);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfFileUpload
        name="galeria"
        label="Galeria de Fotos"
        control={control}
        multiple={true}
        maxFiles={10}
        accept="image/*"
        maxSize={2 * 1024 * 1024} // 2MB por arquivo
        showPreview={true}
        placeholder="Arraste suas fotos aqui ou clique para selecionar"
        height={250}
      />

      <p>
        {arquivos?.length
          ? `${arquivos.length} foto(s) selecionada(s)`
          : "Nenhuma foto"}
      </p>

      <button type="submit">Criar Galeria</button>
    </form>
  );
}
```

### Upload com Validação Customizada

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RhfFileUpload } from "@hox-rs/capy";

const schema = yup.object().shape({
  documento: yup.mixed().required("Documento é obrigatório"),
});

function UploadComValidacao() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Validação customizada
  const validarDocumento = (arquivos: File[]) => {
    if (arquivos.length === 0) {
      return "Selecione pelo menos um documento";
    }

    for (const arquivo of arquivos) {
      // Validar nome do arquivo
      if (arquivo.name.includes("temp") || arquivo.name.includes("draft")) {
        return "Arquivos temporários não são permitidos";
      }

      // Validar conteúdo (exemplo simples)
      if (arquivo.type === "application/pdf" && arquivo.size < 1000) {
        return "PDF muito pequeno, pode estar corrompido";
      }
    }

    return true;
  };

  const onSubmit = (data) => {
    console.log("Documento válido:", data.documento);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfFileUpload
        name="documento"
        label="Documento Oficial"
        control={control}
        error={errors.documento}
        accept=".pdf,.doc,.docx"
        maxSize={10 * 1024 * 1024} // 10MB
        validate={validarDocumento}
        showPreview={false}
        placeholder="Selecione um documento oficial"
      />

      <button type="submit">Enviar Documento</button>
    </form>
  );
}
```

### Upload com Progresso e Callback

```tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RhfFileUpload } from "@hox-rs/capy";
import { Typography, Box } from "@mui/material";

function UploadComProgresso() {
  const { control, handleSubmit } = useForm();
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  // Simular upload para servidor
  const handleUpload = async (file: File): Promise<void> => {
    setUploading(true);
    setUploadStatus(`Enviando ${file.name}...`);

    try {
      // Simular progresso de upload
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setUploadStatus(`Enviando ${file.name}... ${progress}%`);
      }

      // Simular requisição para API
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro no upload");
      }

      setUploadStatus(`${file.name} enviado com sucesso!`);
    } catch (error) {
      setUploadStatus(`Erro ao enviar ${file.name}`);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const onFilesChange = (files) => {
    console.log("Arquivos alterados:", files);
  };

  const onSubmit = (data) => {
    console.log("Formulário enviado:", data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfFileUpload
          name="anexo"
          label="Anexar Arquivo"
          control={control}
          accept="image/*,.pdf,.doc,.docx"
          maxSize={50 * 1024 * 1024} // 50MB
          showProgress={true}
          onUpload={handleUpload}
          onFilesChange={onFilesChange}
          disabled={uploading}
          placeholder="Arraste o arquivo ou clique para selecionar"
        />

        {uploadStatus && (
          <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
            {uploadStatus}
          </Typography>
        )}

        <button type="submit" disabled={uploading}>
          {uploading ? "Enviando..." : "Finalizar"}
        </button>
      </form>
    </Box>
  );
}
```

### Upload de Avatar com Preview

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfFileUpload } from "@hox-rs/capy";
import { Avatar, Box, Typography } from "@mui/material";

function UploadAvatar() {
  const { control, handleSubmit, watch } = useForm();
  const avatar = watch("avatar");

  const validarImagem = (arquivos: File[]) => {
    const arquivo = arquivos[0];
    if (!arquivo) return true;

    // Validar proporção da imagem
    return new Promise<string | boolean>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        if (ratio < 0.8 || ratio > 1.2) {
          resolve("Use uma imagem com proporção próxima a 1:1 (quadrada)");
        } else {
          resolve(true);
        }
      };
      img.src = URL.createObjectURL(arquivo);
    });
  };

  const onSubmit = (data) => {
    console.log("Avatar:", data.avatar);
  };

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
      {/* Preview do avatar atual */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Preview
        </Typography>
        <Avatar
          src={avatar?.preview}
          sx={{
            width: 120,
            height: 120,
            border: "2px solid",
            borderColor: "divider",
          }}
        >
          {!avatar && "👤"}
        </Avatar>
      </Box>

      {/* Upload area */}
      <Box sx={{ flex: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RhfFileUpload
            name="avatar"
            label="Foto de Perfil"
            control={control}
            accept="image/*"
            maxSize={1 * 1024 * 1024} // 1MB
            validate={validarImagem}
            showPreview={false} // Usando preview customizado
            height={150}
            placeholder="Clique para selecionar uma foto"
            helperText="Recomendado: 400x400px, máximo 1MB"
          />

          <button type="submit">Salvar Avatar</button>
        </form>
      </Box>
    </Box>
  );
}
```

### Upload Condicionado por Tipo

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { RhfFileUpload, RhfButtonGroup } from "@hox-rs/capy";
import { Box } from "@mui/material";

function UploadCondicional() {
  const { control, handleSubmit, watch } = useForm();
  const tipoDocumento = watch("tipoDocumento");

  // Configurações por tipo de documento
  const configuracoes = {
    imagem: {
      accept: "image/*",
      maxSize: 5 * 1024 * 1024, // 5MB
      placeholder: "Selecione uma imagem",
      maxFiles: 5,
    },
    documento: {
      accept: ".pdf,.doc,.docx",
      maxSize: 20 * 1024 * 1024, // 20MB
      placeholder: "Selecione um documento",
      maxFiles: 1,
    },
    planilha: {
      accept: ".xlsx,.xls,.csv",
      maxSize: 10 * 1024 * 1024, // 10MB
      placeholder: "Selecione uma planilha",
      maxFiles: 3,
    },
  };

  const config = configuracoes[tipoDocumento] || configuracoes.documento;

  const onSubmit = (data) => {
    console.log("Dados:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mb: 3 }}>
        <RhfButtonGroup
          name="tipoDocumento"
          label="Tipo de Arquivo"
          control={control}
          options={[
            { label: "📷 Imagem", value: "imagem" },
            { label: "📄 Documento", value: "documento" },
            { label: "📊 Planilha", value: "planilha" },
          ]}
          defaultValue="documento"
        />
      </Box>

      {tipoDocumento && (
        <RhfFileUpload
          key={tipoDocumento} // Força re-render quando tipo muda
          name="arquivo"
          label={`Upload de ${tipoDocumento}`}
          control={control}
          accept={config.accept}
          maxSize={config.maxSize}
          maxFiles={config.maxFiles}
          multiple={config.maxFiles > 1}
          placeholder={config.placeholder}
          showPreview={tipoDocumento === "imagem"}
        />
      )}

      <button type="submit">Enviar</button>
    </form>
  );
}
```

## Casos de Uso Comuns

### 1. Galeria de Imagens

```tsx
function GaleriaImagens() {
  const { control } = useForm();

  return (
    <RhfFileUpload
      name="galeria"
      label="Galeria de Fotos"
      control={control}
      multiple={true}
      maxFiles={20}
      accept="image/jpeg,image/png,image/webp"
      maxSize={5 * 1024 * 1024}
      showPreview={true}
      height={300}
      placeholder="📷 Arraste suas fotos aqui"
    />
  );
}
```

### 2. Upload de Documentos

```tsx
function UploadDocumentos() {
  const { control } = useForm();

  return (
    <RhfFileUpload
      name="documentos"
      label="Documentos Legais"
      control={control}
      accept=".pdf"
      maxSize={50 * 1024 * 1024}
      maxFiles={10}
      multiple={true}
      showPreview={false}
      placeholder="📄 Selecione documentos PDF"
      helperText="Apenas arquivos PDF, máximo 50MB cada"
    />
  );
}
```

### 3. Avatar/Foto de Perfil

```tsx
function FotoPerfil() {
  const { control } = useForm();

  const validarFoto = (arquivos: File[]) => {
    const arquivo = arquivos[0];
    if (arquivo && arquivo.size > 2 * 1024 * 1024) {
      return "Foto deve ter no máximo 2MB";
    }
    return true;
  };

  return (
    <RhfFileUpload
      name="fotoPerfil"
      label="Foto de Perfil"
      control={control}
      accept="image/*"
      maxFiles={1}
      validate={validarFoto}
      height={200}
      placeholder="Clique para adicionar sua foto"
    />
  );
}
```

### 4. Importação de Dados

```tsx
function ImportacaoDados() {
  const { control } = useForm();

  const validarPlanilha = (arquivos: File[]) => {
    const arquivo = arquivos[0];
    if (!arquivo) return true;

    if (!arquivo.name.includes("dados")) {
      return "Arquivo deve conter 'dados' no nome";
    }

    return true;
  };

  return (
    <RhfFileUpload
      name="planilhaDados"
      label="Importar Dados"
      control={control}
      accept=".xlsx,.csv"
      validate={validarPlanilha}
      placeholder="📊 Selecione arquivo de dados"
      helperText="Formato suportado: Excel (.xlsx) ou CSV"
    />
  );
}
```

## Integração com APIs

### Upload para AWS S3

```tsx
import AWS from "aws-sdk";

function UploadS3() {
  const { control } = useForm();

  const uploadToS3 = async (file: File): Promise<void> => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });

    const params = {
      Bucket: "meu-bucket",
      Key: `uploads/${Date.now()}-${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    await s3.upload(params).promise();
  };

  return (
    <RhfFileUpload
      name="arquivoS3"
      label="Upload para S3"
      control={control}
      onUpload={uploadToS3}
      showProgress={true}
      accept="image/*"
    />
  );
}
```

### Upload com Progress Tracking

```tsx
function UploadComProgress() {
  const { control } = useForm();
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadComProgress = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
      // Simular progresso
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(progress);
      },
    });
  };

  return (
    <RhfFileUpload
      name="arquivo"
      control={control}
      onUpload={uploadComProgress}
      showProgress={true}
    />
  );
}
```

## Acessibilidade

O componente segue as melhores práticas de acessibilidade:

- **Keyboard Navigation**: Navegação completa via teclado
- **Screen Readers**: Suporte a leitores de tela
- **ARIA Labels**: Labels apropriados para assistive technology
- **Focus Management**: Gerenciamento correto do foco
- **Error Announcements**: Erros são anunciados corretamente

```tsx
// Exemplo com foco em acessibilidade
<RhfFileUpload
  name="acessivel"
  label="Upload Acessível"
  control={control}
  // O componente automaticamente adiciona:
  // - aria-label adequados
  // - role="button" para área clicável
  // - aria-describedby para helper text
  // - keyboard event handlers
  helperText="Use Tab para navegar, Enter/Space para selecionar"
/>
```

## Performance e Otimização

### Limpeza de Memory

O componente automaticamente limpa URLs de preview para evitar memory leaks:

```tsx
// A limpeza é automática, mas você pode forçar se necessário
useEffect(() => {
  return () => {
    // Limpeza manual se necessário
    uploadedFiles.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
  };
}, []);
```

### Debounce de Validação

Para validações pesadas, use debounce:

```tsx
import { useMemo } from "react";
import { debounce } from "lodash";

function UploadOtimizado() {
  const { control } = useForm();

  const validacaoDebounced = useMemo(
    () =>
      debounce(async (arquivos: File[]) => {
        // Validação pesada
        const resultado = await validarArquivosNoServidor(arquivos);
        return resultado;
      }, 500),
    []
  );

  return (
    <RhfFileUpload
      name="arquivo"
      control={control}
      validate={validacaoDebounced}
    />
  );
}
```

## Troubleshooting

### Problemas Comuns

#### 1. Preview não aparece

**Problema**: Imagens não mostram preview.

**Solução**:

```tsx
// ✅ Certifique-se que showPreview está habilitado
<RhfFileUpload
  showPreview={true} // Explicitamente true
  accept="image/*" // Apenas imagens têm preview
/>
```

#### 2. Arquivos não são aceitos

**Problema**: Arquivos válidos são rejeitados.

**Solução**:

```tsx
// ❌ Muito restritivo
<RhfFileUpload accept="image/jpeg" />

// ✅ Mais flexível
<RhfFileUpload accept="image/*" />
// ou
<RhfFileUpload accept=".jpg,.jpeg,.png,.gif" />
```

#### 3. Upload falha silenciosamente

**Problema**: Upload não funciona e não há feedback.

**Solução**:

```tsx
const handleUpload = async (file: File) => {
  try {
    await uploadFunction(file);
  } catch (error) {
    console.error("Erro no upload:", error);
    // Mostrar erro para usuário
    throw error; // Importante: re-throw para o componente saber
  }
};

<RhfFileUpload onUpload={handleUpload} />;
```

#### 4. Memory leak com previews

**Problema**: Consumo excessivo de memória.

**Solução**:

```tsx
// O componente já faz limpeza automática,
// mas você pode desabilitar preview se não precisar
<RhfFileUpload
  showPreview={false} // Para economizar memória
/>
```

#### 5. Validação assíncrona não funciona

**Problema**: Validação com API não bloqueia upload.

**Solução**:

```tsx
const validarAsync = async (arquivos: File[]) => {
  try {
    const response = await fetch("/api/validate", {
      method: "POST",
      body: JSON.stringify({ files: arquivos.map((f) => f.name) }),
    });

    if (!response.ok) {
      return "Arquivos inválidos segundo o servidor";
    }

    return true;
  } catch {
    return "Erro na validação";
  }
};

// Certifique-se de retornar Promise
<RhfFileUpload validate={validarAsync} />;
```

### Dicas de Debug

```tsx
function DebugUpload() {
  const { control, watch } = useForm();
  const arquivos = watch("debug");

  const onFilesChange = (files) => {
    console.log("📁 Arquivos alterados:", files);
    console.log("📊 Número de arquivos:", files.length);
    files.forEach((file, index) => {
      console.log(`📄 Arquivo ${index}:`, {
        name: file.file.name,
        size: file.file.size,
        type: file.file.type,
        hasPreview: !!file.preview,
      });
    });
  };

  return (
    <RhfFileUpload
      name="debug"
      control={control}
      onFilesChange={onFilesChange}
      validate={(files) => {
        console.log("🔍 Validando arquivos:", files);
        return true;
      }}
    />
  );
}
```

## Integração com Outras Bibliotecas

### Com React Query

```tsx
import { useMutation } from "react-query";

function UploadComReactQuery() {
  const { control } = useForm();

  const uploadMutation = useMutation(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      return response.json();
    },
    {
      onSuccess: () => {
        console.log("Upload realizado com sucesso!");
      },
      onError: (error) => {
        console.error("Erro no upload:", error);
      },
    }
  );

  return (
    <RhfFileUpload
      name="arquivo"
      control={control}
      onUpload={uploadMutation.mutateAsync}
      disabled={uploadMutation.isLoading}
    />
  );
}
```

### Com Zustand

```tsx
import { create } from "zustand";

interface UploadStore {
  uploadedFiles: UploadedFile[];
  addFiles: (files: UploadedFile[]) => void;
  removeFile: (id: string) => void;
}

const useUploadStore = create<UploadStore>((set) => ({
  uploadedFiles: [],
  addFiles: (files) =>
    set((state) => ({
      uploadedFiles: [...state.uploadedFiles, ...files],
    })),
  removeFile: (id) =>
    set((state) => ({
      uploadedFiles: state.uploadedFiles.filter((f) => f.id !== id),
    })),
}));

function UploadComZustand() {
  const { control } = useForm();
  const { addFiles } = useUploadStore();

  return (
    <RhfFileUpload name="arquivo" control={control} onFilesChange={addFiles} />
  );
}
```

---

**Nota**: Este componente requer Material-UI 5.0+, Material-UI Icons e React Hook Form 7.0+ para funcionar corretamente. Para casos de uso avançados com upload para nuvem, considere usar bibliotecas específicas como AWS SDK ou Google Cloud Storage.
