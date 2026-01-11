import { cn } from "@/shared/utils/cn";
import styles from "./FormInput.module.css";

type TextFieldProps = {
  name?: string;
  label?: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
  className?: string;
  type?: "text" | "email" | "tel" | "url";
};

export const TextField = ({
  name,
  label,
  value,
  placeholder,
  error,
  required = false,
  onChange,
  className,
  type = "text",
}: TextFieldProps) => {
  return (
    <div className={cn(styles.field, className)}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(styles.input, error && styles.inputError)}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
