import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import Flexbox from "../ui/Flexbox";
import { useLanguage } from "@/shared/providers/LanguageProvider";
import { useTranslation } from "@/shared/hooks/useTranslation";
import styles from "./Header.module.css";

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Flexbox direction="row" justify="space-between" align="center">
          <div>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={56}
                height={32}
                priority
              />
            </Link>
          </div>
          <Flexbox justify="space-between" align="center" gap={16}>
            <Button variant="ghost" onClick={toggleLanguage}>
              {language === "en" ? t("arabic") : t("english")}
            </Button>
            <Link href="/post-ad" className={styles.link}>
              {t("postAd")}
            </Link>
          </Flexbox>
        </Flexbox>
      </div>
    </header>
  );
}
