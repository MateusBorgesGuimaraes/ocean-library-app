import styles from './error-component.module.css';

type ErrorComponentProps = {
  message: string | undefined;
};

export const ErrorComponent = ({ message }: ErrorComponentProps) => {
  return <div className={styles.errorMessage}>{message}</div>;
};
