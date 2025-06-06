// this component is a wrapper of Material-ui Checkboxes and React Hook forms
// the idea is to have a component that is easy to use when you need to use checkboxes for having an array of values
// a resumed version of the component implementation is:
//
// <RhfCheckboxGroup
//   control={control} // control from useForm
//   name="name" // name of the field
//   error={errors.name} // error of the field
//   label="Field label" // label of the field
//   defaultValue={['value 1']} // default value of the field
//   value={['value 1']} // value of the field
//   options={[
//     { label: "label 1", value: "value 1", disabled: false },
//     { label: "label 2", value: "value 2", disabled: false },
//   ]}
//   fullWidth={true} // if the field is fullWidth
//   variant="outlined" // variant of the field
//   {...props} // rest of the props from Mui RadioGroup
// />;
// testing here is to check if the component is rendering correctly and if the onChange function is working as expected

import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import RhfCheckboxGroup from "./RhfCheckboxGroup";
import { useForm } from "react-hook-form";

// create element that implements control and wraps because hooks can only be used inside a component
const RhfCheckboxGroupWrapper = (props: any) => {
  const { control } = useForm();

  return <RhfCheckboxGroup control={control} {...props} />;
};

describe("Testing <RhfCheckboxGroup />", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <RhfCheckboxGroupWrapper
        name="name"
        label="Field label"
        options={[
          { label: "label 1", value: "value 1", disabled: false },
          { label: "label 2", value: "value 2", disabled: false },
        ]}
      />
    );

    expect(getByText("Field label")).toBeInTheDocument();
    expect(getByText("label 1")).toBeInTheDocument();
    expect(getByText("label 2")).toBeInTheDocument();
  });

  it("should change value on click", () => {
    const { getByLabelText } = render(
      <RhfCheckboxGroupWrapper
        name="name"
        label="Field label"
        options={[
          { label: "label 1", value: "value 1", disabled: false },
          { label: "label 2", value: "value 2", disabled: false },
        ]}
        defaultValue={[]}
      />
    );

    const checkbox1 = getByLabelText("label 1");
    const checkbox2 = getByLabelText("label 2");

    act(() => {
      expect(checkbox1).not.toBeChecked();
      expect(checkbox2).not.toBeChecked();

      checkbox1.click();

      expect(checkbox1).toBeChecked();
      expect(checkbox2).not.toBeChecked();

      checkbox2.click();

      expect(checkbox1).toBeChecked();
      expect(checkbox2).toBeChecked();
    });
  });

  it("should render with helperText when no error", () => {
    render(
      <RhfCheckboxGroupWrapper
        name="name"
        label="Field label"
        helperText="This is helper text"
        options={[{ label: "label 1", value: "value 1" }]}
      />
    );

    expect(screen.getByText("This is helper text")).toBeInTheDocument();
  });

  it("should display error text when error is present", () => {
    render(
      <RhfCheckboxGroupWrapper
        name="name"
        label="Field label"
        helperText="This is helper text"
        error={{ message: "This field is required" }}
        options={[{ label: "label 1", value: "value 1" }]}
      />
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.queryByText("This is helper text")).not.toBeInTheDocument();
  });

  it("should handle disabled state for entire component", () => {
    render(
      <RhfCheckboxGroupWrapper
        name="name"
        label="Field label"
        disabled={true}
        options={[
          { label: "label 1", value: "value 1" },
          { label: "label 2", value: "value 2" },
        ]}
      />
    );

    const checkbox1 = screen.getByLabelText("label 1");
    const checkbox2 = screen.getByLabelText("label 2");

    expect(checkbox1).toBeDisabled();
    expect(checkbox2).toBeDisabled();
  });

  it("should handle disabled state for individual options", () => {
    render(
      <RhfCheckboxGroupWrapper
        name="name"
        label="Field label"
        options={[
          { label: "label 1", value: "value 1", disabled: true },
          { label: "label 2", value: "value 2", disabled: false },
        ]}
      />
    );

    const checkbox1 = screen.getByLabelText("label 1");
    const checkbox2 = screen.getByLabelText("label 2");

    expect(checkbox1).toBeDisabled();
    expect(checkbox2).not.toBeDisabled();
  });

  it("should handle undefined/null values gracefully", () => {
    render(
      <RhfCheckboxGroupWrapper
        name="name"
        label="Field label"
        value={undefined}
        options={[
          { label: "label 1", value: "value 1" },
          { label: "label 2", value: "value 2" },
        ]}
      />
    );

    const checkbox1 = screen.getByLabelText("label 1");
    const checkbox2 = screen.getByLabelText("label 2");

    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
  });

  it("should handle pre-selected values", () => {
    render(
      <RhfCheckboxGroupWrapper
        name="name"
        label="Field label"
        defaultValue={["value 1", "value 2"]}
        options={[
          { label: "label 1", value: "value 1" },
          { label: "label 2", value: "value 2" },
          { label: "label 3", value: "value 3" },
        ]}
      />
    );

    const checkbox1 = screen.getByLabelText("label 1");
    const checkbox2 = screen.getByLabelText("label 2");
    const checkbox3 = screen.getByLabelText("label 3");

    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).not.toBeChecked();
  });

  it("should render without label when not provided", () => {
    render(
      <RhfCheckboxGroupWrapper
        name="name"
        options={[{ label: "label 1", value: "value 1" }]}
      />
    );

    expect(screen.getByLabelText("label 1")).toBeInTheDocument();
    // Component should render successfully without a main label
  });

  it("should handle empty options array", () => {
    render(
      <RhfCheckboxGroupWrapper name="name" label="Field label" options={[]} />
    );

    expect(screen.getByText("Field label")).toBeInTheDocument();
    // Should not crash with empty options
  });

  it("should use value as key for better React performance", () => {
    const { container } = render(
      <RhfCheckboxGroupWrapper
        name="name"
        label="Field label"
        options={[
          { label: "Same Label", value: "value 1" },
          { label: "Same Label", value: "value 2" },
        ]}
      />
    );

    // Both checkboxes should render even with same labels
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(2);
  });

  it("should handle complex error objects", () => {
    const complexError = {
      message: "Complex error message",
      type: "required",
      ref: { name: "name" },
    };

    render(
      <RhfCheckboxGroupWrapper
        name="name"
        label="Field label"
        error={complexError}
        options={[{ label: "label 1", value: "value 1" }]}
      />
    );

    expect(screen.getByText("Complex error message")).toBeInTheDocument();
  });

  it("should work with Material-UI props", () => {
    render(
      <RhfCheckboxGroupWrapper
        name="name"
        label="Field label"
        fullWidth={true}
        options={[{ label: "label 1", value: "value 1" }]}
      />
    );

    // Should render without errors when Material-UI props are passed
    expect(screen.getByText("Field label")).toBeInTheDocument();
  });
});
