'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './title-header-actions.module.css';
import React from 'react';
import { usePathname } from 'next/navigation';

type Links = {
  href: string;
  alt: string;
  icon: string; // Changed to string since we're using direct paths
};

interface TitleHeaderProps {
  title: string;
  links: Links[];
}

export const TitleHeaderActions = ({ title, links }: TitleHeaderProps) => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <h1 className={styles.titleHeader}>{title}</h1>
      <ul className={styles.actions}>
        {links?.map((link) => (
          <li
            key={link.href}
            className={`${pathname === link.href ? styles.active : ''}`}
          >
            <Link href={link.href}>
              <Image src={link.icon} alt={link.alt} width={24} height={24} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
