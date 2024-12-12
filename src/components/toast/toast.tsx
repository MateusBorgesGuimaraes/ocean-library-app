'use client';

import React from 'react';
import styles from './toast.module.css';
import Image from 'next/image';
import { icons } from '../../../public/assets/assets';

type ToastProps = {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
};

export const Toast = ({
  title,
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const toastStyles = `${styles.toast} ${styles[type]}`;

  console.log(toastStyles);

  return (
    <div className={toastStyles}>
      <button onClick={onClose}>
        <Image src={icons.circleCloseIcon} alt="close icon" />
      </button>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};
