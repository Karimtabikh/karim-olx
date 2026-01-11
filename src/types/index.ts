export type IconProps = {
  width?: number;
  height?: number;
  className?: string;
};

export type LocationDepthLimits = {
  min: number;
  max: number;
};

export type CategoryStatistics = {
  activeCount: number;
};

export type OLXCategory = {
  id: number;
  name: string;
  name_l1: string;
  externalID: string;
  slug: string;
  level: number;
  parentID: number | null;
  displayPriority: number;
  purpose: string;
  roles: string[];
  locationDepthLimits: LocationDepthLimits;
  configurations: Record<string, unknown>;
  statistics: CategoryStatistics;
  paaSections: unknown;
  templateConfigs: unknown;
  templateHashes: unknown;
  children: OLXCategory[];
};

export type CategoriesResponse = {
  data: OLXCategory[];
};

export type CategoryFieldChoice = {
  value: string;
  label: string;
  slug?: string;
  parentID?: string;
};

export type CategoryField = {
  attribute: string;
  name: string;
  filterType: string;
  isMandatory?: boolean;
  roles?: string[];
  choices?: CategoryFieldChoice[];
  minValue?: number;
  maxValue?: number;
  placeholder?: string;
  key?: string;
  label?: string;
  fieldType?: string;
  required?: boolean;
  values?: {
    key: string;
    label: string;
  }[];
};

export type CategoryFields = {
  [categoryId: string]: {
    flatFields?: CategoryField[];
    childrenFields?: CategoryField[];
    parentFieldLookup?: Record<string, string>;
    [fieldName: string]: unknown;
  };
};

export type Ad = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  category: string;
  categorySlug: string;
  image: string;
  images?: string[];
  seller: {
    name: string;
    avatar?: string;
  };
  location?: string;
  createdAt?: string;
  condition?: string;
};

export type AdFormData = {
  category: string;
  categoryId: string;
  [key: string]: string | number | boolean;
};
