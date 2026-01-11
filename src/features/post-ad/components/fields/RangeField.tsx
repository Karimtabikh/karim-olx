import { CategoryField } from "@/types";
import { NumberField } from "@/shared/components/ui/NumberField";
import { useTranslation } from "@/shared/hooks/useTranslation";

type PostAdRangeFieldProps = {
  field: CategoryField;
  value: string | number;
  error?: string;
  onChange: (value: string) => void;
};

export const PostAdRangeField = ({
  field,
  value,
  error,
  onChange,
}: PostAdRangeFieldProps) => {
  const { t } = useTranslation();
  const fieldLabel = field.name || field.label || "";
  const isMandatory = field.isMandatory || field.required || false;

  const generateHintText = () => {
    if (field.minValue !== undefined && field.maxValue !== undefined) {
      return `${field.minValue} - ${field.maxValue}`;
    }
    if (field.minValue !== undefined) {
      return `${t("min")}: ${field.minValue}`;
    }
    if (field.maxValue !== undefined) {
      return `${t("max")}: ${field.maxValue}`;
    }
    return "";
  };

  return (
    <NumberField
      label={fieldLabel}
      value={value}
      placeholder={field.placeholder}
      error={error}
      required={isMandatory}
      min={field.minValue}
      max={field.maxValue}
      onChange={onChange}
      showHint={field.minValue !== undefined || field.maxValue !== undefined}
      hintText={generateHintText()}
    />
  );
};
