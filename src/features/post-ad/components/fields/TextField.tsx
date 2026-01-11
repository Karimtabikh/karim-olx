import { CategoryField } from "@/types";
import { TextField as SharedTextField } from "@/shared/components/ui/TextField";

type PostAdTextFieldProps = {
  field: CategoryField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export const PostAdTextField = ({
  field,
  value,
  error,
  onChange,
}: PostAdTextFieldProps) => {
  const fieldLabel = field.name || field.label || "";
  const isMandatory = field.isMandatory || field.required || false;

  return (
    <SharedTextField
      label={fieldLabel}
      value={value}
      placeholder={field.placeholder}
      error={error}
      required={isMandatory}
      onChange={onChange}
    />
  );
};
