import { OLXCategory } from "@/types";
import { CategoryCard } from "./CategoryCard";
import styles from "../styles/CategorySelector.module.css";

type CategoryGridProps = {
  categories: OLXCategory[];
  onCategorySelect: (category: OLXCategory) => void;
};

export const CategoryGrid = ({
  categories,
  onCategorySelect,
}: CategoryGridProps) => {
  return (
    <div className={styles.cardGrid}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={onCategorySelect}
        />
      ))}
    </div>
  );
};
