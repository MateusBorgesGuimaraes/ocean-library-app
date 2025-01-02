'use client';

import DataTable from '@/components/data-table/data-table';
import styles from './user-events.module.css';
import { TitleHeader } from '@/components/title-header/title-header';
import { eventsService } from '@/services/api/events-service';
import { UserEventRegistration } from '@/services/api/types/event-types';
import React from 'react';
import formatDate from '@/functions/fomatDate';

type UserEventsProps = {
  id: string;
};

interface UserEventsResponse {
  userId: number;
  userName: string;
  totalRegistrations: number;
  events: UserEventRegistration[];
}

export const UserEvents = ({ id }: UserEventsProps) => {
  const [userEvents, setUserEvents] = React.useState<UserEventsResponse | null>(
    null,
  );

  React.useEffect(() => {
    const fetchUserEvents = async () => {
      const response = await eventsService.getAllUserEventsRegistrations(id);
      setUserEvents(response);
    };
    fetchUserEvents();
  }, [id]);

  const USER_EVENTS_DATA = userEvents?.events.map((userEvent) => {
    return {
      eventId: userEvent.event.id,
      expired: userEvent.event.date < new Date().toISOString(),
      registeredAt: formatDate(userEvent.registeredAt),
      attend: userEvent.attended,
    };
  });

  if (!userEvents) {
    return null;
  }

  return (
    <section className={styles.userEvents}>
      <TitleHeader title="User Events" />
      <div>
        <DataTable
          data={USER_EVENTS_DATA ?? []}
          columns={[
            { key: 'eventId', header: 'eventID' },
            { key: 'expired', header: 'Expired' },
            { key: 'registeredAt', header: 'registeredAt' },
            {
              key: 'attend',
              header: 'Attended',
              button: {
                text: 'Mark Attended',
                onClick: async (item) => {
                  await eventsService.attendedEvent(
                    item.eventId,
                    userEvents.userId,
                  );
                  const response =
                    await eventsService.getAllUserEventsRegistrations(id);
                  setUserEvents(response);
                },
                disabled: (item) => item.attend || item.expired,
              },
            },
          ]}
        />
      </div>
    </section>
  );
};
