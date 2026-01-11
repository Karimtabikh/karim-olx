import Flexbox from "../ui/Flexbox";
import { useTranslation } from "@/shared/hooks/useTranslation";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Flexbox justify="flex-end">
          <p>
            {t("footerText")}. © 2006 - {currentYear} OLX
          </p>
        </Flexbox>
      </div>
    </footer>
  );
}
