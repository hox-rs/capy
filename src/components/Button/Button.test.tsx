import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "./Button";

describe("Testing <Button />", () => {
  it("should render disabled button", () => {
    render(<Button text="Button" disabled />);
    expect(screen.getByRole("button", { name: "Button" })).toBeDisabled();
  });
});
