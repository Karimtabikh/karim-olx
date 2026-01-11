import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "../styles/FeaturedCarousel.module.css";
import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { language } = useTranslation();

  const featuredImages = [
    "/ads/1.jpg",
    "/ads/2.jpg",
    "/ads/3.jpg",
    "/ads/4.jpg",
    "/ads/5.jpg",
    "/ads/6.jpg",
    "/ads/7.jpg",
  ];

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      onSelect();
    };

    handleSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (language === "ar") {
    return (
      <div className={styles.emblaWrapper}>
        <div className={styles.emblaSlide}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.emblaSlideImg}
              src="/ads/1-ar.jpg"
              alt="Featured ad"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.emblaWrapper}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {featuredImages.map((src) => (
            <div className={styles.emblaSlide} key={src}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.emblaSlideImg}
                  src={src}
                  alt="Featured advertisement"
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {featuredImages.map((_, index) => (
          <button
            key={index}
            type="button"
            className={cn(styles.dot, {
              [styles.dotActive]: index === selectedIndex,
            })}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
