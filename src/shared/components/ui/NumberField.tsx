import { cn } from "@/shared/utils/cn";
import styles from "./FormInput.module.css";

type NumberFieldProps = {
  name?: string;
  label?: string;
  value: string | number;
  placeholder?: string;
  error?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: string) => void;
  className?: string;
  showHint?: boolean;
  hintText?: string;
};

export const NumberField = ({
  name,
  label,
  value,
  placeholder,
  error,
  required = false,
  min,
  max,
  step,
  onChange,
  className,
  showHint = false,
  hintText,
}: NumberFieldProps) => {
  const generateHint = () => {
    if (hintText) return hintText;
    if (min !== undefined && max !== undefined) {
      return `${min} - ${max}`;
    }
    if (min !== undefined) return `Min: ${min}`;
    if (max !== undefined) return `Max: ${max}`;
    return "";
  };

  return (
    <div className={cn(styles.field, className)}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type="number"
        name={name}
        placeholder={placeholder}
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        className={cn(styles.input, error && styles.inputError)}
      />
      {showHint && (min !== undefined || max !== undefined || hintText) && (
        <span className={styles.hint}>{generateHint()}</span>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
