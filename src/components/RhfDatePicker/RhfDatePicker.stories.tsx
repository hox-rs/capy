import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RhfDatePicker from "./RhfDatePicker";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const meta: Meta<typeof RhfDatePicker> = {
  component: RhfDatePicker,
  title: "HOX Capy/RhfDatePicker",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RhfDatePicker>;

export const Standard: Story = (args) => {
  const { control } = useForm();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RhfDatePicker control={control} name={args.name} {...args} />
    </LocalizationProvider>
  );
};

Standard.args = {
  disabled: false,
  name: "name",
  label: "Field label",
};

export const Disabled: Story = (args) => {
  const { control } = useForm();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RhfDatePicker control={control} name={args.name} {...args} />
    </LocalizationProvider>
  );
};

Disabled.args = {
  disabled: true,
  name: "name",
  label: "Field label",
};

export const Error: Story = (args) => {
  const { control } = useForm();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RhfDatePicker control={control} name={args.name} {...args} />
    </LocalizationProvider>
  );
};

Error.args = {
  disabled: false,
  name: "name",
  label: "Field label",
  error: { message: "Error message", type: "error" },
};

export const WithDefaultValue: Story = (args) => {
  const { control } = useForm();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RhfDatePicker control={control} name={args.name} {...args} />
    </LocalizationProvider>
  );
};

WithDefaultValue.args = {
  disabled: false,
  name: "name",
  label: "Field label",
  defaultValue: new Date("2021-09-01 04:00:00"),
};

export const WithHelperText: Story = (args) => {
  const { control } = useForm();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RhfDatePicker control={control} name={args.name} {...args} />
    </LocalizationProvider>
  );
};

WithHelperText.args = {
  disabled: false,
  name: "name",
  label: "Field label",
  helperText: "Helper text",
};
