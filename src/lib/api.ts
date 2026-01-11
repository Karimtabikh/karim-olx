import { OLXCategory, CategoryFields } from "@/types";

const API_BASE = "https://www.olx.com.lb/api";

function flattenCategories(
  categories: OLXCategory[],
  parentId: number | null = null
): OLXCategory[] {
  return categories.flatMap((cat) => [
    { ...cat, parentID: cat.parentID ?? parentId },
    ...(cat.children ? flattenCategories(cat.children, cat.id) : []),
  ]);
}

export async function fetchCategories(): Promise<OLXCategory[]> {
  try {
    const response = await fetch(`${API_BASE}/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    return Array.isArray(data)
      ? flattenCategories(data)
      : flattenCategories(data.data || []);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchCategoryFields(
  categorySlug: string,
  options: {
    includeChildCategories?: boolean;
    splitByCategoryIDs?: boolean;
    flatChoices?: boolean;
    groupChoicesBySection?: boolean;
    flat?: boolean;
  } = {}
): Promise<CategoryFields> {
  try {
    const params = new URLSearchParams({
      categorySlugs: categorySlug,
      includeChildCategories: String(options.includeChildCategories ?? true),
      splitByCategoryIDs: String(options.splitByCategoryIDs ?? true),
      flatChoices: String(options.flatChoices ?? true),
      groupChoicesBySection: String(options.groupChoicesBySection ?? true),
      flat: String(options.flat ?? true),
    });

    const response = await fetch(`${API_BASE}/categoryFields?${params}`);
    if (!response.ok) throw new Error("Failed to fetch category fields");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching category fields:", error);
    return {};
  }
}
