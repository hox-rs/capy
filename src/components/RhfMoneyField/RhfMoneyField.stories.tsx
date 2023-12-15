import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import RhfMoneyField from "./RhfMoneyField";
import { useForm } from "react-hook-form";

const meta: Meta<typeof RhfMoneyField> = {
  component: RhfMoneyField,
  title: "HOX Capy/RhfMoneyField",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RhfMoneyField>;

export const Standard: Story = (args) => {
  const { control } = useForm();

  return <RhfMoneyField control={control} name={args.name} {...args} />;
};

Standard.args = {
  disabled: false,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  label: "Field label",
  currencySymbol: "R$",
  decimalSeparator: ",",
  thousandSeparator: ".",
};

export const Disabled: Story = (args) => {
  const { control } = useForm();

  return <RhfMoneyField control={control} name={args.name} {...args} />;
};

Disabled.args = {
  disabled: true,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  label: "Field label",
  currencySymbol: "R$",
  decimalSeparator: ",",
  thousandSeparator: ".",
};

export const Dollar: Story = (args) => {
  const { control } = useForm();

  return <RhfMoneyField control={control} name={args.name} {...args} />;
};

Dollar.args = {
  disabled: false,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  label: "Field label",
  currencySymbol: "$",
  decimalSeparator: ".",
  thousandSeparator: ",",
};

export const WithDefaultValue: Story = (args) => {
  const { control } = useForm();

  return <RhfMoneyField control={control} name={args.name} {...args} />;
};

WithDefaultValue.args = {
  disabled: false,
  fullWidth: true,
  variant: "outlined",
  name: "name",
  label: "Field label",
  currencySymbol: "R$",
  decimalSeparator: ",",
  thousandSeparator: ".",
  defaultValue: 1000,
};
