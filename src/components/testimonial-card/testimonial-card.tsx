import Image, { StaticImageData } from 'next/image';
import styles from './testimonial-card.module.css';
import { icons } from '../../../public/assets/assets';

type TestimonialCardProps = {
  text: string;
  image: StaticImageData;
  name: string;
};

export const TestimonialCard = ({
  text,
  image,
  name,
}: TestimonialCardProps) => {
  return (
    <section className={styles.testimonialCard}>
      <div className={styles.testimonialText}>
        <Image src={icons.aspasOpenIcon} alt="aspas open icon" />
        {text}
        <Image
          className={styles.aspasCloseIcon}
          src={icons.aspasCloseIcon}
          alt="aspas close icon"
        />
      </div>

      <div className={styles.testimonialUser}>
        <Image src={image} alt="user photo" />

        <p>{name}</p>
      </div>
    </section>
  );
};
