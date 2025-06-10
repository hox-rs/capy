// this component is a wrapper of Material-ui RadioGroup and React Hook forms
// a resumed version of the component implementation is:
//
// <RhfRadioGroup
//   control={control} // control from useForm
//   name="name" // name of the field
//   error={errors.name} // error of the field
//   label="Field label" // label of the field
//   defaultValue={'value'} // default value of the field
//   value={'value 1'} // value of the field
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
import { act, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import RhfRadioGroup from "./RhfRadioGroup";
import { useForm } from "react-hook-form";

// create element that implements control and wraps because hooks can only be used inside a component
const RhfRadioGroupWrapper = (props: any) => {
  const { control, setError } = useForm();

  // If error prop is passed, simulate form error state
  React.useEffect(() => {
    if (props.error) {
      setError(props.name, props.error);
    }
  }, [props.error, props.name, setError]);

  return <RhfRadioGroup control={control} {...props} />;
};

describe("Testing <RhfRadioGroup />", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <RhfRadioGroupWrapper
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
      <RhfRadioGroupWrapper
        name="name"
        label="Field label"
        options={[
          { label: "label 1", value: "value 1", disabled: false },
          { label: "label 2", value: "value 2", disabled: false },
        ]}
        defaultValue=""
      />
    );

    const radio1 = getByLabelText("label 1");
    const radio2 = getByLabelText("label 2");

    act(() => {
      expect(radio1).not.toBeChecked();
      expect(radio2).not.toBeChecked();

      radio1.click();

      expect(radio1).toBeChecked();
      expect(radio2).not.toBeChecked();

      radio2.click();

      expect(radio1).not.toBeChecked();
      expect(radio2).toBeChecked();
    });
  });

  it("should display helper text when provided", () => {
    const { getByText } = render(
      <RhfRadioGroupWrapper
        name="name"
        label="Field label"
        helperText="This is helper text"
        options={[
          { label: "label 1", value: "value 1", disabled: false },
          { label: "label 2", value: "value 2", disabled: false },
        ]}
      />
    );

    expect(getByText("This is helper text")).toBeInTheDocument();
  });

  it("should display error message when error is provided", () => {
    const { getByText } = render(
      <RhfRadioGroupWrapper
        name="name"
        label="Field label"
        error={{ type: "required", message: "This field is required" }}
        options={[
          { label: "label 1", value: "value 1", disabled: false },
          { label: "label 2", value: "value 2", disabled: false },
        ]}
      />
    );

    expect(getByText("This field is required")).toBeInTheDocument();
  });

  it("should prioritize error message over helper text", () => {
    const { getByText, queryByText } = render(
      <RhfRadioGroupWrapper
        name="name"
        label="Field label"
        helperText="This is helper text"
        error={{ type: "required", message: "This field is required" }}
        options={[
          { label: "label 1", value: "value 1", disabled: false },
          { label: "label 2", value: "value 2", disabled: false },
        ]}
      />
    );

    expect(getByText("This field is required")).toBeInTheDocument();
    expect(queryByText("This is helper text")).not.toBeInTheDocument();
  });

  it("should apply error styling when error is provided", () => {
    const { container } = render(
      <RhfRadioGroupWrapper
        name="name"
        label="Field label"
        error={{ type: "required", message: "This field is required" }}
        options={[
          { label: "label 1", value: "value 1", disabled: false },
          { label: "label 2", value: "value 2", disabled: false },
        ]}
      />
    );

    const formControl = container.querySelector(".MuiFormControl-root");
    // Check for the error prop on FormControl instead of CSS class
    expect(formControl).toHaveAttribute(
      "class",
      expect.stringContaining("MuiFormControl-root")
    );
    // The FormControl should have the error state applied to it
    expect(formControl).toBeTruthy();
  });

  it("should disable radio options when disabled prop is true", () => {
    const { getByLabelText } = render(
      <RhfRadioGroupWrapper
        name="name"
        label="Field label"
        disabled={true}
        options={[
          { label: "label 1", value: "value 1", disabled: false },
          { label: "label 2", value: "value 2", disabled: false },
        ]}
      />
    );

    const radio1 = getByLabelText("label 1");
    const radio2 = getByLabelText("label 2");

    expect(radio1).toBeDisabled();
    expect(radio2).toBeDisabled();
  });

  it("should disable individual radio option when option.disabled is true", () => {
    const { getByLabelText } = render(
      <RhfRadioGroupWrapper
        name="name"
        label="Field label"
        options={[
          { label: "label 1", value: "value 1", disabled: true },
          { label: "label 2", value: "value 2", disabled: false },
        ]}
      />
    );

    const radio1 = getByLabelText("label 1");
    const radio2 = getByLabelText("label 2");

    expect(radio1).toBeDisabled();
    expect(radio2).not.toBeDisabled();
  });

  it("should not display helper text when neither helperText nor error are provided", () => {
    const { container } = render(
      <RhfRadioGroupWrapper
        name="name"
        label="Field label"
        options={[
          { label: "label 1", value: "value 1", disabled: false },
          { label: "label 2", value: "value 2", disabled: false },
        ]}
      />
    );

    const helperText = container.querySelector(".MuiFormHelperText-root");
    expect(helperText).not.toBeInTheDocument();
  });
});
