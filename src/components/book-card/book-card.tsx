import Image from 'next/image';
import styles from './book-card.module.css';
import { icons } from '../../../public/assets/assets';
import React from 'react';
import { Book } from '@/services/api/types/book-types';
import formatLink from '@/functions/formatLink';

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <button
      className={styles.bookCard}
      style={{
        backgroundImage: `url(${formatLink(book?.cover, 'pictures')})`,
      }}
    >
      <div>
        <Image src={icons.expandIcon} alt="expand icon" />
      </div>
    </button>
  );
};
