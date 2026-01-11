import { Ad } from "@/types";

interface AdInput {
  ad_external_id?: string;
  ad_title?: string;
  ad_price?: number;
  ad_image_url?: string;
  ad_agent_name?: string;
  ad_location_name_en?: string;
  [key: string]: unknown;
}

export function transformToAds(
  jsonData: AdInput[],
  category: string,
  categorySlug: string,
  count: number = 4
): Ad[] {
  return jsonData.slice(0, count).map((item, index) => ({
    id: item.ad_external_id || `${categorySlug}-${index}`,
    title: item.ad_title || "Untitled",
    description: item.ad_title || "",
    price: item.ad_price || 0,
    currency: "$",
    category,
    categorySlug,
    image: item.ad_image_url || "",
    images: item.ad_image_url ? [item.ad_image_url] : [],
    seller: {
      name: item.ad_agent_name || "Unknown",
    },
    location: item.ad_location_name_en || "",
  }));
}
