import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  IconButton,
  Chip,
  Paper,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import {
  CloudUpload,
  Delete,
  InsertDriveFile,
  Image as ImageIcon,
} from "@mui/icons-material";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { RhfFileUploadProps, UploadedFile } from "./RhfFileUpload.types";
import { getErrorText, hasError } from "../../types/base";

const RhfFileUpload = <
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
  maxFiles = 1,
  maxSize,
  multiple = false,
  showPreview = true,
  validate,
  onFilesChange,
  showProgress = false,
  onUpload,
  fullWidth = true,
  height = 200,
  placeholder = "Arraste arquivos aqui ou clique para selecionar",
}: RhfFileUploadProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value },
    fieldState: { error: fieldError },
  } = useController({ control, name, defaultValue });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayText = getErrorText(fieldError || error, helperText);
  const isError = hasError(fieldError || error);

  // Generate unique ID for files
  const generateFileId = useCallback(() => {
    return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Create preview URL for images
  const createPreview = useCallback((file: File): string | undefined => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return undefined;
  }, []);

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

  // Handle file processing
  const processFiles = useCallback(
    async (files: FileList) => {
      const filesArray = Array.from(files);
      const totalFiles = uploadedFiles.length + filesArray.length;

      if (totalFiles > maxFiles) {
        return `Máximo de ${maxFiles} arquivo(s) permitido(s)`;
      }

      // Validate all files first
      for (const file of filesArray) {
        const validationError = validateFile(file);
        if (validationError) {
          return validationError;
        }
      }

      // Custom validation if provided
      if (validate) {
        const customValidation = validate(filesArray);
        if (typeof customValidation === "string") {
          return customValidation;
        }
        if (customValidation === false) {
          return "Arquivos inválidos";
        }
      }

      // Create uploaded file objects
      const newUploadedFiles: UploadedFile[] = filesArray.map((file) => ({
        id: generateFileId(),
        file,
        preview: showPreview ? createPreview(file) : undefined,
        progress: 0,
        uploaded: false,
      }));

      const updatedFiles = [...uploadedFiles, ...newUploadedFiles];
      setUploadedFiles(updatedFiles);

      // Update form value
      const formValue = multiple ? updatedFiles : updatedFiles[0] || null;
      onChange(formValue);

      // Callback
      if (onFilesChange) {
        onFilesChange(updatedFiles);
      }

      // Handle upload if provided
      if (onUpload) {
        for (const uploadedFile of newUploadedFiles) {
          try {
            await onUpload(uploadedFile.file);
            setUploadedFiles((prev) =>
              prev.map((f) =>
                f.id === uploadedFile.id
                  ? { ...f, uploaded: true, progress: 100 }
                  : f
              )
            );
          } catch (error) {
            setUploadedFiles((prev) =>
              prev.map((f) =>
                f.id === uploadedFile.id
                  ? { ...f, error: "Erro no upload", progress: 0 }
                  : f
              )
            );
          }
        }
      }

      return null;
    },
    [
      uploadedFiles,
      maxFiles,
      validateFile,
      validate,
      generateFileId,
      showPreview,
      createPreview,
      multiple,
      onChange,
      onFilesChange,
      onUpload,
    ]
  );

  // Handle file selection
  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const error = await processFiles(files);
        if (error) {
          // TODO: Show error message - could be handled by parent component
          console.error(error);
        }
      }
      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [processFiles]
  );

  // Handle drag and drop
  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    async (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragOver(false);

      const files = event.dataTransfer.files;
      if (files && files.length > 0) {
        const error = await processFiles(files);
        if (error) {
          console.error(error);
        }
      }
    },
    [processFiles]
  );

  // Remove file
  const removeFile = useCallback(
    (fileId: string) => {
      const updatedFiles = uploadedFiles.filter((f) => f.id !== fileId);
      setUploadedFiles(updatedFiles);

      // Clean up preview URL
      const fileToRemove = uploadedFiles.find((f) => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      // Update form value
      const formValue = multiple ? updatedFiles : updatedFiles[0] || null;
      onChange(formValue);

      if (onFilesChange) {
        onFilesChange(updatedFiles);
      }
    },
    [uploadedFiles, multiple, onChange, onFilesChange]
  );

  // Click handler for upload area
  const handleUploadAreaClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  // Memoized styles
  const uploadAreaStyles = useMemo(
    () => ({
      border: 2,
      borderStyle: "dashed",
      borderColor: isDragOver
        ? "primary.main"
        : isError
        ? "error.main"
        : "grey.300",
      borderRadius: 1,
      padding: 3,
      textAlign: "center" as const,
      cursor: disabled ? "not-allowed" : "pointer",
      backgroundColor: isDragOver
        ? "action.hover"
        : disabled
        ? "action.disabledBackground"
        : "background.paper",
      transition: "all 0.2s ease-in-out",
      height: typeof height === "number" ? `${height}px` : height,
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      minHeight: 120,
    }),
    [isDragOver, isError, disabled, height]
  );

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
        multiple={multiple}
        onChange={handleFileSelect}
        style={{ display: "none" }}
        disabled={disabled}
      />

      {/* Upload area */}
      <Box
        sx={uploadAreaStyles}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadAreaClick}
      >
        <CloudUpload
          sx={{
            fontSize: 48,
            color: isDragOver ? "primary.main" : "text.secondary",
            mb: 2,
          }}
        />
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          {placeholder}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            handleUploadAreaClick();
          }}
        >
          Selecionar Arquivos
        </Button>
        {(maxSize || accept) && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            {accept && `Tipos aceitos: ${accept}`}
            {accept && maxSize && " • "}
            {maxSize && `Tamanho máximo: ${formatFileSize(maxSize)}`}
          </Typography>
        )}
      </Box>

      {/* File list */}
      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {uploadedFiles.map((uploadedFile) => (
            <Paper
              key={uploadedFile.id}
              variant="outlined"
              sx={{ p: 2, mb: 1, display: "flex", alignItems: "center" }}
            >
              {/* File icon or preview */}
              {uploadedFile.preview ? (
                <Box
                  component="img"
                  src={uploadedFile.preview}
                  alt={uploadedFile.file.name}
                  sx={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 1,
                    mr: 2,
                  }}
                />
              ) : (
                <Box sx={{ mr: 2 }}>
                  {uploadedFile.file.type.startsWith("image/") ? (
                    <ImageIcon color="primary" />
                  ) : (
                    <InsertDriveFile color="primary" />
                  )}
                </Box>
              )}

              {/* File info */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="body2" noWrap>
                  {uploadedFile.file.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(uploadedFile.file.size)}
                </Typography>

                {/* Upload progress */}
                {showProgress && uploadedFile.progress !== undefined && (
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={uploadedFile.progress}
                      sx={{ height: 4, borderRadius: 2 }}
                    />
                  </Box>
                )}

                {/* Status chips */}
                <Box sx={{ mt: 1 }}>
                  {uploadedFile.uploaded && (
                    <Chip
                      label="Enviado"
                      size="small"
                      color="success"
                      sx={{ mr: 1 }}
                    />
                  )}
                  {uploadedFile.error && (
                    <Chip
                      label={uploadedFile.error}
                      size="small"
                      color="error"
                      sx={{ mr: 1 }}
                    />
                  )}
                </Box>
              </Box>

              {/* Remove button */}
              <IconButton
                size="small"
                color="error"
                onClick={() => removeFile(uploadedFile.id)}
                disabled={disabled}
                aria-label={`delete ${uploadedFile.file.name}`}
              >
                <Delete />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}

      {/* Helper text */}
      {displayText && <FormHelperText>{displayText}</FormHelperText>}
    </FormControl>
  );
};

RhfFileUpload.displayName = "RhfFileUpload";

export default memo(RhfFileUpload);
