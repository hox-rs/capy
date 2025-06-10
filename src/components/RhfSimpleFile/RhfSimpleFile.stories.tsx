import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import RhfSimpleFile from "./RhfSimpleFile";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";

const meta: Meta<typeof RhfSimpleFile> = {
  component: RhfSimpleFile,
  title: "HOX Capy/RhfSimpleFile",
  argTypes: {
    accept: {
      control: "text",
      description: "Accepted file types",
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
    },
    disabled: {
      control: "boolean",
      description: "Disable the component",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width component",
    },
    showFileSize: {
      control: "boolean",
      description: "Show file size when file is selected",
    },
    buttonText: {
      control: "text",
      description: "Text displayed on the upload button",
    },
    selectedText: {
      control: "text",
      description: "Text displayed when file is selected",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RhfSimpleFile>;

export const Standard: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return <RhfSimpleFile control={control} name="simpleFile" {...cleanArgs} />;
  },
  args: {
    label: "Upload File",
    buttonText: "Selecionar arquivo",
    fullWidth: true,
    showFileSize: true,
  },
};

export const WithValidation: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return (
      <RhfSimpleFile control={control} name="validatedFile" {...cleanArgs} />
    );
  },
  args: {
    label: "Upload Document",
    accept: ".pdf,.doc,.docx",
    maxSize: 1024 * 1024 * 10, // 10MB
    buttonText: "Select document",
    selectedText: "Document selected:",
    helperText: "Only PDF and Word documents up to 10MB",
  },
};

export const ImagesOnly: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return <RhfSimpleFile control={control} name="imageFile" {...cleanArgs} />;
  },
  args: {
    label: "Upload Image",
    accept: "image/*",
    maxSize: 1024 * 1024 * 5, // 5MB
    buttonText: "Choose image",
    selectedText: "Image selected:",
    showFileSize: true,
  },
};

export const Disabled: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return (
      <RhfSimpleFile control={control} name="disabledFile" {...cleanArgs} />
    );
  },
  args: {
    label: "Upload File (Disabled)",
    disabled: true,
    buttonText: "Selecionar arquivo",
  },
};

export const WithError: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return <RhfSimpleFile control={control} name="errorFile" {...cleanArgs} />;
  },
  args: {
    label: "Upload File",
    error: { message: "Este campo é obrigatório", type: "required" },
    buttonText: "Selecionar arquivo",
  },
};

export const CustomButton: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return <RhfSimpleFile control={control} name="customFile" {...cleanArgs} />;
  },
  args: {
    label: "Custom Upload Button",
    buttonText: "📎 Attach file",
    selectedText: "✅ File attached:",
    buttonProps: {
      variant: "contained",
      color: "secondary",
    },
  },
};

export const WithoutFileSize: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return <RhfSimpleFile control={control} name="noSizeFile" {...cleanArgs} />;
  },
  args: {
    label: "Upload File (No Size Display)",
    showFileSize: false,
    buttonText: "Select file",
  },
};

export const WithCallback: Story = {
  render: (args) => {
    const { control } = useForm();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { control: _, name: __, ...cleanArgs } = args as any;

    return (
      <Box>
        <RhfSimpleFile
          control={control}
          name="callbackFile"
          onFileChange={setSelectedFile}
          {...cleanArgs}
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            File in callback: {selectedFile ? selectedFile.name : "None"}
          </Typography>
        </Box>
      </Box>
    );
  },
  args: {
    label: "Upload with Callback",
    buttonText: "Choose file",
    helperText: "File selection will be shown below",
  },
};

export const CompactWidth: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return (
      <Box sx={{ width: 300 }}>
        <RhfSimpleFile control={control} name="compactFile" {...cleanArgs} />
      </Box>
    );
  },
  args: {
    label: "Compact File Upload",
    fullWidth: false,
    buttonText: "Browse...",
  },
};

export const SmallButton: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return (
      <RhfSimpleFile control={control} name="smallButtonFile" {...cleanArgs} />
    );
  },
  args: {
    label: "Upload File (Small Button)",
    buttonText: "Selecionar arquivo",
    fullWidth: true,
    showFileSize: true,
    buttonProps: {
      size: "small",
      variant: "contained",
      color: "primary",
    },
    helperText: "Upload com botão pequeno contained primary",
  },
};
