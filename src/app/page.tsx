import { Hero } from '@/components/pages/main/hero/hero';
import styles from './page.module.css';
import { Events } from '@/components/pages/main/events/events';
import { NewAdditions } from '@/components/pages/main/new-additions/new-additions';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <Events />
        <NewAdditions />
      </main>
    </div>
  );
}
