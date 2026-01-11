import { OLXCategory } from "@/types";
import { ArrowIcon } from "@/shared/components/icons/ArrowIcon";
import styles from "../styles/CategorySelector.module.css";
import Image from "next/image";

type CategoryCardProps = {
  category: OLXCategory;
  onClick: (category: OLXCategory) => void;
};

export const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  return (
    <button className={styles.card} onClick={() => onClick(category)}>
      <div className={styles.cardImageWrapper}>
        <Image
          src={`/categories/${category.slug}.png`}
          alt={category.name}
          className={styles.cardImage}
          width={48}
          height={48}
        />
      </div>
      <span className={styles.cardLabel}>{category.name}</span>
      <span className={styles.cardArrow}>
        <ArrowIcon />
      </span>
    </button>
  );
};
