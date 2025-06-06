# RhfSlider - Componente de Controle Deslizante com React Hook Form

## Visão Geral

O `RhfSlider` é um componente de controle deslizante (slider) integrado ao React Hook Form, baseado no componente Slider do Material-UI. Permite que usuários selecionem valores únicos ou intervalos de valores através de uma interface intuitiva de arrastar e soltar, com suporte a validação automática e estados visuais de erro.

## Características Principais

- ✅ **Integração nativa com React Hook Form** - Validação automática e gerenciamento de estado
- 🎚️ **Valores únicos e intervalos** - Seleção de um valor ou range de valores
- 📏 **Altamente configurável** - Min, max, step, marcações customizáveis
- 🎯 **Orientação flexível** - Horizontal ou vertical
- 📐 **Tamanhos variados** - Pequeno, médio e tamanhos customizados
- 🎨 **Cores personalizáveis** - Primary, secondary e cores customizadas
- 🔢 **Formatação de valores** - Labels e tooltips customizáveis
- ♿ **Acessibilidade completa** - Navegação por teclado e leitores de tela

## Análise do Componente

### Props e Tipos

```typescript
interface RhfSliderProps<TFieldValues, TName>
  extends BaseRhfFieldProps<TFieldValues, TName> {
  // Props herdadas de BaseRhfFieldProps
  name: TName; // Nome do campo no formulário
  control: Control<TFieldValues>; // Controle do React Hook Form
  label?: string; // Rótulo do campo
  helperText?: string; // Texto de ajuda
  error?: FieldError; // Objeto de erro customizado
  disabled?: boolean; // Campo desabilitado
  defaultValue?: number | number[]; // Valor inicial (único ou array para range)

  // Props específicas do Slider
  min?: number; // Valor mínimo (padrão: 0)
  max?: number; // Valor máximo (padrão: 100)
  step?: number; // Incremento/decremento (padrão: 1)
  marks?: boolean | Mark[]; // Marcações no slider
  orientation?: "horizontal" | "vertical"; // Orientação
  valueLabelDisplay?: "auto" | "on" | "off"; // Exibição do tooltip
  size?: "small" | "medium"; // Tamanho do slider
  color?: "primary" | "secondary" | string; // Cor do slider

  // Props avançadas do Material-UI Slider
  valueLabelFormat?: (value: number) => React.ReactNode; // Formatação do label
  getAriaLabel?: (index: number) => string; // Label de acessibilidade
  getAriaValueText?: (value: number) => string; // Texto do valor para acessibilidade
}

interface Mark {
  value: number;
  label?: React.ReactNode;
}
```

### Estrutura do Componente

```tsx
const RhfSlider = ({ name, control, min = 0, max = 100, step = 1, ... }) => {
  const { field, fieldState } = useController({ control, name, defaultValue });

  return (
    <FormControl error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Slider
        value={field.value ?? defaultValue ?? min}
        onChange={(_, newValue) => field.onChange(newValue)}
        min={min}
        max={max}
        step={step}
        // ... outras props
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
```

## Exemplos de Uso

### 1. Uso Básico

```tsx
import { useForm } from "react-hook-form";
import { RhfSlider } from "@hox/capy";

function VolumeControl() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      volume: 50,
    },
  });

  const onSubmit = (data) => {
    console.log("Volume:", data.volume);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfSlider
        name="volume"
        control={control}
        label="Volume"
        min={0}
        max={100}
        step={5}
        valueLabelDisplay="auto"
        helperText="Ajuste o volume de 0 a 100"
      />
      <button type="submit">Salvar Configuração</button>
    </form>
  );
}
```

### 2. Slider com Marcações Customizadas

```tsx
function TemperatureControl() {
  const { control } = useForm({
    defaultValues: {
      temperature: 20,
    },
  });

  const temperatureMarks = [
    { value: 0, label: "0°C" },
    { value: 10, label: "10°C" },
    { value: 20, label: "20°C" },
    { value: 30, label: "30°C" },
    { value: 40, label: "40°C" },
  ];

  return (
    <RhfSlider
      name="temperature"
      control={control}
      label="Temperatura do Ambiente"
      min={0}
      max={40}
      step={1}
      marks={temperatureMarks}
      valueLabelDisplay="on"
      valueLabelFormat={(value) => `${value}°C`}
      color="secondary"
    />
  );
}
```

### 3. Slider de Intervalo (Range)

```tsx
function PriceRangeFilter() {
  const { control, watch } = useForm({
    defaultValues: {
      priceRange: [100, 500],
    },
  });

  const priceRange = watch("priceRange");

  return (
    <div>
      <RhfSlider
        name="priceRange"
        control={control}
        label="Faixa de Preço"
        min={0}
        max={1000}
        step={50}
        marks={[
          { value: 0, label: "R$ 0" },
          { value: 250, label: "R$ 250" },
          { value: 500, label: "R$ 500" },
          { value: 750, label: "R$ 750" },
          { value: 1000, label: "R$ 1000" },
        ]}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `R$ ${value}`}
      />

      <p>
        Produtos entre <strong>R$ {priceRange[0]}</strong> e{" "}
        <strong>R$ {priceRange[1]}</strong>
      </p>
    </div>
  );
}
```

### 4. Slider Vertical

```tsx
function AudioMixer() {
  const { control } = useForm({
    defaultValues: {
      bass: 0,
      mid: 0,
      treble: 0,
    },
  });

  return (
    <div
      style={{
        display: "flex",
        height: "300px",
        gap: "2rem",
        justifyContent: "center",
      }}
    >
      <RhfSlider
        name="bass"
        control={control}
        label="Bass"
        min={-10}
        max={10}
        step={1}
        orientation="vertical"
        marks={[
          { value: -10, label: "-10dB" },
          { value: 0, label: "0dB" },
          { value: 10, label: "+10dB" },
        ]}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}dB`}
      />

      <RhfSlider
        name="mid"
        control={control}
        label="Mid"
        min={-10}
        max={10}
        step={1}
        orientation="vertical"
        marks={true}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}dB`}
      />

      <RhfSlider
        name="treble"
        control={control}
        label="Treble"
        min={-10}
        max={10}
        step={1}
        orientation="vertical"
        marks={true}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}dB`}
      />
    </div>
  );
}
```

### 5. Slider com Validação

```tsx
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  age: yup
    .number()
    .min(18, "Idade mínima é 18 anos")
    .max(100, "Idade máxima é 100 anos")
    .required("Idade é obrigatória"),
  experience: yup
    .number()
    .min(1, "Mínimo 1 ano de experiência")
    .required("Experiência é obrigatória"),
  salaryRange: yup
    .array()
    .of(yup.number())
    .test("range", "Faixa salarial inválida", function (value) {
      if (!value || value.length !== 2) return false;
      return value[1] > value[0];
    })
    .required("Faixa salarial é obrigatória"),
});

function JobApplicationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      age: 25,
      experience: 1,
      salaryRange: [3000, 8000],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfSlider
        name="age"
        control={control}
        label="Idade *"
        min={16}
        max={100}
        step={1}
        marks={[
          { value: 18, label: "18" },
          { value: 30, label: "30" },
          { value: 50, label: "50" },
          { value: 65, label: "65" },
        ]}
        helperText={errors.age?.message || "Selecione sua idade"}
        valueLabelDisplay="auto"
      />

      <RhfSlider
        name="experience"
        control={control}
        label="Anos de Experiência *"
        min={0}
        max={30}
        step={1}
        marks={true}
        helperText={
          errors.experience?.message || "Anos de experiência profissional"
        }
        valueLabelDisplay="auto"
      />

      <RhfSlider
        name="salaryRange"
        control={control}
        label="Faixa Salarial Desejada (R$) *"
        min={1000}
        max={20000}
        step={500}
        marks={[
          { value: 1000, label: "R$ 1k" },
          { value: 5000, label: "R$ 5k" },
          { value: 10000, label: "R$ 10k" },
          { value: 15000, label: "R$ 15k" },
          { value: 20000, label: "R$ 20k" },
        ]}
        helperText={
          errors.salaryRange?.message || "Faixa salarial mensal desejada"
        }
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `R$ ${value.toLocaleString()}`}
      />
    </form>
  );
}
```

### 6. Configurações de Sistema

```tsx
function SystemSettings() {
  const { control, watch } = useForm({
    defaultValues: {
      brightness: 75,
      volume: 50,
      mouseSpeed: 5,
      autoSaveInterval: 30,
    },
  });

  const settings = watch();

  return (
    <div>
      <h3>Configurações do Sistema</h3>

      <RhfSlider
        name="brightness"
        control={control}
        label="Brilho da Tela"
        min={10}
        max={100}
        step={5}
        size="small"
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}%`}
        helperText={`Brilho atual: ${settings.brightness}%`}
      />

      <RhfSlider
        name="volume"
        control={control}
        label="Volume do Sistema"
        min={0}
        max={100}
        step={1}
        marks={[
          { value: 0, label: "🔇" },
          { value: 50, label: "🔉" },
          { value: 100, label: "🔊" },
        ]}
        valueLabelDisplay="auto"
        color="secondary"
      />

      <RhfSlider
        name="mouseSpeed"
        control={control}
        label="Velocidade do Mouse"
        min={1}
        max={10}
        step={1}
        marks={true}
        valueLabelDisplay="auto"
        helperText="1 = Muito lento, 10 = Muito rápido"
      />

      <RhfSlider
        name="autoSaveInterval"
        control={control}
        label="Intervalo de Salvamento Automático"
        min={5}
        max={120}
        step={5}
        marks={[
          { value: 5, label: "5min" },
          { value: 30, label: "30min" },
          { value: 60, label: "1h" },
          { value: 120, label: "2h" },
        ]}
        valueLabelFormat={(value) => `${value} min`}
        valueLabelDisplay="auto"
      />
    </div>
  );
}
```

### 7. Controle de Qualidade de Imagem

```tsx
function ImageEditor() {
  const { control, watch } = useForm({
    defaultValues: {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      hue: 0,
      sharpness: 0,
    },
  });

  const adjustments = watch();

  return (
    <div>
      <h3>Ajustes de Imagem</h3>

      <RhfSlider
        name="brightness"
        control={control}
        label="Brilho"
        min={-100}
        max={100}
        step={5}
        marks={[
          { value: -100, label: "-100" },
          { value: 0, label: "0" },
          { value: 100, label: "+100" },
        ]}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => (value > 0 ? `+${value}` : `${value}`)}
      />

      <RhfSlider
        name="contrast"
        control={control}
        label="Contraste"
        min={-100}
        max={100}
        step={5}
        marks={true}
        valueLabelDisplay="auto"
        color="secondary"
      />

      <RhfSlider
        name="saturation"
        control={control}
        label="Saturação"
        min={-100}
        max={100}
        step={10}
        valueLabelDisplay="auto"
      />

      <RhfSlider
        name="hue"
        control={control}
        label="Matiz"
        min={-180}
        max={180}
        step={15}
        marks={[
          { value: -180, label: "-180°" },
          { value: -90, label: "-90°" },
          { value: 0, label: "0°" },
          { value: 90, label: "90°" },
          { value: 180, label: "180°" },
        ]}
        valueLabelFormat={(value) => `${value}°`}
        valueLabelDisplay="auto"
      />

      <RhfSlider
        name="sharpness"
        control={control}
        label="Nitidez"
        min={0}
        max={100}
        step={5}
        valueLabelDisplay="auto"
        helperText="0 = Muito suave, 100 = Muito nítido"
      />

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h4>Pré-visualização dos Ajustes:</h4>
        <pre style={{ fontSize: "0.875rem" }}>
          {JSON.stringify(adjustments, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

### 8. Filtros de Pesquisa Avançada

```tsx
function AdvancedSearchFilters() {
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      priceRange: [0, 1000],
      rating: 3,
      distance: 10,
      yearRange: [2020, 2024],
    },
  });

  const filters = watch();

  const onSubmit = (data) => {
    console.log("Aplicar filtros:", data);
    // Aplicar filtros na pesquisa
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Filtros de Pesquisa</h3>

      <RhfSlider
        name="priceRange"
        control={control}
        label="Faixa de Preço"
        min={0}
        max={2000}
        step={50}
        marks={[
          { value: 0, label: "R$ 0" },
          { value: 500, label: "R$ 500" },
          { value: 1000, label: "R$ 1.000" },
          { value: 1500, label: "R$ 1.500" },
          { value: 2000, label: "R$ 2.000" },
        ]}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `R$ ${value}`}
      />

      <RhfSlider
        name="rating"
        control={control}
        label="Avaliação Mínima"
        min={1}
        max={5}
        step={0.5}
        marks={[
          { value: 1, label: "⭐" },
          { value: 2, label: "⭐⭐" },
          { value: 3, label: "⭐⭐⭐" },
          { value: 4, label: "⭐⭐⭐⭐" },
          { value: 5, label: "⭐⭐⭐⭐⭐" },
        ]}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value} estrelas`}
      />

      <RhfSlider
        name="distance"
        control={control}
        label="Distância Máxima"
        min={1}
        max={50}
        step={1}
        marks={[
          { value: 1, label: "1km" },
          { value: 10, label: "10km" },
          { value: 25, label: "25km" },
          { value: 50, label: "50km" },
        ]}
        valueLabelFormat={(value) => `${value}km`}
        valueLabelDisplay="auto"
        helperText={`Produtos a até ${filters.distance}km de distância`}
      />

      <RhfSlider
        name="yearRange"
        control={control}
        label="Ano de Fabricação"
        min={2015}
        max={2024}
        step={1}
        marks={true}
        valueLabelDisplay="auto"
      />

      <div style={{ marginTop: "2rem" }}>
        <button type="submit">Aplicar Filtros</button>
        <p style={{ fontSize: "0.875rem", color: "#666" }}>
          {`Preço: R$ ${filters.priceRange[0]} - R$ ${filters.priceRange[1]} |
            Avaliação: ${filters.rating}+ estrelas |
            Distância: ${filters.distance}km |
            Ano: ${filters.yearRange[0]} - ${filters.yearRange[1]}`}
        </p>
      </div>
    </form>
  );
}
```

## Casos de Uso Comuns

### 1. Configurações de Aplicação

Ideal para ajustes de preferências como volume, brilho, velocidade, intervalos de tempo.

```tsx
function AppSettings() {
  return (
    <div>
      <RhfSlider name="volume" control={control} label="Volume" max={100} />
      <RhfSlider
        name="notifications"
        control={control}
        label="Frequência de Notificações"
        min={1}
        max={24}
      />
    </div>
  );
}
```

### 2. Filtros de E-commerce

Excelente para filtros de preço, avaliação, distância em sistemas de busca.

```tsx
function ProductFilters() {
  return (
    <RhfSlider
      name="priceRange"
      control={control}
      label="Faixa de Preço"
      min={0}
      max={1000}
      step={25}
    />
  );
}
```

### 3. Controles de Mídia

Perfeito para players de áudio/vídeo, editores de imagem, mixers.

```tsx
function MediaControls() {
  return (
    <RhfSlider
      name="progress"
      control={control}
      label="Progresso"
      min={0}
      max={duration}
      valueLabelFormat={formatTime}
    />
  );
}
```

### 4. Formulários de Pesquisa

Para questionários, avaliações, pesquisas de satisfação.

```tsx
function SurveyForm() {
  return (
    <RhfSlider
      name="satisfaction"
      control={control}
      label="Nível de Satisfação"
      min={1}
      max={10}
      marks={true}
    />
  );
}
```

## Integração com APIs

### Salvando Configurações

```tsx
import { useMutation } from "@tanstack/react-query";

function UserPreferences() {
  const { control, handleSubmit } = useForm();

  const savePreferences = useMutation({
    mutationFn: async (preferences) => {
      const response = await fetch("/api/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Preferências salvas com sucesso!");
    },
  });

  const onSubmit = (data) => {
    savePreferences.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfSlider
        name="volume"
        control={control}
        label="Volume Padrão"
        min={0}
        max={100}
        step={5}
        disabled={savePreferences.isLoading}
      />

      <RhfSlider
        name="autoSave"
        control={control}
        label="Intervalo de Auto-Save (min)"
        min={1}
        max={60}
        step={1}
        disabled={savePreferences.isLoading}
      />

      <button type="submit" disabled={savePreferences.isLoading}>
        {savePreferences.isLoading ? "Salvando..." : "Salvar Preferências"}
      </button>
    </form>
  );
}
```

### Filtros em Tempo Real

```tsx
function LiveFilters() {
  const { control, watch } = useForm({
    defaultValues: {
      priceRange: [0, 1000],
      rating: 1,
    },
  });

  const filters = watch();

  // Busca em tempo real quando filtros mudam
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => searchProducts(filters),
    enabled: true,
  });

  return (
    <div>
      <RhfSlider
        name="priceRange"
        control={control}
        label="Faixa de Preço"
        min={0}
        max={2000}
        step={50}
        valueLabelFormat={(value) => `R$ ${value}`}
      />

      <RhfSlider
        name="rating"
        control={control}
        label="Avaliação Mínima"
        min={1}
        max={5}
        step={0.5}
        valueLabelFormat={(value) => `${value} ⭐`}
      />

      {isLoading ? (
        <div>Carregando produtos...</div>
      ) : (
        <div>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
```

## Acessibilidade

O componente `RhfSlider` oferece suporte completo à acessibilidade:

### Recursos de Acessibilidade

- ✅ **Navegação por teclado** - Setas para ajustar valores, Home/End para extremos
- ✅ **Leitores de tela** - Anúncio correto de valores, mín/máx e incrementos
- ✅ **Labels descritivos** - ARIA labels automáticos e customizáveis
- ✅ **Contraste adequado** - Cores seguem diretrizes WCAG
- ✅ **Estados visuais claros** - Foco, hover e disabled bem definidos

### Implementação Acessível

```tsx
function AccessibleSlider() {
  return (
    <RhfSlider
      name="volume"
      control={control}
      label="Volume do Sistema"
      min={0}
      max={100}
      step={5}
      getAriaLabel={() => "Controle de volume do sistema"}
      getAriaValueText={(value) => `${value} por cento`}
      valueLabelFormat={(value) => `${value}%`}
      helperText="Use as setas do teclado para ajustar o volume"
    />
  );
}
```

### Atalhos de Teclado

- **Seta Direita/Cima** - Incrementa o valor
- **Seta Esquerda/Baixo** - Decrementa o valor
- **Page Up** - Incrementa em steps maiores
- **Page Down** - Decrementa em steps maiores
- **Home** - Vai para o valor mínimo
- **End** - Vai para o valor máximo

## Performance

### Otimizações Implementadas

- ✅ **React.memo** - Evita re-renders desnecessários
- ✅ **useController otimizado** - Integração eficiente com RHF
- ✅ **Debounce automático** - Para mudanças frequentes de valor
- ✅ **Lazy evaluation** - Cálculos apenas quando necessário

### Boas Práticas de Performance

```tsx
// ✅ Bom - Marks memoizadas
const temperatureMarks = useMemo(
  () => [
    { value: 0, label: "0°C" },
    { value: 25, label: "25°C" },
    { value: 50, label: "50°C" },
  ],
  []
);

// ✅ Bom - Formatter estável
const formatValue = useCallback((value) => `${value}%`, []);

// ✅ Bom - Handler estável
const handleSliderChange = useCallback(
  (data) => {
    updateSettings(data);
  },
  [updateSettings]
);

// ❌ Evitar - Marks criadas a cada render
const marks = [{ value: 0, label: "0°C" }]; // Criado a cada render
```

### Otimização para Grandes Listas

```tsx
// Para múltiplos sliders, use React.memo
const MemoizedSlider = memo(RhfSlider);

function MultipleSliders({ sliders }) {
  return (
    <div>
      {sliders.map((slider) => (
        <MemoizedSlider
          key={slider.id}
          name={slider.name}
          control={control}
          {...slider.props}
        />
      ))}
    </div>
  );
}
```

## Troubleshooting

### Problemas Comuns

#### 1. **Valor não atualiza corretamente**

```tsx
// ❌ Problema: defaultValue inconsistente
<RhfSlider defaultValue={undefined} />;

// ✅ Solução: Sempre forneça valor padrão válido
const { control } = useForm({
  defaultValues: { volume: 50 },
});
<RhfSlider name="volume" control={control} />;
```

#### 2. **Range slider não funciona**

```tsx
// ❌ Problema: defaultValue como número para range
defaultValues: {
  range: 50;
}

// ✅ Solução: Use array para range
defaultValues: {
  range: [20, 80];
}
```

#### 3. **Marcações não aparecem**

```tsx
// ❌ Problema: Marks fora do range min/max
marks={[
  { value: -10, label: 'Invalid' }, // Fora do range 0-100
  { value: 50, label: 'Valid' }
]}

// ✅ Solução: Garanta que marks estão dentro do range
marks={[
  { value: 0, label: 'Min' },
  { value: 50, label: 'Mid' },
  { value: 100, label: 'Max' }
]}
```

#### 4. **Performance ruim com onChange**

```tsx
// ❌ Problema: Operações pesadas no onChange
const handleChange = (value) => {
  // Operação custosa a cada mudança
  heavyCalculation(value);
};

// ✅ Solução: Use debounce para operações pesadas
const debouncedCalculation = useMemo(() => debounce(heavyCalculation, 300), []);

useEffect(() => {
  debouncedCalculation(sliderValue);
}, [sliderValue, debouncedCalculation]);
```

#### 5. **Slider vertical não funciona**

```tsx
// ❌ Problema: Container sem altura definida
<RhfSlider orientation="vertical" />

// ✅ Solução: Defina altura do container
<div style={{ height: '300px' }}>
  <RhfSlider orientation="vertical" />
</div>
```

### Debug e Monitoramento

```tsx
// Debug de valores
const { control, watch } = useForm();
const sliderValue = watch("volume");

useEffect(() => {
  console.log("Slider value changed:", sliderValue);
}, [sliderValue]);

// Monitoramento de performance
const SliderWithDebug = (props) => {
  const renderCount = useRef(0);
  renderCount.current++;

  console.log(`Slider rendered ${renderCount.current} times`);

  return <RhfSlider {...props} />;
};
```

### Validação Customizada

```tsx
// Validação de range personalizada
const validateRange = (value) => {
  if (Array.isArray(value)) {
    const [min, max] = value;
    if (max - min < 10) {
      return "Diferença mínima de 10 unidades";
    }
  }
  return true;
};

// No schema de validação
const schema = yup.object({
  priceRange: yup.array().test("range-validation", validateRange),
});
```

## Conclusão

O `RhfSlider` é um componente extremamente versátil para capturar valores numéricos e intervalos de forma intuitiva. Sua integração nativa com React Hook Form, combinada com a rica funcionalidade do Material-UI Slider, oferece uma solução completa para controles deslizantes em aplicações React.

### Quando Usar

- ✅ Configurações de aplicação (volume, brilho, velocidade)
- ✅ Filtros de busca (preço, distância, avaliação)
- ✅ Controles de mídia (progresso, volume, equalização)
- ✅ Formulários de pesquisa e avaliação
- ✅ Editores (imagem, áudio, configurações)

### Vantagens Principais

- 🎯 **Interface intuitiva** - Familiar e fácil de usar
- 🔧 **Altamente configurável** - Muitas opções de customização
- ✅ **Validação integrada** - Suporte completo ao React Hook Form
- ♿ **Acessível por padrão** - Navegação por teclado e leitores de tela
- 📱 **Responsivo** - Funciona bem em dispositivos móveis
- 🎨 **Visualmente atrativo** - Animações suaves e design moderno

Use o `RhfSlider` sempre que precisar de um controle numérico mais visual e interativo que campos de texto tradicionais!
