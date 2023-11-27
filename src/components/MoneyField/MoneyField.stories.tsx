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

  console.log(value);

  return (
    <MoneyField {...args} onChange={(_, v) => setValue(v)} value={value} />
  );
};

Standard.args = {
  disabled: false,
  name: "name",
  defaultValue: 0,
  label: "Field label",
};
