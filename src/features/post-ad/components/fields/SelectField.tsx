import { CategoryField, CategoryFieldChoice } from "@/types";
import {
  SelectField as SharedSelectField,
  SelectOption,
} from "@/shared/components/ui/SelectField";

type PostAdSelectFieldProps = {
  field: CategoryField;
  value: string;
  error?: string;
  language: string;
  onChange: (value: string) => void;
  allFields?: CategoryField[];
  formData?: Record<string, string | number | boolean | string[]>;
};

export const PostAdSelectField = ({
  field,
  value,
  error,
  language,
  onChange,
}: PostAdSelectFieldProps) => {
  const fieldKey = field.attribute || field.key || "";
  const fieldLabel = field.name || field.label || "";
  const isMandatory = field.isMandatory || field.required || false;

  const choices: CategoryFieldChoice[] =
    field.choices ||
    field.values?.map((v) => ({ value: v.key, label: v.label })) ||
    [];

  const options: SelectOption[] = choices.map((choice) => ({
    value: choice.value,
    label: choice.label,
  }));

  const placeholder =
    language === "ar" ? `اختر ${fieldLabel}` : `Select ${fieldLabel}`;

  return (
    <SharedSelectField
      name={fieldKey}
      label={fieldLabel}
      value={value}
      placeholder={placeholder}
      error={error}
      required={isMandatory}
      options={options}
      onChange={onChange}
    />
  );
};
