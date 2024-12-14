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
import { useToastStore } from '@/store/toast-store';
import { useUserStore } from '@/store/user-store';
import { useUserEventStore } from '@/store/user-event-store';
import { ApiError } from 'next/dist/server/api-utils';

type EventCardProps = {
  eventId: string;
};

export const EventHome = ({ eventId }: EventCardProps) => {
  const [event, setEvent] = React.useState<LibraryEvent>();
  const { user } = useUserStore();
  const { userEvents, setUserEvents } = useUserEventStore();
  const addToast = useToastStore((state) => state.addToast);

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

  const handleRegister = async () => {
    if (!user) {
      addToast({
        title: 'Forbidden',
        type: 'error',
        message: 'You must be logged in to register for an event',
        duration: 5000,
      });
      return;
    }
    try {
      const response = await eventsService.registerUserToEvent(
        eventId,
        user.id,
      );

      if (response) {
        addToast({
          title: 'Success',
          type: 'success',
          message: 'You have successfully registered for this event',
          duration: 5000,
        });
      }

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

  const handleCancelRegistration = async () => {
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
            vagas restantes:
            <span>
              {event.availableSeats}/{event.seats}
            </span>
          </p>
        </div>

        <p className={styles.eventDescription}>{event.description}</p>

        <div>
          {userEvents?.events.find(
            (event) => event.event.id === Number(eventId),
          ) ? (
            <Button
              onClick={handleCancelRegistration}
              color="#fff"
              background="#EE6C4D"
              padding=".5rem 1.5rem"
              fontSize="1.25rem"
            >
              cancel registration
            </Button>
          ) : (
            <Button
              onClick={handleRegister}
              color="#fff"
              background="#EE6C4D"
              padding=".5rem 1.5rem"
              fontSize="1.25rem"
            >
              register
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
