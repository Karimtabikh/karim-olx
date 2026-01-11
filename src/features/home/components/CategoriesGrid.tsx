import Link from "next/link";
import styles from "../styles/CategoriesGrid.module.css";

import { useTranslation } from "@/shared/hooks/useTranslation";
import Image from "next/image";
import { OLXCategory } from "@/types";

type CategoriesGridProps = {
  categories: OLXCategory[];
};

const categoryIcons: Record<string, string> = {
  vehicles: "/categories/vehicles.png",
  properties: "/categories/property.png",
  "mobile-phones-accessories": "/categories/mobile-phones-accessories.png",
  "electronics-home-appliances": "/categories/electronics-home-appliances.png",
  "home-furniture-decor": "/categories/home-furniture-decor.png",
  "business-industrial": "/categories/business-industrial.png",
  pets: "/categories/pets.png",
  "kids-babies": "/categories/kids-babies.png",
  "sports-equipment": "/categories/sports-equipment.png",
  "hobbies-music-art-books": "/categories/hobbies-music-art-books.png",
  jobs: "/categories/jobs.png",
  "fashion-beauty": "/categories/fashion-beauty.png",
  services: "/categories/services.png",
};

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  const { language } = useTranslation();
  return (
    <div className={styles.grid}>
      {categories.map((category) => {
        const categoryName =
          language === "ar" ? category.name_l1 : category.name;
        const icon = categoryIcons[category.slug];

        return (
          <Link
            href={`https://www.olx.com.lb/${category.slug}`}
            key={category.id}
            className={styles.link}
          >
            <div className={styles.card}>
              <Image
                src={icon}
                className={styles.icon}
                alt={categoryName}
                width={96}
                height={96}
              />
              <span className={styles.name}>{categoryName}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
