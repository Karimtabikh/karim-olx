import { Ad } from "@/types";
import formatPrice from "@/lib/formatPrice";
import Flexbox from "@/shared/components/ui/Flexbox";
import styles from "../styles/AdCard.module.css";
import Image from "next/image";

export type AdCardProps = {
  ad: Ad;
};

export const AdCard = ({ ad }: AdCardProps) => {
  return (
    <Flexbox direction="column" className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={ad.image}
          alt={ad.title}
          className={styles.image}
          width={300}
          height={200}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.price}>
          {formatPrice(ad.price, ad.currency)}
        </span>
        <h3 className={styles.title}>{ad.title}</h3>
        <Flexbox direction="column" className={styles.meta}>
          <span>{ad.location}</span>
        </Flexbox>
      </div>
    </Flexbox>
  );
};
