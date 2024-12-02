import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import MoneyField from "./MoneyField";

const meta: Meta<typeof MoneyField> = {
  component: MoneyField,
  title: "HOX Capy/MoneyField",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MoneyField>;

export const Standard: Story = (args) => {
  const [value, setValue] = useState(args.defaultValue);

  return <MoneyField {...args} onChange={(v) => setValue(v)} value={value} />;
};

Standard.args = {
  disabled: false,
  name: "name",
  label: "Field label",
  defaultValue: 0,
};

export const Disabled: Story = (args) => {
  const [value, setValue] = useState(args.defaultValue);

  return (
    <MoneyField {...args} onChange={(_, v) => setValue(v)} value={value} />
  );
};

Disabled.args = {
  disabled: true,
  name: "name",
  label: "Field label",
  defaultValue: 0,
};

export const Dollar: Story = (args) => {
  const [value, setValue] = useState(args.defaultValue);

  return (
    <MoneyField {...args} onChange={(_, v) => setValue(v)} value={value} />
  );
};

Dollar.args = {
  disabled: false,
  name: "name",
  label: "Field label",
  currencySymbol: "$",
  decimalSeparator: ".",
  thousandSeparator: ",",
  defaultValue: 0,
};

export const WithDefaultValue: Story = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <MoneyField {...args} onChange={(_, v) => setValue(v)} value={value} />
  );
};

WithDefaultValue.args = {
  disabled: false,
  name: "name",
  label: "Field label",
  value: 1000,
};
