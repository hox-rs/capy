import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RhfCheckbox from "./RhfCheckbox";
import { useForm } from "react-hook-form";

const meta: Meta<typeof RhfCheckbox> = {
  component: RhfCheckbox,
  title: "HOX Capy/RhfCheckbox",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RhfCheckbox>;

export const Standard: Story = (args) => {
  const { control } = useForm();

  return <RhfCheckbox control={control} name={args.name} {...args} />;
};

Standard.args = {
  disabled: false,
  name: "name",
  label: "Field label",
};

export const Disabled: Story = (args) => {
  const { control } = useForm();

  return <RhfCheckbox control={control} name={args.name} {...args} />;
};

Disabled.args = {
  disabled: true,
  name: "name",
  label: "Field label",
};

export const Error: Story = (args) => {
  const { control } = useForm();

  return <RhfCheckbox control={control} name={args.name} {...args} />;
};

Error.args = {
  disabled: false,
  name: "name",
  label: "Field label",
  error: { message: "Error message", type: "error" },
};

export const WithDefaultValue: Story = (args) => {
  const { control } = useForm();

  return <RhfCheckbox control={control} name={args.name} {...args} />;
};

WithDefaultValue.args = {
  disabled: false,
  name: "name",
  label: "Field label",
  defaultValue: true,
};
