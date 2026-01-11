import { VehicleIcon } from "@/shared/components/icons/VehicleIcon";
import { BikeIcon } from "@/shared/components/icons/BikeIcon";
import { PropertiesIcon } from "@/shared/components/icons/PropertiesIcon";
import { MobileIcon } from "@/shared/components/icons/MobileIcon";
import { FurnitureIcon } from "@/shared/components/icons/FurnitureIcon";
import { FashionIcon } from "@/shared/components/icons/FashionIcon";
import { BookIcon } from "@/shared/components/icons/BookIcon";
import { JobIcon } from "@/shared/components/icons/JobIcon";
import { BusinessIcon } from "@/shared/components/icons/BusinessIcon";
import { ServiceIcon } from "@/shared/components/icons/ServiceIcon";
import { KidIcon } from "@/shared/components/icons/KidIcon";
import { AnimalIcon } from "@/shared/components/icons/AnimalIcon";
import { IconProps } from "@/types";

export const CATEGORY_ICON_RULES: [string, React.FC<IconProps>][] = [
  ["cars", VehicleIcon],
  ["vehicles", VehicleIcon],
  ["properties", PropertiesIcon],
  ["apartments", PropertiesIcon],
  ["mobile-phones-accessories", MobileIcon],
  ["electronics-home-appliances", BusinessIcon],
  ["home-furniture-decor", FurnitureIcon],
  ["fashion-beauty", FashionIcon],
  ["jobs", JobIcon],
  ["pets", AnimalIcon],
  ["business-industrial", BusinessIcon],
  ["services", ServiceIcon],
  ["kids-babies", KidIcon],
  ["sports-equipment", BikeIcon],
  ["hobbies-music-art-books", BookIcon],
];

const DEFAULT_CATEGORY_ICON = ServiceIcon;

export const getCategoryIcon = (slug: string) => {
  const s = slug.toLowerCase();
  for (const [name, Icon] of CATEGORY_ICON_RULES) {
    if (s.includes(name)) {
      return Icon;
    }
  }

  return DEFAULT_CATEGORY_ICON;
};

export default getCategoryIcon;
