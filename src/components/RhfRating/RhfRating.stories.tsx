import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RhfRating from "./RhfRating";
import { useForm } from "react-hook-form";

const meta: Meta<typeof RhfRating> = {
  component: RhfRating,
  title: "HOX Capy/RhfRating",
  argTypes: {
    max: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "Maximum number of stars",
    },
    precision: {
      control: { type: "select", options: [0.5, 1] },
      description: "Step value (0.5 for half stars, 1 for full stars)",
    },
    size: {
      control: { type: "select", options: ["small", "medium", "large"] },
      description: "Size of the rating stars",
    },
    readOnly: {
      control: { type: "boolean" },
      description: "Make the rating read-only",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the rating",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RhfRating>;

export const Standard: Story = (args) => {
  const { control } = useForm();

  return <RhfRating control={control} name={args.name} {...args} />;
};

Standard.args = {
  name: "rating",
  label: "Rating",
  defaultValue: 0,
  max: 5,
  precision: 1,
  size: "medium",
};

export const WithDefaultValue: Story = (args) => {
  const { control } = useForm();

  return <RhfRating control={control} name={args.name} {...args} />;
};

WithDefaultValue.args = {
  name: "rating",
  label: "Rating with default value",
  defaultValue: 3,
  max: 5,
  precision: 1,
  size: "medium",
};

export const HalfStars: Story = (args) => {
  const { control } = useForm();

  return <RhfRating control={control} name={args.name} {...args} />;
};

HalfStars.args = {
  name: "rating",
  label: "Rating with half stars",
  defaultValue: 2.5,
  max: 5,
  precision: 0.5,
  size: "medium",
};

export const LargeSize: Story = (args) => {
  const { control } = useForm();

  return <RhfRating control={control} name={args.name} {...args} />;
};

LargeSize.args = {
  name: "rating",
  label: "Large rating",
  defaultValue: 4,
  max: 5,
  precision: 1,
  size: "large",
};

export const SmallSize: Story = (args) => {
  const { control } = useForm();

  return <RhfRating control={control} name={args.name} {...args} />;
};

SmallSize.args = {
  name: "rating",
  label: "Small rating",
  defaultValue: 2,
  max: 5,
  precision: 1,
  size: "small",
};

export const CustomMax: Story = (args) => {
  const { control } = useForm();

  return <RhfRating control={control} name={args.name} {...args} />;
};

CustomMax.args = {
  name: "rating",
  label: "10-star rating",
  defaultValue: 7,
  max: 10,
  precision: 1,
  size: "medium",
};

export const ReadOnly: Story = (args) => {
  const { control } = useForm();

  return <RhfRating control={control} name={args.name} {...args} />;
};

ReadOnly.args = {
  name: "rating",
  label: "Read-only rating",
  defaultValue: 4,
  max: 5,
  precision: 1,
  size: "medium",
  readOnly: true,
};

export const Disabled: Story = (args) => {
  const { control } = useForm();

  return <RhfRating control={control} name={args.name} {...args} />;
};

Disabled.args = {
  name: "rating",
  label: "Disabled rating",
  defaultValue: 2,
  max: 5,
  precision: 1,
  size: "medium",
  disabled: true,
};

export const WithError: Story = (args) => {
  const { control } = useForm();

  return <RhfRating control={control} name={args.name} {...args} />;
};

WithError.args = {
  name: "rating",
  label: "Rating with error",
  defaultValue: 0,
  max: 5,
  precision: 1,
  size: "medium",
  error: { message: "Please provide a rating", type: "required" },
};

export const WithHelperText: Story = (args) => {
  const { control } = useForm();

  return <RhfRating control={control} name={args.name} {...args} />;
};

WithHelperText.args = {
  name: "rating",
  label: "Rating with helper text",
  defaultValue: 0,
  max: 5,
  precision: 1,
  size: "medium",
  helperText: "Please rate from 1 to 5 stars",
};

export const NoLabel: Story = (args) => {
  const { control } = useForm();

  return <RhfRating control={control} name={args.name} {...args} />;
};

NoLabel.args = {
  name: "rating",
  defaultValue: 3,
  max: 5,
  precision: 1,
  size: "medium",
};

export const Precision: Story = (args) => {
  const { control } = useForm();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <RhfRating
        control={control}
        name="rating1"
        label="Full stars (precision 1)"
        defaultValue={3}
        max={5}
        precision={1}
        size="medium"
      />
      <RhfRating
        control={control}
        name="rating2"
        label="Half stars (precision 0.5)"
        defaultValue={3.5}
        max={5}
        precision={0.5}
        size="medium"
      />
    </div>
  );
};

Precision.args = {};
