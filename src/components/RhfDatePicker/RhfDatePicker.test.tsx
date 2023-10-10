// this component is a wrapper of Material-ui DatePicker that implements useController by react-hook-form
// a resumed version of the component implementation is:
//
// <RhfDatePicker
//   control={control}
//   name="field-name" // used in validations and useForm
//   label="Field label" // label of the field
//   defaultValue={new Date()} // default value of the field
//   error={error} // error object from react-hook-form
//   {...props} // rest of the props from mui DatePicker
// />;
// these are brief tests just to check if the union between these two libs are working
// as they have their own tests, we don't need to test all the cases

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import RhfDatePicker from "./RhfDatePicker";

import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";

// create element that implements control and wraps because hooks can only be used inside a component
const RhfDatePickerWrapper = (props: any) => {
  const { control } = useForm();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RhfDatePicker control={control} {...props} />;
    </LocalizationProvider>
  );
};

describe("Testing <RhfDatePicker />", () => {
  it("should render RhfDatePicker with few props", () => {
    const { getByRole } = render(
      <RhfDatePickerWrapper
        name="field-name"
        label="Field label"
        defaultValue={new Date()}
      />
    );

    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("should render RhfDatePicker with a default value", () => {
    const { getByRole } = render(
      <RhfDatePickerWrapper
        name="field-name"
        label="Field label"
        defaultValue={new Date("2021-09-01 04:00:00")}
      />
    );

    expect(getByRole("textbox")).toHaveValue("09/01/2021");
  });

  it("should render RhfDatePicker with an error", () => {
    const { getByText } = render(
      <RhfDatePickerWrapper
        name="field-name"
        label="Field label"
        defaultValue={new Date()}
        error={{ message: "error message" }}
      />
    );

    expect(getByText("error message")).toBeInTheDocument();
  });

  it("should render RhfDatePicker with a helper text", () => {
    const { getByText } = render(
      <RhfDatePickerWrapper
        name="field-name"
        label="Field label"
        defaultValue={new Date()}
        helperText="helper text"
      />
    );

    expect(getByText("helper text")).toBeInTheDocument();
  });

  it("should render RhfDatePicker with a variant", () => {
    const { getByRole } = render(
      <RhfDatePickerWrapper
        name="field-name"
        label="Field label"
        defaultValue={new Date()}
        variant="standard"
      />
    );

    expect(getByRole("textbox")).toHaveClass("MuiInputBase-input");
  });

  it("should render RhfDatePicker with fullWidth false ", () => {
    const { getByRole } = render(
      <RhfDatePickerWrapper
        name="field-name"
        label="Field label"
        defaultValue={new Date()}
        fullWidth={false}
      />
    );

    expect(getByRole("textbox")).not.toHaveClass("MuiInputBase-fullWidth");
  });
});
