import { Book, SearchMeta } from './book-types';
import { User } from './user-types';

export enum LoanStatus {
  PENDING = 'pending',
  PICKED_UP = 'picked_up',
  RETURNED = 'returned',
  RENEWED = 'renewed',
  CANCELLED = 'cancelled',
  OVERDUE = 'overdue',
}

export type ForbiddenRenew = Omit<
  LoanStatus,
  'pending' | 'overdue' | 'returned' | 'cancelled'
>;

type SimpleUser = Pick<User, 'id' | 'name' | 'email'>;
type SimpleBook = Pick<
  Book,
  'id' | 'title' | 'author' | 'publisher' | 'year' | 'cover' | 'quantity'
>;

export type Loan = {
  id: number;
  book: SimpleBook;
  user: SimpleUser;
  status: LoanStatus;
  requestDate: string;
  pickupDate: string | null;
  dueDate: string | null;
  returnedDate: string | null;
  renewalCount: number | null;
  // createdAt: string;
};

export type LoanSearchResult = {
  data: Loan[];
  meta: SearchMeta;
};
