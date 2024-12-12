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
  duration = 5000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, duration);

    const exitTimer = setTimeout(() => {
      onClose();
    }, duration + 300);

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
    };
  }, [duration, onClose]);

  const toastStyles = `
    ${styles.toast} 
    ${styles[type]} 
    ${isVisible ? styles.toastEnter : ''} 
    ${isExiting ? styles.toastExit : ''}
  `;

  return (
    <div className={toastStyles}>
      <button
        className={styles.closeButton}
        onClick={() => {
          setIsExiting(true);
          setTimeout(onClose, 300);
        }}
      >
        <Image src={icons.circleCloseIcon} alt="close icon" />
      </button>
      <h3 className={styles.toastTitle}>{title}</h3>
      <p className={styles.toastMessage}>{message}</p>
    </div>
  );
};
