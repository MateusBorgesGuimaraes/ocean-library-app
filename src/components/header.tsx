import Image from 'next/image';
import styles from './header.module.css';
import { icons } from '../../public/assets/assets';

export const Header = () => {
  return (
    <header className={styles.header}>
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
    </header>
  );
};
