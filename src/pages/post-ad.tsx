import { useState } from "react";
import type { GetServerSideProps } from "next";
import Layout from "@/shared/components/layout/Layout";
import { CategorySelector } from "@/features/post-ad/components/CategorySelector";
import { AdForm } from "@/features/post-ad/components/AdForm";
import { fetchCategories, fetchCategoryFields } from "@/lib/api";
import { processCategoryFields } from "@/features/post-ad/utils/fieldUtils";
import { OLXCategory, CategoryField, AdFormData } from "@/types";
import { useTranslation } from "@/shared/hooks/useTranslation";
import styles from "@/styles/PostAd.module.css";

type PostAdPageProps = {
  categories: OLXCategory[];
};

export default function PostAdPage({ categories }: PostAdPageProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<OLXCategory | null>(
    null
  );
  const [categoryFields, setCategoryFields] = useState<CategoryField[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<unknown>(null);

  const handleCategorySelect = async (category: OLXCategory) => {
    setSelectedCategory(category);
    setLoading(true);
    setError(null);

    try {
      const fields = await fetchCategoryFields(category.slug);

      const categoryId = String(category.id);
      const fieldsArray = processCategoryFields(fields, categoryId);

      setCategoryFields(fieldsArray);
    } catch (err) {
      console.error("Error fetching category fields:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (data: AdFormData) => {
    const completeData = {
      category: selectedCategory,
      formData: data,
    };

    setSubmittedData(completeData);
  };

  const handleChangeCategory = () => {
    setSelectedCategory(null);
    setCategoryFields([]);
    setError(null);
    setSubmittedData(null);
  };

  return (
    <Layout title={t("postAd")} description={t("postAd")}>
      <div className={styles.container}>
        {!selectedCategory ? (
          <>
            <h1 className={styles.pageTitle}>{t("postAd")}</h1>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <CategorySelector
              categories={categories}
              onCategorySelect={handleCategorySelect}
              loading={loading}
            />
          </>
        ) : submittedData ? (
          <p>Ad has been submitted successfully.</p>
        ) : (
          <>
            <h1 className={styles.pageTitle}>{t("sellYourAd")}</h1>
            <AdForm
              fields={categoryFields}
              category={selectedCategory}
              onSubmit={handleFormSubmit}
              onChangeCategory={handleChangeCategory}
              loading={loading}
            />
          </>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<
  PostAdPageProps
> = async () => {
  try {
    const categories = await fetchCategories();

    return { props: { categories } };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { props: { categories: [] } };
  }
};
