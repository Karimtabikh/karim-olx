import { CategoryField } from "@/types";

export type FormValidationErrors = {
  [key: string]: string;
};

export const validateAdForm = (
  formData: Record<string, string | number | boolean | string[]>,
  visibleFields: CategoryField[],
  t: (key: string) => string
): FormValidationErrors => {
  const newErrors: FormValidationErrors = {};

  if (!formData.title) {
    newErrors.title = t("titleRequired");
  }
  if (!formData.description) {
    newErrors.description = t("descriptionRequired");
  }
  if (!formData.price) {
    newErrors.price = t("priceRequired");
  }
  if (!formData.location) {
    newErrors.location = t("locationRequired");
  }

  visibleFields.forEach((field) => {
    const fieldKey = field.attribute || field.key || "";
    const isMandatory = field.isMandatory || field.required;

    if (isMandatory && !formData[fieldKey]) {
      newErrors[fieldKey] = t("requiredField");
    }

    if (field.filterType === "range" && formData[fieldKey]) {
      const value = Number(formData[fieldKey]);
      if (field.minValue !== undefined && value < field.minValue) {
        newErrors[fieldKey] = `${t("minimum")}: ${field.minValue}`;
      }
      if (field.maxValue !== undefined && value > field.maxValue) {
        newErrors[fieldKey] = `${t("maximum")}: ${field.maxValue}`;
      }
    }
  });

  return newErrors;
};

export const filterVisibleFields = (
  fields: CategoryField[]
): CategoryField[] => {
  const filtered = fields.filter((field) => {
    if (field.roles?.includes("exclude_from_post_an_ad")) {
      return false;
    }
    return true;
  });
  return filtered;
};
