import Link, { LinkProps } from 'next/link';
import styles from './custom-link.module.css';

type CustomLinkProps = LinkProps & {
  children: React.ReactNode;
  background: string;
  color: string;
  fontSize: string;
  padding: string;
  href: string;
};

export const CustomLink = ({
  background,
  color,
  fontSize,
  padding,
  children,
  href,
  ...rest
}: CustomLinkProps) => {
  return (
    <Link
      href={href}
      className={styles.link}
      style={{
        background: `${background}`,
        color: `${color}`,
        fontSize: `${fontSize}`,
        padding: `${padding}`,
      }}
      {...rest}
    >
      {children}
    </Link>
  );
};
