import { Loan, LoanSearchResult } from '@/services/api/types/loan-types';
import { create } from 'zustand';

type UserLoansStore = {
  userLoans: LoanSearchResult;
  setUserLoans: (userLoans: LoanSearchResult) => void;
  removeUserLoans: () => void;
  addLoan: (loan: Loan) => void;
  removeLoan: (loanId: number) => void;
  updateLoan: (loan: Loan) => void;
};

export const useUserLoansStore = create<UserLoansStore>((set) => ({
  userLoans: { data: [], meta: { page: 0, limit: 0, total: 0, totalPages: 0 } },
  setUserLoans: (userLoans: LoanSearchResult) => {
    set({ userLoans });
  },
  removeUserLoans: () => {
    set({
      userLoans: {
        data: [],
        meta: { page: 0, limit: 0, total: 0, totalPages: 0 },
      },
    });
  },
  addLoan: (loan: Loan) => {
    set((state) => ({
      userLoans: { ...state.userLoans, data: [...state.userLoans.data, loan] },
    }));
  },
  removeLoan: (loanId: number) => {
    set((state) => ({
      userLoans: {
        ...state.userLoans,
        data: state.userLoans.data.filter((loan) => loan.id !== loanId),
      },
    }));
  },
  updateLoan: (loan: Loan) => {
    set((state) => ({
      userLoans: {
        ...state.userLoans,
        data: state.userLoans.data.map((l) => (l.id === loan.id ? loan : l)),
      },
    }));
  },
}));
