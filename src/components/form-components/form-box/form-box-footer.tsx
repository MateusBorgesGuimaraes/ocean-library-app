import styles from './form-box.module.css';

type FormBoxFooterProps = {
  text: string;
  strong?: string;
};

export const FormBoxFooter = ({ text, strong }: FormBoxFooterProps) => {
  return (
    <footer className={styles.formBoxFooter}>
      {text}
      {strong && <strong>{strong}</strong>}
    </footer>
  );
};
