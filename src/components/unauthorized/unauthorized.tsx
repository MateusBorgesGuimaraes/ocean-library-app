import Link from 'next/link';
import styles from './unauthorized.module.css';

export const UnauthorizedComponent = () => {
  return (
    <div className={styles.unauthorizedContainer}>
      <h1 className={styles.unauthorizedTitle}>
        You are not authorized to view this page !!!
      </h1>

      <div className={styles.backToHome}>
        <Link href={'/'}>Back to Home</Link>
      </div>
    </div>
  );
};
