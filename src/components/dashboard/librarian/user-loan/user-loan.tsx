'use client';

import Image from 'next/image';
import styles from './user-loan.module.css';
import { images } from '../../../../../public/assets/assets';
import { TitleHeader } from '@/components/title-header/title-header';
import { Button } from '@/components/button/button';
import React from 'react';
import { loanService } from '@/services/api/loans-service';
import { useToastStore } from '@/store/toast-store';
import { ApiError } from '@/services/api/utils/api-error';
import { Loan } from '@/services/api/types/loan-types';
import formatLink from '@/functions/formatLink';

type UserLoanProps = {
  id: string;
};

export const UserLoan = ({ id }: UserLoanProps) => {
  const [laonStatus, setLoanStatus] = React.useState<string>('');
  const [realStatus, setRealStatus] = React.useState<string>('');
  const [userLoanInfos, setUserLoanInfos] = React.useState<Loan | undefined>();
  const addToast = useToastStore((state) => state.addToast);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const loanStatus = await loanService.getLoanById(id);

        if (loanStatus) {
          setLoanStatus(loanStatus.status);
          setRealStatus(loanStatus.status);
          setUserLoanInfos(loanStatus);
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

    fetchData();
  }, []);

  if (!userLoanInfos) {
    return null;
  }

  const handleLoanStatusChange = (name: string) => {
    setLoanStatus(name);
  };

  const onSaveChange = async () => {
    let fn;
    switch (laonStatus) {
      case 'pending':
        return;
      case 'picked_up':
        fn = loanService.pickUpLoan;
        break;
      case 'renewed':
        fn = loanService.renewLoan;
        break;
      case 'overdue':
        fn = loanService.returnLoan;
        break;
      case 'cancelled':
        fn = loanService.cancelLoan;
        break;
      case 'returned':
        fn = loanService.returnLoan;
        break;
      default:
        return;
    }

    try {
      const response = await fn(id);
      if (response) {
        setRealStatus(response.status);
        addToast({
          title: 'Success',
          message: `Loan updated for ${response.status} successfully`,
          type: 'success',
          duration: 5000,
        });
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

  return (
    <div className={styles.userLoanContainer}>
      <TitleHeader title={`${userLoanInfos?.user?.name} loan`} />
      <div className={styles.userLoanContent}>
        <h4 className={styles.status}>
          Current Status: <span>{realStatus}</span>
        </h4>
        <div className={styles.infos}>
          <div className={styles.image}>
            <Image
              src={formatLink(userLoanInfos?.book?.cover, 'pictures')}
              alt="book cover"
              width={240}
              height={360}
            />
          </div>

          <div className={styles.bookInfos}>
            <h3 className={styles.bookTitle}>{userLoanInfos?.book?.title}</h3>
            <p className={styles.bookYear}>
              year: <span>{userLoanInfos?.book?.year}</span>
            </p>
            <p className={styles.bookAuthor}>
              author <span>{userLoanInfos?.book?.author}</span>
            </p>
            <p className={styles.publisher}>
              publisher: <span>{userLoanInfos?.book?.publisher}</span>
            </p>
            <p className={styles.copies}>
              copies available: <span>{userLoanInfos?.book?.quantity}</span>
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <h4 className={styles.changeStatus}>Change Status:</h4>
          <div className={styles.statusButtons}>
            <button
              onClick={() => handleLoanStatusChange('pending')}
              className={laonStatus === 'pending' ? styles.active : ''}
            >
              pending
            </button>
            <button
              onClick={() => handleLoanStatusChange('picked_up')}
              className={laonStatus === 'picked_up' ? styles.active : ''}
            >
              picked_up
            </button>
            <button
              onClick={() => handleLoanStatusChange('renewed')}
              className={laonStatus === 'renewed' ? styles.active : ''}
            >
              renewed
            </button>
            <button
              onClick={() => handleLoanStatusChange('returned')}
              className={laonStatus === 'returned' ? styles.active : ''}
            >
              returned
            </button>
            <button
              onClick={() => handleLoanStatusChange('cancelled')}
              className={laonStatus === 'cancelled' ? styles.active : ''}
            >
              cancelled
            </button>
            <button
              onClick={() => handleLoanStatusChange('overdue')}
              className={laonStatus === 'overdue' ? styles.active : ''}
            >
              overdue
            </button>
          </div>
          <div className={styles.saveChange}>
            <Button
              onClick={onSaveChange}
              color="#fff"
              background="#055A8C"
              fontSize="1.25rem"
              padding=".75rem 1.125rem"
            >
              Save Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
