import { cn } from "@/shared/utils/cn";
import styles from "./FormTextarea.module.css";

type TextareaFieldProps = {
  name?: string;
  label?: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  onChange: (value: string) => void;
  className?: string;
};

export const TextareaField = ({
  name,
  label,
  value,
  placeholder,
  error,
  required = false,
  rows = 4,
  onChange,
  className,
}: TextareaFieldProps) => {
  return (
    <div className={cn(styles.field, className)}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(styles.textarea, error && styles.inputError)}
        rows={rows}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
