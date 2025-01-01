'use client';

import styles from './list-all-categories.module.css';
import { Button } from '@/components/button/button';
import { GeneralInfosCard } from '@/components/general-infos-card/general-infos-card';
import { Loader } from '@/components/loader/loader';
import { PaginationControls } from '@/components/pagination-controls/pagination-controls';
import formatDate from '@/functions/fomatDate';
import { usePagination } from '@/hooks/useFetch';
import Image from 'next/image';
import { icons } from '../../../../../../public/assets/assets';
import { useToastStore } from '@/store/toast-store';
import { ApiError } from '@/services/api/utils/api-error';
import React from 'react';
import { CustomLink } from '@/components/custom-link/custom-link';
import { Category } from '@/services/api/types/book-types';
import { categoryService } from '@/services/api/category-service';

export const ListAllCategories = () => {
  const addToast = useToastStore((state) => state.addToast);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const { data, meta, loading, error, nextPage, prevPage } =
    usePagination<Category>({
      fetchFn: categoryService.getAllCategoriesPagiation,
      initialParams: void 0,
      initialPage: 1,
      initialLimit: 4,
      skip: false,
    });

  React.useEffect(() => {
    if (data) {
      setCategories(data);
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
      const response = await categoryService.deleteCategory(String(id));
      if (response) {
        addToast({
          title: 'Success',
          message: 'Category deleted successfully!',
          type: 'success',
          duration: 5000,
        });
      }

      setCategories((prev) => prev.filter((item) => item.id !== id));
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
        {categories &&
          !loading &&
          categories.map((item) => (
            <GeneralInfosCard key={item.id}>
              <GeneralInfosCard.Content>
                <GeneralInfosCard.Content.ContentItem
                  label="id"
                  content={String(item.id)}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="name"
                  content={`${item.name}`}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="created At"
                  content={formatDate(item.createdAt)}
                />
                <GeneralInfosCard.Content.ContentItem
                  label="ppdated At"
                  content={formatDate(item.updatedAt)}
                />
              </GeneralInfosCard.Content>
              <GeneralInfosCard.Footer>
                <CustomLink
                  fontSize="1rem"
                  background="#EE6C4D"
                  color="#fff"
                  padding=".25rem 1.125rem"
                  href={`/dashboard/stock-manager/category/edit-category/${item.id}`}
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
