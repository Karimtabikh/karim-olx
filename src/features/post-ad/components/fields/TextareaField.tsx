import { CategoryField } from "@/types";
import { TextareaField as SharedTextareaField } from "@/shared/components/ui/TextareaField";

type PostAdTextareaFieldProps = {
  field: CategoryField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export const PostAdTextareaField = ({
  field,
  value,
  error,
  onChange,
}: PostAdTextareaFieldProps) => {
  const fieldLabel = field.name || field.label || "";
  const isMandatory = field.isMandatory || field.required || false;

  return (
    <SharedTextareaField
      label={fieldLabel}
      value={value}
      placeholder={field.placeholder}
      error={error}
      required={isMandatory}
      onChange={onChange}
      rows={4}
    />
  );
};
