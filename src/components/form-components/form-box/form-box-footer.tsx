import styles from './form-box.module.css';

type FormBoxFooterProps = {
  text: string;
  strong?: string;
  closeState: React.Dispatch<React.SetStateAction<boolean>>;
  openState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormBoxFooter = ({
  text,
  strong,
  closeState,
  openState,
}: FormBoxFooterProps) => {
  function handleClick() {
    closeState(false);
    openState(true);
  }
  return (
    <footer className={styles.formBoxFooter}>
      {text}
      {strong && <strong onClick={handleClick}>{strong}</strong>}
    </footer>
  );
};
