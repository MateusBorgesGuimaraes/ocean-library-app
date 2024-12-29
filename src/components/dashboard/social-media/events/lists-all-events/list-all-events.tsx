'use client';

import styles from './list-all-events.module.css';
import { Button } from '@/components/button/button';
import { GeneralInfosCard } from '@/components/general-infos-card/general-infos-card';
import { Loader } from '@/components/loader/loader';
import { PaginationControls } from '@/components/pagination-controls/pagination-controls';
import formatDate from '@/functions/fomatDate';
import { usePagination } from '@/hooks/useFetch';
import { eventsService } from '@/services/api/events-service';
import { LibraryEventGetAll } from '@/services/api/types/event-types';
import Image from 'next/image';
import { icons } from '../../../../../../public/assets/assets';
import Link from 'next/link';
import { useToastStore } from '@/store/toast-store';
import { ApiError } from '@/services/api/utils/api-error';
import React from 'react';
import { CustomLink } from '@/components/custom-link/custom-link';

export const ListAllEvents = () => {
  const addToast = useToastStore((state) => state.addToast);
  const [events, setEvents] = React.useState<LibraryEventGetAll[]>([]);
  const { data, meta, loading, error, nextPage, prevPage } =
    usePagination<LibraryEventGetAll>({
      fetchFn: eventsService.getAllEvents,
      initialParams: void 0,
      initialPage: 1,
      initialLimit: 4,
      skip: false,
    });

  React.useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await eventsService.deleteEvent(id);
      if (response) {
        addToast({
          title: 'Success',
          message: 'Event deleted successfully!',
          type: 'success',
          duration: 5000,
        });
      }

      setEvents((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      if (error instanceof ApiError) {
        addToast({
          title: 'Error',
          message: error.message,
          type: 'error',
          duration: 5000,
        });
      } else {
        addToast({
          title: 'Error',
          message: 'An unexpected error occurred',
          type: 'error',
          duration: 5000,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div>
        {loading && <Loader />}
        {events &&
          !loading &&
          events.map((item) => (
            <GeneralInfosCard key={item.id}>
              <GeneralInfosCard.Content>
                <GeneralInfosCard.Content.ContentItem
                  label="Id"
                  content={String(item.id)}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="Title"
                  content={`${item.title.slice(0, 20)}...`}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="Location"
                  content={`${item.location.slice(0, 20)}...`}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="Avaible Seats"
                  content={String(item.availableSeats)}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="Seats"
                  content={String(item.seats)}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="Date"
                  content={formatDate(item.date)}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="Created At"
                  content={formatDate(item.createdAt)}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="Updated At"
                  content={formatDate(item.updatedAt)}
                />
              </GeneralInfosCard.Content>
              <GeneralInfosCard.Footer>
                <CustomLink
                  fontSize="1rem"
                  background="#3D5A80"
                  color="#fff"
                  padding=".25rem 1.125rem"
                  href={`/event/${item.id}`}
                >
                  navigate{' '}
                  <Image
                    src={icons.linkIcon}
                    alt="link icon"
                    width={24}
                    height={24}
                  />
                </CustomLink>

                <CustomLink
                  href={`/dashboard/social-media/events/events-registrations/${item.id}`}
                  fontSize="1rem"
                  background="#188929"
                  color="#fff"
                  padding=".25rem 1.125rem"
                >
                  registrations{' '}
                  <Image
                    src={icons.registrationIcon}
                    alt="registration icon"
                    width={24}
                    height={24}
                  />
                </CustomLink>

                <CustomLink
                  fontSize="1rem"
                  background="#EE6C4D"
                  color="#fff"
                  padding=".25rem 1.125rem"
                  href={`/dashboard/social-media/events/edit-event/${item.id}`}
                >
                  update{' '}
                  <Image
                    src={icons.updateIcon}
                    alt="update icon"
                    width={24}
                    height={24}
                  />
                </CustomLink>

                <Button
                  fontSize="1rem"
                  background="#D22B2B"
                  color="#fff"
                  padding=".25rem 1.125rem"
                  onClick={() => handleDelete(item.id)}
                >
                  delete{' '}
                  <Image
                    src={icons.deleteIcon}
                    alt="delete icon"
                    width={24}
                    height={24}
                  />
                </Button>
              </GeneralInfosCard.Footer>
            </GeneralInfosCard>
          ))}
      </div>
      <div>
        <PaginationControls
          prevPage={prevPage}
          nextPage={nextPage}
          page={meta.page}
          totalPages={meta.totalPages}
        />
      </div>
    </div>
  );
};
