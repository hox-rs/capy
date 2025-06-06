import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RhfFileUpload from "./RhfFileUpload";
import { useForm } from "react-hook-form";
import { Box, Typography, Button } from "@mui/material";

const meta: Meta<typeof RhfFileUpload> = {
  component: RhfFileUpload,
  title: "HOX Capy/RhfFileUpload",
  argTypes: {
    accept: {
      control: "text",
      description: "Accepted file types",
    },
    maxFiles: {
      control: "number",
      description: "Maximum number of files",
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple files",
    },
    showPreview: {
      control: "boolean",
      description: "Show image previews",
    },
    disabled: {
      control: "boolean",
      description: "Disable the component",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width component",
    },
    height: {
      control: "number",
      description: "Height of upload area",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RhfFileUpload>;

export const Standard: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return <RhfFileUpload control={control} name="fileUpload" {...cleanArgs} />;
  },
  args: {
    label: "Upload Files",
    placeholder: "Drag files here or click to select",
    multiple: false,
    showPreview: true,
    fullWidth: true,
    height: 200,
  },
};

export const Multiple: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return (
      <RhfFileUpload control={control} name="multipleFiles" {...cleanArgs} />
    );
  },
  args: {
    label: "Upload Multiple Files",
    multiple: true,
    maxFiles: 5,
    showPreview: true,
    placeholder: "Select up to 5 files",
  },
};

export const ImagesOnly: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return <RhfFileUpload control={control} name="images" {...cleanArgs} />;
  },
  args: {
    label: "Upload Images",
    accept: "image/*",
    multiple: true,
    maxFiles: 3,
    maxSize: 1024 * 1024 * 5, // 5MB
    showPreview: true,
    placeholder: "Upload your images (max 5MB each)",
  },
};

export const DocumentsOnly: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return <RhfFileUpload control={control} name="documents" {...cleanArgs} />;
  },
  args: {
    label: "Upload Documents",
    accept: ".pdf,.doc,.docx,.txt",
    multiple: true,
    maxFiles: 10,
    maxSize: 1024 * 1024 * 10, // 10MB
    showPreview: false,
    placeholder: "Upload PDF, DOC, DOCX or TXT files",
  },
};

export const SingleLargeFile: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return <RhfFileUpload control={control} name="largeFile" {...cleanArgs} />;
  },
  args: {
    label: "Upload Large File",
    multiple: false,
    maxSize: 1024 * 1024 * 100, // 100MB
    showPreview: false,
    height: 150,
    placeholder: "Upload a single large file (max 100MB)",
  },
};

export const WithProgress: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    // Mock upload function with delay
    const mockUpload = async (file: File) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log(`File ${file.name} uploaded successfully`);
          resolve();
        }, 2000);
      });
    };

    return (
      <RhfFileUpload
        control={control}
        name="progressUpload"
        onUpload={mockUpload}
        {...cleanArgs}
      />
    );
  },
  args: {
    label: "Upload with Progress",
    multiple: true,
    maxFiles: 3,
    showProgress: true,
    placeholder: "Files will show upload simulation",
  },
};

export const Disabled: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return (
      <RhfFileUpload control={control} name="disabledUpload" {...cleanArgs} />
    );
  },
  args: {
    label: "Disabled Upload",
    disabled: true,
    placeholder: "Upload is disabled",
  },
};

export const WithError: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return (
      <RhfFileUpload control={control} name="errorUpload" {...cleanArgs} />
    );
  },
  args: {
    label: "Upload with Error",
    error: { type: "required", message: "Please upload at least one file" },
    placeholder: "This field has an error",
  },
};

export const WithHelperText: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return (
      <RhfFileUpload control={control} name="helperUpload" {...cleanArgs} />
    );
  },
  args: {
    label: "Upload with Helper Text",
    helperText: "Supported formats: JPG, PNG, PDF. Maximum size: 5MB per file.",
    multiple: true,
    accept: "image/jpeg,image/png,.pdf",
    maxSize: 1024 * 1024 * 5,
  },
};

export const CompactSize: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    return (
      <RhfFileUpload control={control} name="compactUpload" {...cleanArgs} />
    );
  },
  args: {
    label: "Compact Upload Area",
    height: 100,
    placeholder: "Compact upload zone",
  },
};

export const WithCustomValidation: Story = {
  render: (args) => {
    const { control } = useForm();
    const { control: _, name: __, ...cleanArgs } = args as any;

    const customValidation = (files: File[]) => {
      if (files.some((file) => file.name.includes("test"))) {
        return "Files with 'test' in the name are not allowed";
      }
      return true;
    };

    return (
      <RhfFileUpload
        control={control}
        name="customValidation"
        validate={customValidation}
        {...cleanArgs}
      />
    );
  },
  args: {
    label: "Custom Validation",
    multiple: true,
    placeholder: "Try uploading a file with 'test' in the name",
    helperText: "Files with 'test' in the name will be rejected",
  },
};

export const FormExample: Story = {
  render: () => {
    const { control, handleSubmit, watch } = useForm({
      defaultValues: {
        avatar: null as File | null,
        documents: [] as File[],
      },
    });

    const formValues = watch();

    const onSubmit = (data: any) => {
      console.log("Form submitted:", data);
    };

    return (
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: 600 }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          File Upload Form Example
        </Typography>

        <Box sx={{ mb: 3 }}>
          <RhfFileUpload
            control={control as any}
            name="avatar"
            label="Profile Picture"
            accept="image/*"
            multiple={false}
            maxSize={1024 * 1024 * 2} // 2MB
            showPreview={true}
            placeholder="Upload your profile picture"
            helperText="JPG, PNG, GIF up to 2MB"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <RhfFileUpload
            control={control as any}
            name="documents"
            label="Supporting Documents"
            accept=".pdf,.doc,.docx"
            multiple={true}
            maxFiles={5}
            maxSize={1024 * 1024 * 10} // 10MB
            showPreview={false}
            placeholder="Upload your documents"
            helperText="PDF, DOC, DOCX up to 10MB each"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Submit Form
          </Button>
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
          <Typography variant="subtitle2">Form Values:</Typography>
          <pre style={{ fontSize: "12px", margin: 0 }}>
            {JSON.stringify(
              {
                avatar: formValues.avatar?.name || null,
                documents: formValues.documents?.map((f: any) => f.name) || [],
              },
              null,
              2
            )}
          </pre>
        </Box>
      </Box>
    );
  },
};
