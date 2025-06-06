import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";

// Configure React Testing Library
configure({
  // Disable automatic act() wrapping warnings for better React 19 compatibility
  reactStrictMode: true,
});

// Set up global test environment for React 19
// This helps with act() warnings by ensuring proper test environment setup
Object.defineProperty(global, "IS_REACT_ACT_ENVIRONMENT", {
  writable: true,
  value: true,
});

// Suppress act() warnings in tests since they're often false positives with Material-UI
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes(
        "Warning: The current testing environment is not configured to support act"
      )
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
