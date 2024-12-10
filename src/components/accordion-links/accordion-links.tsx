'use client';

import Link from 'next/link';
import styles from './accordion-links.module.css';
import Image from 'next/image';
import { icons } from '../../../public/assets/assets';
import React from 'react';

export type MainItem = {
  title: string;
  icon: string;
};

export type SubItem = {
  title: string;
  icon: string;
  link: string;
};

export type AccordionLinksProps = {
  mainItem: MainItem;
  subItems: SubItem[];
};

export const AccordionLinks = ({ mainItem, subItems }: AccordionLinksProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.accordionContainer}>
      <button
        className={`${styles.mainItem} ${isOpen && styles.open}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className={styles.mainItemTitle}>
          <Image src={mainItem.icon} alt="icon" /> {mainItem.title}
        </p>
        <Image
          className={styles.accordionIcon}
          src={icons.accordionIcon}
          alt="icon"
        />
      </button>
      <ul className={`${styles.subItems} ${isOpen && styles.open}`}>
        {subItems.map((subItem) => (
          <li key={subItem.title}>
            <Link href={subItem.link}>
              <Image src={subItem.icon} alt="icon" /> {subItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
