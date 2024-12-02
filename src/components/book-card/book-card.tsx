import Image from 'next/image';
import styles from './book-card.module.css';
import { icons } from '../../../public/assets/assets';
import React from 'react';
import { Book } from '@/services/api/types/book-types';

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <button
      className={styles.bookCard}
      style={{
        backgroundImage: `url(${`http://localhost:3001/pictures/${book?.cover}`})`,
      }}
    >
      <div>
        <Image src={icons.expandIcon} alt="expand icon" />
      </div>
    </button>
  );
};
