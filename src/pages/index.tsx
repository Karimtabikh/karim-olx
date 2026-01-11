import type { GetServerSideProps } from "next";
import Layout from "@/shared/components/layout/Layout";
import { AdCard } from "@/features/home/components/AdCard";
import FeaturedCarousel from "@/features/home/components/FeaturedCarousel";
import CategoriesGrid from "@/features/home/components/CategoriesGrid";
import Loader from "@/shared/components/ui/Loader";
import { Ad } from "@/types";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { translations } from "@/lib/i18n";
import useCategories from "@/features/home/hooks/useCategories";
import styles from "@/styles/Home.module.css";
import mobilePhoneData from "../../mobile-phone.json";
import carsForSaleData from "../../cars-for-sale.json";
import apartmentsVillasData from "../../apartments-villas-for-sale.json";
import { transformToAds } from "@/lib/transformToAds";

type HomePageProps = {
  adsByCategory: Record<string, Ad[]>;
};

export default function HomePage({ adsByCategory }: HomePageProps) {
  const { t } = useTranslation();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const getCategoryTranslation = (categoryKey: string) => {
    const translationMap: Record<string, keyof typeof translations.en> = {
      "Cars for Sale": "carsForSale",
      "Apartments & Villas for Sale": "apartmentsVillas",
      "Mobile Phones": "mobilePhones",
    };
    return t(translationMap[categoryKey] || categoryKey);
  };

  return (
    <Layout title={t("home")} description={t("browse")}>
      <div className={styles.container}>
        <FeaturedCarousel />

        <h2 className={styles.sectionTitle}>{t("browseCategories")}</h2>

        {categoriesLoading ? (
          <Loader />
        ) : categories ? (
          <CategoriesGrid categories={categories} />
        ) : (
          <p>{t("noCategories")}</p>
        )}

        {Object.entries(adsByCategory).map(([category, categoryAds]) => (
          <div key={category} className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {getCategoryTranslation(category)}
              </h2>
            </div>
            <div className={styles.grid}>
              {categoryAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const carsAds = transformToAds(
    carsForSaleData,
    "Cars for Sale",
    "cars-for-sale"
  );

  const apartmentsAds = transformToAds(
    apartmentsVillasData,
    "Apartments & Villas for Sale",
    "apartments-villas-for-sale"
  );

  const mobileAds = transformToAds(
    mobilePhoneData,
    "Mobile Phones",
    "mobile-phones"
  );

  const adsByCategory = {
    "Cars for Sale": carsAds,
    "Apartments & Villas for Sale": apartmentsAds,
    "Mobile Phones": mobileAds,
  };

  return {
    props: {
      adsByCategory,
    },
  };
};
