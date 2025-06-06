import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { RhfColorPicker } from "./index";
import { RhfColorPickerProps, ColorPreset } from "./RhfColorPicker.types";

// Custom presets for stories
const webSafeColors: ColorPreset[] = [
  { label: "White", value: "#ffffff", group: "Web Safe" },
  { label: "Black", value: "#000000", group: "Web Safe" },
  { label: "Red", value: "#ff0000", group: "Web Safe" },
  { label: "Green", value: "#008000", group: "Web Safe" },
  { label: "Blue", value: "#0000ff", group: "Web Safe" },
  { label: "Yellow", value: "#ffff00", group: "Web Safe" },
  { label: "Cyan", value: "#00ffff", group: "Web Safe" },
  { label: "Magenta", value: "#ff00ff", group: "Web Safe" },
];

const brandColors: ColorPreset[] = [
  { label: "Primary", value: "#1976d2", group: "Brand" },
  { label: "Secondary", value: "#dc004e", group: "Brand" },
  { label: "Success", value: "#2e7d32", group: "Brand" },
  { label: "Warning", value: "#ed6c02", group: "Brand" },
  { label: "Error", value: "#d32f2f", group: "Brand" },
  { label: "Info", value: "#0288d1", group: "Brand" },
];

// Type for story args (excludes control and name)
type StoryArgs = Omit<RhfColorPickerProps<any, any>, "control" | "name">;

interface WrapperProps extends StoryArgs {}

const Wrapper: React.FC<WrapperProps> = (args) => {
  const { control, watch } = useForm({
    defaultValues: {
      color: args.defaultValue || "",
    },
  });

  const currentValue = watch("color");

  return (
    <Box sx={{ p: 3, maxWidth: 400 }}>
      <RhfColorPicker {...args} control={control} name="color" />

      <Box sx={{ mt: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
        <strong>Current Value:</strong> {currentValue || "None"}
        {currentValue && (
          <Box
            sx={{
              width: 24,
              height: 24,
              backgroundColor: currentValue,
              border: "1px solid",
              borderColor: "grey.400",
              borderRadius: 0.5,
              display: "inline-block",
              ml: 1,
              verticalAlign: "middle",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

const meta: Meta<WrapperProps> = {
  title: "Form Components/RhfColorPicker",
  component: Wrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The RhfColorPicker component provides color selection functionality with preset colors and configurable output formats.

## Features
- Multiple color formats (HEX, RGB, HSL)
- Customizable color presets
- Input field with color preview
- Color picker popover
- Form validation support
- Different sizes and states
- Accessibility support

## Usage
\`\`\`tsx
<RhfColorPicker
  name="backgroundColor"
  control={control}
  label="Background Color"
  format="hex"
  showPresets={true}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    format: {
      control: "select",
      options: ["hex", "rgb", "hsl"],
      description: "Output format for the color value",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the color picker",
    },
    showAlpha: {
      control: "boolean",
      description: "Show alpha channel control",
    },
    showInput: {
      control: "boolean",
      description: "Show color input field",
    },
    showPresets: {
      control: "boolean",
      description: "Show preset colors",
    },
    disabled: {
      control: "boolean",
      description: "Disable the color picker",
    },
  },
};

export default meta;
type Story = StoryObj<WrapperProps>;

export const Default: Story = {
  args: {
    label: "Select Color",
    placeholder: "Choose a color...",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Background Color",
    defaultValue: "#1976d2",
    helperText: "Choose your preferred background color",
  },
};

export const RGBFormat: Story = {
  args: {
    label: "RGB Color",
    format: "rgb",
    defaultValue: "#ff5722",
    helperText: "Color value will be in RGB format",
  },
};

export const HSLFormat: Story = {
  args: {
    label: "HSL Color",
    format: "hsl",
    defaultValue: "#9c27b0",
    helperText: "Color value will be in HSL format",
  },
};

export const CustomPresets: Story = {
  args: {
    label: "Brand Colors",
    presets: brandColors,
    helperText: "Select from brand color palette",
  },
};

export const WebSafeColors: Story = {
  args: {
    label: "Web Safe Colors",
    presets: webSafeColors,
    helperText: "Choose from web-safe color palette",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 400,
      }}
    >
      <Wrapper
        {...args}
        label="Small Size"
        size="small"
        defaultValue="#e91e63"
      />
      <Wrapper
        {...args}
        label="Medium Size (Default)"
        size="medium"
        defaultValue="#4caf50"
      />
      <Wrapper
        {...args}
        label="Large Size"
        size="large"
        defaultValue="#ff9800"
      />
    </Box>
  ),
  args: {},
};

export const WithoutInput: Story = {
  args: {
    label: "Color Button Only",
    showInput: false,
    helperText: "Click the color button to select",
  },
};

export const WithoutPresets: Story = {
  args: {
    label: "Manual Entry Only",
    showPresets: false,
    helperText: "Enter hex color manually",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Color Picker",
    disabled: true,
    defaultValue: "#607d8b",
    helperText: "This color picker is disabled",
  },
};

export const ErrorState: Story = {
  render: (args) => {
    const { control } = useForm({
      defaultValues: { color: "" },
    });

    return (
      <Box sx={{ p: 3, maxWidth: 400 }}>
        <RhfColorPicker {...args} control={control} name="color" />
      </Box>
    );
  },
  args: {
    label: "Required Color",
    helperText: "Please select a color",
    // In a real form, this would be triggered by validation
  },
};
