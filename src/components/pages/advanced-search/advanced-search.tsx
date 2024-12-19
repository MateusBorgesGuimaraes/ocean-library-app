'use client';

import React from 'react';
import styles from './advanced-search.module.css';
import { Button } from '@/components/button/button';
import { CleanInput } from '@/components/form-components/input/clean-input';
import { Category } from '@/services/api/types/category-types';
import { categoryService } from '@/services/api/category-service';
import { booksService } from '@/services/api/books-service';
import { Book } from '@/services/api/types/book-types';

export const AdvancedSearch = () => {
  const [categories, setCategories] = React.useState<Category[]>();
  const [books, setBooks] = React.useState<Book[]>();
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [publisher, setPublisher] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [genreActive, setGenreActive] = React.useState('');

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
    setGenreActive(name);
    setGenre(name);
  };

  const handleSearch = async () => {
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

      if (genre) {
        query.set('genre', genre);
      }

      const response = await booksService.advancedSearch(query.toString());

      if (response) {
        setBooks(response);
      }
      console.log('boks', books);
    } catch (error) {
      console.log(error);
    }
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
    </div>
  );
};
