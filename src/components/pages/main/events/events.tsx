import { EventCard } from '@/components/event-card/event-card';
import styles from './events.module.css';

export const Events = () => {
  return (
    <section className={styles.eventsContainer}>
      <div className={styles.eventsHeader}>
        <h1>Events</h1>
        <div>
          <p>
            <span className={styles.dec}></span>disponivel
          </p>
          <p>
            <span className={styles.dec}></span>indiponivel
          </p>
        </div>
      </div>

      <div className={styles.eventsCards}>
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </section>
  );
};
