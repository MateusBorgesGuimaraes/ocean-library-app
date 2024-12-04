import Image from 'next/image';
import styles from './news-card.module.css';
import Link from 'next/link';
import { News } from '@/services/api/types/news-types';
import formatLink from '@/functions/formatLink';
import cutText from '@/functions/cutText';
import formatDate from '@/functions/fomatDate';

type NewsCardProps = {
  news: News;
};

export const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <div className={styles.newsCard}>
      <div className={styles.newsImage}>
        <Image
          src={formatLink(news?.coverImage, 'pictures')}
          alt="news image"
          width={310}
          height={182}
        />
      </div>
      <h3 className={styles.newsTitle}>{news?.title}</h3>
      <p className={styles.newsText}>{cutText(news?.content, 200)}</p>
      <div className={styles.newsFooter}>
        <Link href="/news">ver mais</Link>
        <span>{formatDate(news?.createdAt)}</span>
      </div>
    </div>
  );
};
