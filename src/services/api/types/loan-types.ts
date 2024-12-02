import { Book } from './book-types';
import { User } from './user-types';

export enum LoanStatus {
  PENDING = 'pending',
  PICKED_UP = 'picked_up',
  RETURNED = 'returned',
  RENEWED = 'renewed',
  CANCELLED = 'cancelled',
  OVERDUE = 'overdue',
}

export type Loan = {
  id: number;
  book: Book;
  user: User;
  status: LoanStatus;
  requestDate: string;
  pickupDate: string;
  dueDate: string;
  returnedDate: string;
  renewalCount: number;
  createdAt: string;
  updatedAt: string;
};
