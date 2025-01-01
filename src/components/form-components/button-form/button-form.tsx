import styles from './button-form.module.css';

type ButtonProps = {
  children: React.ReactNode;
  padding?: string;
  background?: string;
  color?: string;
  fontSize?: string;
  borderRadius?: string;
};

export const ButtonForm = ({
  children,
  padding,
  background,
  color,
  fontSize,
  borderRadius,
}: ButtonProps) => {
  const style = {
    padding: padding || '0.75rem 1.25rem',
    background: background || 'var(--color-secondary-100)',
    color: color || 'white',
    fontSize: fontSize || '1.5rem',
    borderRadius: borderRadius || '1.25rem',
  };

  return (
    <button style={style} className={styles.button}>
      {children}
    </button>
  );
};
