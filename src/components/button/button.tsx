import styles from './button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  background: string;
  color: string;
  fontSize: string;
  padding: string;
};

export const Button = ({
  background,
  color,
  fontSize,
  padding,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={styles.button}
      style={{
        background: `${background}`,
        color: `${color}`,
        fontSize: `${fontSize}`,
        padding: `${padding}`,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
