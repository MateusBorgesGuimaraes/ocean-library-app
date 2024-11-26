'use client';

import Image from 'next/image';
import styles from './header.module.css';
import { icons } from '../../public/assets/assets';
import React from 'react';
import { Sidebar } from './sidebar';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [windowWidth, setWindowWidth] = React.useState(0);

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
            className={styles.searchInput}
            type="text"
            placeholder="search"
          />
          <button className={styles.advancedButton}>
            <Image src={icons.advandedIcon} alt="advanded search" />
          </button>
        </div>

        <div className={styles.contactInfo}>
          <span className={styles.dec}></span>
          <p>Open Monday to Friday from 07:00 to 18:00</p>
        </div>
      </div>
    </header>
  );
};
