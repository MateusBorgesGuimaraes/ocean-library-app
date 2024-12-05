import styles from './form-box.module.css';
import { FormBoxHeader } from './form-box-header';
import { FormBoxContent } from './form-box-content';
import { FormBoxSubtitle } from './form-box-subtitle';
import { FormBoxFooter } from './form-box-footer';

type FormBoxHeaderProps = {
  children: React.ReactNode;
};

export const FormBox = ({ children }: FormBoxHeaderProps) => {
  return <div className={styles.formBox}>{children}</div>;
};

FormBox.Header = FormBoxHeader;
FormBox.Subtitle = FormBoxSubtitle;
FormBox.Content = FormBoxContent;
FormBox.Footer = FormBoxFooter;
