'use client';

import { TitleHeader } from '@/components/title-header/title-header';
import styles from './event-home.module.css';
import Image from 'next/image';
import { Button } from '@/components/button/button';
import { LibraryEvent } from '@/services/api/types/event-types';
import React from 'react';
import { eventsService } from '@/services/api/events-service';
import formatLink from '@/functions/formatLink';
import formatDate from '@/functions/fomatDate';

type EventCardProps = {
  eventId: string;
};

export const EventHome = ({ eventId }: EventCardProps) => {
  const [event, setEvent] = React.useState<LibraryEvent>();

  React.useEffect(() => {
    const fetchEvent = async () => {
      const event = await eventsService.getEventsById(eventId);
      setEvent(event);
    };
    fetchEvent();
  }, [eventId]);

  if (!event) {
    return null;
  }

  return (
    <div className={styles.eventHomeContainer}>
      <TitleHeader title="Events" />
      <div className={styles.eventContainer}>
        <h2 className={styles.eventTitle}>{event?.title}</h2>
        <div className={styles.eventImage}>
          <Image
            width={1020}
            height={400}
            src={formatLink(event?.banner, 'pictures')}
            alt="event"
          />
        </div>

        <div className={styles.eventInfos}>
          <div className={styles.eventCol1}>
            <p>
              data: <span>{formatDate(event.date)}</span>
            </p>
            <p>
              location: <span>{event.location}</span>
            </p>
          </div>
          <p className={styles.eventCol2}>
            vagas restantes:<span>{event.seats}</span>
          </p>
        </div>

        <p className={styles.eventDescription}>{event.description}</p>

        <div>
          <Button
            color="#fff"
            background="#EE6C4D"
            padding=".5rem 1.5rem"
            fontSize="1.25rem"
          >
            register
          </Button>
        </div>
      </div>
    </div>
  );
};
