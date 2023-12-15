// this component is a wrapper of Material-ui TextField with a live formatting of a right to left currency mask and React Hook forms
// a resumed version of the component implementation is:
//
// <RhfMoneyField
//   control={control} // control from useForm
//   name="name" // name of the field
//   error={errors.name} // error of the field
//   label="Field label" // label of the field
//   defaultValue={0} // default value of the field
//   value={0} // value of the field
//   currencySymbol="R$" // currency symbol default as R$
//   decimalSeparator="," // decimal separator default as ,
//   thousandSeparator="." // thousand separator default as .
//   onChange={handleChange} // onChange function of the field
//   fullWidth={true} // if the field is fullWidth
//   variant="outlined" // variant of the field
//   {...props} // rest of the props from Mui TextField
// />;
// testing here is to check if the component is rendering correctly and if the onChange function is working as expected

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import RhfMoneyField from "./RhfMoneyField";
import { useForm } from "react-hook-form";

// create element that implements control and wraps because hooks can only be used inside a component
const RhfMoneyFieldWrapper = (props: any) => {
  const { control } = useForm();

  return <RhfMoneyField control={control} {...props} />;
};

describe("Testing <RhfMoneyField />", () => {
  it("should render RhfMoneyField with few props", () => {
    const { getByRole } = render(
      <RhfMoneyFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue={0}
      />
    );

    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("should render RhfMoneyField with a default value", () => {
    const { getByRole } = render(
      <RhfMoneyFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue={0}
      />
    );

    expect(getByRole("textbox")).toHaveValue("0,00");
  });

  it("should render RhfMoneyField with a value with cents", () => {
    const { getByRole } = render(
      <RhfMoneyFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue={100.5}
      />
    );

    expect(getByRole("textbox")).toHaveValue("100,50");
  });

  it("should render RhfMoneyField with a value with thousands", () => {
    const { getByRole } = render(
      <RhfMoneyFieldWrapper
        name="field-name"
        label="Field label"
        defaultValue={10000}
      />
    );

    expect(getByRole("textbox")).toHaveValue("10.000,00");
  });
});
