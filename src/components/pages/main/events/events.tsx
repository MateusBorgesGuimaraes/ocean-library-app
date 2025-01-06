import { EventCard } from '@/components/event-card/event-card';
import styles from './events.module.css';
import { LibraryEvent } from '@/services/api/types/event-types';

type EventsProps = {
  events: LibraryEvent[];
};

export const Events = ({ events }: EventsProps) => {
  return (
    <section className={styles.eventsContainer}>
      <div className={styles.eventsHeader}>
        <h1>Events</h1>
        <div>
          <p>
            <span className={styles.dec}></span>available
          </p>
          <p>
            <span className={styles.dec}></span>unavailable
          </p>
        </div>
      </div>

      <div className={styles.eventsCards}>
        {events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </section>
  );
};
