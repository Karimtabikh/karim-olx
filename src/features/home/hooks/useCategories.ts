import { useQuery } from "@tanstack/react-query";
import type { OLXCategory } from "@/types";

async function fetchCategories(): Promise<OLXCategory[]> {
  const response = await fetch("https://www.olx.com.lb/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await response.json();

  return data || [];
}

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
