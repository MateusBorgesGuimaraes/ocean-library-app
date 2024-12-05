import styles from './button-form.module.css';

type ButtonProps = {
  children: React.ReactNode;
};

export const ButtonForm = ({ children }: ButtonProps) => {
  return <button className={styles.button}>{children}</button>;
};
