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
import { RequestForm } from './forms/request-form/request-form';
import { AccordionLinks } from './accordion-links/accordion-links';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [isOpen3, setIsOpen3] = React.useState(false);
  const openModal = () => {
    setIsOpen2(false);
    setIsOpen(true);
  };

  const openModal2 = () => {
    setIsOpen(false);
    setIsOpen2(true);
  };

  const openModal3 = () => {
    setIsOpen2(false);
    setIsOpen3(true);
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
              <div onClick={openModal3}>
                <div className={`${styles.itemContainer}`}>
                  <Image src={icons.requestIcon} alt="request icon" />
                  request
                </div>
              </div>
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
            <FormBox.Footer
              closeState={setIsOpen}
              openState={setIsOpen2}
              text="Don't have an account?"
              strong="Register"
            />
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
            <FormBox.Footer
              closeState={setIsOpen2}
              openState={setIsOpen}
              text="Already have an account?"
              strong="Sign in"
            />
          </FormBox>
        </Modal>
      )}

      {isOpen3 && (
        <Modal setIsOpen={setIsOpen3}>
          <FormBox>
            <FormBox.Header title="Request a book" />
            <FormBox.Subtitle text="The books will not necessarily be added, we will evaluate the request and depending on demand it will be approved" />
            <FormBox.Content>
              <RequestForm />
            </FormBox.Content>
          </FormBox>
        </Modal>
      )}
      <div className={styles.privateContent}>
        <div className={styles.accordionContainer}>
          <div className={styles.accordionList}>
            <AccordionLinks
              mainItem={{ title: 'Librarian', icon: icons.librariamIcon }}
              subItems={[
                { title: 'user loans', icon: icons.usersLoansIcon, link: '/' },
                { title: 'user loan', icon: icons.userLoanIcon, link: '/' },
                { title: 'make loan', icon: icons.makeLoanIcon, link: '/' },
                { title: 'user request', icon: icons.requestIcon, link: '/' },
              ]}
            />
            <AccordionLinks
              mainItem={{ title: 'Social media', icon: icons.socialMediaIcon }}
              subItems={[
                { title: 'news', icon: icons.socialMediaNewsIcon, link: '/' },
                {
                  title: 'events',
                  icon: icons.socialMediaEventsIcon,
                  link: '/',
                },
              ]}
            />
            <AccordionLinks
              mainItem={{
                title: 'Stock manager',
                icon: icons.stockManagerIcon,
              }}
              subItems={[
                { title: 'book', icon: icons.bookIcon, link: '/' },
                { title: 'categories', icon: icons.caregoriesIcon, link: '/' },
              ]}
            />
            <AccordionLinks
              mainItem={{ title: 'Admin', icon: icons.adminIcon }}
              subItems={[
                { title: 'users roles', icon: icons.usersRolesIcon, link: '/' },
              ]}
            />
          </div>
        </div>
        <div className={styles.logoutContainer}>
          <button className={styles.logoutButton}>
            <Image src={icons.logoutIcon} alt="loans icon" />
            logout
          </button>
        </div>
      </div>
    </section>
  );
};
