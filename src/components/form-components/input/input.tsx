import { useFormContext } from 'react-hook-form';
import styles from './input.module.css';

type InputProps = {
  label: string;
  type: string;
  name: string;
};

export const Input = ({ label, type, name }: InputProps) => {
  const { register } = useFormContext();

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea className={styles.textarea} {...register(name)} />
      ) : (
        <input className={styles.input} {...register(name)} type={type} />
      )}
    </div>
  );
};
