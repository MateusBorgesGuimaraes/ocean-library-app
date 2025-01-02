'use client';

import React from 'react';
import styles from './user-roles.module.css';
import { CleanInput } from '@/components/form-components/input/clean-input';
import { Button } from '@/components/button/button';
import { GeneralInfosCard } from '@/components/general-infos-card/general-infos-card';
import { useToastStore } from '@/store/toast-store';
import { ApiError } from '@/services/api/utils/api-error';
import Image from 'next/image';
import { Loader } from '@/components/loader/loader';
import { TitleHeader } from '@/components/title-header/title-header';
import { CustomLink } from '@/components/custom-link/custom-link';
import formatDate from '@/functions/fomatDate';
import { icons } from '../../../../../public/assets/assets';
import { userService } from '@/services/api/user-service';
import RoleSelect from '@/components/forms/role-select/role-select';
import { User } from '@/services/api/types/user-types';

export const UserRoles = () => {
  const [search, setSearch] = React.useState('');
  const [searchOneTime, setSearchOneTime] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<User[] | []>([]);
  const addToast = useToastStore((state) => state.addToast);

  const handleDelete = async (id: number) => {
    try {
      const response = await userService.deleteUser(String(id));
      if (response) {
        addToast({
          title: 'Success',
          message: 'User deleted successfully!',
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
      const response = await userService.searchUserByEmail(search);
      console.log(response);
      if (response) {
        setResults(response.users);
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
    <section>
      <TitleHeader title="Users" />

      <div className={styles.searchContainer}>
        <div className={styles.searchInput}>
          <CleanInput
            label="email"
            type="email"
            name="email"
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
            <p>No users found</p>
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
                    label="updated At"
                    content={formatDate(item.updatedAt)}
                  />
                </GeneralInfosCard.Content>
                <GeneralInfosCard.Footer>
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
                  <CustomLink
                    fontSize="1rem"
                    background="#188929"
                    color="#fff"
                    padding=".25rem 1.125rem"
                    href={`/dashboard/admin/user-loans/${item.id}`}
                  >
                    loans
                    <Image
                      src={icons.linkIcon}
                      alt="link icon"
                      width={24}
                      height={24}
                    />
                  </CustomLink>

                  <CustomLink
                    fontSize="1rem"
                    background="#188929"
                    color="#fff"
                    padding=".25rem 1.125rem"
                    href={`/dashboard/admin/user-events/${item.id}`}
                  >
                    event
                    <Image
                      src={icons.linkIcon}
                      alt="link icon"
                      width={24}
                      height={24}
                    />
                  </CustomLink>
                  <RoleSelect
                    userId={String(item.id)}
                    initialPermissions={item.permissions}
                    onPermissionsUpdate={userService.updateUserPermissions}
                  />
                </GeneralInfosCard.Footer>
              </GeneralInfosCard>
            ))}
        </div>
      </div>
    </section>
  );
};
