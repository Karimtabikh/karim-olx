import { cn } from "@/shared/utils/cn";
import styles from "./FormInput.module.css";

export type CheckboxOption = {
  value: string;
  label: string;
};

type CheckboxGroupProps = {
  name?: string;
  label?: string;
  selectedValues: string[];
  options: CheckboxOption[];
  error?: string;
  required?: boolean;
  onChange: (value: string, checked: boolean) => void;
  className?: string;
};

export const CheckboxGroup = ({
  name,
  label,
  selectedValues,
  options,
  error,
  required = false,
  onChange,
  className,
}: CheckboxGroupProps) => {
  return (
    <div className={cn(styles.field, className)}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.checkboxGroup}>
        {options.map((option) => (
          <label key={option.value} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name={name}
              checked={selectedValues.includes(option.value)}
              onChange={(e) => onChange(option.value, e.target.checked)}
              className={styles.checkbox}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
