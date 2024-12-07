'use client';

import React from 'react';
import styles from './book-preview.module.css';
import Image from 'next/image';
import { icons } from '../../../public/assets/assets';
import { useBookPreviewStore } from '@/store/book-preview-store';
import formatLink from '@/functions/formatLink';
import Link from 'next/link';

export const BookPreview = () => {
  const [isActive, setIsActive] = React.useState(false);
  const { removeBook, book } = useBookPreviewStore();

  const handleClose = () => {
    setIsActive(false);
    removeBook();
  };

  React.useEffect(() => {
    if (book) {
      setIsActive(true);
    }
    if (isActive) {
      document.body.classList.add('preview-active');
    } else {
      document.body.classList.remove('preview-active');
    }

    return () => {
      document.body.classList.remove('preview-active');
    };
  }, [isActive, book]);

  if (!isActive || !book) return null;
  return (
    <div className={`${styles.previewContainer} ${styles.active}`}>
      <h1 className={styles.previewTitle}>Book Preview</h1>
      <div className={styles.previewContent}>
        <div className={styles.closeIconContainer} onClick={handleClose}>
          <Image
            src={icons.closeIcon}
            alt="close"
            className={styles.closeIcon}
          />
        </div>
        <h3 className={styles.bookTitle}>{book?.title}</h3>
        <div className={styles.bookCover}>
          <Image
            width={180}
            height={244}
            src={formatLink(book?.cover, 'pictures')}
            alt="cover"
          />
        </div>

        <p className={styles.author}>written by {book?.author}</p>

        <p className={styles.date}>
          first published in <b>{book?.year}</b>
        </p>

        <p className={styles.copies}>
          copies available: <b>{book?.quantity}</b>
        </p>

        <div className={styles.description}>
          <h4>description</h4>
          <p>{book?.synopsis}</p>
        </div>

        <div className={styles.buttonContainer}>
          <Link
            href={`/book/${book?.id}`}
            className={styles.button}
            onClick={handleClose}
          >
            borrow
          </Link>
        </div>
      </div>
    </div>
  );
};
