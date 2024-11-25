import Image from 'next/image';
import styles from './hero.module.css';
import { images } from '../../../../../public/assets/assets';
import { Button } from '../../../button/button';

export const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.content}>
        <h1>Dive into the depths of knowledge</h1>
        <div className={styles.buttons}>
          <Button
            color="#fff"
            background="#EE6C4D"
            padding=".75rem 1.125rem"
            fontSize="1.25rem"
          >
            releases
          </Button>

          <Button
            color="#fff"
            background="#055A8C"
            padding=".75rem 1.125rem"
            fontSize="1.25rem"
          >
            new additions
          </Button>
        </div>
        <p>
          The Ocean Library is a portal to knowledge and imagination. Common
          varied and accessible collection, offers each visitor the chance to
          explore stories, expand knowledge and discover new horizons. Each book
          is an open door to adventures and reflections, making Ocena Library
          the ideal place for all readers and explorers.
        </p>
      </div>

      <div className={styles.decImage}>
        <Image
          src={images.elipseHero}
          alt="hero image"
          width={320}
          height={320}
        />
      </div>
    </div>
  );
};
