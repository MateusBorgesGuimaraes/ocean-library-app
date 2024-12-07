import styles from './title-header.module.css';

interface TitleHeaderProps {
  title: string;
}

export const TitleHeader = ({ title }: TitleHeaderProps) => {
  return <h1 className={styles.titleHeader}>{title}</h1>;
};
