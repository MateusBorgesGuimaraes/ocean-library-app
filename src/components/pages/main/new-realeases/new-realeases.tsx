'use client';

import { BookCard } from '@/components/book-card/book-card';
import styles from './new-realeases.module.css';
import React from 'react';
import { Book } from '@/services/api/types/book-types';

type NewRealeasesProps = {
  book: Book[];
};

export const NewRealeases = ({ book }: NewRealeasesProps) => {
  return (
    <section className={styles.newRealeasesContainer}>
      <h1 className={styles.newRealeasesTitle}>New Realeases</h1>
      <p className={styles.newRealeasesText}>
        Discover the latest arrivals at Ocean Library! Our New Releases section
        brings you a curated selection of fresh titles across all genres, from
        bestselling novels to insightful non-fiction and everything in between.
      </p>
      <p className={styles.newRealeasesText2}>
        Discover the latest arrivals at Ocean Library!
      </p>
      <div className={styles.newRealeasesCards}>
        {book.map((release) => (
          <BookCard key={release.id} book={release} />
        ))}
      </div>
    </section>
  );
};
