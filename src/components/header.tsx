'use client';

import Image from 'next/image';
import styles from './header.module.css';
import { icons } from '../../public/assets/assets';
import React from 'react';
import { Sidebar } from './sidebar';
import { SearchBox } from './search-box/search-box';
import { BookSearchResult } from '@/services/api/types/book-types';
import { booksService } from '@/services/api/books-service';
import { useSearch } from '@/hooks/use-search';
import { ErrorComponent } from './form-components/error-component/error-component';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [windowWidth, setWindowWidth] = React.useState(0);
  const {
    searchValue,
    searchResults,
    error,
    isSearchOpen,
    handleSearchChange,
    clearSearch,
  } = useSearch<BookSearchResult>({
    searchFn: (query) => booksService.getSimpleBooksByTitle(query),
  });
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1000) {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <button onClick={toggleSidebar} className={styles.menuButton}>
        <Image src={icons.sidebarMenuIcon} alt="sidebar menu icon" />
      </button>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <Sidebar onClose={toggleSidebar} />
      </div>
      <div className={styles.headerMain}>
        <div className={styles.searchBar}>
          <button className={styles.searchButton}>
            <Image src={icons.searchIcon} alt="search icon" />
          </button>
          <input
            value={searchValue}
            onChange={handleSearchChange}
            className={styles.searchInput}
            type="text"
            placeholder="search"
          />
          <button className={styles.advancedButton}>
            <Image src={icons.advandedIcon} alt="advanced search" />
          </button>
          {isSearchOpen && (
            <SearchBox data={searchResults?.data} clearSearch={clearSearch} />
          )}
          {error && <ErrorComponent message={error} />}
        </div>

        <div className={styles.contactInfo}>
          <span className={styles.dec}></span>
          <p>Open Monday to Friday from 07:00 to 18:00</p>
        </div>
      </div>
    </header>
  );
};
