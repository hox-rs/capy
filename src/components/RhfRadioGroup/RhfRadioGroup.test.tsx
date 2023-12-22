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
  const { control } = useForm();

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
});
