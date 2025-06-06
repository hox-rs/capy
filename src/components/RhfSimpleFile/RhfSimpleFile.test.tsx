// this component is a simple file upload wrapper that implements useController by react-hook-form
// it provides a more compact alternative to RhfFileUpload, taking the same space as a TextField
// a resumed version of the component implementation is:
//
// <RhfSimpleFile
//   control={control}
//   name="field-name" // used in validations and useForm
//   label="Field label" // label of the field
//   defaultValue={null} // default value of the field
//   error={error} // error object from react-hook-form
//   accept="image/*" // accepted file types
//   maxSize={1024 * 1024 * 5} // maximum file size in bytes
//   buttonText="Select file" // text for the upload button
//   onFileChange={(file) => console.log(file)} // callback when file changes
//   {...props} // rest of the props
// />;
// these are brief tests just to check if the union between these two libs are working
// as they have their own tests, we don't need to test all the cases

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import RhfSimpleFile from "./RhfSimpleFile";
import { useForm } from "react-hook-form";

// create element that implements control and wraps because hooks can only be used inside a component
const RhfSimpleFileWrapper = (props: any) => {
  const { control, setError } = useForm();

  // If error prop is passed, simulate form error state
  React.useEffect(() => {
    if (props.error) {
      setError(props.name, props.error);
    }
  }, [props.error, props.name, setError]);

  return <RhfSimpleFile control={control} {...props} />;
};

// Mock file for testing
const createMockFile = (name: string, size: number, type: string) => {
  const file = new File(["dummy content"], name, { type });
  Object.defineProperty(file, "size", {
    value: size,
    writable: false,
  });
  return file;
};

describe("Testing <RhfSimpleFile />", () => {
  it("should render RhfSimpleFile with few props", () => {
    const { getByRole } = render(
      <RhfSimpleFileWrapper
        name="field-name"
        label="Field label"
        defaultValue={null}
      />
    );

    expect(getByRole("button")).toBeInTheDocument();
    expect(getByRole("button")).toHaveTextContent("Selecionar arquivo");
  });

  it("should render RhfSimpleFile with custom button text", () => {
    const { getByRole } = render(
      <RhfSimpleFileWrapper
        name="field-name"
        label="Field label"
        defaultValue={null}
        buttonText="Upload file"
      />
    );

    expect(getByRole("button")).toHaveTextContent("Upload file");
  });

  it("should render RhfSimpleFile with an error", () => {
    const { getByText } = render(
      <RhfSimpleFileWrapper
        name="field-name"
        label="Field label"
        defaultValue={null}
        error={{ message: "Error message", type: "error" }}
      />
    );

    expect(getByText("Error message")).toBeInTheDocument();
  });

  it("should render RhfSimpleFile with helper text", () => {
    const { getByText } = render(
      <RhfSimpleFileWrapper
        name="field-name"
        label="Field label"
        defaultValue={null}
        helperText="Helper text"
      />
    );

    expect(getByText("Helper text")).toBeInTheDocument();
  });

  it("should render RhfSimpleFile disabled", () => {
    const { getByRole } = render(
      <RhfSimpleFileWrapper
        name="field-name"
        label="Field label"
        defaultValue={null}
        disabled
      />
    );

    expect(getByRole("button")).toBeDisabled();
  });

  it("should show file info when file is selected", async () => {
    const mockFile = createMockFile("test.pdf", 1024, "application/pdf");

    const { getByRole, getByText } = render(
      <RhfSimpleFileWrapper
        name="field-name"
        label="Field label"
        defaultValue={mockFile}
      />
    );

    expect(getByText("test.pdf")).toBeInTheDocument();
    expect(getByText("1 KB")).toBeInTheDocument();
    expect(getByRole("button", { name: /remover/i })).toBeInTheDocument();
  });

  it("should trigger file selection when button is clicked", () => {
    const { getByRole } = render(
      <RhfSimpleFileWrapper
        name="field-name"
        label="Field label"
        defaultValue={null}
      />
    );

    const button = getByRole("button");
    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    // Mock the click method
    const clickSpy = jest
      .spyOn(hiddenInput, "click")
      .mockImplementation(() => {});

    fireEvent.click(button);

    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockRestore();
  });

  it("should show accept and maxSize info when provided", () => {
    const { getByText } = render(
      <RhfSimpleFileWrapper
        name="field-name"
        label="Field label"
        defaultValue={null}
        accept="image/*"
        maxSize={1024 * 1024 * 5}
      />
    );

    expect(getByText(/Tipos aceitos: image\/\*/)).toBeInTheDocument();
    expect(getByText(/Tamanho máximo: 5 MB/)).toBeInTheDocument();
  });

  it("should handle file selection", async () => {
    const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
    const onFileChange = jest.fn();

    const { getByRole } = render(
      <RhfSimpleFileWrapper
        name="field-name"
        label="Field label"
        defaultValue={null}
        onFileChange={onFileChange}
      />
    );

    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    // Simulate file selection
    Object.defineProperty(hiddenInput, "files", {
      value: [mockFile],
      writable: false,
    });

    fireEvent.change(hiddenInput);

    await waitFor(() => {
      expect(onFileChange).toHaveBeenCalledWith(mockFile);
    });
  });

  it("should hide file size when showFileSize is false", () => {
    const mockFile = createMockFile("test.pdf", 1024, "application/pdf");

    const { getByText, queryByText } = render(
      <RhfSimpleFileWrapper
        name="field-name"
        label="Field label"
        defaultValue={mockFile}
        showFileSize={false}
      />
    );

    expect(getByText("test.pdf")).toBeInTheDocument();
    expect(queryByText("1 KB")).not.toBeInTheDocument();
  });

  it("should remove file when remove button is clicked", async () => {
    const mockFile = createMockFile("test.pdf", 1024, "application/pdf");
    const onFileChange = jest.fn();

    const { getByRole, queryByText } = render(
      <RhfSimpleFileWrapper
        name="field-name"
        label="Field label"
        defaultValue={mockFile}
        onFileChange={onFileChange}
      />
    );

    const removeButton = getByRole("button", { name: /remover/i });
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(onFileChange).toHaveBeenCalledWith(null);
    });
  });
});
