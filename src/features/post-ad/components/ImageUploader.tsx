import styles from "../styles/AdForm.module.css";
import { CameraIcon } from "@/shared/components/icons/CameraIcon";
import { useTranslation } from "@/shared/hooks/useTranslation";
import Image from "next/image";

type ImageUploaderProps = {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
};

export const ImageUploader = ({
  images,
  onImagesChange,
  maxImages = 8,
}: ImageUploaderProps) => {
  const { t } = useTranslation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > maxImages) {
      alert(t("maxImagesAllowed").replace("{count}", maxImages.toString()));
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImagesChange([...images, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionRow}>
        <span className={styles.sectionLabel}>{t("uploadImagesLabel")}</span>
        <div className={styles.imageUploader}>
          <div className={styles.imageGrid}>
            <label className={styles.addImageBtn}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className={styles.fileInput}
              />
              <span className={styles.plusIcon}>+</span>
            </label>
            {images.map((img, index) => (
              <div key={index} className={styles.imagePreview}>
                <Image
                  src={img}
                  alt={`Preview ${index + 1}`}
                  width={100}
                  height={100}
                />
                <button
                  type="button"
                  className={styles.removeImageBtn}
                  onClick={() => removeImage(index)}
                >
                  ×
                </button>
              </div>
            ))}
            {Array.from({
              length: Math.max(0, maxImages - 1 - images.length),
            }).map((_, i) => (
              <div key={`empty-${i}`} className={styles.emptySlot}>
                <CameraIcon />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
