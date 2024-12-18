'use client';

import DataTable from '@/components/data-table/data-table';
import styles from './loan.module.css';
import { TitleHeader } from '@/components/title-header/title-header';
import { PaginationControls } from '@/components/pagination-controls/pagination-controls';
import { usePagination } from '@/hooks/useFetch';
import { loanService } from '@/services/api/loans-service';
import { useUserStore } from '@/store/user-store';

// Book Subtype
type Book = {
  id: number;
  title: string;
  author: string;
};

// User Subtype
type User = {
  id: number;
  name: string;
  email: string;
};

// Main Book Request Interface
type BookRequest = {
  id: number;
  status: 'returned' | 'pending' | 'cancelled';
  requestDate: string;
  dueDate: string;
  book: Book;
  user: User;
  renewalCount: number;
  pickupDate: string | null;
  returnDate: string | null;
};

export const Loan = () => {
  const { user } = useUserStore();

  const {
    data: loans,
    meta,
    loading,
    error,
    nextPage,
    prevPage,
  } = usePagination<BookRequest, string>({
    fetchFn: loanService.getUserLoans,
    initialParams: String(user?.id) ?? '',
    initialPage: 1,
    initialLimit: 6,
    skip: !user?.id,
  });

  if (!user) {
    return <div>Please log in to view loans</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const LOANS_DATA = loans?.map((loan) => ({
    id: loan.id,
    status: loan.status,
    book: loan.book.title,
    author: loan.book.author,
    more: loan.book.id,
  }));
  return (
    <div className={styles.loan}>
      <TitleHeader title="User Loans" />

      <DataTable
        data={LOANS_DATA}
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'status', header: 'Status' },
          { key: 'book', header: 'Book' },
          { key: 'author', header: 'Author' },
          {
            key: 'more',
            header: 'More',
            link: { href: (item) => `/book/${item.more}` },
          },
        ]}
      />

      <PaginationControls
        prevPage={prevPage}
        nextPage={nextPage}
        page={meta.page}
        totalPages={meta.totalPages}
      />
    </div>
  );
};
