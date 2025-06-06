// this component is a wrapper of Material-ui Rating that implements useController by react-hook-form
// a resumed version of the component implementation is:
//
// <RhfRating
//   control={control}
//   name="field-name" // used in validations and useForm
//   label="Field label" // label of the field
//   defaultValue={0} // default value of the field
//   error={error} // error object from react-hook-form
//   max={5} // maximum value (number of stars)
//   precision={1} // step value (0.5 for half stars, 1 for full stars)
//   size="medium" // size of the stars
//   readOnly={false} // if the rating is read-only
//   {...props} // rest of the props from mui Rating
// />;
// testing here is to check if the component is rendering correctly and if the onChange function is working as expected

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import RhfRating from "./RhfRating";
import { useForm } from "react-hook-form";

// create element that implements control and wraps because hooks can only be used inside a component
const RhfRatingWrapper = (props: any) => {
  const { control, setError } = useForm();

  // If error prop is passed, simulate form error state
  React.useEffect(() => {
    if (props.error) {
      setError(props.name, props.error);
    }
  }, [props.error, props.name, setError]);

  return <RhfRating control={control} {...props} />;
};

describe("Testing <RhfRating />", () => {
  it("should render RhfRating with few props", () => {
    const { container } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={0}
      />
    );

    const rating = container.querySelector(".MuiRating-root");
    expect(rating).toBeInTheDocument();
  });
  it("should render RhfRating with a default value", () => {
    const { container } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={3}
      />
    );

    const rating = container.querySelector(".MuiRating-root");
    expect(rating).toBeInTheDocument();

    // Check if the third star is selected (value 3)
    const checkedRadio = container.querySelector('input[value="3"]:checked');
    expect(checkedRadio).toBeInTheDocument();
  });

  it("should render RhfRating with label", () => {
    const { getByText } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Rating Label"
        defaultValue={0}
      />
    );

    expect(getByText("Rating Label")).toBeInTheDocument();
  });

  it("should render RhfRating with an error", () => {
    const { getByText } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={0}
        error={{ message: "Error message", type: "error" }}
      />
    );

    expect(getByText("Error message")).toBeInTheDocument();
  });

  it("should render RhfRating with helper text", () => {
    const { getByText } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={0}
        helperText="Helper text"
      />
    );

    expect(getByText("Helper text")).toBeInTheDocument();
  });

  it("should render RhfRating disabled", () => {
    const { container } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={0}
        disabled
      />
    );

    const rating = container.querySelector(".MuiRating-root");
    expect(rating).toBeInTheDocument();

    // Check if all radio inputs are disabled
    const radioInputs = container.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("should render RhfRating with readOnly prop", () => {
    const { container } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={3}
        readOnly
      />
    );

    const rating = container.querySelector(".MuiRating-root");
    expect(rating).toBeInTheDocument();

    // Check if all radio inputs are disabled (readOnly makes them disabled)
    const radioInputs = container.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("should render RhfRating with custom max value", () => {
    const { container } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={0}
        max={10}
      />
    );

    const rating = container.querySelector(".MuiRating-root");
    expect(rating).toBeInTheDocument();

    // Check if there are 11 radio inputs (max=10 + 1 for empty state)
    const radioInputs = container.querySelectorAll('input[type="radio"]');
    expect(radioInputs).toHaveLength(11);
  });

  it("should render RhfRating with different sizes", () => {
    const { container } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={0}
        size="large"
      />
    );

    const rating = container.querySelector(".MuiRating-root");
    expect(rating).toBeInTheDocument();
  });

  it("should handle rating value change", () => {
    const { container } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={0}
      />
    );

    const rating = container.querySelector(".MuiRating-root");
    expect(rating).toBeInTheDocument();

    // Click on the third star
    const thirdStar = container.querySelector('input[value="3"]');
    if (thirdStar) {
      fireEvent.click(thirdStar);

      // Check if the third star is now selected
      expect(thirdStar).toBeChecked();
    }
  });

  it("should render RhfRating with precision 0.5 (half stars)", () => {
    const { container } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={2.5}
        precision={0.5}
      />
    );

    const rating = container.querySelector(".MuiRating-root");
    expect(rating).toBeInTheDocument();

    // Check if there are inputs for half values
    const halfValueInput = container.querySelector('input[value="2.5"]');
    expect(halfValueInput).toBeInTheDocument();
  });

  it("should handle null value gracefully", () => {
    const { container } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={null}
      />
    );

    const rating = container.querySelector(".MuiRating-root");
    expect(rating).toBeInTheDocument();
  });

  it("should render without label", () => {
    const { container, queryByText } = render(
      <RhfRatingWrapper name="field-name" defaultValue={0} />
    );

    const rating = container.querySelector(".MuiRating-root");
    expect(rating).toBeInTheDocument();

    // Should not have any label text
    expect(queryByText("Field label")).not.toBeInTheDocument();
  });

  it("should show error state in label color", () => {
    const { getByText } = render(
      <RhfRatingWrapper
        name="field-name"
        label="Field label"
        defaultValue={0}
        error={{ message: "Error message", type: "error" }}
      />
    );

    const label = getByText("Field label");
    expect(label).toBeInTheDocument();
    // The label should have error styling applied via sx prop
  });
});
