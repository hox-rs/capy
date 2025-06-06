import React, { memo, useState, useCallback, useMemo } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
  Paper,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Popover,
  Chip,
  Slider,
} from "@mui/material";
import {
  Palette as PaletteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import {
  RhfColorPickerProps,
  ColorFormat,
  ColorPreset,
} from "./RhfColorPicker.types";
import { getErrorText, hasError } from "../../types/base";

// Default color presets
const DEFAULT_PRESETS: ColorPreset[] = [
  { label: "Red", value: "#f44336", group: "Primary" },
  { label: "Pink", value: "#e91e63", group: "Primary" },
  { label: "Purple", value: "#9c27b0", group: "Primary" },
  { label: "Deep Purple", value: "#673ab7", group: "Primary" },
  { label: "Indigo", value: "#3f51b5", group: "Primary" },
  { label: "Blue", value: "#2196f3", group: "Primary" },
  { label: "Light Blue", value: "#03a9f4", group: "Primary" },
  { label: "Cyan", value: "#00bcd4", group: "Primary" },
  { label: "Teal", value: "#009688", group: "Secondary" },
  { label: "Green", value: "#4caf50", group: "Secondary" },
  { label: "Light Green", value: "#8bc34a", group: "Secondary" },
  { label: "Lime", value: "#cddc39", group: "Secondary" },
  { label: "Yellow", value: "#ffeb3b", group: "Secondary" },
  { label: "Amber", value: "#ffc107", group: "Secondary" },
  { label: "Orange", value: "#ff9800", group: "Secondary" },
  { label: "Deep Orange", value: "#ff5722", group: "Secondary" },
  { label: "Black", value: "#000000", group: "Neutral" },
  { label: "White", value: "#ffffff", group: "Neutral" },
  { label: "Gray", value: "#9e9e9e", group: "Neutral" },
  { label: "Blue Gray", value: "#607d8b", group: "Neutral" },
];

// Color conversion utilities
const hexToRgb = (hex: string, alpha?: number): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  // If alpha is specified, return rgba format
  if (alpha !== undefined) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
};

const hexToHsl = (hex: string, alpha?: number): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // If alpha is specified, return hsla format
  if (alpha !== undefined) {
    return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
      l * 100
    )}%, ${alpha})`;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
};

const convertColor = (
  color: string,
  format: ColorFormat,
  alpha?: number
): string => {
  if (!color || !color.startsWith("#")) return color;

  switch (format) {
    case "rgb":
      return hexToRgb(color, alpha);
    case "hsl":
      return hexToHsl(color, alpha);
    case "hex":
    default:
      // Alpha doesn't affect hex format directly
      return color;
  }
};

const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

const RhfColorPicker = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  defaultValue,
  helperText,
  disabled,
  format = "hex",
  presets = DEFAULT_PRESETS,
  size = "medium",
  showAlpha = false,
  showInput = true,
  showPresets = true,
  placeholder = "Select a color...",
  containerProps,
  onColorChange,
  ...rest
}: RhfColorPickerProps<TFieldValues, TName>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const {
    field: { onChange, value, ref },
    fieldState: { error: fieldError },
  } = useController({ control, name, defaultValue });

  const displayText = getErrorText(fieldError, helperText);
  const isError = hasError(fieldError);
  const isOpen = Boolean(anchorEl);

  const currentColor = value || "";
  // Alpha state for color opacity (0-1)
  const [alphaValue, setAlphaValue] = useState<number>(1);

  const displayValue = useMemo(() => {
    // When input is focused, show the current input value being typed
    if (isInputFocused && inputValue !== "") {
      return inputValue;
    }
    // Otherwise show the converted color value
    return convertColor(
      currentColor,
      format,
      showAlpha ? alphaValue : undefined
    );
  }, [currentColor, format, isInputFocused, inputValue, showAlpha, alphaValue]);

  const handleColorSelect = useCallback(
    (color: string) => {
      const convertedColor = convertColor(
        color,
        format,
        showAlpha ? alphaValue : undefined
      );
      onChange(convertedColor);
      onColorChange?.(convertedColor);
      setAnchorEl(null);
    },
    [onChange, onColorChange, format, showAlpha, alphaValue]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);

      if (isValidHexColor(newValue) || newValue === "") {
        const convertedColor = convertColor(
          newValue,
          format,
          showAlpha ? alphaValue : undefined
        );
        onChange(convertedColor);
        onColorChange?.(convertedColor);
      }
    },
    [onChange, onColorChange, format, showAlpha, alphaValue]
  );

  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
    setInputValue(currentColor);
  }, [currentColor]);

  const handleInputBlur = useCallback(() => {
    setIsInputFocused(false);
    // If the input value is not a valid hex color, revert to the current color
    if (!isValidHexColor(inputValue) && inputValue !== "") {
      setInputValue(currentColor);
    }
  }, [inputValue, currentColor]);

  const handleOpenPicker = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!disabled) {
        setAnchorEl(event.currentTarget);
        setInputValue(currentColor);
      }
    },
    [disabled, currentColor]
  );

  const handleOpenPickerKeyboard = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (!disabled) {
        setAnchorEl(event.currentTarget);
        setInputValue(currentColor);
      }
    },
    [disabled, currentColor]
  );

  const handleClosePicker = useCallback(() => {
    setAnchorEl(null);
    setInputValue("");
  }, []);

  const handleClear = useCallback(() => {
    onChange("");
    onColorChange?.("");
    setInputValue("");
  }, [onChange, onColorChange]);

  const sizeMap = {
    small: { height: 32, iconSize: "small" as const },
    medium: { height: 40, iconSize: "medium" as const },
    large: { height: 48, iconSize: "large" as const },
  };

  const { height, iconSize } = sizeMap[size];

  const groupedPresets = useMemo(() => {
    const groups: Record<string, ColorPreset[]> = {};
    presets.forEach((preset) => {
      const group = preset.group || "Colors";
      if (!groups[group]) groups[group] = [];
      groups[group].push(preset);
    });
    return groups;
  }, [presets]);

  return (
    <FormControl
      error={isError}
      disabled={disabled}
      fullWidth
      {...containerProps}
    >
      {label && (
        <FormLabel sx={{ mb: 1, color: isError ? "error.main" : "inherit" }}>
          {label}
        </FormLabel>
      )}

      <Box>
        {showInput && (
          <TextField
            ref={ref}
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            disabled={disabled}
            error={isError}
            size={size === "large" ? "medium" : size}
            fullWidth
            InputProps={{
              className:
                size === "large" ? "MuiInputBase-inputSizeLarge" : undefined,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={handleOpenPicker}
                    disabled={disabled}
                    size={iconSize}
                    aria-label="Open color picker"
                    sx={{
                      width: 24,
                      height: 24,
                      backgroundColor: currentColor || "#f5f5f5",
                      border: "1px solid",
                      borderColor: currentColor ? "transparent" : "grey.300",
                      "&:hover": {
                        backgroundColor: currentColor || "#eeeeee",
                      },
                    }}
                  >
                    {currentColor ? null : <PaletteIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: currentColor && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClear}
                    disabled={disabled}
                    size="small"
                    aria-label="Clear color"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{
              className:
                size === "large" ? "MuiInputBase-inputSizeLarge" : undefined,
            }}
          />
        )}

        {!showInput && (
          <Box
            onClick={handleOpenPicker}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label="Open color picker"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenPickerKeyboard(e);
              }
            }}
            sx={{
              width: "100%",
              height,
              border: "1px solid",
              borderColor: isError ? "error.main" : "grey.300",
              borderRadius: 1,
              backgroundColor: currentColor || "#f5f5f5",
              cursor: disabled ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                borderColor: disabled ? "grey.300" : "primary.main",
              },
              "&:focus": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            {!currentColor && (
              <PaletteIcon color={disabled ? "disabled" : "action"} />
            )}
          </Box>
        )}

        <Popover
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClosePicker}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Paper sx={{ p: 2, maxWidth: 320 }}>
            {showPresets && (
              <>
                {Object.entries(groupedPresets).map(
                  ([groupName, groupPresets]) => (
                    <Box key={groupName} sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 1, display: "block" }}
                      >
                        {groupName}
                      </Typography>{" "}
                      <Grid container spacing={0.5}>
                        {groupPresets.map((preset) => (
                          <Grid key={preset.value}>
                            <Box
                              role="button"
                              tabIndex={0}
                              aria-label={preset.label}
                              onClick={() => handleColorSelect(preset.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleColorSelect(preset.value);
                                }
                              }}
                              sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: preset.value,
                                border: "1px solid",
                                borderColor: "grey.300",
                                borderRadius: 0.5,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                  transform: "scale(1.1)",
                                  borderColor: "primary.main",
                                  zIndex: 1,
                                },
                                "&:focus": {
                                  outline: "2px solid",
                                  outlineColor: "primary.main",
                                  outlineOffset: "2px",
                                },
                                transition: "all 0.2s",
                              }}
                              title={preset.label}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )
                )}
              </>
            )}

            <TextField
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && isValidHexColor(inputValue)) {
                  handleColorSelect(inputValue);
                }
              }}
              placeholder="Enter hex color (e.g., #ff0000)"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: inputValue && isValidHexColor(inputValue) && (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: inputValue,
                        border: "1px solid",
                        borderColor: "grey.300",
                        borderRadius: 0.5,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {/* Alpha slider shown when showAlpha is enabled */}
            {showAlpha && (
              <Box sx={{ mt: 2, px: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 1, display: "block" }}
                >
                  Opacity: {Math.round(alphaValue * 100)}%
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    0%
                  </Typography>
                  <Slider
                    value={alphaValue}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(_, newValue) =>
                      setAlphaValue(newValue as number)
                    }
                    aria-label="Color opacity"
                    size="small"
                    sx={{ mx: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    100%
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Popover>
      </Box>

      {displayText && <FormHelperText>{displayText}</FormHelperText>}
    </FormControl>
  );
};

// Memoize the component for performance
export default memo(RhfColorPicker) as typeof RhfColorPicker;
