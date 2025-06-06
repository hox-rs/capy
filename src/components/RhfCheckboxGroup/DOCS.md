# RhfCheckboxGroup

Componente de grupo de checkboxes integrado com React Hook Form, permitindo múltiplas seleções em uma lista de opções.

## Interface TypeScript

```typescript
interface RhfCheckboxGroupOption extends BaseOption {
  /** Value must be string for checkbox groups */
  value: string;
}

interface RhfCheckboxGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends BaseRhfFieldProps<TFieldValues, TName> {
  /** Array of checkbox options */
  options: RhfCheckboxGroupOption[];
  /** Display checkboxes in a row instead of column */
  row?: boolean;
}
```

## Uso Básico

### Exemplo Simples

```tsx
import { useForm } from "react-hook-form";
import { RhfCheckboxGroup } from "@hox/capy";

interface FormData {
  hobbies: string[];
}

function HobbyForm() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      hobbies: [],
    },
  });

  const hobbiesOptions = [
    { label: "Leitura", value: "reading" },
    { label: "Esportes", value: "sports" },
    { label: "Música", value: "music" },
    { label: "Culinária", value: "cooking" },
  ];

  const onSubmit = (data: FormData) => {
    console.log("Hobbies selecionados:", data.hobbies);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhfCheckboxGroup
        name="hobbies"
        control={control}
        label="Seus Hobbies"
        options={hobbiesOptions}
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
```

### Layout Horizontal

```tsx
function HorizontalCheckboxes() {
  const { control } = useForm<{ preferences: string[] }>();

  return (
    <RhfCheckboxGroup
      name="preferences"
      control={control}
      label="Preferências de Comunicação"
      options={[
        { label: "Email", value: "email" },
        { label: "SMS", value: "sms" },
        { label: "Push", value: "push" },
      ]}
      row // Layout horizontal
    />
  );
}
```

## Exemplos Avançados

### 1. Formulário de Permissões de Usuário

```tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Typography, Button, Paper } from "@mui/material";

interface UserPermissions {
  basicPermissions: string[];
  adminPermissions: string[];
  modules: string[];
}

const schema = yup.object({
  basicPermissions: yup
    .array()
    .of(yup.string().required())
    .min(1, "Selecione pelo menos uma permissão básica"),
  adminPermissions: yup.array().of(yup.string().required()),
  modules: yup
    .array()
    .of(yup.string().required())
    .min(2, "Selecione pelo menos 2 módulos"),
});

function UserPermissionsForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserPermissions>({
    resolver: yupResolver(schema),
    defaultValues: {
      basicPermissions: ["read"],
      adminPermissions: [],
      modules: [],
    },
  });

  const basicPermissions = watch("basicPermissions");
  const hasAdminPermission = basicPermissions.includes("admin");

  const basicOptions = [
    { label: "Visualizar", value: "read" },
    { label: "Criar", value: "create" },
    { label: "Editar", value: "edit" },
    { label: "Excluir", value: "delete" },
    { label: "Administrador", value: "admin" },
  ];

  const adminOptions = [
    { label: "Gerenciar Usuários", value: "manage_users" },
    { label: "Configurações do Sistema", value: "system_settings" },
    { label: "Logs de Auditoria", value: "audit_logs" },
    { label: "Backup/Restore", value: "backup_restore" },
  ];

  const moduleOptions = [
    { label: "Vendas", value: "sales" },
    { label: "Estoque", value: "inventory" },
    { label: "Financeiro", value: "finance" },
    { label: "Relatórios", value: "reports" },
    { label: "CRM", value: "crm" },
    { label: "RH", value: "hr" },
  ];

  const onSubmit = (data: UserPermissions) => {
    console.log("Permissões configuradas:", data);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Configuração de Permissões
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 3 }}>
          <RhfCheckboxGroup
            name="basicPermissions"
            control={control}
            label="Permissões Básicas"
            options={basicOptions}
            error={errors.basicPermissions}
          />
        </Box>

        {hasAdminPermission && (
          <Box sx={{ mb: 3 }}>
            <RhfCheckboxGroup
              name="adminPermissions"
              control={control}
              label="Permissões Administrativas"
              options={adminOptions}
              error={errors.adminPermissions}
            />
          </Box>
        )}

        <Box sx={{ mb: 3 }}>
          <RhfCheckboxGroup
            name="modules"
            control={control}
            label="Módulos Acessíveis"
            options={moduleOptions}
            row
            error={errors.modules}
          />
        </Box>

        <Button type="submit" variant="contained" fullWidth>
          Salvar Permissões
        </Button>
      </form>
    </Paper>
  );
}
```

### 2. Filtro Avançado de Produtos

```tsx
import { useForm, useWatch } from "react-hook-form";
import { useState, useMemo } from "react";

interface ProductFilters {
  categories: string[];
  brands: string[];
  features: string[];
  priceRanges: string[];
}

function ProductFilterForm() {
  const { control, reset, handleSubmit } = useForm<ProductFilters>({
    defaultValues: {
      categories: [],
      brands: [],
      features: [],
      priceRanges: [],
    },
  });

  // Watch para atualizar filtros em tempo real
  const filters = useWatch({ control });

  const categoryOptions = [
    { label: "Eletrônicos", value: "electronics" },
    { label: "Roupas", value: "clothing" },
    { label: "Casa e Jardim", value: "home_garden" },
    { label: "Esportes", value: "sports" },
    { label: "Livros", value: "books" },
  ];

  const brandOptions = [
    { label: "Samsung", value: "samsung" },
    { label: "Apple", value: "apple" },
    { label: "Nike", value: "nike" },
    { label: "Adidas", value: "adidas" },
    { label: "Sony", value: "sony" },
  ];

  const featureOptions = [
    { label: "Entrega Grátis", value: "free_shipping" },
    { label: "Garantia Estendida", value: "extended_warranty" },
    { label: "Produto Nacional", value: "national_product" },
    { label: "Eco-friendly", value: "eco_friendly" },
    { label: "Em Promoção", value: "on_sale" },
  ];

  const priceRangeOptions = [
    { label: "Até R$ 50", value: "under_50" },
    { label: "R$ 50 - R$ 100", value: "50_100" },
    { label: "R$ 100 - R$ 500", value: "100_500" },
    { label: "R$ 500 - R$ 1000", value: "500_1000" },
    { label: "Acima de R$ 1000", value: "over_1000" },
  ];

  // Contagem de filtros ativos
  const activeFiltersCount = useMemo(() => {
    return Object.values(filters).reduce((count, filterArray) => {
      return count + (filterArray?.length || 0);
    }, 0);
  }, [filters]);

  const handleClearAll = () => {
    reset({
      categories: [],
      brands: [],
      features: [],
      priceRanges: [],
    });
  };

  const onApplyFilters = (data: ProductFilters) => {
    console.log("Filtros aplicados:", data);
    // Aqui você faria a busca dos produtos
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">
          Filtros de Produtos
          {activeFiltersCount > 0 && (
            <Chip
              label={`${activeFiltersCount} filtros ativos`}
              size="small"
              sx={{ ml: 1 }}
            />
          )}
        </Typography>

        <Button
          onClick={handleClearAll}
          disabled={activeFiltersCount === 0}
          variant="outlined"
          size="small"
        >
          Limpar Filtros
        </Button>
      </Box>

      <form onSubmit={handleSubmit(onApplyFilters)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RhfCheckboxGroup
              name="categories"
              control={control}
              label="Categorias"
              options={categoryOptions}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <RhfCheckboxGroup
              name="brands"
              control={control}
              label="Marcas"
              options={brandOptions}
            />
          </Grid>

          <Grid item xs={12}>
            <RhfCheckboxGroup
              name="features"
              control={control}
              label="Características"
              options={featureOptions}
              row
            />
          </Grid>

          <Grid item xs={12}>
            <RhfCheckboxGroup
              name="priceRanges"
              control={control}
              label="Faixa de Preço"
              options={priceRangeOptions}
              row
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained">
            Aplicar Filtros
          </Button>
          <Button type="button" onClick={() => console.log(filters)}>
            Ver Filtros Atuais
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
```

### 3. Seleção de Serviços com Preços

```tsx
interface ServiceSelection {
  basicServices: string[];
  premiumServices: string[];
  addOns: string[];
}

function ServiceSelectionForm() {
  const { control, watch, handleSubmit } = useForm<ServiceSelection>({
    defaultValues: {
      basicServices: [],
      premiumServices: [],
      addOns: [],
    },
  });

  const selectedServices = watch();

  // Configuração de serviços com preços
  const serviceConfigs = {
    basic: [
      { label: "Limpeza Básica - R$ 50", value: "basic_cleaning", price: 50 },
      { label: "Manutenção - R$ 80", value: "maintenance", price: 80 },
      { label: "Consultoria - R$ 120", value: "consulting", price: 120 },
    ],
    premium: [
      {
        label: "Limpeza Completa - R$ 150",
        value: "complete_cleaning",
        price: 150,
      },
      { label: "Suporte 24h - R$ 200", value: "support_24h", price: 200 },
      {
        label: "Consultoria Premium - R$ 300",
        value: "premium_consulting",
        price: 300,
      },
    ],
    addOns: [
      { label: "Seguro - R$ 30", value: "insurance", price: 30 },
      {
        label: "Entrega Express - R$ 25",
        value: "express_delivery",
        price: 25,
      },
      {
        label: "Garantia Estendida - R$ 40",
        value: "extended_warranty",
        price: 40,
      },
    ],
  };

  // Cálculo do preço total
  const calculateTotal = () => {
    let total = 0;

    selectedServices.basicServices?.forEach((service) => {
      const config = serviceConfigs.basic.find((s) => s.value === service);
      if (config) total += config.price;
    });

    selectedServices.premiumServices?.forEach((service) => {
      const config = serviceConfigs.premium.find((s) => s.value === service);
      if (config) total += config.price;
    });

    selectedServices.addOns?.forEach((service) => {
      const config = serviceConfigs.addOns.find((s) => s.value === service);
      if (config) total += config.price;
    });

    return total;
  };

  const total = calculateTotal();

  const onSubmit = (data: ServiceSelection) => {
    console.log("Serviços selecionados:", data);
    console.log("Total:", total);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 700 }}>
      <Typography variant="h5" gutterBottom>
        Seleção de Serviços
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 3 }}>
          <RhfCheckboxGroup
            name="basicServices"
            control={control}
            label="Serviços Básicos"
            options={serviceConfigs.basic}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <RhfCheckboxGroup
            name="premiumServices"
            control={control}
            label="Serviços Premium"
            options={serviceConfigs.premium}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <RhfCheckboxGroup
            name="addOns"
            control={control}
            label="Serviços Adicionais"
            options={serviceConfigs.addOns}
            row
          />
        </Box>

        <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "primary.50" }}>
          <Typography variant="h6" color="primary">
            Total: R$ {total.toFixed(2)}
          </Typography>
        </Paper>

        <Button
          type="submit"
          variant="contained"
          disabled={total === 0}
          fullWidth
        >
          Contratar Serviços (R$ {total.toFixed(2)})
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
  interests: yup
    .array()
    .of(yup.string().required())
    .min(1, "Selecione pelo menos um interesse")
    .max(3, "Selecione no máximo 3 interesses"),

  skills: yup
    .array()
    .of(yup.string().required())
    .test(
      "required-skills",
      "JavaScript é obrigatório para desenvolvedores",
      function (value) {
        const { role } = this.parent;
        if (role === "developer") {
          return value?.includes("javascript") || false;
        }
        return true;
      }
    ),
});
```

### Validação Customizada

```tsx
function CustomValidationForm() {
  const { control, handleSubmit, setError, clearErrors } = useForm<{
    technologies: string[];
  }>();

  const validateTechnologies = (technologies: string[]) => {
    clearErrors("technologies");

    if (technologies.length === 0) {
      setError("technologies", {
        message: "Selecione pelo menos uma tecnologia",
      });
      return false;
    }

    if (
      technologies.includes("react") &&
      !technologies.includes("javascript")
    ) {
      setError("technologies", {
        message: "React requer conhecimento em JavaScript",
      });
      return false;
    }

    return true;
  };

  return (
    <RhfCheckboxGroup
      name="technologies"
      control={control}
      label="Tecnologias"
      options={[
        { label: "JavaScript", value: "javascript" },
        { label: "React", value: "react" },
        { label: "Vue.js", value: "vue" },
        { label: "Angular", value: "angular" },
      ]}
      onChange={(value) => validateTechnologies(value)}
    />
  );
}
```

## Acessibilidade

O componente RhfCheckboxGroup implementa as melhores práticas de acessibilidade:

### Recursos de Acessibilidade

- **Navegação por teclado**: Use `Tab` para navegar entre opções e `Space` para selecionar
- **Screen readers**: Labels e estados são anunciados corretamente
- **Grupos semânticos**: Utiliza `role="group"` para agrupar checkboxes relacionados
- **Estados de erro**: Erros são associados ao grupo via `aria-describedby`

### Exemplo com Acessibilidade Avançada

```tsx
function AccessibleCheckboxGroup() {
  const { control } = useForm();

  return (
    <Box>
      <Typography
        variant="h6"
        component="h2"
        id="preferences-heading"
        gutterBottom
      >
        Preferências de Acessibilidade
      </Typography>

      <RhfCheckboxGroup
        name="accessibility"
        control={control}
        label="Recursos de Acessibilidade"
        options={[
          {
            label: "Alto Contraste",
            value: "high_contrast",
            "aria-describedby": "high-contrast-desc",
          },
          {
            label: "Fonte Grande",
            value: "large_font",
            "aria-describedby": "large-font-desc",
          },
          {
            label: "Narração de Tela",
            value: "screen_reader",
            "aria-describedby": "screen-reader-desc",
          },
        ]}
        aria-labelledby="preferences-heading"
      />

      {/* Descrições detalhadas para screen readers */}
      <Box sx={{ display: "none" }}>
        <div id="high-contrast-desc">
          Aumenta o contraste das cores para melhor visibilidade
        </div>
        <div id="large-font-desc">
          Aumenta o tamanho da fonte em toda a aplicação
        </div>
        <div id="screen-reader-desc">
          Habilita narração automática do conteúdo da tela
        </div>
      </Box>
    </Box>
  );
}
```

## Otimização de Performance

### Memoização de Opções

```tsx
import { useMemo } from "react";

function OptimizedCheckboxGroup() {
  const { control } = useForm();

  // Memoizar opções para evitar re-renderizações desnecessárias
  const expensiveOptions = useMemo(() => {
    return generateComplexOptions(); // Função custosa
  }, []); // Array vazio = calcular apenas uma vez

  return (
    <RhfCheckboxGroup
      name="options"
      control={control}
      label="Opções"
      options={expensiveOptions}
    />
  );
}
```

### Debounce para Múltiplas Seleções

```tsx
import { useCallback } from "react";
import { debounce } from "lodash";

function DebounceCheckboxGroup() {
  const { control, watch } = useForm();

  // Debounce para chamadas de API
  const debouncedSearch = useCallback(
    debounce((selectedValues: string[]) => {
      // Fazer busca baseada nas seleções
      console.log("Buscando com filtros:", selectedValues);
    }, 300),
    []
  );

  const selectedValues = watch("filters");

  useEffect(() => {
    if (selectedValues?.length > 0) {
      debouncedSearch(selectedValues);
    }
  }, [selectedValues, debouncedSearch]);

  return (
    <RhfCheckboxGroup
      name="filters"
      control={control}
      label="Filtros"
      options={filterOptions}
    />
  );
}
```

## Integração com APIs

### Carregamento Dinâmico de Opções

```tsx
function DynamicOptionsCheckboxGroup() {
  const [options, setOptions] = useState<RhfCheckboxGroupOption[]>([]);
  const [loading, setLoading] = useState(true);
  const { control } = useForm();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/checkbox-options");
        const data = await response.json();
        setOptions(data.options);
      } catch (error) {
        console.error("Erro ao carregar opções:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <RhfCheckboxGroup
      name="dynamicOptions"
      control={control}
      label="Opções Dinâmicas"
      options={options}
    />
  );
}
```

### Sincronização com Backend

```tsx
function SyncCheckboxGroup() {
  const { control, watch } = useForm();
  const selectedValues = watch("preferences");

  // Salvar automaticamente as mudanças
  useEffect(() => {
    const savePreferences = async () => {
      if (selectedValues?.length > 0) {
        try {
          await fetch("/api/user-preferences", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ preferences: selectedValues }),
          });
        } catch (error) {
          console.error("Erro ao salvar preferências:", error);
        }
      }
    };

    const timeoutId = setTimeout(savePreferences, 1000);
    return () => clearTimeout(timeoutId);
  }, [selectedValues]);

  return (
    <RhfCheckboxGroup
      name="preferences"
      control={control}
      label="Suas Preferências"
      options={preferencesOptions}
      helperText="Suas seleções são salvas automaticamente"
    />
  );
}
```

## Solução de Problemas

### Problemas Comuns

#### 1. **Valores não são atualizados**

```tsx
// ❌ Problema: defaultValue incorreto para array
const { control } = useForm({
  defaultValues: {
    selections: "", // String vazia ao invés de array
  },
});

// ✅ Solução: Usar array vazio
const { control } = useForm({
  defaultValues: {
    selections: [], // Array vazio
  },
});
```

#### 2. **Performance lenta com muitas opções**

```tsx
// ❌ Problema: Recriando opções a cada render
function SlowComponent() {
  const options = generateManyOptions(); // Executado a cada render

  return <RhfCheckboxGroup options={options} />;
}

// ✅ Solução: Memoizar opções
function FastComponent() {
  const options = useMemo(() => generateManyOptions(), []);

  return <RhfCheckboxGroup options={options} />;
}
```

#### 3. **Validação não funciona**

```tsx
// ❌ Problema: Schema incorreto para array
const schema = yup.object({
  items: yup.string().required(), // String ao invés de array
});

// ✅ Solução: Schema correto para array
const schema = yup.object({
  items: yup.array().of(yup.string()).min(1, "Selecione pelo menos um item"),
});
```

#### 4. **Opções desabilitadas não funcionam**

```tsx
// ❌ Problema: Propriedade disabled incorreta
const options = [
  { label: "Opção 1", value: "1", isDisabled: true }, // Propriedade errada
];

// ✅ Solução: Propriedade disabled correta
const options = [
  { label: "Opção 1", value: "1", disabled: true }, // Propriedade correta
];
```

### Debugs Úteis

```tsx
function DebugCheckboxGroup() {
  const { control, watch, formState } = useForm();
  const watchedValues = watch();

  useEffect(() => {
    console.log("Valores atuais:", watchedValues);
    console.log("Erros:", formState.errors);
    console.log("Estado touched:", formState.touchedFields);
  }, [watchedValues, formState]);

  return (
    <RhfCheckboxGroup
      name="debug"
      control={control}
      label="Debug Component"
      options={[
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
      ]}
    />
  );
}
```

## Resumo

O componente `RhfCheckboxGroup` é ideal para:

- ✅ **Múltiplas seleções** em formulários
- ✅ **Filtros e configurações** complexas
- ✅ **Permissões e roles** de usuário
- ✅ **Seleção de produtos/serviços** com preços
- ✅ **Formulários de preferências** dinâmicas
- ✅ **Sistemas de tags** e categorização

### Benefícios

- **Integração nativa** com React Hook Form
- **Validação robusta** com Yup ou customizada
- **Flexibilidade de layout** (vertical/horizontal)
- **Acessibilidade completa** seguindo padrões WCAG
- **Performance otimizada** com memoização
- **TypeScript** com tipagem completa
