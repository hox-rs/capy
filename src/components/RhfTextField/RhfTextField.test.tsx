// this component is a wrapper of Material-ui TextField that implements useController by react-hook-form
// a resumed version of the component implementation is:
//
// <RhfTextField
//   control={control}
//   name="field-name" // used in validations and useForm
//   label="Field label" // label of the field
//   defaultValue="default value" // default value of the field
//   error={error} // error object from react-hook-form
//   variant="outlined" // variant of the field mui
//   rows={3} // number of rows for multiline
//   type="text" // type of the field
//   fullWidth // if the field should be full width, default true
//   InputProps={{ endAdornment: <IconButton /> }} // props for the input, it implements the endAdornment for password fields
//   {...props} // rest of the props from mui TextField
// />;
// these are brief tests just to check if the union between these two libs are working
// as they have their own tests, we don't need to test all the cases

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import RhfTextField from "./RhfTextField";
import { useForm } from "react-hook-form";

// create element that implements control and wraps because hooks can only be used inside a component
const RhfTextFieldWrapper = (props: any) => {
  const { control, setError } = useForm();

  // If error prop is passed, simulate form error state
  React.useEffect(() => {
    if (props.error) {
      setError(props.name, props.error);
    }
  }, [props.error, props.name, setError]);

  return <RhfTextField control={control} {...props} />;
};

describe("Testing <RhfTextField />", () => {
  it("should render RhfTextField with few props", () => {
    const { getByRole } = render(
      <RhfTextFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue="default value"
      />
    );

    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("should render RhfTextField with a default value", () => {
    const { getByRole } = render(
      <RhfTextFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue="default value"
      />
    );

    expect(getByRole("textbox")).toHaveValue("default value");
  });

  it("should render RhfTextField with an error", () => {
    const { getByText } = render(
      <RhfTextFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue="default value"
        error={{ message: "Error message", type: "error" }}
      />
    );

    expect(getByText("Error message")).toBeInTheDocument();
  });

  it("should render RhfTextField with type password with the visibility icon", () => {
    const { getByLabelText, getByTestId } = render(
      <RhfTextFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue="default value"
        type="password"
      />
    );

    expect(getByLabelText("Field label")).toHaveAttribute("type", "password");
    expect(getByTestId("VisibilityIcon")).toBeInTheDocument();
  });

  it("should change RhfTextField type password to text when click on visibility icon", () => {
    const { getByLabelText, getByTestId, getByRole } = render(
      <RhfTextFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue="default value"
        type="password"
      />
    );

    const textField = getByLabelText("Field label");
    const iconButton = getByRole("button");

    expect(textField).toHaveAttribute("type", "password");
    fireEvent.click(iconButton);
    expect(getByLabelText("Field label")).toHaveAttribute("type", "text");
    expect(getByTestId("VisibilityOffIcon")).toBeInTheDocument();
  });

  it("should render RhfTextField with my own InputProps even if it is a password field", () => {
    const { getByLabelText, getByText } = render(
      <RhfTextFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue="default value"
        type="password"
        slotProps={{ input: { endAdornment: <span>My own icon</span> } }}
      />
    );

    expect(getByLabelText("Field label")).toHaveAttribute("type", "password");
    expect(getByText("My own icon")).toBeInTheDocument();
  });

  it("should render RhfTextField with multiline", () => {
    const { getByRole } = render(
      <RhfTextFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue="default value"
        rows={3}
      />
    );

    expect(getByRole("textbox")).toHaveAttribute("rows", "3");
  });

  it("should render RhfTextField options when sending select props", () => {
    const { getByRole } = render(
      <RhfTextFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue="default value"
        select
        SelectProps={{
          native: true,
        }}
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </RhfTextFieldWrapper>
    );

    expect(getByRole("combobox")).toBeInTheDocument();
  });
});
