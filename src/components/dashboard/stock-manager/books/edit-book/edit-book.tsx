'use client';

import { EditBookForm } from '@/components/forms/edit-book-form/edit-book-form';
import { booksService } from '@/services/api/books-service';
import { Book } from '@/services/api/types/book-types';
import React from 'react';

type EditBookProps = {
  id: string;
};

export const EditBook = ({ id }: EditBookProps) => {
  const [book, setBook] = React.useState<Book>();

  React.useEffect(() => {
    const fetchEvent = async () => {
      const response = await booksService.getBookById(id);
      setBook(response);
    };
    fetchEvent();
  }, [id]);

  if (!book) {
    return null;
  }

  return (
    <div>
      <EditBookForm initialData={book} />
    </div>
  );
};
