import styles from './input.module.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type: string;
  name: string;
};

export const CleanInput = ({ label, type, name, ...props }: InputProps) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input className={styles.input} type={type} {...props} />
    </div>
  );
};
