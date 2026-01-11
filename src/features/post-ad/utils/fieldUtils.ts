import { CategoryField } from "@/types";

interface FieldInput {
  attribute?: string;
  filterType?: string;
  valueType?: string;
  name?: string;
  label?: string;
  isMandatory?: boolean;
  required?: boolean;
  key?: string;
  fieldType?: string;
  [key: string]: unknown;
}

export const normalizeField = (
  field: FieldInput | null | undefined
): CategoryField | null => {
  if (!field || typeof field !== "object" || Array.isArray(field)) {
    return null;
  }

  if (!field.attribute) {
    return null;
  }

  let filterType = field.filterType;
  if (!filterType && field.valueType) {
    switch (field.valueType) {
      case "enum":
        filterType = "single_choice";
        break;
      case "enum_multiple":
        filterType = "multiple_choice";
        break;
      case "integer":
      case "float":
        filterType = "range";
        break;
      case "string":
        filterType = "text";
        break;
      default:
        filterType = "text";
    }
  }

  const label = field.name || field.label || "";

  return {
    ...field,
    attribute: field.attribute,
    name: label,
    filterType: filterType || "",
    isMandatory: field.isMandatory || field.required || false,
    key: field.key || field.attribute,
    label: field.label || label,
    fieldType: field.fieldType || filterType,
    required: field.required || field.isMandatory || false,
  };
};

export const processCategoryFields = (
  fields: Record<string, unknown> | null | undefined,
  categoryId: string
): CategoryField[] => {
  let fieldsArray: CategoryField[] = [];

  if (fields && Object.keys(fields).length > 0) {
    if (fields[categoryId]) {
      const categoryData = fields[categoryId] as Record<string, unknown>;
      if (categoryData.flatFields && Array.isArray(categoryData.flatFields)) {
        fieldsArray = categoryData.flatFields;
      } else {
        console.warn("No flatFields found in category data");
      }
    }
  }

  fieldsArray = fieldsArray
    .map(normalizeField)
    .filter((field): field is CategoryField => field !== null);

  return fieldsArray;
};
