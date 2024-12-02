'use client';

import { BookCard } from '@/components/book-card/book-card';
import styles from './new-additions.module.css';

import { booksService } from '@/services/api/books-service';
import { Book } from '@/services/api/types/book-types';
import React from 'react';

export const NewAdditions = () => {
  const [latestBooks, setLatestBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const latestBooks = await booksService.getLatestBooks();
      setLatestBooks(latestBooks);
    };
    fetchData();
  }, []);

  if (!latestBooks) return null;

  return (
    <section className={styles.newAdditionsContainer}>
      <h1 className={styles.newAdditionsTitle}>New Additions</h1>
      <div className={styles.newAdditionsCards}>
        {latestBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};
