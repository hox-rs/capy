import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RhfTextField from "./RhfTextField";
import { useForm } from "react-hook-form";
import { MenuItem } from "@mui/material";

const meta: Meta<typeof RhfTextField> = {
  component: RhfTextField,
  title: "HOX Capy/RhfTextField",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RhfTextField>;

export const Standard: Story = (args) => {
  const { control } = useForm();

  return <RhfTextField control={control} name={args.name} {...args} />;
};

Standard.args = {
  disabled: false,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  label: "Field label",
};

export const Disabled: Story = (args) => {
  const { control } = useForm();

  return <RhfTextField control={control} name={args.name} {...args} />;
};

Disabled.args = {
  disabled: true,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  label: "Field label",
};

export const Error: Story = (args) => {
  const { control } = useForm();

  return <RhfTextField control={control} name={args.name} {...args} />;
};

Error.args = {
  disabled: false,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  label: "Field label",
  error: { message: "Error message", type: "error" },
};

export const Multiline: Story = (args) => {
  const { control } = useForm();

  return <RhfTextField control={control} name={args.name} {...args} />;
};

Multiline.args = {
  disabled: false,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  label: "Field label",
  rows: 4,
};

export const Password: Story = (args) => {
  const { control } = useForm();

  return <RhfTextField control={control} name={args.name} {...args} />;
};

Password.args = {
  disabled: false,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  label: "Field label",
  type: "password",
};

export const Number: Story = (args) => {
  const { control } = useForm();

  return <RhfTextField control={control} name={args.name} {...args} />;
};

Number.args = {
  disabled: false,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  label: "Field label",
  type: "number",
};

export const Email: Story = (args) => {
  const { control } = useForm();

  return <RhfTextField control={control} name={args.name} {...args} />;
};

Email.args = {
  disabled: false,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  label: "Field label",
  type: "email",
};

export const Select: Story = (args) => {
  const { control } = useForm();

  return (
    <RhfTextField control={control} name={args.name} {...args}>
      <MenuItem value="1">1</MenuItem>
      <MenuItem value="2">2</MenuItem>
    </RhfTextField>
  );
};

Select.args = {
  disabled: false,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  select: true,
  defaultValue: "1",
  label: "Field label",
};
