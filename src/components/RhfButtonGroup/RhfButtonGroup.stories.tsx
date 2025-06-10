import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RhfButtonGroup from "./RhfButtonGroup";
import { useForm } from "react-hook-form";

const meta: Meta<typeof RhfButtonGroup> = {
  component: RhfButtonGroup,
  title: "HOX Capy/RhfButtonGroup",
  argTypes: {
    exclusive: {
      control: { type: "boolean" },
      description: "If true, only one button can be selected at a time",
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the button group",
    },
    variant: {
      control: { type: "select" },
      options: ["text", "outlined", "contained"],
      description: "The variant of the buttons",
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "info", "success", "warning"],
      description: "The color of the buttons",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "The size of the buttons",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "If true, the button group will take up the full width",
    },
    disabled: {
      control: { type: "boolean" },
      description: "If true, all buttons will be disabled",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RhfButtonGroup>;

export const Standard: Story = (args) => {
  const { control } = useForm();

  return <RhfButtonGroup control={control} name={args.name} {...args} />;
};

Standard.args = {
  name: "buttonGroup",
  label: "Choose an option",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
  exclusive: true,
  defaultValue: "option1",
};

export const NonExclusive: Story = (args) => {
  const { control } = useForm();

  return <RhfButtonGroup control={control} name={args.name} {...args} />;
};

NonExclusive.args = {
  name: "multiSelect",
  label: "Select multiple options",
  options: [
    { label: "Feature A", value: "featureA" },
    { label: "Feature B", value: "featureB" },
    { label: "Feature C", value: "featureC" },
  ],
  exclusive: false,
  defaultValue: ["featureA", "featureC"],
};

export const VerticalOrientation: Story = (args) => {
  const { control } = useForm();

  return <RhfButtonGroup control={control} name={args.name} {...args} />;
};

VerticalOrientation.args = {
  name: "verticalGroup",
  label: "Vertical button group",
  options: [
    { label: "Top", value: "top" },
    { label: "Middle", value: "middle" },
    { label: "Bottom", value: "bottom" },
  ],
  exclusive: true,
  orientation: "vertical",
  defaultValue: "middle",
};

export const WithVariantsAndColors: Story = (args) => {
  const { control } = useForm();

  return <RhfButtonGroup control={control} name={args.name} {...args} />;
};

WithVariantsAndColors.args = {
  name: "styledGroup",
  label: "Styled button group",
  options: [
    { label: "Primary", value: "primary" },
    { label: "Secondary", value: "secondary" },
    { label: "Success", value: "success" },
  ],
  exclusive: true,
  variant: "contained",
  color: "secondary",
  size: "large",
};

export const WithDisabledOptions: Story = (args) => {
  const { control } = useForm();

  return <RhfButtonGroup control={control} name={args.name} {...args} />;
};

WithDisabledOptions.args = {
  name: "disabledOptions",
  label: "Some options disabled",
  options: [
    { label: "Available", value: "available" },
    { label: "Disabled", value: "disabled", disabled: true },
    { label: "Also Available", value: "available2" },
  ],
  exclusive: true,
  defaultValue: "available",
};

export const AllDisabled: Story = (args) => {
  const { control } = useForm();

  return <RhfButtonGroup control={control} name={args.name} {...args} />;
};

AllDisabled.args = {
  name: "allDisabled",
  label: "All buttons disabled",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
  exclusive: true,
  disabled: true,
  defaultValue: "option2",
};

export const FullWidth: Story = (args) => {
  const { control } = useForm();

  return <RhfButtonGroup control={control} name={args.name} {...args} />;
};

FullWidth.args = {
  name: "fullWidth",
  label: "Full width button group",
  options: [
    { label: "Left", value: "left" },
    { label: "Center", value: "center" },
    { label: "Right", value: "right" },
  ],
  exclusive: true,
  fullWidth: true,
  defaultValue: "center",
};

export const WithError: Story = (args) => {
  const { control } = useForm();

  return <RhfButtonGroup control={control} name={args.name} {...args} />;
};

WithError.args = {
  name: "withError",
  label: "Button group with error",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
  exclusive: true,
  error: { message: "Please select a valid option", type: "required" },
};

export const MixedValueTypes: Story = (args) => {
  const { control } = useForm();

  return <RhfButtonGroup control={control} name={args.name} {...args} />;
};

MixedValueTypes.args = {
  name: "mixedTypes",
  label: "Mixed value types",
  options: [
    { label: "String", value: "string" },
    { label: "Number", value: 42 },
    { label: "Boolean", value: true },
  ],
  exclusive: true,
  defaultValue: 42,
};
