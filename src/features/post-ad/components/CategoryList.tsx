import { OLXCategory } from "@/types";
import { ArrowIcon } from "@/shared/components/icons/ArrowIcon";
import getCategoryIcon from "../hooks/useCategoryIcon";
import Flexbox from "@/shared/components/ui/Flexbox";
import styles from "../styles/CategorySelector.module.css";
import { cn } from "@/shared/utils/cn";

type CategoryListItemProps = {
  category: OLXCategory;
  isActive?: boolean;
  hasChildren?: boolean;
  showIcon?: boolean;
  onClick: (category: OLXCategory) => void;
};

export const CategoryListItem = ({
  category,
  isActive = false,
  hasChildren = false,
  showIcon = false,
  onClick,
}: CategoryListItemProps) => {
  return (
    <button
      className={cn(styles.categoryItem, isActive ? styles.active : "")}
      onClick={() => onClick(category)}
    >
      {showIcon ? (
        <Flexbox align="center" gap={20}>
          {(() => {
            const IconComponent = getCategoryIcon(category.slug);
            return <IconComponent />;
          })()}
          <span className={styles.name}>{category.name}</span>
        </Flexbox>
      ) : (
        <span className={styles.name}>{category.name}</span>
      )}
      {hasChildren && (
        <span className={styles.arrow}>
          <ArrowIcon width={15} height={15} />
        </span>
      )}
    </button>
  );
};

type CategoryListProps = {
  categories: OLXCategory[];
  activeCategory?: OLXCategory | null;
  allCategories: OLXCategory[];
  showIcons?: boolean;
  onCategoryClick: (category: OLXCategory) => void;
  onCategorySelect: (category: OLXCategory) => void;
};

export const CategoryList = ({
  categories,
  activeCategory,
  allCategories,
  showIcons = false,
  onCategoryClick,
  onCategorySelect,
}: CategoryListProps) => {
  const hasChildren = (categoryId: number) =>
    allCategories.some((cat) => cat.parentID === categoryId);

  const handleCategoryClick = (category: OLXCategory) => {
    if (hasChildren(category.id)) {
      onCategoryClick(category);
    } else {
      onCategorySelect(category);
    }
  };

  return (
    <div className={cn(showIcons ? styles.parentColumn : styles.childColumn)}>
      {categories.map((category) => (
        <CategoryListItem
          key={category.id}
          category={category}
          isActive={activeCategory?.id === category.id}
          hasChildren={hasChildren(category.id)}
          showIcon={showIcons}
          onClick={handleCategoryClick}
        />
      ))}
    </div>
  );
};
