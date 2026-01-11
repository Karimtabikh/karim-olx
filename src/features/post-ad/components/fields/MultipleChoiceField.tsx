import { CategoryField, CategoryFieldChoice } from "@/types";
import {
  CheckboxGroup,
  CheckboxOption,
} from "@/shared/components/ui/CheckboxGroup";

type PostAdMultipleChoiceFieldProps = {
  field: CategoryField;
  selectedValues: string[];
  error?: string;
  onChange: (value: string, checked: boolean) => void;
};

export const PostAdMultipleChoiceField = ({
  field,
  selectedValues,
  error,
  onChange,
}: PostAdMultipleChoiceFieldProps) => {
  const fieldKey = field.attribute || field.key || "";
  const fieldLabel = field.name || field.label || "";
  const isMandatory = field.isMandatory || field.required || false;

  const choices: CategoryFieldChoice[] =
    field.choices ||
    field.values?.map((v) => ({ value: v.key, label: v.label })) ||
    [];

  const options: CheckboxOption[] = choices.map((choice) => ({
    label: choice.label,
    value: choice.value,
  }));

  return (
    <CheckboxGroup
      name={fieldKey}
      label={fieldLabel}
      selectedValues={selectedValues}
      options={options}
      error={error}
      required={isMandatory}
      onChange={onChange}
    />
  );
};
