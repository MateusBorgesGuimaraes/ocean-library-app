'use client';

import { TitleHeader } from '@/components/title-header/title-header';
import styles from './users-loans.module.css';
import { Loan } from '@/services/api/types/loan-types';
import React from 'react';
import { loanService } from '@/services/api/loans-service';
import DataTable, { ColumnConfig } from '@/components/data-table/data-table';
import { usePagination } from '@/hooks/useFetch';
import { PaginationControls } from '@/components/pagination-controls/pagination-controls';
import { Loader } from '@/components/loader/loader';

export interface TableLoan {
  status: string;
  book: string;
  user: string;
  id: string | number;
}

export const UsersLoans = () => {
  const [selectedStatus, setSelectedStatus] = React.useState<string>('');
  const {
    data: loansData,
    meta,
    loading,
    error,
    nextPage,
    prevPage,
  } = usePagination<Loan, string>({
    fetchFn: loanService.getAllLoans,
    initialParams: selectedStatus,
    initialPage: 1,
    initialLimit: 6,
    skip: false,
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  const STATUS = [
    'pending',
    'picked_up',
    'renewed',
    'returned',
    'cancelled',
    'overdue',
  ];

  const USERS_LOANS_DATA: TableLoan[] = loansData.map((loan) => ({
    status: loan.status,
    book: loan.book.title,
    user: loan.user.name,
    id: loan.id,
  }));

  const USERS_LOANS_COLUMNS: ColumnConfig<TableLoan>[] = [
    { key: 'status', header: 'Status' },
    { key: 'book', header: 'Book' },
    { key: 'user', header: 'User' },
    {
      key: 'id',
      header: 'Actions',
      link: {
        href: (item: TableLoan) => `/dashboard/librarian/user-loan/${item.id}`,
        text: 'Edit',
      },
    },
  ];

  const handleStatusChange = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus('');
      return;
    }
    setSelectedStatus(status);
  };

  return (
    <div className={styles.usersLoansContainer}>
      <TitleHeader title="Users Loans" />
      <div className={styles.usersLoansTable}>
        <div className={styles.userLoansStatus}>
          <button
            className={`${styles.statusButton} ${
              selectedStatus === '' ? styles.active : ''
            }`}
            onClick={() => handleStatusChange('')}
          >
            All
          </button>
          {STATUS.map((status) => (
            <button
              onClick={() => handleStatusChange(status)}
              className={`${styles.statusButton} ${
                selectedStatus === status ? styles.active : ''
              }`}
              key={status}
            >
              <p>{status}</p>
            </button>
          ))}
        </div>
        {loading && <Loader />}
        {!loading && (
          <DataTable data={USERS_LOANS_DATA} columns={USERS_LOANS_COLUMNS} />
        )}
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
