import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RhfColorPicker } from "./index";
import { ColorFormat } from "./RhfColorPicker.types";

const theme = createTheme();

interface TestWrapperProps {
  format?: ColorFormat;
  size?: "small" | "medium" | "large";
  showInput?: boolean;
  showPresets?: boolean;
  showAlpha?: boolean;
  disabled?: boolean;
  hasError?: boolean; // Renamed from error to hasError to avoid confusion
  helperText?: string;
  customPresets?: Array<{ label: string; value: string; group: string }>;
  defaultValue?: string;
  onSubmit?: (data: any) => void;
}

// Test wrapper component
const TestWrapper: React.FC<TestWrapperProps> = ({
  format = "hex",
  size = "medium",
  showInput = true,
  showPresets = true,
  showAlpha = false,
  disabled = false,
  hasError = false,
  helperText,
  customPresets,
  defaultValue = "",
  onSubmit = () => {},
}) => {
  const methods = useForm({
    defaultValues: { color: defaultValue },
  });

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <RhfColorPicker
            name="color"
            control={methods.control}
            label="Test Color Picker"
            format={format}
            size={size}
            showInput={showInput}
            showPresets={showPresets}
            showAlpha={showAlpha}
            disabled={disabled}
            // Create a FieldError object if hasError is true, using helperText as the error message
            error={
              hasError ? { type: "manual", message: helperText } : undefined
            }
            helperText={hasError ? undefined : helperText}
            presets={customPresets}
          />
        </form>
      </FormProvider>
    </ThemeProvider>
  );
};

describe("RhfColorPicker", () => {
  it("renders with label", () => {
    render(<TestWrapper />);
    expect(screen.getByText("Test Color Picker")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    render(<TestWrapper />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("opens color picker when clicking color button", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const colorButton = screen.getByRole("button", {
      name: /open color picker/i,
    });
    await act(async () => {
      await user.click(colorButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Primary")).toBeInTheDocument();
    });
  });

  it("selects color from presets", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<TestWrapper onSubmit={onSubmit} />);

    const colorButton = screen.getByRole("button", {
      name: /open color picker/i,
    });
    await act(async () => {
      await user.click(colorButton);
    });

    await waitFor(async () => {
      const redColorButton = screen.getByRole("button", { name: /Red/i });
      await act(async () => {
        await user.click(redColorButton);
      });
    });

    // Check if the input value changed
    await waitFor(() => {
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("#f44336");
    });
  });

  it("handles manual color input", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const input = screen.getByRole("textbox");
    await act(async () => {
      await user.clear(input);
      await user.type(input, "#123456");
    });

    expect(input).toHaveValue("#123456");
  });

  it("converts colors to RGB format", () => {
    render(<TestWrapper format="rgb" defaultValue="#ff0000" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("rgb(255, 0, 0)");
  });

  it("converts colors to HSL format", () => {
    render(<TestWrapper format="hsl" defaultValue="#ff0000" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("hsl(0, 100%, 50%)");
  });

  it("displays error state", () => {
    // Create a custom test with useForm to properly simulate React Hook Form errors
    const TestErrorComponent = () => {
      const methods = useForm();

      React.useEffect(() => {
        methods.setError("color", {
          type: "required",
          message: "This field is required",
        });
      }, []);

      return (
        <ThemeProvider theme={theme}>
          <form>
            <RhfColorPicker
              name="color"
              control={methods.control}
              label="Test Color Picker"
            />
          </form>
        </ThemeProvider>
      );
    };

    render(<TestErrorComponent />);

    // Check that the error message is displayed
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("disables component when disabled prop is true", () => {
    render(<TestWrapper disabled />);

    const input = screen.getByRole("textbox");
    const colorButton = screen.getByRole("button", {
      name: /open color picker/i,
    });

    expect(input).toBeDisabled();
    expect(colorButton).toBeDisabled();
  });

  it("clears color value", async () => {
    const user = userEvent.setup();
    render(<TestWrapper defaultValue="#ff0000" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("#ff0000");

    // Clear the input
    await act(async () => {
      await user.clear(input);
    });

    expect(input).toHaveValue("");
  });

  it("renders without input field when showInput is false", () => {
    render(<TestWrapper showInput={false} />);

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open color picker/i })
    ).toBeInTheDocument();
  });

  it("handles different sizes", () => {
    const { rerender } = render(<TestWrapper size="small" />);
    let input = screen.getByRole("textbox");
    expect(input).toHaveClass("MuiInputBase-inputSizeSmall");

    rerender(<TestWrapper size="medium" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveClass("MuiInputBase-input");

    rerender(<TestWrapper size="large" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveClass("MuiInputBase-inputSizeLarge");
  });

  it("renders custom presets", async () => {
    const user = userEvent.setup();
    const customPresets = [
      { label: "Custom Red", value: "#cc0000", group: "Custom" },
      { label: "Custom Blue", value: "#0000cc", group: "Custom" },
    ];

    render(<TestWrapper customPresets={customPresets} />);

    const colorButton = screen.getByRole("button", {
      name: /open color picker/i,
    });
    await act(async () => {
      await user.click(colorButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Custom")).toBeInTheDocument();
    });
  });

  it("validates hex color input", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const colorButton = screen.getByRole("button", {
      name: /open color picker/i,
    });
    await act(async () => {
      await user.click(colorButton);
    });

    await waitFor(async () => {
      const hexInput = screen.getByPlaceholderText(
        "Enter hex color (e.g., #ff0000)"
      );
      await act(async () => {
        await user.type(hexInput, "invalid");
        fireEvent.keyDown(hexInput, { key: "Enter" });
      });
    });

    // Should still show the popover with invalid input
    expect(screen.getByText("Primary")).toBeInTheDocument();
  });

  it("enters valid hex color and submits with Enter", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const colorButton = screen.getByRole("button", {
      name: /open color picker/i,
    });
    await act(async () => {
      await user.click(colorButton);
    });

    await waitFor(async () => {
      const hexInput = screen.getByPlaceholderText(
        "Enter hex color (e.g., #ff0000)"
      );
      await act(async () => {
        await user.type(hexInput, "#123abc");
        fireEvent.keyDown(hexInput, { key: "Enter" });
      });
    });

    // Check if the main input was updated
    await waitFor(() => {
      const mainInput = screen.getByRole("textbox");
      expect(mainInput).toHaveValue("#123abc");
    });
  });

  it("hides presets when showPresets is false", async () => {
    const user = userEvent.setup();
    render(<TestWrapper showPresets={false} />);

    const colorButton = screen.getByRole("button", {
      name: /open color picker/i,
    });
    await act(async () => {
      await user.click(colorButton);
    });

    await waitFor(() => {
      expect(screen.queryByText("Primary")).not.toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Enter hex color (e.g., #ff0000)")
      ).toBeInTheDocument();
    });
  });

  it("shows alpha slider when showAlpha is true", async () => {
    const user = userEvent.setup();
    render(<TestWrapper showAlpha format="rgb" defaultValue="#ff0000" />);

    const colorButton = screen.getByRole("button", {
      name: /open color picker/i,
    });
    await act(async () => {
      await user.click(colorButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Opacity: 100%")).toBeInTheDocument();
      expect(
        screen.getByRole("slider", { name: /Color opacity/i })
      ).toBeInTheDocument();
    });
  });
});
