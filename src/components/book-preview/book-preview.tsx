'use client';

import React from 'react';
import styles from './book-preview.module.css';
import Image from 'next/image';
import { icons, images } from '../../../public/assets/assets';
import { Button } from '../button/button';

export const BookPreview = () => {
  const [isActive, setIsActive] = React.useState(true);

  const handleClose = () => {
    setIsActive(false);
  };

  React.useEffect(() => {
    if (isActive) {
      document.body.classList.add('preview-active');
    } else {
      document.body.classList.remove('preview-active');
    }

    return () => {
      document.body.classList.remove('preview-active');
    };
  }, [isActive]);

  if (!isActive) return null;

  if (!isActive) return null;
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
        <h3 className={styles.bookTitle}>Winnie-the-Pooh</h3>
        <div className={styles.bookCover}>
          <Image src={images.coverTest3Image} alt="cover" />
        </div>

        <p className={styles.author}>
          written by A. A. Milne and illustrated by E. H. Shepard
        </p>

        <p className={styles.date}>
          first published in <b>1926</b>
        </p>

        <p className={styles.copies}>
          copies available: <b>12</b>
        </p>

        <div className={styles.description}>
          <h4>description</h4>
          <p>
            The book follows the adventures of Winnie the Pooh, a friendly and
            slightly naïve bear, and his friends in the Hundred Acre Wood.
            Characters include Piglet, Eeyore, Tigger, Kanga and Roo, Rabbit,
            and Christopher Robin, the boy who often joins Pooh and friends in
            their explorations.
          </p>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            background="#EE6C4D"
            color="#fff"
            fontSize="1rem"
            padding=".5rem 1.5rem"
          >
            borrow
          </Button>
        </div>
      </div>
    </div>
  );
};
