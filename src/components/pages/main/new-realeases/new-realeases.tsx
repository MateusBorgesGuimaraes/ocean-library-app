import { BookCard } from '@/components/book-card/book-card';
import styles from './new-realeases.module.css';
import { images } from '../../../../../public/assets/assets';

export const NewRealeases = () => {
  return (
    <section className={styles.newRealeasesContainer}>
      <h1 className={styles.newRealeasesTitle}>New Realeases</h1>
      <p className={styles.newRealeasesText}>
        Discover the latest arrivals at Ocean Library! Our New Releases section
        brings you a curated selection of fresh titles across all genres, from
        bestselling novels to insightful non-fiction and everything in between.
      </p>
      <p className={styles.newRealeasesText2}>
        Discover the latest arrivals at Ocean Library!
      </p>
      <div className={styles.newRealeasesCards}>
        <BookCard image={images.coverTest1Image} id={1} />
        <BookCard image={images.coverTest2Image} id={2} />
        <BookCard image={images.coverTest1Image} id={3} />
        <BookCard image={images.coverTest2Image} id={4} />
        <BookCard image={images.coverTest1Image} id={5} />
        <BookCard image={images.coverTest2Image} id={6} />
        <BookCard image={images.coverTest1Image} id={7} />
        <BookCard image={images.coverTest2Image} id={8} />
        <BookCard image={images.coverTest1Image} id={9} />
        <BookCard image={images.coverTest2Image} id={10} />
      </div>
    </section>
  );
};
