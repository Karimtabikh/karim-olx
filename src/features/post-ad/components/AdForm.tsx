import { useState, useMemo } from "react";
import { CategoryField, AdFormData, OLXCategory } from "@/types";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { DynamicField } from "./fields/DynamicField";
import { ImageUploader } from "./ImageUploader";
import {
  validateAdForm,
  filterVisibleFields,
  FormValidationErrors,
} from "../utils/formValidation";
import styles from "../styles/AdForm.module.css";
import Flexbox from "@/shared/components/ui/Flexbox";

type AdFormProps = {
  fields: CategoryField[];
  category: OLXCategory;
  onSubmit: (data: AdFormData) => void;
  onChangeCategory: () => void;
  loading?: boolean;
};

export const AdForm = ({
  fields,
  onSubmit,
  onChangeCategory,
  loading = false,
}: AdFormProps) => {
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState<
    Record<string, string | number | boolean | string[]>
  >({});
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormValidationErrors>({});

  const visibleFields = useMemo(() => filterVisibleFields(fields), [fields]);

  const handleFieldChange = (
    fieldKey: string,
    value: string | number | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [fieldKey]: value }));

    if (errors[fieldKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldKey];
        return newErrors;
      });
    }
  };

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
  };

  const validateForm = (): boolean => {
    const newErrors = validateAdForm(
      formData,
      visibleFields,
      t as (key: string) => string
    );
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData as AdFormData);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.section}>
          <Flexbox
            direction="row"
            justify="space-between"
            align="center"
            className={styles.sectionRow}
          >
            <span className={styles.sectionLabel}>{t("category")}</span>
            <button
              type="button"
              className={styles.changeBtn}
              onClick={onChangeCategory}
            >
              {t("change")}
            </button>
          </Flexbox>
        </div>

        <ImageUploader images={images} onImagesChange={handleImagesChange} />

        {visibleFields.length > 0 && (
          <div className={styles.section}>
            {visibleFields.map((field) => {
              const fieldKey = field.attribute || field.key || "";
              return (
                <div key={fieldKey} className={styles.sectionRow}>
                  <DynamicField
                    field={field}
                    value={formData[fieldKey]}
                    error={errors[fieldKey]}
                    language={language}
                    onChange={(value) => handleFieldChange(fieldKey, value)}
                    onMultiSelectChange={(value, checked) => {
                      const currentValues =
                        (formData[fieldKey] as string[]) || [];
                      const newValues = checked
                        ? [...currentValues, value]
                        : currentValues.filter((v) => v !== value);
                      handleFieldChange(fieldKey, newValues);
                    }}
                    allFields={visibleFields}
                    formData={formData}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.submitSection}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? t("submitting") : t("postAdAction")}
          </button>
        </div>
      </form>
    </div>
  );
};
