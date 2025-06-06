import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RhfSlider from "./RhfSlider";
import { useForm } from "react-hook-form";

const meta: Meta<typeof RhfSlider> = {
  component: RhfSlider,
  title: "HOX Capy/RhfSlider",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RhfSlider>;

export const Standard: Story = (args) => {
  const { control } = useForm();

  return <RhfSlider control={control} name={args.name} {...args} />;
};

Standard.args = {
  disabled: false,
  name: "slider",
  label: "Field label",
  defaultValue: 50,
  min: 0,
  max: 100,
  step: 1,
};

export const Disabled: Story = (args) => {
  const { control } = useForm();

  return <RhfSlider control={control} name={args.name} {...args} />;
};

Disabled.args = {
  disabled: true,
  name: "slider",
  label: "Field label",
  defaultValue: 50,
  min: 0,
  max: 100,
  step: 1,
};

export const WithMarks: Story = (args) => {
  const { control } = useForm();

  return <RhfSlider control={control} name={args.name} {...args} />;
};

WithMarks.args = {
  disabled: false,
  name: "slider",
  label: "Temperature",
  defaultValue: 37,
  min: 0,
  max: 100,
  step: 1,
  marks: [
    { value: 0, label: "0°C" },
    { value: 20, label: "20°C" },
    { value: 37, label: "37°C" },
    { value: 100, label: "100°C" },
  ],
  valueLabelDisplay: "on",
};

export const Error: Story = (args) => {
  const { control, setError } = useForm();

  React.useEffect(() => {
    setError(args.name, {
      type: "required",
      message: "This field is required",
    });
  }, [args.name, setError]);

  return <RhfSlider control={control} name={args.name} {...args} />;
};

Error.args = {
  disabled: false,
  name: "slider",
  label: "Field label",
  defaultValue: 50,
  min: 0,
  max: 100,
  step: 1,
  helperText: "This is a helper text",
};

export const Range: Story = (args) => {
  const { control } = useForm();

  return <RhfSlider control={control} name={args.name} {...args} />;
};

Range.args = {
  disabled: false,
  name: "slider",
  label: "Price Range",
  defaultValue: [20, 80],
  min: 0,
  max: 100,
  step: 5,
  marks: true,
  valueLabelDisplay: "auto",
};

export const Vertical: Story = (args) => {
  const { control } = useForm();

  return (
    <div style={{ height: 300, display: "flex", justifyContent: "center" }}>
      <RhfSlider control={control} name={args.name} {...args} />
    </div>
  );
};

Vertical.args = {
  disabled: false,
  name: "slider",
  label: "Volume",
  defaultValue: 30,
  min: 0,
  max: 100,
  step: 10,
  orientation: "vertical",
  marks: true,
  valueLabelDisplay: "auto",
};

export const SmallSize: Story = (args) => {
  const { control } = useForm();

  return <RhfSlider control={control} name={args.name} {...args} />;
};

SmallSize.args = {
  disabled: false,
  name: "slider",
  label: "Small Slider",
  defaultValue: 25,
  min: 0,
  max: 50,
  step: 5,
  size: "small",
  marks: true,
};

export const SecondaryColor: Story = (args) => {
  const { control } = useForm();

  return <RhfSlider control={control} name={args.name} {...args} />;
};

SecondaryColor.args = {
  disabled: false,
  name: "slider",
  label: "Secondary Color",
  defaultValue: 60,
  min: 0,
  max: 100,
  step: 10,
  color: "secondary",
  marks: true,
  valueLabelDisplay: "on",
};

export const CustomStep: Story = (args) => {
  const { control } = useForm();

  return <RhfSlider control={control} name={args.name} {...args} />;
};

CustomStep.args = {
  disabled: false,
  name: "slider",
  label: "Custom Step",
  defaultValue: 0.5,
  min: 0,
  max: 1,
  step: 0.1,
  marks: [
    { value: 0, label: "0%" },
    { value: 0.5, label: "50%" },
    { value: 1, label: "100%" },
  ],
  valueLabelFormat: (value: number) => `${Math.round(value * 100)}%`,
  valueLabelDisplay: "auto",
};
