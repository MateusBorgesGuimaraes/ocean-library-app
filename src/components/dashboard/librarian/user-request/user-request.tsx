'use client';

import { GeneralInfosCard } from '@/components/general-infos-card/general-infos-card';
import styles from './user-request.module.css';
import { TitleHeader } from '@/components/title-header/title-header';
import { Button } from '@/components/button/button';
import Image from 'next/image';
import { icons } from '../../../../../public/assets/assets';
import React from 'react';
import { requestService } from '@/services/api/request-service';
import { RequestBook } from '@/services/api/types/request-types';
import { usePagination } from '@/hooks/useFetch';
import { PaginationControls } from '@/components/pagination-controls/pagination-controls';
import formatDate from '@/functions/fomatDate';
import { Loader } from '@/components/loader/loader';
import { useToastStore } from '@/store/toast-store';
import { ApiError } from 'next/dist/server/api-utils';

export const UserRequest = () => {
  const [requestData, setRequestData] = React.useState<RequestBook[]>([]);
  const addToast = useToastStore((state) => state.addToast);
  const {
    data: requests,
    meta,
    loading,
    error,
    nextPage,
    prevPage,
  } = usePagination<RequestBook>({
    fetchFn: requestService.getAllRequests,
    initialParams: void 0,
    initialPage: 1,
    initialLimit: 6,
    skip: false,
  });

  React.useEffect(() => {
    setRequestData(requests);
  }, [requests]);

  const removeRequest = async (id: string) => {
    try {
      await requestService.removeRequest(id);
      addToast({
        title: 'Success',
        type: 'success',
        message: 'Request removed successfully',
        duration: 5000,
      });

      setRequestData((prev) => prev.filter((item) => item.id !== +id));
    } catch (error) {
      if (error instanceof ApiError) {
        addToast({
          title: 'Error',
          type: 'error',
          message: error.message,
          duration: 5000,
        });
      } else {
        addToast({
          title: 'Error',
          type: 'error',
          message: 'An unexpected error occurred',
          duration: 5000,
        });
      }
    }
  };

  return (
    <div className={styles.userRequestContainer}>
      <TitleHeader title="Users Requests" />
      <div className={styles.cardContainer}>
        {loading && <Loader />}

        {requests &&
          !loading &&
          requestData.map((item) => (
            <GeneralInfosCard key={item.id}>
              <GeneralInfosCard.Content>
                <GeneralInfosCard.Content.ContentItem
                  label="Title"
                  content={item.title}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="Author"
                  content={item.author}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="createdAt"
                  content={formatDate(item.createdAt)}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="publisher"
                  content={item.publisher}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="year"
                  content={item.year}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="genre"
                  content={item.genre}
                />
              </GeneralInfosCard.Content>
              <GeneralInfosCard.Footer>
                <Button
                  onClick={() => removeRequest(String(item.id))}
                  fontSize="1rem"
                  background="#055A8C"
                  color="#fff"
                  padding=".25rem 1.125rem"
                >
                  viewed{' '}
                  <Image
                    src={icons.eyeViewIcon}
                    alt="eye view icon"
                    width={20}
                    height={20}
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
