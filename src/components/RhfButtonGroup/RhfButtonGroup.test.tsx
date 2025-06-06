// this component is a wrapper of Material-ui ButtonGroup that implements useController by react-hook-form
// a resumed version of the component implementation is:
//
// <RhfButtonGroup
//   control={control}
//   name="field-name" // used in validations and useForm
//   label="Field label" // label of the field
//   defaultValue="value" // default value of the field
//   error={error} // error object from react-hook-form
//   options={[
//     { value: "value1", label: "Label 1" },
//     { value: "value2", label: "Label 2" },
//   ]} // options of the field
//   exclusive={true} // if the field is exclusive (single selection) or not (multiple)
//   orientation="horizontal" // orientation of the button group
//   variant="outlined" // variant of the buttons
//   color="primary" // color of the buttons
//   size="medium" // size of the buttons
//   disabled={false} // if all buttons are disabled
//   fullWidth={false} // if the button group is fullWidth
//   {...props} // rest of the props from mui ButtonGroup
// />;
// these are brief tests just to check if the union between these two libs are working
// as they have their own tests, we don't need to test all the cases

import React from "react";
import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import RhfButtonGroup from "./RhfButtonGroup";
import { useForm } from "react-hook-form";

// create element that implements control and wraps because hooks can only be used inside a component
const RhfButtonGroupWrapper = (props: any) => {
  const { control } = useForm();

  return <RhfButtonGroup control={control} {...props} />;
};

describe("Testing <RhfButtonGroup />", () => {
  const defaultOptions = [
    { value: "value1", label: "Label 1" },
    { value: "value2", label: "Label 2" },
    { value: "value3", label: "Label 3" },
  ];

  it("should render RhfButtonGroup with few props", () => {
    const { getByText } = render(
      <RhfButtonGroupWrapper
        name="field-name"
        label="Field label"
        options={defaultOptions}
      />
    );

    expect(getByText("Field label")).toBeInTheDocument();
    expect(getByText("Label 1")).toBeInTheDocument();
    expect(getByText("Label 2")).toBeInTheDocument();
    expect(getByText("Label 3")).toBeInTheDocument();
  });

  it("should render RhfButtonGroup with a default value in exclusive mode", () => {
    const { getByText } = render(
      <RhfButtonGroupWrapper
        name="field-name"
        label="Field label"
        options={defaultOptions}
        defaultValue="value1"
        exclusive={true}
      />
    );

    const button1 = getByText("Label 1");
    expect(button1).toHaveAttribute("aria-pressed", "true");
  });

  it("should render RhfButtonGroup with multiple default values in non-exclusive mode", () => {
    const { getByText } = render(
      <RhfButtonGroupWrapper
        name="field-name"
        label="Field label"
        options={defaultOptions}
        defaultValue={["value1", "value2"]}
        exclusive={false}
      />
    );

    const button1 = getByText("Label 1");
    const button2 = getByText("Label 2");
    const button3 = getByText("Label 3");

    expect(button1).toHaveAttribute("aria-pressed", "true");
    expect(button2).toHaveAttribute("aria-pressed", "true");
    expect(button3).toHaveAttribute("aria-pressed", "false");
  });

  it("should render RhfButtonGroup with an error", () => {
    const { getByText } = render(
      <RhfButtonGroupWrapper
        name="field-name"
        label="Field label"
        options={defaultOptions}
        error={{ message: "error message" }}
      />
    );

    expect(getByText("error message")).toBeInTheDocument();
  });

  it("should handle click events in exclusive mode", () => {
    const { getByText, rerender } = render(
      <RhfButtonGroupWrapper
        name="field-name"
        label="Field label"
        options={defaultOptions}
        defaultValue=""
        exclusive={true}
      />
    );

    const button1 = getByText("Label 1");
    const button2 = getByText("Label 2");

    // Initially no button should be selected
    expect(button1).toHaveAttribute("aria-pressed", "false");
    expect(button2).toHaveAttribute("aria-pressed", "false");

    // Click button1
    act(() => {
      button1.click();
    });

    // Check if button1 variant changed to contained (indicating selection)
    expect(button1).toHaveClass("MuiButton-contained");
    expect(button2).not.toHaveClass("MuiButton-contained");

    // Click button2
    act(() => {
      button2.click();
    });

    // Check if button2 is now contained and button1 is not
    expect(button1).not.toHaveClass("MuiButton-contained");
    expect(button2).toHaveClass("MuiButton-contained");
  });

  it("should handle click events in non-exclusive mode", () => {
    const { getByText } = render(
      <RhfButtonGroupWrapper
        name="field-name"
        label="Field label"
        options={defaultOptions}
        defaultValue={[]}
        exclusive={false}
      />
    );

    const button1 = getByText("Label 1");
    const button2 = getByText("Label 2");

    // Initially no button should be selected
    expect(button1).toHaveAttribute("aria-pressed", "false");
    expect(button2).toHaveAttribute("aria-pressed", "false");

    // Click button1
    act(() => {
      button1.click();
    });

    // Check if button1 variant changed to contained (indicating selection)
    expect(button1).toHaveClass("MuiButton-contained");
    expect(button2).not.toHaveClass("MuiButton-contained");

    // Click button2 (both should be selected)
    act(() => {
      button2.click();
    });

    // Both buttons should now be contained
    expect(button1).toHaveClass("MuiButton-contained");
    expect(button2).toHaveClass("MuiButton-contained");

    // Click button1 again to deselect
    act(() => {
      button1.click();
    });

    // Only button2 should be contained now
    expect(button1).not.toHaveClass("MuiButton-contained");
    expect(button2).toHaveClass("MuiButton-contained");
  });

  it("should render RhfButtonGroup with disabled buttons", () => {
    const { getByText } = render(
      <RhfButtonGroupWrapper
        name="field-name"
        label="Field label"
        options={defaultOptions}
        disabled={true}
      />
    );

    const button1 = getByText("Label 1");
    const button2 = getByText("Label 2");
    const button3 = getByText("Label 3");

    expect(button1).toBeDisabled();
    expect(button2).toBeDisabled();
    expect(button3).toBeDisabled();
  });

  it("should render RhfButtonGroup with individual disabled options", () => {
    const optionsWithDisabled = [
      { value: "value1", label: "Label 1", disabled: true },
      { value: "value2", label: "Label 2" },
      { value: "value3", label: "Label 3" },
    ];

    const { getByText } = render(
      <RhfButtonGroupWrapper
        name="field-name"
        label="Field label"
        options={optionsWithDisabled}
      />
    );

    const button1 = getByText("Label 1");
    const button2 = getByText("Label 2");
    const button3 = getByText("Label 3");

    expect(button1).toBeDisabled();
    expect(button2).not.toBeDisabled();
    expect(button3).not.toBeDisabled();
  });

  it("should render RhfButtonGroup with vertical orientation", () => {
    const { container } = render(
      <RhfButtonGroupWrapper
        name="field-name"
        label="Field label"
        options={defaultOptions}
        orientation="vertical"
      />
    );

    const buttonGroup = container.querySelector(".MuiButtonGroup-root");
    expect(buttonGroup).toHaveClass("MuiButtonGroup-vertical");
  });

  it("should render RhfButtonGroup with different variants and colors", () => {
    const { getByText } = render(
      <RhfButtonGroupWrapper
        name="field-name"
        label="Field label"
        options={defaultOptions}
        variant="contained"
        color="secondary"
        size="large"
      />
    );

    const button1 = getByText("Label 1");
    expect(button1).toHaveClass("MuiButton-containedSecondary");
    expect(button1).toHaveClass("MuiButton-sizeLarge");
  });

  it("should render RhfButtonGroup with fullWidth", () => {
    const { container } = render(
      <RhfButtonGroupWrapper
        name="field-name"
        label="Field label"
        options={defaultOptions}
        fullWidth={true}
      />
    );

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).toHaveClass("MuiFormControl-fullWidth");
  });
});
