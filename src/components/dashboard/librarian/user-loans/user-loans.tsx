'use client';

import { TitleHeader } from '@/components/title-header/title-header';
import styles from './user-loans.module.css';
import { CleanInput } from '@/components/form-components/input/clean-input';
import { Button } from '@/components/button/button';
import { usePagination } from '@/hooks/useFetch';
import { Loan } from '@/services/api/types/loan-types';
import { loanService } from '@/services/api/loans-service';
import { Loader } from '@/components/loader/loader';
import DataTable, { ColumnConfig } from '@/components/data-table/data-table';
import { PaginationControls } from '@/components/pagination-controls/pagination-controls';
import { TableLoan } from '../users-loans/users-loans';
import React from 'react';

export const UserLoans = () => {
  const [email, setEmail] = React.useState<string>('');

  const {
    data: loansData,
    meta,
    loading,
    error,
    nextPage,
    prevPage,
    fetchData,
  } = usePagination<Loan, string>({
    fetchFn: loanService.getUserLoansByEmail,
    initialParams: email,
    initialPage: 1,
    initialLimit: 6,
    skip: false,
    manualFetch: true,
  });

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
        href: (item: TableLoan) =>
          `/dashboard/librarian/users-loans/edit/${item.id}`,
        text: 'Edit',
      },
    },
  ];

  return (
    <div className={styles.userLoansContainer}>
      <TitleHeader title="User Loans" />
      <div className={styles.searchContainer}>
        <CleanInput
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          type="email"
          name="search"
        />
        <div>
          <Button
            onClick={() => fetchData()}
            color="#fff"
            background="#055A8C"
            padding=".5rem 1.25rem"
            fontSize="1.25rem"
          >
            Search
          </Button>
        </div>
      </div>

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
