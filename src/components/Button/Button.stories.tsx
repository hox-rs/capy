import React from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "HOX Capy/Button sample",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = (args: ArgTypes) => (
  <Button data-testId="InputField-id" {...args} />
);

Primary.args = {
  disabled: false,
  text: "Primary",
};

export const Secondary: Story = (args: ArgTypes) => (
  <Button data-testId="InputField-id" {...args} />
);

Secondary.args = {
  disabled: false,
  text: "Secondary",
};

export const Disabled: Story = (args: ArgTypes) => (
  <Button data-testId="InputField-id" {...args} />
);

Disabled.args = {
  disabled: true,
  text: "Disabled",
};

export const Small: Story = (args: ArgTypes) => (
  <Button data-testId="InputField-id" {...args} />
);

Small.args = {
  disabled: false,
  text: "Small",
};

export const Medium: Story = (args: ArgTypes) => (
  <Button data-testId="InputField-id" {...args} />
);

Medium.args = {
  disabled: false,
  text: "Medium",
};

export const Large: Story = (args: ArgTypes) => (
  <Button data-testId="InputField-id" {...args} />
);

Large.args = {
  disabled: false,
  text: "Large",
};
