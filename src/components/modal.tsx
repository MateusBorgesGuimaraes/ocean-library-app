import Image from 'next/image';
import { icons } from '../../public/assets/assets';
import styles from './modal.module.css';
import React from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  children: React.ReactNode;
  // setIsOpen: (isOpen: boolean) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal = ({ children, setIsOpen }: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const modalContent = (
    <div
      className={styles.modal}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={() => setIsOpen(false)}
          aria-label="Close Modal"
        >
          <Image
            src={icons.closeIcon}
            alt="Close Modal"
            width={24}
            height={24}
          />
        </button>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
