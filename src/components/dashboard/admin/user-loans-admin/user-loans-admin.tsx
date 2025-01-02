'use client';

import DataTable, { ColumnConfig } from '@/components/data-table/data-table';
import styles from './user-loans-admin.module.css';
import { TitleHeader } from '@/components/title-header/title-header';
import React from 'react';
import { loanService } from '@/services/api/loans-service';
import { Loan } from '@/services/api/types/loan-types';
import { usePagination } from '@/hooks/useFetch';
import { TableLoan } from '../../librarian/users-loans/users-loans';
import { Loader } from '@/components/loader/loader';
import { PaginationControls } from '@/components/pagination-controls/pagination-controls';

type UserEventsProps = {
  id: string;
};

export const UserLoansAdmin = ({ id }: UserEventsProps) => {
  const [userId, setUserId] = React.useState<string>(id);

  const {
    data: loansData,
    meta,
    loading,
    error,
    nextPage,
    prevPage,
  } = usePagination<Loan, string>({
    fetchFn: loanService.getUserLoans,
    initialParams: userId,
    initialPage: 1,
    initialLimit: 4,
    skip: false,
  });

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

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

  return (
    <div className={styles.userLoansContainer}>
      <TitleHeader title="User Loans" />
      {!loansData && (
        <div>
          <Loader />
        </div>
      )}
      {loading && <Loader />}
      {!loading && !error && loansData.length !== 0 && (
        <div className={styles.tableContainer}>
          <DataTable data={USERS_LOANS_DATA} columns={USERS_LOANS_COLUMNS} />

          <PaginationControls
            prevPage={prevPage}
            nextPage={nextPage}
            page={meta.page}
            totalPages={meta.totalPages}
          />
        </div>
      )}
    </div>
  );
};
