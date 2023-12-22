import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import RhfCheckboxGroup from "./RhfCheckboxGroup";
import { useForm } from "react-hook-form";

const meta: Meta<typeof RhfCheckboxGroup> = {
  component: RhfCheckboxGroup,
  title: "HOX Capy/RhfCheckboxGroup",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RhfCheckboxGroup>;

export const Standard: Story = (args) => {
  const { control } = useForm();

  return <RhfCheckboxGroup control={control} name={args.name} {...args} />;
};

Standard.args = {
  name: "name",
  label: "Field label",
  options: [
    { label: "label 1", value: "value 1" },
    { label: "label 2", value: "value 2" },
  ],
  defaultValue: ["value 1"],
};

export const OptionDisabled: Story = (args) => {
  const { control } = useForm();

  return <RhfCheckboxGroup control={control} name={args.name} {...args} />;
};

OptionDisabled.args = {
  name: "name",
  label: "Field label",
  options: [
    { label: "label 1", value: "value 1", disabled: true },
    { label: "label 2", value: "value 2" },
  ],
  defaultValue: ["value 1"],
};

export const Disabled: Story = (args) => {
  const { control } = useForm();

  return <RhfCheckboxGroup control={control} name={args.name} {...args} />;
};

Disabled.args = {
  name: "name",
  label: "Field label",
  options: [
    { label: "label 1", value: "value 1" },
    { label: "label 2", value: "value 2" },
  ],
  defaultValue: ["value 1"],
  disabled: true,
};

export const Row: Story = (args) => {
  const { control } = useForm();

  return <RhfCheckboxGroup control={control} name={args.name} {...args} />;
};

Row.args = {
  name: "name",
  label: "Field label",
  options: [
    { label: "label 1", value: "value 1" },
    { label: "label 2", value: "value 2" },
  ],
  defaultValue: ["value 1"],
  row: true,
};
