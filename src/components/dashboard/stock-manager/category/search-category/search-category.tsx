'use client';

import styles from './search-category.module.css';
import { Button } from '@/components/button/button';
import { CustomLink } from '@/components/custom-link/custom-link';
import { CleanInput } from '@/components/form-components/input/clean-input';
import { GeneralInfosCard } from '@/components/general-infos-card/general-infos-card';
import formatDate from '@/functions/fomatDate';
import Image from 'next/image';
import React from 'react';
import { icons } from '../../../../../../public/assets/assets';
import { useToastStore } from '@/store/toast-store';
import { ApiError } from '@/services/api/utils/api-error';
import { Loader } from '@/components/loader/loader';
import { Category } from '@/services/api/types/book-types';
import { categoryService } from '@/services/api/category-service';

export const SearchCategory = () => {
  const [search, setSearch] = React.useState('');
  const [searchOneTime, setSearchOneTime] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<Category[] | []>([]);
  const addToast = useToastStore((state) => state.addToast);

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
    setSearchOneTime(true);
    setLoading(true);
    try {
      const response = await categoryService.getCategoryByName(search);
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
          label="name"
          type="text"
          name="name"
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
        {loading && <Loader />}
        {results.length === 0 && !loading && searchOneTime && (
          <p>No results found</p>
        )}
        {results &&
          results.length > 0 &&
          results.map((item) => (
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
    </div>
  );
};
