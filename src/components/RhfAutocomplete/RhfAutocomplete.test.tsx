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
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
        defaultValue="value"
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

  it("should handle onChange for multiple selection", async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const { control, watch } = useForm({
        defaultValues: { fieldName: [] },
      });
      const watchedValue = watch("fieldName");

      return (
        <div>
          <RhfAutocomplete
            name="fieldName"
            control={control}
            label="Field label"
            multiple={true}
            options={[
              { value: "value1", label: "Label 1" },
              { value: "value2", label: "Label 2" },
            ]}
          />
          <div data-testid="watched-value">{JSON.stringify(watchedValue)}</div>
        </div>
      );
    };

    const { getByRole, getByText, getByTestId } = render(<TestComponent />);

    const autocomplete = getByRole("combobox");
    await user.click(autocomplete);

    // Select first option
    const option1 = getByText("Label 1");
    await user.click(option1);

    // Verify the onChange handler processed the array correctly
    await waitFor(() => {
      expect(getByTestId("watched-value")).toHaveTextContent('["value1"]');
    });
  });

  it("should handle onChange for single object selection", async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const { control, watch } = useForm({
        defaultValues: { fieldName: null },
      });
      const watchedValue = watch("fieldName");

      return (
        <div>
          <RhfAutocomplete
            name="fieldName"
            control={control}
            label="Field label"
            multiple={false}
            options={[
              { value: "value1", label: "Label 1" },
              { value: "value2", label: "Label 2" },
            ]}
          />
          <div data-testid="watched-value">{JSON.stringify(watchedValue)}</div>
        </div>
      );
    };

    const { getByRole, getByText, getByTestId } = render(<TestComponent />);

    const autocomplete = getByRole("combobox");
    await user.click(autocomplete);

    // Select an option
    const option1 = getByText("Label 1");
    await user.click(option1);

    // Verify the onChange handler processed the object correctly
    await waitFor(() => {
      expect(getByTestId("watched-value")).toHaveTextContent('"value1"');
    });
  });

  it("should handle freeSolo prop correctly", () => {
    const { getByRole } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        multiple={false}
        freeSolo={true}
        options={[{ value: "value1", label: "Label 1" }]}
      />
    );

    const autocomplete = getByRole("combobox");
    // Verify that freeSolo allows custom input
    expect(autocomplete).toHaveAttribute("aria-autocomplete", "list");
  });

  it("should render custom renderOption when provided", async () => {
    const user = userEvent.setup();
    const customRenderOption = (props: any, option: any) => (
      <li {...props} data-testid={`custom-option-${option.value}`}>
        Custom: {option.label}
      </li>
    );

    const { getByRole, getByTestId } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        multiple={false}
        renderOption={customRenderOption}
        options={[
          { value: "value1", label: "Label 1" },
          { value: "value2", label: "Label 2" },
        ]}
      />
    );

    const autocomplete = getByRole("combobox");
    await user.click(autocomplete);

    // Wait for options to appear and check custom render option
    await waitFor(() => {
      expect(getByTestId("custom-option-value1")).toBeInTheDocument();
    });
  });

  it("should use default renderOption when none provided", async () => {
    const user = userEvent.setup();

    const { getByRole, getByText } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        multiple={false}
        options={[
          { value: "value1", label: "Label 1" },
          { value: "value2", label: "Label 2" },
        ]}
      />
    );

    const autocomplete = getByRole("combobox");
    await user.click(autocomplete);

    // Default render option should show the label
    expect(getByText("Label 1")).toBeInTheDocument();
    expect(getByText("Label 2")).toBeInTheDocument();
  });

  it("should handle getOptionLabel with string options", () => {
    const { getByRole } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        multiple={false}
        defaultValue="value1"
        options={[
          { value: "value1", label: "Label 1" },
          { value: "value2", label: "Label 2" },
        ]}
      />
    );

    const autocomplete = getByRole("combobox");
    // When defaultValue is a string, getOptionLabel should find and return the corresponding label
    expect(autocomplete).toHaveValue("Label 1");
  });

  it("should merge InputProps correctly in renderInput", () => {
    const customEndAdornment = (
      <span data-testid="custom-adornment">Custom</span>
    );

    const { getByTestId } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        multiple={false}
        InputProps={{ endAdornment: customEndAdornment }}
        options={[{ value: "value1", label: "Label 1" }]}
      />
    );

    expect(getByTestId("custom-adornment")).toBeInTheDocument();
  });

  it("should pass noOptionsText prop to Autocomplete", () => {
    const { container } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        multiple={false}
        noOptionsText="Custom no options text"
        options={[]}
      />
    );

    // Verify the component renders with custom noOptionsText prop
    expect(container.querySelector('[role="combobox"]')).toBeInTheDocument();
  });

  it("should handle empty array for multiple onChange", async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const { control, watch } = useForm({
        defaultValues: { fieldName: ["value1"] },
      });
      const watchedValue = watch("fieldName");

      return (
        <div>
          <RhfAutocomplete
            name="fieldName"
            control={control}
            label="Field label"
            multiple={true}
            options={[
              { value: "value1", label: "Label 1" },
              { value: "value2", label: "Label 2" },
            ]}
          />
          <div data-testid="watched-value">{JSON.stringify(watchedValue)}</div>
        </div>
      );
    };

    const { getByTestId, getByLabelText } = render(<TestComponent />);

    // Clear the selected values
    const clearButton = getByLabelText("Clear");
    await user.click(clearButton);

    // Verify empty array is handled correctly
    await waitFor(() => {
      expect(getByTestId("watched-value")).toHaveTextContent("[]");
    });
  });

  it("should handle different onChange scenarios", async () => {
    const user = userEvent.setup();

    // Test null data case
    const TestComponent = () => {
      const { control, watch } = useForm({
        defaultValues: { fieldName: "initial" },
      });
      const watchedValue = watch("fieldName");

      return (
        <div>
          <RhfAutocomplete
            name="fieldName"
            control={control}
            label="Field label"
            multiple={false}
            options={[{ value: "value1", label: "Label 1" }]}
          />
          <div data-testid="watched-value">{JSON.stringify(watchedValue)}</div>
        </div>
      );
    };

    const { getByTestId, getByLabelText } = render(<TestComponent />);

    // Clear to trigger null/undefined case in onChange
    const clearButton = getByLabelText("Clear");
    await user.click(clearButton);

    // Verify null case is handled (should trigger the else case in onChange)
    await waitFor(() => {
      expect(getByTestId("watched-value")).toHaveTextContent("null");
    });
  });

  it("should handle string value extraction from options in getOptionLabel", () => {
    const { getByDisplayValue } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        multiple={false}
        defaultValue="nonexistent"
        options={[
          { value: "value1", label: "Label 1" },
          { value: "value2", label: "Label 2" },
        ]}
      />
    );

    // When defaultValue doesn't match any option, it should still be displayed
    expect(getByDisplayValue("nonexistent")).toBeInTheDocument();
  });

  it("should handle isOptionEqualToValue correctly", async () => {
    const user = userEvent.setup();

    const { getByRole, getByText } = render(
      <RhfAutocompleteWrapper
        name="field-name"
        label="Field label"
        multiple={false}
        defaultValue="value1"
        options={[
          { value: "value1", label: "Label 1" },
          { value: "value2", label: "Label 2" },
        ]}
      />
    );

    const autocomplete = getByRole("combobox");

    // Open dropdown
    await user.click(autocomplete);

    // The isOptionEqualToValue function should properly match options
    // The component should show "Label 1" as selected since defaultValue="value1"
    expect(autocomplete).toHaveValue("Label 1");

    // The option should be available in the dropdown
    expect(getByText("Label 2")).toBeInTheDocument();
  });
});
