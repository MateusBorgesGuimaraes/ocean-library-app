'use client';

import React from 'react';
import styles from './advanced-search.module.css';
import { Button } from '@/components/button/button';
import { CleanInput } from '@/components/form-components/input/clean-input';
import { Category } from '@/services/api/types/category-types';
import { categoryService } from '@/services/api/category-service';
import { booksService } from '@/services/api/books-service';
import { BookSearchResultFull } from '@/services/api/types/book-types';
import { BookCard } from '@/components/book-card/book-card';
import { useToastStore } from '@/store/toast-store';
import { Loader } from '@/components/loader/loader';

export const AdvancedSearch = () => {
  const [categories, setCategories] = React.useState<Category[]>();
  const [books, setBooks] = React.useState<BookSearchResultFull>();
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [publisher, setPublisher] = React.useState('');
  const [genreActive, setGenreActive] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const addToast = useToastStore((state) => state.addToast);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await categoryService.getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  if (!categories) {
    return null;
  }

  const handleGenreClick = (name: string) => {
    if (genreActive === name) {
      setGenreActive('');
      return;
    }
    setGenreActive(name);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams();

      if (title) {
        query.set('title', title);
      }

      if (author) {
        query.set('author', author);
      }

      if (publisher) {
        query.set('publisher', publisher);
      }

      if (genreActive) {
        query.set(
          'categoryId',
          categories.find((c) => c.name === genreActive)!.id.toString(),
        );
      }

      if (query.toString() === '') {
        addToast({
          title: 'Error',
          message: 'Please fill at least one field',
          type: 'error',
          duration: 5000,
        });
        setIsLoading(false);
        return;
      }

      const response = await booksService.advancedSearch(query.toString());

      if (response?.data.length === 0) {
        addToast({
          title: 'warning',
          message: 'No books found',
          type: 'info',
          duration: 5000,
        });
        setIsLoading(false);
        return;
      }

      if (response) {
        setBooks(response);
        setIsLoading(false);
      }
    } catch (error) {
      addToast({
        title: 'Error',
        message:
          error instanceof Error ? error.message : 'Something went wrong',
        type: 'error',
        duration: 5000,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.advancedSearch}>
      <div className={styles.advancedSearchForm}>
        <h1>Advanced Search</h1>

        <div>
          <CleanInput
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            name="title"
            type="text"
          />
        </div>

        <div>
          <CleanInput
            onChange={(e) => setAuthor(e.target.value)}
            label="Author"
            name="author"
            type="text"
          />
        </div>

        <div>
          <CleanInput
            onChange={(e) => setPublisher(e.target.value)}
            label="Publisher"
            name="publisher"
            type="text"
          />
        </div>

        <ul className={styles.genreContainer}>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={genreActive === category.name ? styles.active : ''}
                onClick={() => handleGenreClick(category.name)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>

        <div>
          <Button
            onClick={handleSearch}
            background="#EE6C4D"
            color="#fff"
            padding=".625rem 4rem"
            fontSize="1.5rem"
          >
            Search
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}

      {books && (
        <div className={styles.advancedSearchResults}>
          <h1>Results</h1>
          <div className={styles.advancedSearchResultsContainer}>
            {books?.data.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
