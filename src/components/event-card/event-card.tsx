import styles from './event-card.module.css';
import { LibraryEvent } from '@/services/api/types/event-types';

type EventCardProps = {
  event: LibraryEvent;
};

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <div
      className={styles.cardContainer}
      style={{
        backgroundImage: `url(${`http://localhost:3001/pictures/${event?.banner}`})`,
      }}
    >
      <p className={styles.eventTitle}>{event?.title}</p>

      <div className={styles.footerCard}>
        <button className={styles.register}>participar</button>

        <span className={styles.dec}></span>
      </div>
    </div>
  );
};
