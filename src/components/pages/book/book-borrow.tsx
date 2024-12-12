'use client';

import Image from 'next/image';
import styles from './book-borrow.module.css';
import { icons } from '../../../../public/assets/assets';
import { Button } from '@/components/button/button';
import React from 'react';
import { Book } from '@/services/api/types/book-types';
import { booksService } from '@/services/api/books-service';
import formatLink from '@/functions/formatLink';
import { useToastStore } from '@/store/toast-store';

type BookProps = {
  id: string;
};

export const BookBorrow = ({ id }: BookProps) => {
  const [book, setBook] = React.useState<Book>();
  const addToast = useToastStore((state) => state.addToast);

  const handleSuccess = () => {
    addToast({
      title: 'Sucesso!',
      message: 'A operação foi realizada com sucesso.',
      type: 'success',
      duration: 3000,
    });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const book = await booksService.getBookById(id);
      setBook(book);
    };
    fetchData();
  }, [id]);

  if (!book) return null;

  return (
    <div className={styles.bookPageContainer}>
      <div className={styles.bookInfos}>
        <div className={styles.bookInfos1}>
          <div className={styles.bookCover}>
            <Image
              width={240}
              height={325}
              src={formatLink(book.cover, 'pictures')}
              alt="book cover"
            />
          </div>
          <div className={styles.bookTextsContainer}>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <div className={styles.bookTexts}>
              <p className={styles.year}>
                <span>Published:</span> {book.year}
              </p>
              <p className={styles.publisher}>
                <span>Publisher:</span> {book.publisher}
              </p>
              <p className={styles.author}>
                <span>Written by:</span> {book.author}
              </p>
              <p className={styles.copies}>Copies available: {book.quantity}</p>
            </div>
          </div>
        </div>

        <div className={styles.bookInfos2}>
          <p className={styles.description}>{book.synopsis}</p>
        </div>
      </div>

      <div className={styles.bookActions}>
        <div className={styles.bookButtons}>
          <Button
            onClick={handleSuccess}
            color="#fff"
            background="#EE6C4D"
            padding=".5rem 1.125rem"
            fontSize="1.25rem"
          >
            borrow
          </Button>
        </div>
      </div>

      <div className={styles.bookWarnings}>
        <ul>
          <li>
            <Image src={icons.attentionIcon} alt="warning icon" />{' '}
            <p>
              You have 24 hours to withdraw the book from the library, after
              that the order will be canceled.
            </p>
          </li>

          <li>
            <Image src={icons.attentionIcon} alt="warning icon" />{' '}
            <p>You have 7 days to deliver the book after you pick it up.</p>
          </li>

          <li>
            <Image src={icons.attentionIcon} alt="warning icon" />{' '}
            <p>
              After 7 days, if you haven&apos;t finished reading the book, you
              can renew it for another 3 days, this can be done online.
            </p>
          </li>

          <li>
            <Image src={icons.attentionIcon} alt="warning icon" />{' '}
            <p>
              Any damage caused to the book will result in a fine and, depending
              on the level of damage, a complete replacement of the copy.
            </p>
          </li>

          <li>
            <Image src={icons.attentionIcon} alt="warning icon" />{' '}
            <p>You can only borrow one book at a time.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
