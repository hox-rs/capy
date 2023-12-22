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
import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom";

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
});
