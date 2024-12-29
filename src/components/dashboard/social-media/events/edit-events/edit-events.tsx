'use client';

import { EditEventForm } from '@/components/forms/edit-event-form/edit-event-form';
import { eventsService } from '@/services/api/events-service';
import { LibraryEvent } from '@/services/api/types/event-types';
import React from 'react';

type EditEventsProps = {
  id: string;
};

export const EditEvents = ({ id }: EditEventsProps) => {
  const [event, setEvent] = React.useState<LibraryEvent>();

  React.useEffect(() => {
    const fetchEvent = async () => {
      const response = await eventsService.getEventsById(id);
      setEvent(response);
    };
    fetchEvent();
  }, [id]);

  if (!event) {
    return null;
  }

  return (
    <div>
      <EditEventForm initialData={event} />
    </div>
  );
};
