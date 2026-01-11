import React from "react";
import { cn } from "@/shared/utils/cn";
import { useTranslation } from "@/shared/hooks/useTranslation";
import styles from "./FormSelect.module.css";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, className = "", ...props }, ref) => {
    const { t } = useTranslation();

    return (
      <div className={styles.container}>
        {label && <label className={styles.label}>{label}</label>}
        <select
          ref={ref}
          className={cn(styles.select, error && styles.error, className)}
          {...props}
        >
          <option value="">{t("selectOption")}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
