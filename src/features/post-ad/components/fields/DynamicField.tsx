import { CategoryField } from "@/types";
import { PostAdSelectField } from "./SelectField";
import { PostAdMultipleChoiceField } from "./MultipleChoiceField";
import { PostAdRangeField } from "./RangeField";
import { PostAdTextareaField } from "./TextareaField";
import { PostAdTextField } from "./TextField";

type DynamicFieldProps = {
  field: CategoryField;
  value: string | number | boolean | string[] | undefined;
  error?: string;
  language: string;
  onChange: (value: string | number | boolean | string[]) => void;
  onMultiSelectChange?: (value: string, checked: boolean) => void;
  allFields?: CategoryField[];
  formData?: Record<string, string | number | boolean | string[]>;
};

export const DynamicField = ({
  field,
  value,
  error,
  language,
  onChange,
  onMultiSelectChange,
  allFields,
  formData,
}: DynamicFieldProps) => {
  const fieldType = field.filterType || field.fieldType || "text";

  // single_choice: dropdown/select
  if (
    fieldType === "single_choice" ||
    fieldType === "select" ||
    fieldType === "dropdown"
  ) {
    return (
      <PostAdSelectField
        field={field}
        value={String(value || "")}
        error={error}
        language={language}
        onChange={onChange}
        allFields={allFields}
        formData={formData}
      />
    );
  }

  // multiple_choice: checkboxes
  if (fieldType === "multiple_choice") {
    const selectedValues = Array.isArray(value) ? value : [];
    return (
      <PostAdMultipleChoiceField
        field={field}
        selectedValues={selectedValues}
        error={error}
        onChange={onMultiSelectChange || (() => {})}
      />
    );
  }

  // range number
  if (fieldType === "range") {
    const rangeValue =
      typeof value === "string" || typeof value === "number" ? value : "";
    return (
      <PostAdRangeField
        field={field}
        value={rangeValue}
        error={error}
        onChange={onChange}
      />
    );
  }

  // textarea
  if (fieldType === "textarea" || fieldType === "text_long") {
    return (
      <PostAdTextareaField
        field={field}
        value={String(value || "")}
        error={error}
        onChange={onChange}
      />
    );
  }

  // Default: text input
  return (
    <PostAdTextField
      field={field}
      value={String(value || "")}
      error={error}
      onChange={onChange}
    />
  );
};
