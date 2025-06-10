# RhfRadioGroup

Componente de grupo de radio buttons integrado com React Hook Form, permitindo seleção única em uma lista de opções mutuamente exclusivas.

## Interface TypeScript

```typescript
type RhfRadioGroupOption = BaseOption;

interface RhfRadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Array of radio options */
  options: RhfRadioGroupOption[];
}

// Herda todas as propriedades do Material-UI RadioGroup
type FullProps = RadioGroupProps & RhfRadioGroupProps;
```

## Uso Básico

### Exemplo Simples

```tsx
import { useForm } from "react-hook-form";
import { RhfRadioGroup } from "@hox/capy";

interface FormData {
  gender: string;
}

function GenderForm() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      gender: "",
    },
  });

  const genderOptions = [
    { label: "Masculino", value: "male" },
    { label: "Feminino", value: "female" },
    { label: "Não informar", value: "not_specified" },
  ];

  const onSubmit = (data: FormData) => {
    console.log("Gênero selecionado:", data.gender);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfRadioGroup
        name="gender"
        control={control}
        label="Gênero"
        options={genderOptions}
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
```

### Layout Horizontal

```tsx
function HorizontalRadioGroup() {
  const { control } = useForm<{ priority: string }>();

  return (
    <RhfRadioGroup
      name="priority"
      control={control}
      label="Prioridade"
      options={[
        { label: "Baixa", value: "low" },
        { label: "Média", value: "medium" },
        { label: "Alta", value: "high" },
      ]}
      row // Layout horizontal
    />
  );
}
```

## Exemplos Avançados

### 1. Formulário de Configuração de Conta

```tsx
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Typography, Button, Paper, Alert } from "@mui/material";

interface AccountSettings {
  accountType: string;
  notificationFrequency: string;
  privacyLevel: string;
  subscriptionPlan: string;
}

const schema = yup.object({
  accountType: yup.string().required("Selecione o tipo de conta"),
  notificationFrequency: yup
    .string()
    .required("Selecione a frequência de notificações"),
  privacyLevel: yup.string().required("Selecione o nível de privacidade"),
  subscriptionPlan: yup.string().required("Selecione um plano"),
});

function AccountSettingsForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSettings>({
    resolver: yupResolver(schema),
    defaultValues: {
      accountType: "",
      notificationFrequency: "",
      privacyLevel: "",
      subscriptionPlan: "",
    },
  });

  const watchedValues = useWatch({ control });
  const isPremiumAccount = watchedValues.accountType === "premium";

  const accountTypeOptions = [
    {
      label: "Básica - Gratuita",
      value: "basic",
      description: "Acesso limitado aos recursos essenciais",
    },
    {
      label: "Premium - R$ 29/mês",
      value: "premium",
      description: "Acesso completo a todos os recursos",
    },
    {
      label: "Enterprise - Sob consulta",
      value: "enterprise",
      description: "Solução customizada para empresas",
    },
  ];

  const notificationOptions = [
    { label: "Imediata", value: "immediate" },
    { label: "Diária", value: "daily" },
    { label: "Semanal", value: "weekly" },
    { label: "Nunca", value: "never" },
  ];

  const privacyOptions = [
    {
      label: "Público",
      value: "public",
      description: "Perfil visível para todos",
    },
    {
      label: "Restrito",
      value: "restricted",
      description: "Visível apenas para conexões",
    },
    {
      label: "Privado",
      value: "private",
      description: "Perfil completamente privado",
    },
  ];

  const subscriptionPlans = isPremiumAccount
    ? [
        { label: "Mensal - R$ 29", value: "monthly" },
        { label: "Anual - R$ 290 (economia de 17%)", value: "yearly" },
        { label: "Vitalício - R$ 999", value: "lifetime" },
      ]
    : [{ label: "Plano Básico Gratuito", value: "free" }];

  const onSubmit = (data: AccountSettings) => {
    console.log("Configurações da conta:", data);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        Configurações da Conta
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 4 }}>
          <RhfRadioGroup
            name="accountType"
            control={control}
            label="Tipo de Conta"
            options={accountTypeOptions}
            error={errors.accountType}
          />

          {isPremiumAccount && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Conta premium selecionada! Você terá acesso a recursos exclusivos.
            </Alert>
          )}
        </Box>

        <Box sx={{ mb: 4 }}>
          <RhfRadioGroup
            name="notificationFrequency"
            control={control}
            label="Frequência de Notificações"
            options={notificationOptions}
            error={errors.notificationFrequency}
            row
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <RhfRadioGroup
            name="privacyLevel"
            control={control}
            label="Nível de Privacidade"
            options={privacyOptions}
            error={errors.privacyLevel}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <RhfRadioGroup
            name="subscriptionPlan"
            control={control}
            label="Plano de Assinatura"
            options={subscriptionPlans}
            error={errors.subscriptionPlan}
            disabled={!watchedValues.accountType}
          />
        </Box>

        <Button type="submit" variant="contained" size="large" fullWidth>
          Salvar Configurações
        </Button>
      </form>
    </Paper>
  );
}
```

### 2. Sistema de Avaliação e Feedback

```tsx
interface FeedbackForm {
  rating: string;
  experience: string;
  recommendation: string;
  contactMethod: string;
}

function CustomerFeedbackForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FeedbackForm>({
    defaultValues: {
      rating: "",
      experience: "",
      recommendation: "",
      contactMethod: "",
    },
  });

  const rating = watch("rating");
  const recommendation = watch("recommendation");

  const ratingOptions = [
    { label: "⭐ Muito Ruim", value: "1" },
    { label: "⭐⭐ Ruim", value: "2" },
    { label: "⭐⭐⭐ Regular", value: "3" },
    { label: "⭐⭐⭐⭐ Bom", value: "4" },
    { label: "⭐⭐⭐⭐⭐ Excelente", value: "5" },
  ];

  const experienceOptions = [
    { label: "Primeira vez usando", value: "first_time" },
    { label: "Uso ocasional", value: "occasional" },
    { label: "Uso regular", value: "regular" },
    { label: "Uso diário", value: "daily" },
  ];

  const recommendationOptions = [
    { label: "Definitivamente sim", value: "definitely" },
    { label: "Provavelmente sim", value: "probably" },
    { label: "Talvez", value: "maybe" },
    { label: "Provavelmente não", value: "probably_not" },
    { label: "Definitivamente não", value: "definitely_not" },
  ];

  const contactMethodOptions = [
    { label: "Email", value: "email" },
    { label: "Telefone", value: "phone" },
    { label: "WhatsApp", value: "whatsapp" },
    { label: "Não desejo ser contatado", value: "no_contact" },
  ];

  // Determinar cor baseada na avaliação
  const getRatingColor = (rating: string) => {
    const ratingNum = parseInt(rating);
    if (ratingNum <= 2) return "error";
    if (ratingNum === 3) return "warning";
    return "success";
  };

  const onSubmit = (data: FeedbackForm) => {
    console.log("Feedback enviado:", data);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 700 }}>
      <Typography variant="h5" gutterBottom>
        Avaliação do Produto
      </Typography>

      <Typography variant="body2" color="text.secondary" paragraph>
        Sua opinião é muito importante para nós. Por favor, avalie nossa
        experiência.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 4 }}>
          <RhfRadioGroup
            name="rating"
            control={control}
            label="Como você avalia nosso produto?"
            options={ratingOptions}
            error={errors.rating}
          />

          {rating && (
            <Alert severity={getRatingColor(rating) as any} sx={{ mt: 2 }}>
              {parseInt(rating) >= 4
                ? "Obrigado pela avaliação positiva!"
                : "Lamentamos que sua experiência não tenha sido ideal. Vamos melhorar!"}
            </Alert>
          )}
        </Box>

        <Box sx={{ mb: 4 }}>
          <RhfRadioGroup
            name="experience"
            control={control}
            label="Qual sua experiência com nosso produto?"
            options={experienceOptions}
            error={errors.experience}
            row
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <RhfRadioGroup
            name="recommendation"
            control={control}
            label="Você recomendaria nosso produto para um amigo?"
            options={recommendationOptions}
            error={errors.recommendation}
          />

          {recommendation === "definitely" && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Excelente! Que tal participar do nosso programa de indicações?
            </Alert>
          )}
        </Box>

        <Box sx={{ mb: 4 }}>
          <RhfRadioGroup
            name="contactMethod"
            control={control}
            label="Como prefere ser contatado para acompanhamento?"
            options={contactMethodOptions}
            error={errors.contactMethod}
            row
          />
        </Box>

        <Button type="submit" variant="contained" size="large" fullWidth>
          Enviar Avaliação
        </Button>
      </form>
    </Paper>
  );
}
```

### 3. Configurador de Produto Dinâmico

```tsx
interface ProductConfiguration {
  size: string;
  color: string;
  material: string;
  warranty: string;
}

function ProductConfigurator() {
  const { control, watch, handleSubmit, setValue } =
    useForm<ProductConfiguration>({
      defaultValues: {
        size: "",
        color: "",
        material: "",
        warranty: "",
      },
    });

  const selectedOptions = watch();

  // Configurações baseadas na seleção
  const sizeOptions = [
    { label: "P - Pequeno", value: "small", price: 0 },
    { label: "M - Médio", value: "medium", price: 50 },
    { label: "G - Grande", value: "large", price: 100 },
    { label: "GG - Extra Grande", value: "xlarge", price: 150 },
  ];

  // Cores disponíveis baseadas no tamanho
  const getColorOptions = (size: string) => {
    const baseColors = [
      { label: "Preto", value: "black", price: 0 },
      { label: "Branco", value: "white", price: 0 },
      { label: "Azul", value: "blue", price: 25 },
    ];

    if (size === "xlarge") {
      return [
        ...baseColors,
        { label: "Vermelho Premium", value: "red", price: 75 },
        { label: "Dourado Especial", value: "gold", price: 100 },
      ];
    }

    return baseColors;
  };

  // Materiais baseados no tamanho selecionado
  const getMaterialOptions = (size: string) => {
    const options = [
      { label: "Padrão", value: "standard", price: 0 },
      { label: "Premium", value: "premium", price: 200 },
    ];

    if (["large", "xlarge"].includes(size)) {
      options.push({ label: "Deluxe", value: "deluxe", price: 500 });
    }

    return options;
  };

  const warrantyOptions = [
    { label: "1 ano (incluído)", value: "1year", price: 0 },
    { label: "2 anos (+R$ 100)", value: "2years", price: 100 },
    { label: "3 anos (+R$ 180)", value: "3years", price: 180 },
    { label: "Vitalícia (+R$ 500)", value: "lifetime", price: 500 },
  ];

  // Calcular preço total
  const calculatePrice = () => {
    let total = 299; // Preço base

    const size = sizeOptions.find((s) => s.value === selectedOptions.size);
    if (size) total += size.price;

    const color = getColorOptions(selectedOptions.size).find(
      (c) => c.value === selectedOptions.color
    );
    if (color) total += color.price;

    const material = getMaterialOptions(selectedOptions.size).find(
      (m) => m.value === selectedOptions.material
    );
    if (material) total += material.price;

    const warranty = warrantyOptions.find(
      (w) => w.value === selectedOptions.warranty
    );
    if (warranty) total += warranty.price;

    return total;
  };

  // Resetar seleções dependentes quando tamanho muda
  useEffect(() => {
    if (selectedOptions.size) {
      const availableColors = getColorOptions(selectedOptions.size);
      const availableMaterials = getMaterialOptions(selectedOptions.size);

      // Se cor selecionada não está disponível para o novo tamanho
      if (
        selectedOptions.color &&
        !availableColors.some((c) => c.value === selectedOptions.color)
      ) {
        setValue("color", "");
      }

      // Se material selecionado não está disponível
      if (
        selectedOptions.material &&
        !availableMaterials.some((m) => m.value === selectedOptions.material)
      ) {
        setValue("material", "");
      }
    }
  }, [selectedOptions.size, setValue]);

  const totalPrice = calculatePrice();
  const canProceed =
    selectedOptions.size &&
    selectedOptions.color &&
    selectedOptions.material &&
    selectedOptions.warranty;

  const onSubmit = (data: ProductConfiguration) => {
    console.log("Configuração do produto:", data);
    console.log("Preço total:", totalPrice);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800 }}>
      <Typography variant="h5" gutterBottom>
        Configure Seu Produto
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <RhfRadioGroup
                name="size"
                control={control}
                label="Tamanho"
                options={sizeOptions.map((option) => ({
                  ...option,
                  label: `${option.label}${
                    option.price > 0 ? ` (+R$ ${option.price})` : ""
                  }`,
                }))}
              />
            </Box>

            {selectedOptions.size && (
              <Box sx={{ mb: 4 }}>
                <RhfRadioGroup
                  name="color"
                  control={control}
                  label="Cor"
                  options={getColorOptions(selectedOptions.size).map(
                    (option) => ({
                      ...option,
                      label: `${option.label}${
                        option.price > 0 ? ` (+R$ ${option.price})` : ""
                      }`,
                    })
                  )}
                  row
                />
              </Box>
            )}

            {selectedOptions.size && (
              <Box sx={{ mb: 4 }}>
                <RhfRadioGroup
                  name="material"
                  control={control}
                  label="Material"
                  options={getMaterialOptions(selectedOptions.size).map(
                    (option) => ({
                      ...option,
                      label: `${option.label}${
                        option.price > 0 ? ` (+R$ ${option.price})` : ""
                      }`,
                    })
                  )}
                />
              </Box>
            )}

            <Box sx={{ mb: 4 }}>
              <RhfRadioGroup
                name="warranty"
                control={control}
                label="Garantia"
                options={warrantyOptions.map((option) => ({
                  ...option,
                  label: `${option.label}${
                    option.price > 0 ? ` (+R$ ${option.price})` : ""
                  }`,
                }))}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              variant="outlined"
              sx={{ p: 3, position: "sticky", top: 20 }}
            >
              <Typography variant="h6" gutterBottom>
                Resumo do Pedido
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Preço base: R$ 299,00</Typography>
                {selectedOptions.size && (
                  <Typography variant="body2">
                    Tamanho:{" "}
                    {
                      sizeOptions.find((s) => s.value === selectedOptions.size)
                        ?.label
                    }
                  </Typography>
                )}
                {selectedOptions.color && (
                  <Typography variant="body2">
                    Cor:{" "}
                    {
                      getColorOptions(selectedOptions.size).find(
                        (c) => c.value === selectedOptions.color
                      )?.label
                    }
                  </Typography>
                )}
                {selectedOptions.material && (
                  <Typography variant="body2">
                    Material:{" "}
                    {
                      getMaterialOptions(selectedOptions.size).find(
                        (m) => m.value === selectedOptions.material
                      )?.label
                    }
                  </Typography>
                )}
                {selectedOptions.warranty && (
                  <Typography variant="body2">
                    Garantia:{" "}
                    {
                      warrantyOptions.find(
                        (w) => w.value === selectedOptions.warranty
                      )?.label
                    }
                  </Typography>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" color="primary">
                Total: R$ {totalPrice.toFixed(2)}
              </Typography>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!canProceed}
                sx={{ mt: 2 }}
              >
                Adicionar ao Carrinho
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
```

### 4. Formulário de Pesquisa Condicionada

```tsx
interface SurveyForm {
  hasUsedBefore: string;
  experienceLevel: string;
  primaryUse: string;
  satisfactionLevel: string;
  improvementArea: string;
}

function ConditionalSurveyForm() {
  const { control, watch, handleSubmit } = useForm<SurveyForm>();
  const watchedValues = watch();

  const hasUsedBeforeOptions = [
    { label: "Sim, já usei antes", value: "yes" },
    { label: "Não, primeira vez", value: "no" },
  ];

  const experienceLevelOptions = [
    { label: "Iniciante", value: "beginner" },
    { label: "Intermediário", value: "intermediate" },
    { label: "Avançado", value: "advanced" },
    { label: "Especialista", value: "expert" },
  ];

  const primaryUseOptions =
    watchedValues.experienceLevel === "beginner"
      ? [
          { label: "Aprendizado pessoal", value: "personal_learning" },
          { label: "Projeto escolar", value: "school_project" },
          { label: "Hobby", value: "hobby" },
        ]
      : [
          { label: "Trabalho profissional", value: "professional" },
          { label: "Projetos pessoais", value: "personal_projects" },
          { label: "Freelancing", value: "freelancing" },
          { label: "Ensino/Mentoria", value: "teaching" },
        ];

  const satisfactionOptions = [
    { label: "Muito insatisfeito", value: "very_dissatisfied" },
    { label: "Insatisfeito", value: "dissatisfied" },
    { label: "Neutro", value: "neutral" },
    { label: "Satisfeito", value: "satisfied" },
    { label: "Muito satisfeito", value: "very_satisfied" },
  ];

  const getImprovementOptions = () => {
    const satisfaction = watchedValues.satisfactionLevel;
    if (["very_dissatisfied", "dissatisfied"].includes(satisfaction)) {
      return [
        { label: "Interface do usuário", value: "ui" },
        { label: "Performance", value: "performance" },
        { label: "Funcionalidades", value: "features" },
        { label: "Documentação", value: "documentation" },
        { label: "Suporte ao cliente", value: "support" },
      ];
    }
    return [
      { label: "Mais funcionalidades", value: "more_features" },
      { label: "Melhor integração", value: "integration" },
      { label: "Tutoriais avançados", value: "tutorials" },
      { label: "Comunidade maior", value: "community" },
    ];
  };

  const onSubmit = (data: SurveyForm) => {
    console.log("Pesquisa enviada:", data);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Pesquisa de Experiência do Usuário
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 4 }}>
          <RhfRadioGroup
            name="hasUsedBefore"
            control={control}
            label="Você já usou nossa plataforma antes?"
            options={hasUsedBeforeOptions}
          />
        </Box>

        {watchedValues.hasUsedBefore === "yes" && (
          <Box sx={{ mb: 4 }}>
            <RhfRadioGroup
              name="experienceLevel"
              control={control}
              label="Qual seu nível de experiência?"
              options={experienceLevelOptions}
              row
            />
          </Box>
        )}

        {watchedValues.experienceLevel && (
          <Box sx={{ mb: 4 }}>
            <RhfRadioGroup
              name="primaryUse"
              control={control}
              label="Qual o principal uso da plataforma?"
              options={primaryUseOptions}
            />
          </Box>
        )}

        {watchedValues.hasUsedBefore === "yes" && (
          <Box sx={{ mb: 4 }}>
            <RhfRadioGroup
              name="satisfactionLevel"
              control={control}
              label="Qual seu nível de satisfação?"
              options={satisfactionOptions}
            />
          </Box>
        )}

        {watchedValues.satisfactionLevel && (
          <Box sx={{ mb: 4 }}>
            <RhfRadioGroup
              name="improvementArea"
              control={control}
              label="O que podemos melhorar?"
              options={getImprovementOptions()}
            />
          </Box>
        )}

        <Button type="submit" variant="contained" fullWidth>
          Enviar Pesquisa
        </Button>
      </form>
    </Paper>
  );
}
```

## Validação

### Validação com Yup

```tsx
import * as yup from "yup";

const schema = yup.object({
  priority: yup
    .string()
    .required("Selecione uma prioridade")
    .oneOf(["low", "medium", "high"], "Prioridade inválida"),

  category: yup
    .string()
    .required("Selecione uma categoria")
    .when("priority", {
      is: "high",
      then: (schema) =>
        schema.oneOf(
          ["urgent", "critical"],
          "Para prioridade alta, selecione urgente ou crítico"
        ),
      otherwise: (schema) => schema,
    }),
});
```

### Validação Condicional

```tsx
function ConditionalValidationForm() {
  const { control, handleSubmit, watch, setError, clearErrors } = useForm();
  const selectedPlan = watch("subscriptionPlan");

  const validatePlan = (plan: string) => {
    clearErrors("subscriptionPlan");

    if (!plan) {
      setError("subscriptionPlan", {
        message: "Selecione um plano",
      });
      return false;
    }

    // Validação específica baseada no plano
    if (plan === "enterprise" && !validateEnterpriseRequirements()) {
      setError("subscriptionPlan", {
        message: "Plano Enterprise requer validação adicional",
      });
      return false;
    }

    return true;
  };

  return (
    <RhfRadioGroup
      name="subscriptionPlan"
      control={control}
      label="Plano de Assinatura"
      options={planOptions}
      onChange={(value) => validatePlan(value)}
    />
  );
}
```

## Acessibilidade

O componente RhfRadioGroup implementa recursos completos de acessibilidade:

### Recursos de Acessibilidade

- **Navegação por teclado**: Use `Tab` para navegar e `Arrow keys` para selecionar opções
- **Screen readers**: Labels e estados são anunciados adequadamente
- **Grupos semânticos**: Utiliza `role="radiogroup"` para agrupar radio buttons
- **Foco visual**: Indicadores claros de foco para navegação por teclado

### Exemplo com Acessibilidade Aprimorada

```tsx
function AccessibleRadioGroup() {
  const { control } = useForm();

  return (
    <Box>
      <Typography
        variant="h6"
        component="h2"
        id="delivery-options-heading"
        gutterBottom
      >
        Opções de Entrega
      </Typography>

      <RhfRadioGroup
        name="deliveryOption"
        control={control}
        label="Escolha a forma de entrega"
        options={[
          {
            label: "Entrega padrão (5-7 dias úteis)",
            value: "standard",
            "aria-describedby": "standard-desc",
          },
          {
            label: "Entrega expressa (2-3 dias úteis)",
            value: "express",
            "aria-describedby": "express-desc",
          },
          {
            label: "Retirada na loja",
            value: "pickup",
            "aria-describedby": "pickup-desc",
          },
        ]}
        aria-labelledby="delivery-options-heading"
      />

      {/* Descrições detalhadas para screen readers */}
      <Box sx={{ display: "none" }}>
        <div id="standard-desc">Entrega gratuita entre 5 a 7 dias úteis</div>
        <div id="express-desc">Entrega rápida com custo adicional de R$ 15</div>
        <div id="pickup-desc">Retire gratuitamente em uma de nossas lojas</div>
      </Box>
    </Box>
  );
}
```

## Otimização de Performance

### Memoização de Opções Complexas

```tsx
import { useMemo } from "react";

function OptimizedRadioGroup() {
  const { control } = useForm();

  // Memoizar opções que requerem processamento pesado
  const complexOptions = useMemo(() => {
    return generateExpensiveOptions(); // Função custosa
  }, []); // Executar apenas uma vez

  return (
    <RhfRadioGroup
      name="complexOption"
      control={control}
      label="Opções Complexas"
      options={complexOptions}
    />
  );
}
```

### Lazy Loading de Opções

```tsx
function LazyLoadRadioGroup() {
  const [options, setOptions] = useState<RhfRadioGroupOption[]>([]);
  const [loading, setLoading] = useState(false);
  const { control } = useForm();

  const loadOptions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/radio-options");
      const data = await response.json();
      setOptions(data.options);
    } catch (error) {
      console.error("Erro ao carregar opções:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <RhfRadioGroup
      name="lazyOptions"
      control={control}
      label="Opções Carregadas"
      options={options}
    />
  );
}
```

## Integração com APIs

### Sincronização Automática

```tsx
function AutoSyncRadioGroup() {
  const { control, watch } = useForm();
  const selectedValue = watch("preference");

  // Salvar automaticamente quando valor muda
  useEffect(() => {
    const savePreference = async () => {
      if (selectedValue) {
        try {
          await fetch("/api/user-preference", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ preference: selectedValue }),
          });
        } catch (error) {
          console.error("Erro ao salvar preferência:", error);
        }
      }
    };

    const timeoutId = setTimeout(savePreference, 500);
    return () => clearTimeout(timeoutId);
  }, [selectedValue]);

  return (
    <RhfRadioGroup
      name="preference"
      control={control}
      label="Sua Preferência"
      options={preferenceOptions}
      helperText="Sua seleção é salva automaticamente"
    />
  );
}
```

### Opções Baseadas em Context

```tsx
function ContextBasedRadioGroup() {
  const { userRole, permissions } = useAuth();
  const { control } = useForm();

  const getAvailableOptions = () => {
    const baseOptions = [{ label: "Opção Básica", value: "basic" }];

    if (permissions.includes("advanced")) {
      baseOptions.push({ label: "Opção Avançada", value: "advanced" });
    }

    if (userRole === "admin") {
      baseOptions.push({ label: "Opção Admin", value: "admin" });
    }

    return baseOptions;
  };

  return (
    <RhfRadioGroup
      name="accessLevel"
      control={control}
      label="Nível de Acesso"
      options={getAvailableOptions()}
    />
  );
}
```

## Solução de Problemas

### Problemas Comuns

#### 1. **Valor não é selecionado por padrão**

```tsx
// ❌ Problema: defaultValue como array
const { control } = useForm({
  defaultValues: {
    selection: [], // Array ao invés de string
  },
});

// ✅ Solução: defaultValue como string
const { control } = useForm({
  defaultValues: {
    selection: "option1", // String única
  },
});
```

#### 2. **Opções não atualizam dinamicamente**

```tsx
// ❌ Problema: Não reagir a mudanças de dependência
function BadDynamicOptions() {
  const options = generateOptions(someValue); // Não memoizado

  return <RhfRadioGroup options={options} />;
}

// ✅ Solução: Memoizar com dependências
function GoodDynamicOptions() {
  const options = useMemo(() => generateOptions(someValue), [someValue]);

  return <RhfRadioGroup options={options} />;
}
```

#### 3. **Validação não funciona com valores condicionais**

```tsx
// ❌ Problema: Schema estático
const schema = yup.object({
  option: yup.string().required(),
});

// ✅ Solução: Schema dinâmico
const createSchema = (conditionalValue: string) =>
  yup.object({
    option: yup
      .string()
      .required()
      .when([], {
        is: () => conditionalValue === "special",
        then: (schema) => schema.oneOf(["special1", "special2"]),
        otherwise: (schema) => schema,
      }),
  });
```

#### 4. **Performance ruim com muitas opções**

```tsx
// ❌ Problema: Renderização desnecessária
function SlowRadioGroup() {
  const options = expensiveOptions.map((opt) => ({
    ...opt,
    label: formatLabel(opt), // Executado a cada render
  }));

  return <RhfRadioGroup options={options} />;
}

// ✅ Solução: Memoização e formatação prévia
function FastRadioGroup() {
  const options = useMemo(
    () =>
      expensiveOptions.map((opt) => ({
        ...opt,
        label: formatLabel(opt),
      })),
    [expensiveOptions]
  );

  return <RhfRadioGroup options={options} />;
}
```

### Debugs Úteis

```tsx
function DebugRadioGroup() {
  const { control, watch, formState } = useForm();
  const currentValue = watch("debugOption");

  useEffect(() => {
    console.log("Valor atual:", currentValue);
    console.log("Erros:", formState.errors);
    console.log("Campo tocado:", formState.touchedFields.debugOption);
  }, [currentValue, formState]);

  return (
    <RhfRadioGroup
      name="debugOption"
      control={control}
      label="Debug Radio Group"
      options={[
        { label: "Opção 1", value: "option1" },
        { label: "Opção 2", value: "option2" },
      ]}
    />
  );
}
```

## Resumo

O componente `RhfRadioGroup` é perfeito para:

- ✅ **Seleções mutuamente exclusivas**
- ✅ **Configurações de preferência** do usuário
- ✅ **Avaliações e ratings** em formulários
- ✅ **Planos e opções de produto**
- ✅ **Pesquisas e questionários** condicionais
- ✅ **Configuradores de produto** dinâmicos

### Benefícios

- **Integração nativa** com React Hook Form
- **Validação robusta** com Yup ou customizada
- **Flexibilidade de layout** (vertical/horizontal)
- **Acessibilidade completa** seguindo padrões WCAG
- **Performance otimizada** com lazy loading
- **TypeScript** com tipagem completa
- **Suporte a opções condicionais** e dinâmicas
