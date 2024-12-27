import Image from 'next/image';
import styles from './book-card.module.css';
import { icons } from '../../../public/assets/assets';
import React from 'react';
import { Book } from '@/services/api/types/book-types';
import formatLink from '@/functions/formatLink';
import { useBookPreviewStore } from '@/store/book-preview-store';

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  const { setBook } = useBookPreviewStore();

  if (!book) return null;

  const showPreview = () => {
    setBook(book);
  };

  return (
    <button
      onClick={showPreview}
      className={styles.bookCard}
      style={{
        backgroundImage: `url(${formatLink(book?.cover, 'pictures')})`,
      }}
    >
      <div>
        <Image
          src={icons.expandIcon}
          alt="expand icon"
          width={24}
          height={24}
        />
      </div>
    </button>
  );
};
