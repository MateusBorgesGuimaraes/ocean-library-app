'use client';

import { TitleHeader } from '@/components/title-header/title-header';
import styles from './all-news.module.css';
import { News } from '@/services/api/types/news-types';
import React from 'react';
import { newsService } from '@/services/api/news-service';
import { NewsCard } from '@/components/news-card/news-card';
import { usePagination } from '@/hooks/useFetch';
import { PaginationControls } from '@/components/pagination-controls/pagination-controls';

export const AllNews = () => {
  const {
    data: news,
    meta,
    loading,
    error,
    nextPage,
    prevPage,
  } = usePagination<News>({
    fetchFn: newsService.getAllNews,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.allNewsContainer}>
      <div className={styles.newsContainer}>
        <TitleHeader title="News" />
        <div className={styles.cardNewsContainer}>
          {news.map((item) => (
            <NewsCard news={item} key={item.id} />
          ))}
        </div>
      </div>

      <PaginationControls
        prevPage={prevPage}
        nextPage={nextPage}
        page={meta.page}
        totalPages={meta.totalPages}
      />
    </div>
  );
};
