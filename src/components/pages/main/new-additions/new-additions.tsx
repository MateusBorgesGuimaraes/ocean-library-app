import { BookCard } from '@/components/book-card/book-card';
import styles from './new-additions.module.css';
import { images } from '../../../../../public/assets/assets';

export const NewAdditions = () => {
  return (
    <section className={styles.newAdditionsContainer}>
      <h1 className={styles.newAdditionsTitle}>New Additions</h1>
      <div className={styles.newAdditionsCards}>
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
