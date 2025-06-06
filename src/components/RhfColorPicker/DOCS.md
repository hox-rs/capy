# RhfColorPicker - Seletor de Cores com React Hook Form

## Visão Geral

O `RhfColorPicker` é um componente avançado de seleção de cores integrado ao React Hook Form. Oferece uma interface rica com paleta de cores pré-definidas, entrada manual de cores, suporte a diferentes formatos (HEX, RGB, HSL) e controle de transparência (alpha), tudo com validação automática e estados visuais intuitivos.

## Características Principais

- ✅ **Integração nativa com React Hook Form** - Validação automática e gerenciamento de estado
- 🎨 **Múltiplos formatos de cor** - HEX, RGB, HSL com ou sem alpha
- 🎯 **Paleta de cores pré-definidas** - Cores agrupadas e customizáveis
- 📝 **Entrada manual** - Campo de texto para inserção direta de cores
- 🔍 **Pré-visualização em tempo real** - Visualização imediata da cor selecionada
- 🎛️ **Controle de transparência** - Slider para ajuste do canal alpha
- 📏 **Tamanhos configuráveis** - Pequeno, médio e grande
- ♿ **Acessibilidade completa** - Navegação por teclado e leitores de tela

## Análise do Componente

### Props e Tipos

```typescript
interface RhfColorPickerProps<TFieldValues, TName>
  extends BaseRhfFieldProps<TFieldValues, TName> {
  // Props herdadas de BaseRhfFieldProps
  name: TName; // Nome do campo no formulário
  control: Control<TFieldValues>; // Controle do React Hook Form
  label?: string; // Rótulo do campo
  helperText?: string; // Texto de ajuda
  error?: FieldError; // Objeto de erro customizado
  disabled?: boolean; // Campo desabilitado
  defaultValue?: string; // Valor inicial da cor

  // Props específicas do ColorPicker
  format?: ColorFormat; // Formato de saída: 'hex' | 'rgb' | 'hsl'
  presets?: ColorPreset[]; // Cores pré-definidas
  size?: ColorPickerSize; // Tamanho: 'small' | 'medium' | 'large'
  showAlpha?: boolean; // Mostrar controle de transparência
  showInput?: boolean; // Mostrar campo de entrada
  showPresets?: boolean; // Mostrar paleta de cores
  placeholder?: string; // Placeholder do campo de entrada

  // Callbacks e configurações
  onColorChange?: (color: string) => void; // Callback quando cor muda
  containerProps?: FormControlProps; // Props do container
}

interface ColorPreset {
  label: string; // Nome da cor
  value: string; // Valor HEX da cor
  group?: string; // Grupo/categoria da cor
}

type ColorFormat = "hex" | "rgb" | "hsl";
type ColorPickerSize = "small" | "medium" | "large";
```

### Estrutura do Componente

```tsx
const RhfColorPicker = ({ name, control, format = 'hex', ... }) => {
  const { field, fieldState } = useController({ control, name, defaultValue });
  const [anchorEl, setAnchorEl] = useState(null);
  const [alphaValue, setAlphaValue] = useState(1);

  const convertColor = (color, format, alpha) => {
    // Conversão entre formatos HEX, RGB, HSL
  };

  return (
    <FormControl error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}

      {/* Campo de entrada com pré-visualização */}
      <TextField
        value={displayValue}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <ColorPreview color={currentColor} onClick={openPicker} />
          ),
          endAdornment: <ClearButton onClick={clearColor} />
        }}
      />

      {/* Popover com paleta de cores */}
      <Popover open={isOpen} onClose={closePicker}>
        <ColorPalette presets={presets} onSelect={handleColorSelect} />
        <ColorInput onChange={handleManualInput} />
        {showAlpha && <AlphaSlider value={alphaValue} onChange={setAlphaValue} />}
      </Popover>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
```

## Exemplos de Uso

### 1. Uso Básico

```tsx
import { useForm } from "react-hook-form";
import { RhfColorPicker } from "@hox/capy";

function ThemeCustomizer() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      primaryColor: "#1976d2",
      backgroundColor: "#ffffff",
    },
  });

  const onSubmit = (data) => {
    console.log("Cores do tema:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfColorPicker
        name="primaryColor"
        control={control}
        label="Cor Primária"
        helperText="Escolha a cor principal do seu tema"
      />

      <RhfColorPicker
        name="backgroundColor"
        control={control}
        label="Cor de Fundo"
        helperText="Selecione a cor de fundo da aplicação"
      />

      <button type="submit">Aplicar Tema</button>
    </form>
  );
}
```

### 2. Diferentes Formatos de Cor

```tsx
function ColorFormats() {
  const { control, watch } = useForm({
    defaultValues: {
      hexColor: "#ff0000",
      rgbColor: "rgb(255, 0, 0)",
      hslColor: "hsl(0, 100%, 50%)",
    },
  });

  const colors = watch();

  return (
    <div>
      <h3>Formatos de Cor</h3>

      <RhfColorPicker
        name="hexColor"
        control={control}
        label="Formato HEX"
        format="hex"
        placeholder="Digite uma cor em HEX..."
      />

      <RhfColorPicker
        name="rgbColor"
        control={control}
        label="Formato RGB"
        format="rgb"
        placeholder="Formato RGB..."
      />

      <RhfColorPicker
        name="hslColor"
        control={control}
        label="Formato HSL"
        format="hsl"
        placeholder="Formato HSL..."
      />

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h4>Valores Atuais:</h4>
        <pre style={{ fontSize: "0.875rem" }}>
          {JSON.stringify(colors, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

### 3. Com Controle de Transparência (Alpha)

```tsx
function TransparentColors() {
  const { control, watch } = useForm({
    defaultValues: {
      overlayColor: "rgba(0, 0, 0, 0.5)",
      highlightColor: "hsla(240, 100%, 50%, 0.3)",
    },
  });

  const colors = watch();

  return (
    <div>
      <RhfColorPicker
        name="overlayColor"
        control={control}
        label="Cor do Overlay"
        format="rgb"
        showAlpha={true}
        helperText="Ajuste a transparência do overlay"
      />

      <RhfColorPicker
        name="highlightColor"
        control={control}
        label="Cor de Destaque"
        format="hsl"
        showAlpha={true}
        helperText="Cor com transparência para destaques"
      />

      {/* Pré-visualização das cores com transparência */}
      <div style={{ marginTop: "2rem" }}>
        <h4>Pré-visualização:</h4>
        <div
          style={{
            position: "relative",
            width: "200px",
            height: "100px",
            background:
              "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
            backgroundSize: "10px 10px",
            backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: "50%",
              backgroundColor: colors.overlayColor,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              top: "50%",
              backgroundColor: colors.highlightColor,
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

### 4. Paleta de Cores Customizada

```tsx
function CustomColorPalette() {
  const { control } = useForm({
    defaultValues: {
      brandColor: "#1976d2",
    },
  });

  // Paleta de cores customizada para marca
  const brandColors = [
    { label: "Azul Primário", value: "#1976d2", group: "Primárias" },
    { label: "Azul Escuro", value: "#0d47a1", group: "Primárias" },
    { label: "Azul Claro", value: "#42a5f5", group: "Primárias" },
    { label: "Verde Sucesso", value: "#2e7d32", group: "Estados" },
    { label: "Vermelho Erro", value: "#d32f2f", group: "Estados" },
    { label: "Laranja Aviso", value: "#ed6c02", group: "Estados" },
    { label: "Cinza Neutro", value: "#757575", group: "Neutras" },
    { label: "Preto", value: "#000000", group: "Neutras" },
    { label: "Branco", value: "#ffffff", group: "Neutras" },
  ];

  return (
    <RhfColorPicker
      name="brandColor"
      control={control}
      label="Cor da Marca"
      presets={brandColors}
      showPresets={true}
      helperText="Selecione uma cor da paleta da marca ou insira uma customizada"
    />
  );
}
```

### 5. Sem Campo de Entrada (Apenas Paleta)

```tsx
function PaletteOnly() {
  const { control } = useForm({
    defaultValues: {
      accentColor: "",
    },
  });

  return (
    <RhfColorPicker
      name="accentColor"
      control={control}
      label="Cor de Destaque"
      showInput={false} // Esconde o campo de entrada
      showPresets={true} // Mostra apenas a paleta
      size="large" // Tamanho maior para o botão
      helperText="Clique para selecionar uma cor da paleta"
    />
  );
}
```

### 6. Com Validação

```tsx
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  primaryColor: yup
    .string()
    .required("Cor primária é obrigatória")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Formato de cor inválido"),
  secondaryColor: yup.string().required("Cor secundária é obrigatória"),
  backgroundColor: yup
    .string()
    .required("Cor de fundo é obrigatória")
    .test(
      "contrast",
      "Contraste insuficiente com a cor primária",
      function (value) {
        const { primaryColor } = this.parent;
        if (!value || !primaryColor) return true;

        // Verificação básica de contraste
        return value !== primaryColor;
      }
    ),
});

function ValidatedThemeForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      primaryColor: "",
      secondaryColor: "",
      backgroundColor: "#ffffff",
    },
  });

  const onSubmit = (data) => {
    console.log("Tema válido:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfColorPicker
        name="primaryColor"
        control={control}
        label="Cor Primária *"
        format="hex"
        helperText={errors.primaryColor?.message || "Escolha a cor principal"}
      />

      <RhfColorPicker
        name="secondaryColor"
        control={control}
        label="Cor Secundária *"
        format="hex"
        helperText={
          errors.secondaryColor?.message || "Escolha a cor secundária"
        }
      />

      <RhfColorPicker
        name="backgroundColor"
        control={control}
        label="Cor de Fundo *"
        format="hex"
        helperText={
          errors.backgroundColor?.message || "Cor de fundo da aplicação"
        }
      />

      <button type="submit">Validar e Salvar Tema</button>
    </form>
  );
}
```

### 7. Sistema de Personalização Avançado

```tsx
function AdvancedCustomization() {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      headerBg: "#1976d2",
      sidebarBg: "#ffffff",
      contentBg: "#f5f5f5",
      textColor: "#333333",
      linkColor: "#1976d2",
      buttonColor: "#1976d2",
    },
  });

  const theme = watch();

  // Função para gerar tema automático baseado na cor primária
  const generateAutoTheme = (primaryColor) => {
    setValue("headerBg", primaryColor);
    setValue("linkColor", primaryColor);
    setValue("buttonColor", primaryColor);

    // Lógica para gerar cores complementares
    const isLightColor = isLight(primaryColor);
    setValue("textColor", isLightColor ? "#333333" : "#ffffff");
    setValue("contentBg", isLightColor ? "#f5f5f5" : "#2e2e2e");
  };

  const isLight = (color) => {
    // Função para determinar se uma cor é clara ou escura
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {/* Painel de configuração */}
      <div style={{ flex: 1 }}>
        <h3>Personalização do Tema</h3>

        <RhfColorPicker
          name="headerBg"
          control={control}
          label="Cor do Cabeçalho"
          onColorChange={(color) => {
            // Auto-atualizar outras cores baseadas na mudança
            generateAutoTheme(color);
          }}
        />

        <RhfColorPicker
          name="sidebarBg"
          control={control}
          label="Cor da Barra Lateral"
          showAlpha={true}
          format="rgb"
        />

        <RhfColorPicker
          name="contentBg"
          control={control}
          label="Cor do Conteúdo"
        />

        <RhfColorPicker
          name="textColor"
          control={control}
          label="Cor do Texto"
        />

        <RhfColorPicker
          name="linkColor"
          control={control}
          label="Cor dos Links"
        />

        <RhfColorPicker
          name="buttonColor"
          control={control}
          label="Cor dos Botões"
        />

        <button
          type="button"
          onClick={() => generateAutoTheme("#1976d2")}
          style={{ marginTop: "1rem" }}
        >
          Resetar para Tema Padrão
        </button>
      </div>

      {/* Pré-visualização do tema */}
      <div style={{ flex: 1 }}>
        <h3>Pré-visualização</h3>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            height: "400px",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: theme.headerBg,
              color: isLight(theme.headerBg) ? "#333" : "#fff",
              padding: "1rem",
              fontWeight: "bold",
            }}
          >
            Cabeçalho da Aplicação
          </div>

          <div style={{ display: "flex", height: "calc(100% - 60px)" }}>
            {/* Sidebar */}
            <div
              style={{
                backgroundColor: theme.sidebarBg,
                width: "150px",
                padding: "1rem",
                borderRight: "1px solid #eee",
              }}
            >
              <div style={{ color: theme.textColor, fontSize: "0.875rem" }}>
                Menu
              </div>
              <div
                style={{
                  color: theme.linkColor,
                  fontSize: "0.875rem",
                  marginTop: "0.5rem",
                  cursor: "pointer",
                }}
              >
                • Item 1
              </div>
              <div
                style={{
                  color: theme.linkColor,
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                  cursor: "pointer",
                }}
              >
                • Item 2
              </div>
            </div>

            {/* Content */}
            <div
              style={{
                backgroundColor: theme.contentBg,
                flex: 1,
                padding: "1rem",
              }}
            >
              <div style={{ color: theme.textColor, marginBottom: "1rem" }}>
                Conteúdo da página
              </div>

              <button
                style={{
                  backgroundColor: theme.buttonColor,
                  color: isLight(theme.buttonColor) ? "#333" : "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Botão de Ação
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 8. Sistema de Favoritos e Histórico

```tsx
function ColorWithHistory() {
  const { control, watch } = useForm({
    defaultValues: {
      currentColor: "#1976d2",
    },
  });

  const [colorHistory, setColorHistory] = useState([
    "#1976d2",
    "#dc004e",
    "#2e7d32",
    "#ed6c02",
  ]);
  const [favorites, setFavorites] = useState(["#ff5722", "#9c27b0", "#00bcd4"]);

  const currentColor = watch("currentColor");

  const addToHistory = (color) => {
    if (color && !colorHistory.includes(color)) {
      setColorHistory((prev) => [color, ...prev.slice(0, 9)]); // Manter apenas 10 cores
    }
  };

  const addToFavorites = (color) => {
    if (color && !favorites.includes(color)) {
      setFavorites((prev) => [...prev, color]);
    }
  };

  const removeFromFavorites = (color) => {
    setFavorites((prev) => prev.filter((c) => c !== color));
  };

  // Criar presets dinâmicos com histórico e favoritos
  const dynamicPresets = [
    ...favorites.map((color) => ({
      label: "Favorito",
      value: color,
      group: "Favoritos",
    })),
    ...colorHistory.map((color) => ({
      label: "Recente",
      value: color,
      group: "Histórico",
    })),
  ];

  return (
    <div>
      <RhfColorPicker
        name="currentColor"
        control={control}
        label="Selecionar Cor"
        presets={dynamicPresets}
        onColorChange={(color) => {
          addToHistory(color);
        }}
      />

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <span>Cor atual: {currentColor}</span>

        {currentColor && (
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: currentColor,
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        )}

        {currentColor && !favorites.includes(currentColor) && (
          <button
            onClick={() => addToFavorites(currentColor)}
            style={{ fontSize: "0.875rem" }}
          >
            ⭐ Adicionar aos Favoritos
          </button>
        )}
      </div>

      {/* Lista de favoritos com opção de remover */}
      {favorites.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Cores Favoritas:</h4>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {favorites.map((color) => (
              <div
                key={color}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.25rem 0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    backgroundColor: color,
                    border: "1px solid #ccc",
                    borderRadius: "2px",
                  }}
                />
                <span>{color}</span>
                <button
                  onClick={() => removeFromFavorites(color)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

## Casos de Uso Comuns

### 1. Personalização de Interface

Ideal para permitir que usuários customizem temas, cores de interface e branding.

```tsx
function InterfaceCustomization() {
  return (
    <div>
      <RhfColorPicker
        name="primaryColor"
        control={control}
        label="Cor Primária"
      />
      <RhfColorPicker
        name="accentColor"
        control={control}
        label="Cor de Destaque"
      />
      <RhfColorPicker
        name="backgroundColor"
        control={control}
        label="Cor de Fundo"
      />
    </div>
  );
}
```

### 2. Editores de Design

Para ferramentas de edição, permitindo seleção de cores para textos, fundos, elementos.

```tsx
function DesignEditor() {
  return (
    <RhfColorPicker
      name="elementColor"
      control={control}
      label="Cor do Elemento"
      showAlpha={true}
      format="rgb"
    />
  );
}
```

### 3. Configurações de Marca

Para sistemas de gestão de marca com paletas de cores corporativas.

```tsx
function BrandManagement() {
  return (
    <RhfColorPicker
      name="brandColor"
      control={control}
      label="Cor da Marca"
      presets={corporateColors}
    />
  );
}
```

### 4. E-commerce e Produtos

Para seleção de cores de produtos, personalização de itens.

```tsx
function ProductCustomization() {
  return (
    <RhfColorPicker
      name="productColor"
      control={control}
      label="Cor do Produto"
      showPresets={true}
    />
  );
}
```

## Integração com APIs

### Salvando Preferências de Cor

```tsx
import { useMutation } from "@tanstack/react-query";

function ColorPreferences() {
  const { control, handleSubmit } = useForm();

  const saveColors = useMutation({
    mutationFn: async (colors) => {
      const response = await fetch("/api/user/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(colors),
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Cores salvas com sucesso!");
    },
  });

  const onSubmit = (data) => {
    saveColors.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfColorPicker
        name="themeColor"
        control={control}
        label="Cor do Tema"
        disabled={saveColors.isLoading}
      />

      <RhfColorPicker
        name="accentColor"
        control={control}
        label="Cor de Destaque"
        showAlpha={true}
        format="rgb"
        disabled={saveColors.isLoading}
      />

      <button type="submit" disabled={saveColors.isLoading}>
        {saveColors.isLoading ? "Salvando..." : "Salvar Cores"}
      </button>
    </form>
  );
}
```

### Carregando Paleta de Cores da API

```tsx
function APIColorPalette() {
  const { control } = useForm();

  const { data: colorPalette, isLoading } = useQuery({
    queryKey: ["color-palette"],
    queryFn: async () => {
      const response = await fetch("/api/colors/palette");
      return response.json();
    },
  });

  if (isLoading) return <div>Carregando paleta...</div>;

  return (
    <RhfColorPicker
      name="selectedColor"
      control={control}
      label="Selecione uma Cor"
      presets={colorPalette?.colors || []}
      showPresets={true}
    />
  );
}
```

## Acessibilidade

O componente `RhfColorPicker` oferece suporte completo à acessibilidade:

### Recursos de Acessibilidade

- ✅ **Navegação por teclado** - Tab para navegar, Enter/Space para ativar
- ✅ **Leitores de tela** - ARIA labels e descriptions apropriados
- ✅ **Contraste adequado** - Cores seguem diretrizes WCAG
- ✅ **Estados visuais claros** - Foco, hover e disabled bem definidos
- ✅ **Anúncios de mudança** - Mudanças de cor são anunciadas

### Implementação Acessível

```tsx
function AccessibleColorPicker() {
  return (
    <RhfColorPicker
      name="accessibleColor"
      control={control}
      label="Seleção de Cor Acessível"
      helperText="Use Tab para navegar, Enter para abrir a paleta"
      // O componente automaticamente adiciona:
      // - aria-label apropriado
      // - role="button" no botão de cor
      // - aria-expanded para o estado do popover
      // - aria-describedby para o helper text
    />
  );
}
```

### Atalhos de Teclado

- **Tab** - Navega entre elementos
- **Enter/Space** - Abre/fecha a paleta de cores
- **Escape** - Fecha a paleta
- **Setas** - Navega entre cores da paleta
- **Enter** - Seleciona a cor focada

## Performance

### Otimizações Implementadas

- ✅ **React.memo** - Evita re-renders desnecessários
- ✅ **useCallback/useMemo** - Callbacks e valores memoizados
- ✅ **Lazy loading** - Popover carregado apenas quando necessário
- ✅ **Conversão otimizada** - Cache de conversões de formato

### Boas Práticas de Performance

```tsx
// ✅ Bom - Presets memoizados
const brandColors = useMemo(
  () => [
    { label: "Primary", value: "#1976d2", group: "Brand" },
    { label: "Secondary", value: "#dc004e", group: "Brand" },
  ],
  []
);

// ✅ Bom - Callback estável
const handleColorChange = useCallback(
  (color) => {
    updateTheme({ primaryColor: color });
  },
  [updateTheme]
);

// ❌ Evitar - Presets criados a cada render
const colors = [{ label: "Red", value: "#ff0000" }]; // Criado a cada render
```

### Otimização para Múltiplos Color Pickers

```tsx
// Para múltiplos color pickers, use React.memo
const MemoizedColorPicker = memo(RhfColorPicker);

function MultipleColorPickers({ colors }) {
  return (
    <div>
      {colors.map((color) => (
        <MemoizedColorPicker
          key={color.id}
          name={color.name}
          control={control}
          {...color.props}
        />
      ))}
    </div>
  );
}
```

## Troubleshooting

### Problemas Comuns

#### 1. **Formato de cor inválido**

```tsx
// ❌ Problema: Formato inconsistente
<RhfColorPicker format="rgb" defaultValue="#ff0000" />

// ✅ Solução: Mantenha consistência entre formato e valor
<RhfColorPicker
  format="rgb"
  defaultValue="rgb(255, 0, 0)"
/>
```

#### 2. **Transparência não funciona**

```tsx
// ❌ Problema: showAlpha sem formato que suporte alpha
<RhfColorPicker format="hex" showAlpha={true} />

// ✅ Solução: Use formato que suporte alpha
<RhfColorPicker format="rgb" showAlpha={true} />
```

#### 3. **Paleta não aparece**

```tsx
// ❌ Problema: showPresets false com presets definidos
<RhfColorPicker presets={colors} showPresets={false} />

// ✅ Solução: Habilite showPresets
<RhfColorPicker presets={colors} showPresets={true} />
```

#### 4. **Performance ruim com muitas cores**

```tsx
// ❌ Problema: Muitas cores na paleta
const manyColors = generateColors(1000); // Muitas cores

// ✅ Solução: Limite o número de cores ou use grupos
const limitedColors = colors.slice(0, 50);
const groupedColors = groupColorsByCategory(colors);
```

#### 5. **Conversão de cor incorreta**

```tsx
// ❌ Problema: Tentativa de conversão de formato inválido
const invalidColor = "invalid-color";

// ✅ Solução: Valide o formato antes da conversão
const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
if (isValidHex) {
  // Proceda com a conversão
}
```

### Debug e Monitoramento

```tsx
// Debug de conversões de cor
const ColorPickerWithDebug = (props) => {
  const { control, watch } = useForm();
  const currentColor = watch(props.name);

  useEffect(() => {
    console.log("Color changed:", currentColor);
    console.log("Format:", props.format);
    console.log("Is valid:", isValidColor(currentColor));
  }, [currentColor, props.format]);

  return <RhfColorPicker {...props} control={control} />;
};

// Função utilitária para validação
const isValidColor = (color) => {
  if (!color) return false;

  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbPattern = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
  const rgbaPattern = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/;

  return (
    hexPattern.test(color) || rgbPattern.test(color) || rgbaPattern.test(color)
  );
};
```

### Validação Customizada de Cores

```tsx
// Validação avançada de cores
const validateColor = (value, format) => {
  if (!value) return "Cor é obrigatória";

  switch (format) {
    case "hex":
      if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
        return "Formato HEX inválido (ex: #ff0000)";
      }
      break;
    case "rgb":
      if (
        !/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(\s*,\s*[\d.]+)?\s*\)$/.test(value)
      ) {
        return "Formato RGB inválido (ex: rgb(255, 0, 0))";
      }
      break;
    case "hsl":
      if (
        !/^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%(\s*,\s*[\d.]+)?\s*\)$/.test(
          value
        )
      ) {
        return "Formato HSL inválido (ex: hsl(0, 100%, 50%))";
      }
      break;
  }

  return true;
};

// No schema de validação
const schema = yup.object({
  color: yup.string().test("color-format", validateColor),
});
```

## Conclusão

O `RhfColorPicker` é um componente poderoso e flexível para seleção de cores em aplicações React. Sua integração nativa com React Hook Form, combinada com uma interface rica e intuitiva, oferece uma experiência completa para usuários e desenvolvedores.

### Quando Usar

- ✅ Personalização de temas e interfaces
- ✅ Editores de design e arte
- ✅ Configurações de marca e branding
- ✅ Customização de produtos
- ✅ Ferramentas de criação de conteúdo
- ✅ Sistemas de configuração visual

### Vantagens Principais

- 🎨 **Interface rica** - Paleta, entrada manual e transparência
- 🔧 **Múltiplos formatos** - HEX, RGB, HSL com ou sem alpha
- ✅ **Validação integrada** - Suporte completo ao React Hook Form
- ♿ **Acessível por padrão** - Navegação por teclado e leitores de tela
- 🎯 **Altamente configurável** - Paletas customizáveis e opções flexíveis
- 📱 **Responsivo** - Funciona bem em todos os dispositivos
- ⚡ **Performance otimizada** - Memoização e lazy loading

Use o `RhfColorPicker` sempre que precisar de uma solução completa e profissional para seleção de cores em suas aplicações React!
