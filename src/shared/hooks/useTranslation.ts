import { useLanguage } from "@/shared/providers/LanguageProvider";
import { getTranslation } from "@/lib/i18n";

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: Parameters<typeof getTranslation>[0]): string => {
    return getTranslation(key, language);
  };

  return { t, language };
}
