import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RhfAutocomplete from "./RhfAutocomplete";
import { useForm } from "react-hook-form";
import { TextField, Tooltip } from "@mui/material";
import { Help } from "@mui/icons-material";

const meta: Meta<typeof RhfAutocomplete> = {
  component: RhfAutocomplete,
  title: "HOX Capy/RhfAutocomplete",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RhfAutocomplete>;

export const Standard: Story = (args) => {
  const { control } = useForm();

  return <RhfAutocomplete control={control} name={args.name} {...args} />;
};

Standard.args = {
  disabled: false,
  name: "name",
  multiple: false,
  label: "Field label",
  defaultValue: "value",
  options: [
    { value: "value", label: "label" },
    { value: "value2", label: "label" },
  ],
};

export const Disabled: Story = (args) => {
  const { control } = useForm();

  return <RhfAutocomplete control={control} name={args.name} {...args} />;
};

Disabled.args = {
  disabled: true,
  name: "name",
  multiple: false,
  label: "Field label",
  defaultValue: "value",
  options: [
    { value: "value", label: "label" },
    { value: "value2", label: "label2" },
  ],
};

export const Error: Story = (args) => {
  const { control } = useForm();

  return <RhfAutocomplete control={control} name={args.name} {...args} />;
};

Error.args = {
  disabled: false,
  name: "name",
  multiple: false,
  label: "Field label",
  defaultValue: "value",
  options: [
    { value: "value", label: "label" },
    { value: "value2", label: "label2" },
  ],
  error: { message: "Error message", type: "error" },
};

export const WithDefaultValue: Story = (args) => {
  const { control } = useForm();

  return <RhfAutocomplete control={control} name={args.name} {...args} />;
};

WithDefaultValue.args = {
  disabled: false,
  name: "name",
  multiple: false,
  label: "Field label",
  defaultValue: "value",
  options: [
    { value: "value", label: "label" },
    { value: "value2", label: "label2" },
  ],
};

export const Multiple: Story = (args) => {
  const { control } = useForm();

  return <RhfAutocomplete control={control} name={args.name} {...args} />;
};

Multiple.args = {
  disabled: false,
  name: "name",
  multiple: true,
  label: "Field label",
  defaultValue: ["value", "value2"],
  options: [
    { value: "value", label: "label" },
    { value: "value2", label: "label2" },
  ],
};

export const FreeSolo: Story = (args) => {
  const { control } = useForm();

  return <RhfAutocomplete control={control} name={args.name} {...args} />;
};

FreeSolo.args = {
  disabled: false,
  name: "name",
  multiple: true,
  label: "Field label",
  defaultValue: ["value", "value2"],
  options: [
    { value: "value", label: "label" },
    { value: "value2", label: "label2" },
  ],
  freeSolo: true,
};

export const WithTextFieldProps: Story = (args) => {
  const { control } = useForm();

  return <RhfAutocomplete control={control} name={args.name} {...args} />;
};

WithTextFieldProps.args = {
  disabled: false,
  name: "name",
  multiple: false,
  label: "Field label",
  defaultValue: "value",
  options: [
    { value: "value", label: "label" },
    { value: "value2", label: "label2" },
  ],
  InputProps: {
    endAdornment: (
      <Tooltip title="Teste tooltip">
        <Help />
      </Tooltip>
    ),
  },
};
