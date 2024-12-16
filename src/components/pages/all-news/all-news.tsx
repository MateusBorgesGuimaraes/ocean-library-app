'use client';

import { TitleHeader } from '@/components/title-header/title-header';
import styles from './all-news.module.css';
import { NewsSearch } from '@/services/api/types/news-types';
import React from 'react';
import { newsService } from '@/services/api/news-service';
import { NewsCard } from '@/components/news-card/news-card';

export const AllNews = () => {
  const [news, setNews] = React.useState<NewsSearch | null>();

  React.useEffect(() => {
    const fetchNews = async () => {
      const news = await newsService.getAllNews();
      setNews(news);
    };
    fetchNews();
  }, []);

  if (!news) {
    return null;
  }

  return (
    <div className={styles.allNewsContainer}>
      <TitleHeader title="News" />
      <div className={styles.cardNewsContainer}>
        {news.data.map((item) => (
          <NewsCard news={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
