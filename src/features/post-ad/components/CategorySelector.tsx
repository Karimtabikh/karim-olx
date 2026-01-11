import { useMemo, useState } from "react";
import { OLXCategory } from "@/types";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { CategoryGrid } from "./CategoryGrid";
import { CategoryList } from "./CategoryList";
import styles from "../styles/CategorySelector.module.css";

type CategorySelectorProps = {
  categories: OLXCategory[];
  onCategorySelect: (category: OLXCategory) => void;
  loading?: boolean;
};

export const CategorySelector = ({
  categories,
  onCategorySelect,
  loading = false,
}: CategorySelectorProps) => {
  const { t } = useTranslation();
  const [activeRoot, setActiveRoot] = useState<OLXCategory | null>(null);
  const [activeChild, setActiveChild] = useState<OLXCategory | null>(null);
  const [activeSubChild, setActiveSubChild] = useState<OLXCategory | null>(
    null
  );

  const parentCategories = useMemo(
    () => categories.filter((cat) => !cat.parentID || cat.parentID === 0),
    [categories]
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{t("loading")}</div>
      </div>
    );
  }

  const getSubcategories = (parentId: number): OLXCategory[] =>
    categories.filter((cat) => cat.parentID === parentId);

  const childCategories = activeRoot ? getSubcategories(activeRoot.id) : [];

  const subChildCategories = activeChild
    ? getSubcategories(activeChild.id)
    : [];

  const handleRootSelect = (category: OLXCategory) => {
    setActiveRoot(category);
    setActiveChild(null);
    setActiveSubChild(null);
  };

  const handleChildSelect = (category: OLXCategory) => {
    setActiveChild(category);
    setActiveSubChild(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("chooseACategoryTitle")}</h2>

      {!activeRoot ? (
        <CategoryGrid
          categories={parentCategories}
          onCategorySelect={handleRootSelect}
        />
      ) : (
        <div className={styles.grid}>
          <CategoryList
            categories={parentCategories}
            activeCategory={activeRoot}
            allCategories={categories}
            showIcons={true}
            onCategoryClick={handleRootSelect}
            onCategorySelect={onCategorySelect}
          />

          {childCategories.length > 0 && (
            <CategoryList
              categories={childCategories}
              activeCategory={activeChild}
              allCategories={categories}
              showIcons={false}
              onCategoryClick={handleChildSelect}
              onCategorySelect={onCategorySelect}
            />
          )}

          {subChildCategories.length > 0 && (
            <CategoryList
              categories={subChildCategories}
              activeCategory={activeSubChild}
              allCategories={categories}
              showIcons={false}
              onCategoryClick={setActiveSubChild}
              onCategorySelect={onCategorySelect}
            />
          )}
        </div>
      )}
    </div>
  );
};
