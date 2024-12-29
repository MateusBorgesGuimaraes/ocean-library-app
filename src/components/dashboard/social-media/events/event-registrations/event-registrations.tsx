'use client';

import React from 'react';
import styles from './event-registrations.module.css';
import { eventsService } from '@/services/api/events-service';
import { EventRegistrationDetails } from '@/services/api/types/event-types';
import DataTable, { ColumnConfig } from '@/components/data-table/data-table';
import formatDate from '@/functions/fomatDate';

type EventRegistrationsProps = {
  id: string;
};

export interface TableEventRegistration {
  userId: number;
  name: string;
  registerAt: string;
  attended: boolean;
}

export const EventRegistrations = ({ id }: EventRegistrationsProps) => {
  const [event, setEvent] = React.useState<EventRegistrationDetails | null>();

  React.useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await eventsService.getAllEventsRegistrationsByEventId(
          id,
        );
        setEvent(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEvent();
  }, [id]);

  if (!event) {
    return null;
  }

  const EVENTS_REGISTRATIONS_DATA: TableEventRegistration[] =
    event.registrations.map((registration) => ({
      userId: registration.userId,
      name: registration.username,
      registerAt: formatDate(registration.registeredAt),
      attended: registration.attended,
    }));

  const USERS_LOANS_COLUMNS: ColumnConfig<TableEventRegistration>[] = [
    { key: 'userId', header: 'User ID' },
    { key: 'name', header: 'Name' },
    { key: 'registerAt', header: 'Register At' },
    { key: 'attended', header: 'Attended' },
  ];

  return (
    <div className={styles.eventRegistrationsContainer}>
      <DataTable
        data={EVENTS_REGISTRATIONS_DATA}
        columns={USERS_LOANS_COLUMNS}
      />
    </div>
  );
};
