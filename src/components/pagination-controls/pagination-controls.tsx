import styles from './pagination-controls.module.css';

type PaginationControlsProps = {
  prevPage: () => void;
  nextPage: () => void;
  page: number;
  totalPages: number;
};

export const PaginationControls = ({
  prevPage,
  nextPage,
  page,
  totalPages,
}: PaginationControlsProps) => {
  return (
    <div className={styles.paginationControls}>
      <button onClick={prevPage} disabled={page <= 1}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button onClick={nextPage} disabled={page >= totalPages}>
        Next
      </button>
    </div>
  );
};
