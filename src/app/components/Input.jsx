import React from "react";

export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-foreground/80">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`w-full px-4 py-2.5 bg-input-background border border-border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
          transition-all ${className}`}
      />

      {error && (
        <p className="text-destructive text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
