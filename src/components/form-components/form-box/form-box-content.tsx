import styles from './form-box.module.css';

type LoginFormProps = {
  children: React.ReactNode;
};

export const FormBoxContent = ({ children }: LoginFormProps) => {
  return <div className={styles.formBoxContet}>{children}</div>;
};
