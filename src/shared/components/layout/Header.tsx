import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import Flexbox from "../ui/Flexbox";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Flexbox justify="space-between" align="center">
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
            <Button variant="primary">English</Button>
            <Link href="/post-ad" className={styles.link}>
              Post an ad
            </Link>
          </Flexbox>
        </Flexbox>
      </div>
    </header>
  );
}
