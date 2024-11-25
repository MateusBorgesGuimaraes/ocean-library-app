import styles from './button.module.css';

type ButtonProps = {
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
    >
      {children}
    </button>
  );
};
