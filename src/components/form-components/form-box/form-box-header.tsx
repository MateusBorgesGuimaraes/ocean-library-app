import styles from './form-box.module.css';
import Image, { StaticImageData } from 'next/image';

type FormBoxHeaderProps = {
  title: string;
  image?: StaticImageData | string | undefined;
};

export const FormBoxHeader = ({ title, image }: FormBoxHeaderProps) => {
  return (
    <div className={styles.formBoxHeader}>
      <h1>
        {title}
        {image && (
          <span>
            <Image src={image} alt="logo" width={144} height={54} />
          </span>
        )}
      </h1>
    </div>
  );
};
