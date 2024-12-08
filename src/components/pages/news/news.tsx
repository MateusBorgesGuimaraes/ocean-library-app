'use client';

import Image from 'next/image';
import styles from './news.module.css';
import React from 'react';
import { News as NewsType } from '@/services/api/types/news-types';
import { newsService } from '@/services/api/news-service';
import formatDate from '@/functions/fomatDate';
import formatLink from '@/functions/formatLink';

type NewsProps = {
  id: string;
};

export const News = ({ id }: NewsProps) => {
  const [news, setNews] = React.useState<NewsType>();

  React.useEffect(() => {
    const fetchNews = async () => {
      const news = await newsService.getNewsById(id);
      setNews(news);
    };
    fetchNews();
  }, [id]);

  if (!news) {
    return null;
  }

  return (
    <div className={styles.newsContainer}>
      <div className={styles.newsImage}>
        <Image
          src={formatLink(news.coverImage, 'pictures')}
          alt="news image"
          width={300}
          height={300}
        />
      </div>

      <div className={styles.newsInfos}>
        <h2 className={styles.newsTitle}>{news.title}</h2>

        <ul className={styles.newsTags}>
          {news.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className={styles.newsDate}>
          Publication date: <span> {formatDate(news.createdAt)}</span>
        </div>

        <p className={styles.newsText}>{news.content}</p>
      </div>
    </div>
  );
};
