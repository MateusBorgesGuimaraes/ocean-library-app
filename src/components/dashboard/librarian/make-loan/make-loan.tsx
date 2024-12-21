'use client';
import { TitleHeader } from '@/components/title-header/title-header';
import styles from './make-loan.module.css';
import React from 'react';
import { CleanInput } from '@/components/form-components/input/clean-input';
import { Button } from '@/components/button/button';
import { loanService } from '@/services/api/loans-service';
import { useToastStore } from '@/store/toast-store';

import { Loader } from '@/components/loader/loader';
import { ApiError } from '@/services/api/utils/api-error';

export const MakeLoan = () => {
  const [userId, setUserId] = React.useState<string>('');
  const [bokId, setBookId] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const addToast = useToastStore((state) => state.addToast);

  const handleSubmit = async () => {
    if (!userId || !bokId) return;
    try {
      setLoading(true);
      const response = await loanService.getLoanDirectly(bokId, userId);

      if (response) {
        addToast({
          title: 'Success',
          message: 'Loan created successfully',
          type: 'success',
          duration: 5000,
        });
        setBookId('');
        setUserId('');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        addToast({
          title: 'Error',
          message: err.message,
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
    <div className={styles.makeLoanContainer}>
      <TitleHeader title="Make Loan" />
      <form className={styles.makeLoanContent}>
        <CleanInput
          label="User ID"
          type="text"
          name="userId"
          onChange={(e) => setUserId(e.target.value)}
        />
        <CleanInput
          label="Book ID"
          type="text"
          name="bookID"
          onChange={(e) => setBookId(e.target.value)}
        />

        <div className={styles.makeLoanButton}>
          <Button
            {...(loading && { disabled: true })}
            onClick={handleSubmit}
            type="submit"
            background="#055A8C"
            color="#fff"
            fontSize="1.25rem"
            padding=".5rem 2.5rem"
          >
            Done
          </Button>
        </div>
        {loading && <Loader />}
      </form>
    </div>
  );
};
