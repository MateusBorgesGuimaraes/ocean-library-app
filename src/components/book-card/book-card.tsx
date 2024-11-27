import Image from 'next/image';
import styles from './book-card.module.css';
import { icons } from '../../../public/assets/assets';
import React from 'react';

type BookCardProps = {
  image: React.ImgHTMLAttributes<HTMLImageElement>;
  id: number;
};

export const BookCard = ({ image, id }: BookCardProps) => {
  return (
    <button
      className={styles.bookCard}
      style={{ backgroundImage: `url(${image.src})` }}
    >
      <div>
        <Image src={icons.expandIcon} alt="expand icon" />
      </div>
    </button>
  );
};
