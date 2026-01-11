import Flexbox from "../ui/Flexbox";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Flexbox justify="flex-end">
          <p>Classifieds in Lebanon. © 2006 - {currentYear} OLX</p>
        </Flexbox>
      </div>
    </footer>
  );
}
