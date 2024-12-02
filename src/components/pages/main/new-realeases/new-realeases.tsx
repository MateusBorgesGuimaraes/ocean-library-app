'use client';

import { BookCard } from '@/components/book-card/book-card';
import styles from './new-realeases.module.css';
import React from 'react';
import { editorChoiceService } from '@/services/api/editor-choice-service';
import { EditorChoice } from '@/services/api/types/editor-choice-types';

export const NewRealeases = () => {
  const [newRealeases, setNewRealeases] = React.useState<EditorChoice[]>();

  React.useEffect(() => {
    const fetchData = async () => {
      const newRealeases = await editorChoiceService.getEditorChoiceBooks();
      setNewRealeases(newRealeases);
    };
    fetchData();
  }, []);

  if (!newRealeases) return null;

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
        {newRealeases.map((release) => (
          <BookCard key={release.book.id} book={release.book} />
        ))}
      </div>
    </section>
  );
};
