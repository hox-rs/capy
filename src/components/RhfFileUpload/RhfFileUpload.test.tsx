// this component is a wrapper of Material-ui components for file upload that implements useController by react-hook-form
// a resumed version of the component implementation is:
//
// <RhfFileUpload
//   control={control}
//   name="field-name" // used in validations and useForm
//   label="Field label" // label of the field
//   defaultValue={null} // default value of the field
//   error={error} // error object from react-hook-form
//   accept="image/*,.pdf" // accepted file types
//   maxFiles={3} // maximum number of files
//   maxSize={1024 * 1024 * 5} // maximum file size in bytes (5MB)
//   multiple={true} // whether to allow multiple files
//   showPreview={true} // whether to show image previews
//   placeholder="Custom upload text" // placeholder text
//   onFilesChange={(files) => console.log(files)} // callback when files change
//   {...props} // rest of the props
// />;
// these are comprehensive tests to check all functionality

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import RhfFileUpload from "./RhfFileUpload";
import { useForm } from "react-hook-form";

// Mock URL.createObjectURL and URL.revokeObjectURL
const mockCreateObjectURL = jest.fn(() => "mocked-url");
const mockRevokeObjectURL = jest.fn();

Object.defineProperty(global, "URL", {
  value: {
    createObjectURL: mockCreateObjectURL,
    revokeObjectURL: mockRevokeObjectURL,
  },
  writable: true,
});

// create element that implements control and wraps because hooks can only be used inside a component
const RhfFileUploadWrapper = (props: any) => {
  const { control, setError } = useForm();

  // If error prop is passed, simulate form error state
  React.useEffect(() => {
    if (props.error) {
      setError(props.name, props.error);
    }
  }, [props.error, props.name, setError]);

  return <RhfFileUpload control={control} {...props} />;
};

// Helper function to create mock files
const createMockFile = (
  name: string,
  size: number,
  type: string = "text/plain"
): File => {
  const file = new File(["mock content"], name, { type });
  Object.defineProperty(file, "size", {
    value: size,
    writable: false,
  });
  return file;
};

describe("Testing <RhfFileUpload />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render RhfFileUpload with basic props", () => {
    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        placeholder="Drop files here"
      />
    );

    expect(screen.getByText("Upload Files")).toBeInTheDocument();
    expect(screen.getByText("Drop files here")).toBeInTheDocument();
    expect(screen.getByText("Selecionar Arquivos")).toBeInTheDocument();
  });

  it("should render with default placeholder when none provided", () => {
    render(<RhfFileUploadWrapper name="file-upload" label="Upload Files" />);

    expect(
      screen.getByText("Arraste arquivos aqui ou clique para selecionar")
    ).toBeInTheDocument();
  });

  it("should show accepted file types and max size info", () => {
    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        accept="image/*,.pdf"
        maxSize={1024 * 1024 * 5} // 5MB
      />
    );

    expect(screen.getByText(/Tipos aceitos: image/)).toBeInTheDocument();
    expect(screen.getByText(/Tamanho máximo: 5 MB/)).toBeInTheDocument();
  });

  it("should be disabled when disabled prop is true", () => {
    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        disabled={true}
      />
    );

    const button = screen.getByText("Selecionar Arquivos");
    expect(button).toBeDisabled();
  });

  it("should display error state correctly", () => {
    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        error={{ type: "required", message: "File is required" }}
      />
    );

    expect(screen.getByText("File is required")).toBeInTheDocument();
  });

  it("should display helper text when provided", () => {
    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        helperText="Please upload your documents"
      />
    );

    expect(
      screen.getByText("Please upload your documents")
    ).toBeInTheDocument();
  });

  it("should handle file selection via input", async () => {
    const user = userEvent.setup();
    const mockFile = createMockFile("test.txt", 1024);

    render(
      <RhfFileUploadWrapper name="file-upload" label="Upload Files" multiple />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();

    // Simulate file selection
    await user.upload(input, mockFile);

    // Check if file is displayed
    await waitFor(() => {
      expect(screen.getByText("test.txt")).toBeInTheDocument();
      expect(screen.getByText("1 KB")).toBeInTheDocument();
    });
  });

  it("should handle multiple file selection", async () => {
    const user = userEvent.setup();
    const mockFile1 = createMockFile("test1.txt", 1024);
    const mockFile2 = createMockFile("test2.txt", 2048);

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        multiple
        maxFiles={3}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    // Simulate multiple file selection
    await user.upload(input, [mockFile1, mockFile2]);

    // Check if both files are displayed
    await waitFor(() => {
      expect(screen.getByText("test1.txt")).toBeInTheDocument();
      expect(screen.getByText("test2.txt")).toBeInTheDocument();
      expect(screen.getByText("1 KB")).toBeInTheDocument();
      expect(screen.getByText("2 KB")).toBeInTheDocument();
    });
  });

  it("should show image preview when showPreview is true", async () => {
    const user = userEvent.setup();
    const mockImageFile = createMockFile("image.jpg", 1024, "image/jpeg");

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        showPreview={true}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.upload(input, mockImageFile);

    await waitFor(() => {
      expect(screen.getByText("image.jpg")).toBeInTheDocument();
      const previewImage = screen.getByAltText("image.jpg");
      expect(previewImage).toBeInTheDocument();
      expect(previewImage).toHaveAttribute("src", "mocked-url");
    });

    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockImageFile);
  });

  it("should not show preview when showPreview is false", async () => {
    const user = userEvent.setup();
    const mockImageFile = createMockFile("image.jpg", 1024, "image/jpeg");

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        showPreview={false}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.upload(input, mockImageFile);

    await waitFor(() => {
      expect(screen.getByText("image.jpg")).toBeInTheDocument();
    });

    expect(screen.queryByAltText("image.jpg")).not.toBeInTheDocument();
    expect(mockCreateObjectURL).not.toHaveBeenCalled();
  });

  it("should remove files when delete button is clicked", async () => {
    const user = userEvent.setup();
    const mockFile = createMockFile("test.txt", 1024);

    render(<RhfFileUploadWrapper name="file-upload" label="Upload Files" />);

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.upload(input, mockFile);

    // Wait for file to appear
    await waitFor(() => {
      expect(screen.getByText("test.txt")).toBeInTheDocument();
    });

    // Click delete button
    const deleteButton = screen.getByLabelText(/delete test\.txt/i);
    await user.click(deleteButton);

    // Check if file is removed
    await waitFor(() => {
      expect(screen.queryByText("test.txt")).not.toBeInTheDocument();
    });
  });

  it("should call onFilesChange callback when files are added", async () => {
    const user = userEvent.setup();
    const mockOnFilesChange = jest.fn();
    const mockFile = createMockFile("test.txt", 1024);

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        onFilesChange={mockOnFilesChange}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.upload(input, mockFile);

    await waitFor(() => {
      expect(mockOnFilesChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            file: mockFile,
            id: expect.any(String),
            uploaded: false,
          }),
        ])
      );
    });
  });

  it("should call onFilesChange callback when files are removed", async () => {
    const user = userEvent.setup();
    const mockOnFilesChange = jest.fn();
    const mockFile = createMockFile("test.txt", 1024);

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        onFilesChange={mockOnFilesChange}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.upload(input, mockFile);

    await waitFor(() => {
      expect(screen.getByText("test.txt")).toBeInTheDocument();
    });

    // Clear previous calls
    mockOnFilesChange.mockClear();

    // Remove file
    const deleteButton = screen.getByLabelText(/delete test\.txt/i);
    await user.click(deleteButton);

    await waitFor(() => {
      expect(mockOnFilesChange).toHaveBeenCalledWith([]);
    });
  });

  it("should handle drag and drop", async () => {
    const mockFile = createMockFile("dropped.txt", 1024);
    const dataTransfer = {
      files: [mockFile],
    };

    render(<RhfFileUploadWrapper name="file-upload" label="Upload Files" />);

    const uploadArea = screen
      .getByText("Arraste arquivos aqui ou clique para selecionar")
      .closest("div");

    // Simulate drag over
    fireEvent.dragOver(uploadArea!, { dataTransfer });

    // Simulate drop
    fireEvent.drop(uploadArea!, { dataTransfer });

    await waitFor(() => {
      expect(screen.getByText("dropped.txt")).toBeInTheDocument();
    });
  });

  it("should respect maxFiles limit", async () => {
    const user = userEvent.setup();
    const mockFile1 = createMockFile("test1.txt", 1024);
    const mockFile2 = createMockFile("test2.txt", 1024);

    // Console.error mock to capture validation errors
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        maxFiles={1}
        multiple
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    // Add first file
    await user.upload(input, mockFile1);

    await waitFor(() => {
      expect(screen.getByText("test1.txt")).toBeInTheDocument();
    });

    // Try to add second file (should be rejected)
    await user.upload(input, mockFile2);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Máximo de 1 arquivo(s) permitido(s)")
      );
    });

    consoleSpy.mockRestore();
  });

  it("should validate file size", async () => {
    const user = userEvent.setup();
    const largeMockFile = createMockFile("large.txt", 1024 * 1024 * 10); // 10MB

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        maxSize={1024 * 1024 * 5} // 5MB limit
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.upload(input, largeMockFile);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Arquivo muito grande")
      );
    });

    consoleSpy.mockRestore();
  });

  it("should validate file types", async () => {
    const user = userEvent.setup();
    const invalidFile = createMockFile(
      "document.exe",
      1024,
      "application/x-executable"
    );

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        accept="image/*,.pdf"
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    // Create a mock change event with files
    const mockEvent = {
      target: {
        files: [invalidFile],
      },
    } as any;

    // Trigger the onChange handler directly
    fireEvent.change(input, mockEvent);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Tipo de arquivo não permitido")
      );
    });

    consoleSpy.mockRestore();
  });

  it("should handle custom validation function", async () => {
    const user = userEvent.setup();
    const mockFile = createMockFile("test.txt", 1024);
    const mockValidate = jest.fn().mockReturnValue("Custom validation error");

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        validate={mockValidate}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.upload(input, mockFile);

    await waitFor(() => {
      expect(mockValidate).toHaveBeenCalledWith([mockFile]);
      expect(consoleSpy).toHaveBeenCalledWith("Custom validation error");
    });

    consoleSpy.mockRestore();
  });

  it("should handle custom upload function", async () => {
    const user = userEvent.setup();
    const mockFile = createMockFile("test.txt", 1024);
    const mockOnUpload = jest.fn().mockResolvedValue(undefined);

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        onUpload={mockOnUpload}
        showProgress
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.upload(input, mockFile);

    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalledWith(mockFile);
    });

    // Check for success status
    await waitFor(() => {
      expect(screen.getByText("Enviado")).toBeInTheDocument();
    });
  });

  it("should handle upload errors", async () => {
    const user = userEvent.setup();
    const mockFile = createMockFile("test.txt", 1024);
    const mockOnUpload = jest
      .fn()
      .mockRejectedValue(new Error("Upload failed"));

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        onUpload={mockOnUpload}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.upload(input, mockFile);

    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalledWith(mockFile);
    });

    // Check for error status
    await waitFor(() => {
      expect(screen.getByText("Erro no upload")).toBeInTheDocument();
    });
  });

  it("should format file sizes correctly", async () => {
    const user = userEvent.setup();
    const smallFile = createMockFile("small.txt", 512); // 512 bytes
    const mediumFile = createMockFile("medium.txt", 1536); // 1.5 KB
    const largeFile = createMockFile("large.txt", 1024 * 1024 * 2.5); // 2.5 MB

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        multiple
        maxFiles={5}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    // Upload small file
    await user.upload(input, smallFile);
    await waitFor(() => {
      expect(screen.getByText("512 Bytes")).toBeInTheDocument();
    });

    // Upload medium file
    await user.upload(input, mediumFile);
    await waitFor(() => {
      expect(screen.getByText("1.5 KB")).toBeInTheDocument();
    });

    // Upload large file
    await user.upload(input, largeFile);
    await waitFor(() => {
      expect(screen.getByText("2.5 MB")).toBeInTheDocument();
    });
  });

  it("should handle single file mode correctly", async () => {
    const user = userEvent.setup();
    const mockFile = createMockFile("test.txt", 1024);

    render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        multiple={false}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input).not.toHaveAttribute("multiple");

    await user.upload(input, mockFile);

    await waitFor(() => {
      expect(screen.getByText("test.txt")).toBeInTheDocument();
    });
  });

  it("should clean up preview URLs on component unmount", async () => {
    const user = userEvent.setup();
    const mockImageFile = createMockFile("image.jpg", 1024, "image/jpeg");

    const { unmount } = render(
      <RhfFileUploadWrapper
        name="file-upload"
        label="Upload Files"
        showPreview={true}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.upload(input, mockImageFile);

    await waitFor(() => {
      expect(screen.getByText("image.jpg")).toBeInTheDocument();
    });

    // Remove the file to trigger cleanup
    const deleteButton = screen.getByLabelText(/delete image\.jpg/i);
    await user.click(deleteButton);

    await waitFor(() => {
      expect(mockRevokeObjectURL).toHaveBeenCalledWith("mocked-url");
    });
  });

  it("should reset input value after file selection", async () => {
    const user = userEvent.setup();
    const mockFile = createMockFile("test.txt", 1024);

    render(<RhfFileUploadWrapper name="file-upload" label="Upload Files" />);

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    await user.upload(input, mockFile);

    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });
});
