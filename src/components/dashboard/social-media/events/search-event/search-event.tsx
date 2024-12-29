'use client';

import styles from './search-event.module.css';
import { Button } from '@/components/button/button';
import { CustomLink } from '@/components/custom-link/custom-link';
import { CleanInput } from '@/components/form-components/input/clean-input';
import { GeneralInfosCard } from '@/components/general-infos-card/general-infos-card';
import formatDate from '@/functions/fomatDate';
import { LibraryEventGetAll } from '@/services/api/types/event-types';
import Image from 'next/image';
import React from 'react';
import { icons } from '../../../../../../public/assets/assets';
import { eventsService } from '@/services/api/events-service';
import { useToastStore } from '@/store/toast-store';
import { ApiError } from '@/services/api/utils/api-error';

export const SearchEvent = () => {
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<LibraryEventGetAll[] | []>([]);
  const addToast = useToastStore((state) => state.addToast);

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

      if (results) {
        setResults((prev) => prev.filter((item) => item.id !== id));
      }
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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await eventsService.searchEventByTitle(search);
      if (response) {
        setResults(response);
      }
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInput}>
        <CleanInput
          label="title"
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <Button
            onClick={handleSearch}
            fontSize="1.25rem"
            padding=".5rem 1.25rem"
            color="#fff"
            background="#EE6C4D"
          >
            search
          </Button>
        </div>
      </div>

      <div>
        {results &&
          results.length > 0 &&
          results.map((item) => (
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
    </div>
  );
};
