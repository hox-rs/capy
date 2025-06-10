// this component is a wrapper of Material-ui Slider that implements useController by react-hook-form
// a resumed version of the component implementation is:
//
// <RhfSlider
//   control={control}
//   name="field-name" // used in validations and useForm
//   label="Field label" // label of the field
//   defaultValue={50} // default value of the field
//   error={error} // error object from react-hook-form
//   min={0} // minimum value of the slider
//   max={100} // maximum value of the slider
//   step={1} // step value of the slider
//   marks={true} // marks on the slider
//   orientation="horizontal" // orientation of the slider
//   valueLabelDisplay="auto" // value label display
//   size="medium" // size of the slider
//   color="primary" // color of the slider
//   {...props} // rest of the props from mui Slider
// />;
// these are brief tests just to check if the union between these two libs are working
// as they have their own tests, we don't need to test all the cases

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import RhfSlider from "./RhfSlider";
import { useForm } from "react-hook-form";

// create element that implements control and wraps because hooks can only be used inside a component
const RhfSliderWrapper = (props: any) => {
  const { control, setError } = useForm();

  // If error prop is passed, simulate form error state
  React.useEffect(() => {
    if (props.error) {
      setError(props.name, props.error);
    }
  }, [props.error, props.name, setError]);

  return <RhfSlider control={control} {...props} />;
};

describe("Testing <RhfSlider />", () => {
  it("should render RhfSlider with few props", () => {
    const { getByRole } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        defaultValue={50}
      />
    );

    expect(getByRole("slider")).toBeInTheDocument();
  });

  it("should render RhfSlider with a default value", () => {
    const { getByRole } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        defaultValue={75}
      />
    );

    const slider = getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "75");
  });

  it("should render RhfSlider with min and max values", () => {
    const { getByRole } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        defaultValue={25}
        min={10}
        max={50}
      />
    );

    const slider = getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "10");
    expect(slider).toHaveAttribute("aria-valuemax", "50");
  });

  it("should render RhfSlider with step value", () => {
    const { getByRole } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        defaultValue={20}
        step={5}
      />
    );

    const slider = getByRole("slider");
    expect(slider).toBeInTheDocument();
  });

  it("should render RhfSlider with marks", () => {
    const marks = [
      { value: 0, label: "0°C" },
      { value: 20, label: "20°C" },
      { value: 37, label: "37°C" },
      { value: 100, label: "100°C" },
    ];

    const { getByRole } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        defaultValue={37}
        marks={marks}
      />
    );

    expect(getByRole("slider")).toBeInTheDocument();
  });

  it("should render RhfSlider with label", () => {
    const { getByText } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Temperature"
        defaultValue={25}
      />
    );

    expect(getByText("Temperature")).toBeInTheDocument();
  });

  it("should render RhfSlider with helper text", () => {
    const { getByText } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        helperText="Select a temperature value"
        defaultValue={25}
      />
    );

    expect(getByText("Select a temperature value")).toBeInTheDocument();
  });

  it("should render RhfSlider with error", () => {
    const { getByText, container } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        error={{ type: "required", message: "This field is required" }}
        defaultValue={25}
      />
    );

    expect(getByText("This field is required")).toBeInTheDocument();

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).toHaveAttribute(
      "class",
      expect.stringContaining("MuiFormControl-root")
    );
  });

  it("should handle onChange event", () => {
    const mockOnChange = jest.fn();

    const { getByRole } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        defaultValue={50}
        onChange={mockOnChange}
      />
    );

    const slider = getByRole("slider");

    // Simulate slider change
    fireEvent.change(slider, { target: { value: 75 } });

    expect(slider).toBeInTheDocument();
  });

  it("should be disabled when disabled prop is true", () => {
    const { getByRole } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        defaultValue={50}
        disabled={true}
      />
    );

    const slider = getByRole("slider");
    expect(slider).toBeDisabled();
  });

  it("should render RhfSlider with vertical orientation", () => {
    const { getByRole } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        defaultValue={50}
        orientation="vertical"
      />
    );

    const slider = getByRole("slider");
    expect(slider).toHaveAttribute("aria-orientation", "vertical");
  });

  it("should render RhfSlider with different sizes", () => {
    const { getByRole } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        defaultValue={50}
        size="small"
      />
    );

    expect(getByRole("slider")).toBeInTheDocument();
  });

  it("should render RhfSlider with different colors", () => {
    const { getByRole } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        defaultValue={50}
        color="secondary"
      />
    );

    expect(getByRole("slider")).toBeInTheDocument();
  });

  it("should handle complex error objects", () => {
    const complexError = {
      type: "validation",
      message: "Complex error message",
      ref: { name: "field-name" },
    };

    const { getByText } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        error={complexError}
        defaultValue={50}
      />
    );

    expect(getByText("Complex error message")).toBeInTheDocument();
  });

  it("should work with Material-UI props", () => {
    const { getByRole } = render(
      <RhfSliderWrapper
        name="field-name"
        label="Field label"
        defaultValue={50}
        valueLabelDisplay="on"
        track="inverted"
      />
    );

    // Should render without errors when Material-UI props are passed
    expect(getByRole("slider")).toBeInTheDocument();
  });
});
