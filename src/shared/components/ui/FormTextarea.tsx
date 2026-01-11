import React from "react";
import { cn } from "@/shared/utils/cn";
import styles from "./FormTextarea.module.css";

export type FormTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    className?: string;
  };

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        ref={ref}
        className={cn(styles.textarea, error && styles.error, className)}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
});

FormTextarea.displayName = "FormTextarea";
