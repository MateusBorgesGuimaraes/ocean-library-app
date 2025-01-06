import formatLink from '@/functions/formatLink';
import styles from './event-card.module.css';
import { LibraryEvent } from '@/services/api/types/event-types';
import Link from 'next/link';

type EventCardProps = {
  event: LibraryEvent;
};

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <div
      className={styles.cardContainer}
      style={{
        backgroundImage: `url(${formatLink(event?.banner, 'pictures')})`,
      }}
    >
      <p className={styles.eventTitle}>{event?.title}</p>

      <div className={styles.footerCard}>
        <Link href={`/event/${event?.id}`} className={styles.register}>
          participate
        </Link>

        <span className={styles.dec}></span>
      </div>
    </div>
  );
};
