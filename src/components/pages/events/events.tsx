'use client';

import { useUserEventStore } from '@/store/user-event-store';
import Image from 'next/image';
import styles from './events.module.css';
import { Button } from '@/components/button/button';
import { TitleHeader } from '@/components/title-header/title-header';
import formatLink from '@/functions/formatLink';
import formatDate from '@/functions/fomatDate';
import { useUserStore } from '@/store/user-store';
import { useToastStore } from '@/store/toast-store';
import { eventsService } from '@/services/api/events-service';
import { ApiError } from 'next/dist/server/api-utils';

export const Events = () => {
  const { userEvents, setUserEvents } = useUserEventStore();
  const { user } = useUserStore();
  const addToast = useToastStore((state) => state.addToast);

  const handleCancelRegistration = async (eventId: string) => {
    if (!user) return;
    try {
      await eventsService.cancelRegistrationToEvent(eventId, user.id);
      try {
        const response = await eventsService.getAllUserEventsRegistrations(
          String(user.id),
        );
        setUserEvents(response);
      } catch (error) {
        if (error instanceof ApiError) {
          addToast({
            title: 'Erro!',
            message: error.message,
            type: 'error',
            duration: 5000,
          });
        } else {
          addToast({
            title: 'Erro!',
            message: 'An unexpected error occurred',
            type: 'error',
            duration: 5000,
          });
        }
      }
      addToast({
        title: 'Success',
        type: 'success',
        message:
          'You have successfully canceled your registration for this event',
        duration: 5000,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        addToast({
          title: 'Erro!',
          message: error.message,
          type: 'error',
          duration: 5000,
        });
      } else {
        addToast({
          title: 'Erro!',
          message: 'An unexpected error occurred',
          type: 'error',
          duration: 5000,
        });
      }
    }
  };

  return (
    <div className={styles.eventsContainer}>
      <TitleHeader title="My events" />

      <div className={styles.eventsCardsContainer}>
        {userEvents?.events.map((event) => (
          <div key={event.event.id} className={styles.eventCard}>
            <div className={styles.eventsImage}>
              <Image
                src={formatLink(event.event.banner, 'pictures')}
                width={300}
                height={300}
                alt="events"
              />
            </div>
            <div className={styles.eventsInfos}>
              <p>
                location: <span> {event.event.location} </span>
              </p>
              <p>
                date: <span>{formatDate(event.event.date)}</span>
              </p>
            </div>
            <Button
              onClick={() => handleCancelRegistration(String(event.event.id))}
              background="#055A8C"
              color="#fff"
              fontSize="1rem"
              padding=".5rem 1rem"
            >
              cancel registration
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
