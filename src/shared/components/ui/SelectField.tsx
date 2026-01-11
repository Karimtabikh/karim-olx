import { cn } from "@/shared/utils/cn";
import styles from "./FormSelect.module.css";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  name?: string;
  label?: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
};

export const SelectField = ({
  name,
  label,
  value,
  placeholder,
  error,
  required = false,
  options,
  onChange,
  className,
}: SelectFieldProps) => {
  return (
    <div className={cn(styles.field, className)}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(styles.select, error && styles.inputError)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
