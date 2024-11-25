import { Hero } from '@/components/pages/main/hero/hero';
import styles from './page.module.css';
import { Events } from '@/components/pages/main/events/events';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <Events />
      </main>
    </div>
  );
}
