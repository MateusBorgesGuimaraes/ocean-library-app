'use client';

import styles from './sidebar.module.css';
import { icons } from '../../public/assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Modal } from './modal';
import { FormBox } from './form-components/form-box/form-box';
import { LoginForm } from './forms/login-form/login-form';
import { RegisterForm } from './forms/register-form/register-form';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const openModal = () => {
    setIsOpen2(false);
    setIsOpen(true);
  };

  const openModal2 = () => {
    setIsOpen(false);
    setIsOpen2(true);
  };

  return (
    <section className={`${styles.sidebar}`}>
      <div className={`${styles.sidebarHeader}`}>
        <button onClick={onClose} className={styles.closeButton}>
          <Image
            src={icons.closeIcon}
            alt="Close sidebar"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className={`${styles.publicContent}`}>
        <div className={`${styles.icon}`}>
          <Link href="/">
            <Image src={icons.logoIcon} alt="logo" />
          </Link>
        </div>

        <div className={`${styles.generalMenu}`}>
          <ul className={`${styles.menuList}`}>
            <li className={`${styles.menuItem}`}>
              <Link href="/news">
                <div className={`${styles.itemContainer}`}>
                  <Image src={icons.newsIcon} alt="news icon" />
                  news
                </div>
              </Link>
            </li>

            <li className={`${styles.menuItem}`}>
              <Link href="/events">
                <div className={`${styles.itemContainer}`}>
                  <Image src={icons.eventIcon} alt="event icon" />
                  events
                </div>
              </Link>
            </li>

            <li className={`${styles.menuItem}`}>
              <Link href="/request">
                <div className={`${styles.itemContainer}`}>
                  <Image src={icons.requestIcon} alt="request icon" />
                  request
                </div>
              </Link>
            </li>

            <li className={`${styles.menuItem}`}>
              <Link href="/loans">
                <div className={`${styles.itemContainer}`}>
                  <Image src={icons.loansIcon} alt="loans icon" />
                  loans
                </div>
              </Link>
            </li>

            <li className={`${styles.menuItem}`}>
              <div onClick={openModal}>
                <div className={`${styles.itemContainer}`}>
                  <Image src={icons.signInIcon} alt="sign in icon" />
                  sign in
                </div>
              </div>
            </li>

            <li className={`${styles.menuItem}`}>
              <div onClick={openModal2}>
                <div className={`${styles.itemContainer}`}>
                  <Image src={icons.signUpIcon} alt="sign up icon" />
                  sign up
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <FormBox>
            <FormBox.Header title="Welcome to the" image={icons.logoIcon} />
            <FormBox.Subtitle text="Log in or register now to continue browsing" />
            <FormBox.Content>
              <LoginForm />
            </FormBox.Content>
            <FormBox.Footer text="Don't have an account?" strong="Register" />
          </FormBox>
        </Modal>
      )}

      {isOpen2 && (
        <Modal setIsOpen={setIsOpen2}>
          <FormBox>
            <FormBox.Header title="Welcome to the" image={icons.logoIcon} />
            <FormBox.Subtitle text="Log in or register now to continue browsing" />
            <FormBox.Content>
              <RegisterForm />
            </FormBox.Content>
            <FormBox.Footer text="Already have an account?" strong="Sign in" />
          </FormBox>
        </Modal>
      )}
    </section>
  );
};
