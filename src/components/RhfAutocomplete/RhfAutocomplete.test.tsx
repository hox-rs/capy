// this component is a wrapper of Material-ui Autocomplete that implements useController by react-hook-form
// a resumed version of the component implementation is:
//
// <RhfAutocomplete
//   control={control}
//   name="field-name" // used in validations and useForm
//   label="Field label" // label of the field
//   defaultValue={new Date()} // default value of the field
//   error={error} // error object from react-hook-form
//   options={[
//     { value: "value", label: "label" },
//     { value: "value2", label: "label2" },
//   ]} // options of the field
//   multiple={false} // if the field is multiple
//   freeSolo={false} // if the field is freeSolo
//   fullWidth={true} // if the field is fullWidth
//   noOptionsText="Nenhum resultado encontrado" // text when no options are found
//   variant="outlined" // variant of the field
//   {...props} // rest of the props from mui Autocomplete
// />;
// these are brief tests just to check if the union between these two libs are working
// as they have their own tests, we don't need to test all the cases

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import RhfAutocomplete from "./RhfAutocomplete";
import { useForm } from "react-hook-form";

// create element that implements control and wraps because hooks can only be used inside a component
const RhfAutocompleteWrapper = (props: any) => {
  const { control } = useForm();

  return <RhfAutocomplete control={control} {...props} />;
};

describe("Testing <RhfAutocomplete />", () => {
  it("should render RhfAutocomplete with few props", () => {
    const { getByRole } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        multiple={false}
        defaultValue="value"
        options={[
          { value: "value", label: "label" },
          { value: "value2", label: "label2" },
        ]}
      />
    );

    expect(getByRole("combobox")).toBeInTheDocument();
  });

  it("should render RhfAutocomplete with a default value", () => {
    const { getByRole } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        multiple={false}
        defaultValue="value"
        options={[
          { value: "value", label: "label" },
          { value: "value2", label: "label2" },
        ]}
      />
    );

    expect(getByRole("combobox")).toHaveValue("label");
  });

  it("should render RhfAutocomplete with an error", () => {
    const { getByText } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        defaultValue="label"
        multiple={false}
        error={{ message: "error message" }}
        options={[
          { value: "value", label: "label" },
          { value: "value2", label: "label2" },
        ]}
      />
    );

    expect(getByText("error message")).toBeInTheDocument();
  });

  it("should render RhfAutocomplete with a helper text", () => {
    const { getByText } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        defaultValue="value"
        multiple={false}
        helperText="helper text"
        options={[
          { value: "value", label: "label" },
          { value: "value2", label: "label2" },
        ]}
      />
    );

    expect(getByText("helper text")).toBeInTheDocument();
  });

  it("should render RhfAutocomplete with a default value", () => {
    const { getByRole } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        multiple={false}
        defaultValue="value"
        options={[
          { value: "value", label: "label" },
          { value: "value2", label: "label2" },
        ]}
      />
    );

    const input = getByRole("combobox");

    expect(input).toHaveValue("label");
  });

  it("should render RhfAutocomplete with multiple values option", () => {
    const { getByText } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        defaultValue={["value", "value2"]}
        multiple
        options={[
          { value: "value", label: "label" },
          { value: "value2", label: "label2" },
        ]}
      />
    );

    expect(getByText("label")).toBeInTheDocument();
    expect(getByText("label2")).toBeInTheDocument();
  });
});
