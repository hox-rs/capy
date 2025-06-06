import React, { memo, useCallback, useRef, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormHelperText,
  FormLabel,
  Chip,
  IconButton,
} from "@mui/material";
import {
  AttachFile,
  Delete,
  InsertDriveFile,
  Image as ImageIcon,
} from "@mui/icons-material";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfSimpleFileProps } from "./RhfSimpleFile.types";
import { getErrorText, hasError } from "../../types/base";

const RhfSimpleFile = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  defaultValue,
  error,
  helperText,
  disabled,
  accept,
  maxSize,
  validate,
  onFileChange,
  fullWidth = true,
  buttonText = "Selecionar arquivo",
  selectedText = "Arquivo selecionado:",
  showFileSize = true,
  buttonProps,
}: RhfSimpleFileProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value },
    fieldState: { error: fieldError },
  } = useController({ control, name, defaultValue });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayText = getErrorText(fieldError || error, helperText);
  const isError = hasError(fieldError || error);

  // Format file size
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  // Validate file
  const validateFile = useCallback(
    (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `Arquivo muito grande. Máximo permitido: ${formatFileSize(
          maxSize
        )}`;
      }

      if (accept) {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const isAccepted = acceptedTypes.some((acceptedType) => {
          if (acceptedType.startsWith(".")) {
            return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
          }
          // Handle MIME type patterns like "image/*"
          if (acceptedType.includes("*")) {
            const pattern = acceptedType.replace("*", ".*");
            return new RegExp(`^${pattern}$`).test(file.type);
          }
          return file.type === acceptedType;
        });

        if (!isAccepted) {
          return `Tipo de arquivo não permitido. Aceitos: ${accept}`;
        }
      }

      return null;
    },
    [accept, maxSize, formatFileSize]
  );

  // Handle file selection
  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;

      if (file) {
        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
          // TODO: In a real app, you might want to show this error in a toast or alert
          console.error(validationError);
          return;
        }

        // Custom validation if provided
        if (validate) {
          const customValidation = validate(file);
          if (typeof customValidation === "string") {
            console.error(customValidation);
            return;
          }
          if (customValidation === false) {
            console.error("Arquivo inválido");
            return;
          }
        }
      }

      onChange(file);

      if (onFileChange) {
        onFileChange(file);
      }

      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onChange, onFileChange, validateFile, validate]
  );

  // Click handler for upload button
  const handleUploadClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  // Remove file
  const handleRemoveFile = useCallback(() => {
    onChange(null);
    if (onFileChange) {
      onFileChange(null);
    }
  }, [onChange, onFileChange]);

  // Get file icon based on type
  const getFileIcon = useCallback((file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon color="primary" />;
    }
    return <InsertDriveFile color="primary" />;
  }, []);

  // File info display
  const fileDisplay = useMemo(() => {
    if (!value) return null;

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          backgroundColor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
          <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
            {getFileIcon(value)}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" noWrap>
              {value.name}
            </Typography>
            {showFileSize && (
              <Typography variant="caption" color="text.secondary">
                {formatFileSize(value.size)}
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton
          size="small"
          color="error"
          onClick={handleRemoveFile}
          disabled={disabled}
          aria-label={`remover ${value.name}`}
        >
          <Delete />
        </IconButton>
      </Box>
    );
  }, [
    value,
    showFileSize,
    formatFileSize,
    getFileIcon,
    handleRemoveFile,
    disabled,
  ]);

  return (
    <FormControl
      fullWidth={fullWidth}
      error={isError}
      disabled={disabled}
      variant="outlined"
    >
      {label && <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        style={{ display: "none" }}
        disabled={disabled}
      />

      {/* Upload button or file display */}
      {!value ? (
        <Button
          variant="outlined"
          onClick={handleUploadClick}
          disabled={disabled}
          startIcon={<AttachFile />}
          fullWidth={fullWidth}
          {...buttonProps}
          sx={{
            justifyContent: "flex-start",
            textAlign: "left",
            height: buttonProps?.size === "small" ? 40 : 56, // Smaller height for small buttons
            border: isError ? "2px solid" : "1px solid",
            borderColor: isError ? "error.main" : "grey.300",
            "&:hover": {
              borderColor: isError ? "error.main" : "primary.main",
            },
            ...buttonProps?.sx,
          }}
        >
          {buttonText}
        </Button>
      ) : (
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
            {selectedText}
          </Typography>
          {fileDisplay}
        </Box>
      )}

      {/* File type and size info */}
      {!value && (accept || maxSize) && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
          {accept && `Tipos aceitos: ${accept}`}
          {accept && maxSize && " • "}
          {maxSize && `Tamanho máximo: ${formatFileSize(maxSize)}`}
        </Typography>
      )}

      {/* Helper text */}
      {displayText && <FormHelperText>{displayText}</FormHelperText>}
    </FormControl>
  );
};

RhfSimpleFile.displayName = "RhfSimpleFile";

export default memo(RhfSimpleFile);
