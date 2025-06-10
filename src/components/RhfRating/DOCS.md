# RhfRating - Componente de Avaliação com React Hook Form

## Visão Geral

O `RhfRating` é um componente de avaliação por estrelas integrado ao React Hook Form, baseado no componente Rating do Material-UI. Permite que usuários forneçam avaliações de 1 a N estrelas com suporte a meio valores, validação automática e estados visuais de erro.

## Características Principais

- ✅ **Integração nativa com React Hook Form** - Validação automática e gerenciamento de estado
- ⭐ **Avaliação por estrelas** - Interface intuitiva e familiar aos usuários
- 🎯 **Precisão configurável** - Suporte a estrelas inteiras (1, 2, 3...) ou meias estrelas (1.5, 2.5, 3.5...)
- 📏 **Tamanhos flexíveis** - Pequeno, médio e grande
- 🔢 **Máximo personalizável** - De 3 a 10 estrelas ou mais
- 🎨 **Estados visuais** - Normal, erro, desabilitado, somente leitura
- ♿ **Acessibilidade** - Navegação por teclado e leitores de tela

## Análise do Componente

### Props e Tipos

```typescript
interface RhfRatingProps<TFieldValues, TName>
  extends BaseRhfFieldProps<TFieldValues, TName> {
  // Props herdadas de BaseRhfFieldProps
  name: TName; // Nome do campo no formulário
  control: Control<TFieldValues>; // Controle do React Hook Form
  label?: string; // Rótulo do campo
  helperText?: string; // Texto de ajuda
  error?: FieldError; // Objeto de erro customizado
  disabled?: boolean; // Campo desabilitado
  defaultValue?: number; // Valor inicial

  // Props específicas do Rating
  max?: number; // Número máximo de estrelas (padrão: 5)
  precision?: number; // Precisão (1 = estrelas inteiras, 0.5 = meias estrelas)
  size?: "small" | "medium" | "large"; // Tamanho das estrelas
  readOnly?: boolean; // Somente leitura

  // Props do Material-UI Rating (exceto as controladas pelo RHF)
  icon?: React.ReactElement; // Ícone customizado
  emptyIcon?: React.ReactElement; // Ícone para estrelas vazias
  color?: string; // Cor das estrelas
}
```

### Estrutura do Componente

```tsx
const RhfRating = ({ name, control, label, max = 5, precision = 1, ... }) => {
  const { field, fieldState } = useController({ control, name, defaultValue });

  return (
    <FormControl error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Rating
        value={field.value ?? 0}
        onChange={(_, newValue) => field.onChange(newValue)}
        max={max}
        precision={precision}
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
import { RhfRating } from "@hox/capy";

function ProductReview() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      rating: 0,
    },
  });

  const onSubmit = (data) => {
    console.log("Avaliação:", data.rating);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfRating
        name="rating"
        control={control}
        label="Avalie este produto"
        max={5}
        precision={1}
        defaultValue={0}
      />
      <button type="submit">Enviar Avaliação</button>
    </form>
  );
}
```

### 2. Avaliação com Meias Estrelas

```tsx
function RestaurantReview() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      foodRating: 0,
      serviceRating: 0,
      ambientRating: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfRating
        name="foodRating"
        control={control}
        label="Qualidade da comida"
        max={5}
        precision={0.5}
        size="large"
        helperText="Clique entre as estrelas para meio ponto"
      />

      <RhfRating
        name="serviceRating"
        control={control}
        label="Atendimento"
        max={5}
        precision={0.5}
        size="large"
      />

      <RhfRating
        name="ambientRating"
        control={control}
        label="Ambiente"
        max={5}
        precision={0.5}
        size="large"
      />
    </form>
  );
}
```

### 3. Sistema de Avaliação com Validação

```tsx
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  overallRating: yup
    .number()
    .min(1, "Por favor, forneça uma avaliação")
    .required("Avaliação é obrigatória"),
  qualityRating: yup
    .number()
    .min(1, "Por favor, avalie a qualidade")
    .required("Avaliação da qualidade é obrigatória"),
  wouldRecommend: yup
    .number()
    .min(1, "Por favor, indique se recomendaria")
    .required("Recomendação é obrigatória"),
});

function DetailedReview() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      overallRating: 0,
      qualityRating: 0,
      wouldRecommend: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfRating
        name="overallRating"
        control={control}
        label="Avaliação Geral *"
        max={5}
        precision={1}
        helperText={errors.overallRating?.message || "De 1 a 5 estrelas"}
      />

      <RhfRating
        name="qualityRating"
        control={control}
        label="Qualidade do Produto *"
        max={5}
        precision={0.5}
        helperText={
          errors.qualityRating?.message || "Meias estrelas permitidas"
        }
      />

      <RhfRating
        name="wouldRecommend"
        control={control}
        label="Recomendaria para outros? *"
        max={10}
        precision={1}
        helperText={
          errors.wouldRecommend?.message || "1 = Nunca, 10 = Definitivamente"
        }
      />
    </form>
  );
}
```

### 4. Diferentes Tamanhos e Configurações

```tsx
function RatingShowcase() {
  const { control } = useForm({
    defaultValues: {
      smallRating: 3,
      mediumRating: 4,
      largeRating: 5,
      customMaxRating: 7,
      readOnlyRating: 4.5,
    },
  });

  return (
    <div>
      <RhfRating
        name="smallRating"
        control={control}
        label="Avaliação Pequena"
        size="small"
        max={5}
        precision={1}
      />

      <RhfRating
        name="mediumRating"
        control={control}
        label="Avaliação Média"
        size="medium"
        max={5}
        precision={1}
      />

      <RhfRating
        name="largeRating"
        control={control}
        label="Avaliação Grande"
        size="large"
        max={5}
        precision={1}
      />

      <RhfRating
        name="customMaxRating"
        control={control}
        label="Escala de 10 pontos"
        max={10}
        precision={1}
        size="medium"
      />

      <RhfRating
        name="readOnlyRating"
        control={control}
        label="Avaliação Média dos Usuários"
        readOnly
        max={5}
        precision={0.5}
        size="large"
        helperText="Baseado em 1.234 avaliações"
      />
    </div>
  );
}
```

### 5. Avaliação com Estados Condicionais

```tsx
function ConditionalRating() {
  const { control, watch } = useForm({
    defaultValues: {
      hasUsedProduct: false,
      productRating: 0,
      wouldBuyAgain: 0,
    },
  });

  const hasUsedProduct = watch("hasUsedProduct");
  const productRating = watch("productRating");

  return (
    <form>
      <label>
        <input type="checkbox" {...register("hasUsedProduct")} />
        Já usei este produto
      </label>

      {hasUsedProduct && (
        <RhfRating
          name="productRating"
          control={control}
          label="Como você avalia o produto?"
          max={5}
          precision={0.5}
          size="large"
        />
      )}

      {productRating >= 4 && (
        <RhfRating
          name="wouldBuyAgain"
          control={control}
          label="Compraria novamente?"
          max={5}
          precision={1}
          helperText="1 = Nunca, 5 = Com certeza"
        />
      )}
    </form>
  );
}
```

### 6. Múltiplas Categorias de Avaliação

```tsx
function MultiCategoryRating() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      categories: {
        functionality: 0,
        design: 0,
        performance: 0,
        support: 0,
        value: 0,
      },
    },
  });

  const ratings = watch("categories");
  const averageRating =
    Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / 5;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Avalie nas seguintes categorias:</h3>

      <RhfRating
        name="categories.functionality"
        control={control}
        label="Funcionalidade"
        max={5}
        precision={0.5}
        size="medium"
      />

      <RhfRating
        name="categories.design"
        control={control}
        label="Design"
        max={5}
        precision={0.5}
        size="medium"
      />

      <RhfRating
        name="categories.performance"
        control={control}
        label="Performance"
        max={5}
        precision={0.5}
        size="medium"
      />

      <RhfRating
        name="categories.support"
        control={control}
        label="Suporte"
        max={5}
        precision={0.5}
        size="medium"
      />

      <RhfRating
        name="categories.value"
        control={control}
        label="Custo-benefício"
        max={5}
        precision={0.5}
        size="medium"
      />

      <div
        style={{ marginTop: "1rem", padding: "1rem", background: "#f5f5f5" }}
      >
        <strong>Média Geral: {averageRating.toFixed(1)} estrelas</strong>
      </div>
    </form>
  );
}
```

### 7. Avaliação com Ícones Customizados

```tsx
import { Favorite, FavoriteBorder } from "@mui/icons-material";

function HeartRating() {
  const { control } = useForm({
    defaultValues: {
      loveRating: 0,
    },
  });

  return (
    <RhfRating
      name="loveRating"
      control={control}
      label="O quanto você ama este produto?"
      max={5}
      precision={1}
      size="large"
      icon={<Favorite fontSize="inherit" />}
      emptyIcon={<FavoriteBorder fontSize="inherit" />}
      helperText="Use corações em vez de estrelas"
    />
  );
}
```

### 8. Sistema de NPS (Net Promoter Score)

```tsx
function NPSRating() {
  const { control, watch } = useForm({
    defaultValues: {
      npsScore: 0,
    },
  });

  const npsScore = watch("npsScore");

  const getNPSCategory = (score) => {
    if (score >= 9) return { label: "Promotor", color: "#4caf50" };
    if (score >= 7) return { label: "Neutro", color: "#ff9800" };
    return { label: "Detrator", color: "#f44336" };
  };

  const category = getNPSCategory(npsScore);

  return (
    <div>
      <RhfRating
        name="npsScore"
        control={control}
        label="Recomendaria nossa empresa para um amigo ou colega?"
        max={10}
        precision={1}
        size="large"
        helperText="0 = Muito improvável, 10 = Muito provável"
      />

      {npsScore > 0 && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.5rem",
            backgroundColor: category.color + "20",
            borderLeft: `4px solid ${category.color}`,
            borderRadius: "4px",
          }}
        >
          <strong style={{ color: category.color }}>{category.label}</strong>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.875rem" }}>
            {npsScore >= 9 &&
              "Obrigado! Adoramos saber que você nos recomendaria!"}
            {npsScore >= 7 &&
              npsScore < 9 &&
              "Obrigado pelo feedback! Como podemos melhorar?"}
            {npsScore < 7 &&
              "Sentimos muito. O que podemos fazer para melhorar sua experiência?"}
          </p>
        </div>
      )}
    </div>
  );
}
```

## Casos de Uso Comuns

### 1. Sistema de Avaliação de E-commerce

Perfeito para permitir que clientes avaliem produtos comprados, com suporte a diferentes critérios de avaliação.

```tsx
function ProductRatingSystem() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      overall: 0,
      quality: 0,
      shipping: 0,
      value: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(submitReview)}>
      <RhfRating
        name="overall"
        control={control}
        label="Avaliação Geral"
        max={5}
        precision={0.5}
      />
      <RhfRating
        name="quality"
        control={control}
        label="Qualidade"
        max={5}
        precision={0.5}
      />
      <RhfRating
        name="shipping"
        control={control}
        label="Entrega"
        max={5}
        precision={0.5}
      />
      <RhfRating
        name="value"
        control={control}
        label="Custo-benefício"
        max={5}
        precision={0.5}
      />
    </form>
  );
}
```

### 2. Feedback de Atendimento

Ideal para avaliar qualidade do suporte técnico ou atendimento ao cliente.

```tsx
function SupportFeedback() {
  return (
    <RhfRating
      name="supportRating"
      control={control}
      label="Como foi o atendimento?"
      max={5}
      precision={1}
      size="large"
      helperText="Sua opinião nos ajuda a melhorar"
    />
  );
}
```

### 3. Avaliação de Cursos/Treinamentos

Excelente para plataformas educacionais coletarem feedback sobre conteúdo.

```tsx
function CourseEvaluation() {
  return (
    <div>
      <RhfRating
        name="content"
        control={control}
        label="Qualidade do Conteúdo"
        max={5}
        precision={0.5}
      />
      <RhfRating
        name="instructor"
        control={control}
        label="Instrutor"
        max={5}
        precision={0.5}
      />
      <RhfRating
        name="difficulty"
        control={control}
        label="Nível de Dificuldade"
        max={5}
        precision={1}
      />
    </div>
  );
}
```

### 4. Pesquisas de Satisfação

Para medir satisfação geral com serviços ou produtos.

```tsx
function SatisfactionSurvey() {
  return (
    <RhfRating
      name="satisfaction"
      control={control}
      label="Qual seu nível de satisfação?"
      max={10}
      precision={1}
      size="large"
      helperText="1 = Muito insatisfeito, 10 = Muito satisfeito"
    />
  );
}
```

## Integração com APIs

### Salvando Avaliações

```tsx
import { useMutation } from "@tanstack/react-query";

function RatingWithAPI() {
  const { control, handleSubmit } = useForm();

  const submitRating = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: 123,
          rating: data.rating,
          userId: getCurrentUser().id,
        }),
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Avaliação salva com sucesso!");
    },
  });

  const onSubmit = (data) => {
    submitRating.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfRating
        name="rating"
        control={control}
        label="Avalie este produto"
        max={5}
        precision={0.5}
        disabled={submitRating.isLoading}
      />
      <button type="submit" disabled={submitRating.isLoading}>
        {submitRating.isLoading ? "Salvando..." : "Salvar Avaliação"}
      </button>
    </form>
  );
}
```

### Carregando Avaliação Existente

```tsx
function EditRating({ ratingId }) {
  const { data: existingRating, isLoading } = useQuery({
    queryKey: ["rating", ratingId],
    queryFn: () => fetchRating(ratingId),
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      rating: 0,
    },
  });

  useEffect(() => {
    if (existingRating) {
      reset({
        rating: existingRating.rating,
      });
    }
  }, [existingRating, reset]);

  if (isLoading) {
    return <div>Carregando avaliação...</div>;
  }

  return (
    <RhfRating
      name="rating"
      control={control}
      label="Editar sua avaliação"
      max={5}
      precision={0.5}
    />
  );
}
```

## Acessibilidade

O componente `RhfRating` oferece excelente suporte à acessibilidade:

### Recursos de Acessibilidade

- ✅ **Navegação por teclado** - Use Tab para focar e setas para navegar
- ✅ **Leitores de tela** - Anúncio correto do valor e máximo
- ✅ **Contraste adequado** - Cores seguem diretrizes WCAG
- ✅ **Estados visuais claros** - Foco, hover e seleção bem definidos

### Implementação Acessível

```tsx
function AccessibleRating() {
  return (
    <RhfRating
      name="rating"
      control={control}
      label="Avaliação do produto"
      max={5}
      precision={1}
      helperText="Use as setas do teclado para navegar entre as estrelas"
      aria-describedby="rating-description"
    />
  );
}
```

### Dicas de Acessibilidade

1. **Sempre forneça um label** - Para identificação clara do campo
2. **Use helperText descritivo** - Explique como usar o componente
3. **Considere usuários de teclado** - Teste navegação sem mouse
4. **Forneça feedback adequado** - Confirme seleções e erros

## Performance

### Otimizações Implementadas

- ✅ **React.memo** - Evita re-renders desnecessários
- ✅ **useController otimizado** - Integração eficiente com RHF
- ✅ **Lazy loading** - Componente carregado apenas quando necessário

### Boas Práticas de Performance

```tsx
// ✅ Bom - Valor padrão estável
const defaultValues = useMemo(
  () => ({
    rating: 0,
  }),
  []
);

// ✅ Bom - Callback estável
const handleRatingSubmit = useCallback(
  (data) => {
    submitRating(data);
  },
  [submitRating]
);

// ❌ Evitar - Objeto criado a cada render
const { control } = useForm({
  defaultValues: { rating: 0 }, // Criado a cada render
});
```

## Troubleshooting

### Problemas Comuns

#### 1. **Avaliação não atualiza visualmente**

```tsx
// ❌ Problema: defaultValue fixo
<RhfRating defaultValue={3} />;

// ✅ Solução: Use o controle do formulário
const { control } = useForm({
  defaultValues: { rating: 3 },
});
<RhfRating name="rating" control={control} />;
```

#### 2. **Valor null/undefined causa erro**

```tsx
// ❌ Problema: Valor inicial inadequado
defaultValues: {
  rating: null;
}

// ✅ Solução: Use 0 como valor inicial
defaultValues: {
  rating: 0;
}
```

#### 3. **Meias estrelas não funcionam**

```tsx
// ❌ Problema: Precisão incorreta
<RhfRating precision={1} />

// ✅ Solução: Use precision={0.5}
<RhfRating precision={0.5} />
```

#### 4. **Validação não dispara**

```tsx
// ❌ Problema: Validação ausente
const schema = yup.object({
  // rating não definido
});

// ✅ Solução: Adicione validação adequada
const schema = yup.object({
  rating: yup.number().min(1, "Avaliação obrigatória"),
});
```

#### 5. **Performance ruim com muitas avaliações**

```tsx
// ❌ Problema: Re-renders excessivos
{
  ratings.map((rating) => <RhfRating key={rating.id} {...rating} />);
}

// ✅ Solução: Memoize os componentes
const MemoizedRating = memo(RhfRating);
{
  ratings.map((rating) => <MemoizedRating key={rating.id} {...rating} />);
}
```

### Debug e Monitoramento

```tsx
// Adicione logs para debug
const { control, watch } = useForm({
  defaultValues: { rating: 0 },
});

const currentRating = watch("rating");

useEffect(() => {
  console.log("Rating atual:", currentRating);
}, [currentRating]);

// Monitore mudanças de valor
const handleRatingChange = (value) => {
  console.log("Rating alterado para:", value);
  // Sua lógica aqui
};
```

### Validação de Props

```tsx
// Valide props em desenvolvimento
if (process.env.NODE_ENV === "development") {
  if (max < 1) {
    console.warn("RhfRating: max deve ser pelo menos 1");
  }
  if (precision !== 0.5 && precision !== 1) {
    console.warn("RhfRating: precision deve ser 0.5 ou 1");
  }
}
```

## Conclusão

O `RhfRating` é um componente versátil e poderoso para capturar avaliações de usuários. Sua integração nativa com React Hook Form, combinada com a flexibilidade do Material-UI Rating, oferece uma solução completa para sistemas de avaliação em aplicações React.

### Quando Usar

- ✅ Sistemas de avaliação de produtos/serviços
- ✅ Feedback de usuários
- ✅ Pesquisas de satisfação
- ✅ Formulários de review
- ✅ Sistemas de NPS

### Vantagens Principais

- 🎯 **Fácil implementação** - Poucos props necessários
- 🔧 **Altamente configurável** - Muitas opções de customização
- ✅ **Validação automática** - Integração com React Hook Form
- ♿ **Acessível por padrão** - Suporte completo a acessibilidade
- 🎨 **Visualmente atrativo** - Interface familiar e intuitiva

Use o `RhfRating` sempre que precisar coletar feedback quantitativo dos usuários de forma rápida e intuitiva!
