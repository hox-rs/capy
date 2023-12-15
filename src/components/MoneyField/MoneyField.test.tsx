// this component is a wrapper of Material-ui TextField with a live formatting of a right to left currency mask
// a resumed version of the component implementation is:
//
// <MoneyField
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

import MoneyField from "./MoneyField";

describe("Testing <MoneyField />", () => {
  it("should render MoneyField with few props", () => {
    const { getByRole } = render(
      <MoneyField label="Field label" value={0} onChange={() => {}} />
    );

    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("should render MoneyField with a default value", () => {
    const { getByRole } = render(
      <MoneyField label="Field label" value={0} onChange={() => {}} />
    );

    expect(getByRole("textbox")).toHaveValue("0,00");
  });

  it("should render MoneyField with a value with cents", () => {
    const { getByRole } = render(
      <MoneyField label="Field label" value={100.5} onChange={() => {}} />
    );

    expect(getByRole("textbox")).toHaveValue("100,50");
  });

  it("should render MoneyField with a value with thousands", () => {
    const { getByRole } = render(
      <MoneyField label="Field label" value={10000} onChange={() => {}} />
    );

    expect(getByRole("textbox")).toHaveValue("10.000,00");
  });
});
