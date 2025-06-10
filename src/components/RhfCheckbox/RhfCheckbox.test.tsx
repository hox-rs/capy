// this component is a wrapper of Material-ui Checkbox that implements useController by react-hook-form
// a resumed version of the component implementation is:
//
// <RhfCheckbox
//   control={control}
//   name="field-name" // used in validations and useForm
//   label="Field label" // label of the field
//   defaultValue="default value" // default value of the field
//   error={error} // error object from react-hook-form
//   {...props} // rest of the props from mui Checkbox
// />;
// these are brief tests just to check if the union between these two libs are working
// as they have their own tests, we don't need to test all the cases

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import RhfCheckbox from "./RhfCheckbox";
import { useForm } from "react-hook-form";

// create element that implements control and wraps because hooks can only be used inside a component
const RhfCheckboxWrapper = (props: any) => {
  const { control, setError } = useForm();

  // If error prop is passed, simulate form error state
  React.useEffect(() => {
    if (props.error) {
      setError(props.name, props.error);
    }
  }, [props.error, props.name, setError]);

  return <RhfCheckbox control={control} {...props} />;
};

describe("Testing <RhfCheckbox />", () => {
  it("should render RhfCheckbox with few props", () => {
    const { getByRole } = render(
      <RhfCheckboxWrapper
        name="field-name"
        label="Field label"
        defaultValue={false}
      />
    );

    expect(getByRole("checkbox")).toBeInTheDocument();
  });

  it("should render RhfCheckbox with a default value", () => {
    const { getByRole } = render(
      <RhfCheckboxWrapper
        name="field-name"
        label="Field label"
        defaultValue={true}
      />
    );

    expect(getByRole("checkbox")).toBeChecked();
  });

  it("should render RhfCheckbox with an error", () => {
    const { getByText } = render(
      <RhfCheckboxWrapper
        name="field-name"
        label="Field label"
        defaultValue={false}
        error={{ message: "error message" }}
      />
    );

    expect(getByText("error message")).toBeInTheDocument();
  });

  it("should render RhfCheckbox disabled", () => {
    const { getByRole } = render(
      <RhfCheckboxWrapper
        name="field-name"
        label="Field label"
        defaultValue={false}
        disabled
      />
    );

    expect(getByRole("checkbox")).toBeDisabled();
  });
});
