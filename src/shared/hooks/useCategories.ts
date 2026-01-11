import { OLXCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";

async function fetchCategories(): Promise<OLXCategory[]> {
  const response = await ky
    .get("https://www.olx.com.lb/api/categories")
    .json<{ data: OLXCategory[] } | OLXCategory[]>();

  if (Array.isArray(response)) {
    return response;
  }
  return response.data || [];
}

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
