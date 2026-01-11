import React from "react";
import { cn } from "@/shared/utils/cn";
import styles from "./FormInput.module.css";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helpText, className = "", ...props }, ref) => {
    return (
      <div className={styles.container}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          ref={ref}
          className={cn(styles.input, error && styles.error, className)}
          {...props}
        />
        {error && <span className={styles.errorText}>{error}</span>}
        {helpText && <span className={styles.helpText}>{helpText}</span>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
