import styles from './form-box.module.css';

type FormBoxSubtitleProps = {
  text: string;
};

export const FormBoxSubtitle = ({ text }: FormBoxSubtitleProps) => {
  return <h4 className={styles.formBoxSubtitle}>{text}</h4>;
};
