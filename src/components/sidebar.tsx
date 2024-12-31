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
import { useUserStore } from '@/store/user-store';
import { authService } from '@/services/api/auth-service';
import { RoutePolicies } from '@/services/api/types/auth-types';
import { useUserLoansStore } from '@/store/user-loans-store';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const { user, removeUser } = useUserStore();
  const { removeUserLoans } = useUserLoansStore();
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

  const logout = () => {
    removeUser();
    authService.removeToken();
    removeUserLoans();
    window.location.href = '/';
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
            <Image src={icons.logoIcon} alt="logo" width={132} height={45} />
          </Link>
        </div>

        <div className={`${styles.generalMenu}`}>
          <ul className={`${styles.menuList}`}>
            <li className={`${styles.menuItem}`}>
              <Link href="/news">
                <div className={`${styles.itemContainer}`}>
                  <Image
                    src={icons.newsIcon}
                    alt="news icon"
                    width={24}
                    height={24}
                  />
                  news
                </div>
              </Link>
            </li>

            {user && (
              <li className={`${styles.menuItem}`}>
                <Link href="/events">
                  <div className={`${styles.itemContainer}`}>
                    <Image
                      src={icons.eventIcon}
                      alt="event icon"
                      width={24}
                      height={24}
                    />
                    events
                  </div>
                </Link>
              </li>
            )}

            {user && (
              <li className={`${styles.menuItem}`}>
                <div onClick={openModal3}>
                  <div className={`${styles.itemContainer}`}>
                    <Image
                      src={icons.requestIcon}
                      alt="request icon"
                      width={24}
                      height={24}
                    />
                    request
                  </div>
                </div>
              </li>
            )}

            {user && (
              <li className={`${styles.menuItem}`}>
                <Link href="/loans">
                  <div className={`${styles.itemContainer}`}>
                    <Image
                      src={icons.loansIcon}
                      alt="loans icon"
                      width={24}
                      height={24}
                    />
                    loans
                  </div>
                </Link>
              </li>
            )}

            {!user && (
              <>
                <li className={`${styles.menuItem}`}>
                  <div onClick={openModal}>
                    <div className={`${styles.itemContainer}`}>
                      <Image
                        src={icons.signInIcon}
                        alt="sign in icon"
                        width={24}
                        height={24}
                      />
                      sign in
                    </div>
                  </div>
                </li>

                <li className={`${styles.menuItem}`}>
                  <div onClick={openModal2}>
                    <div className={`${styles.itemContainer}`}>
                      <Image
                        src={icons.signUpIcon}
                        alt="sign up icon"
                        width={24}
                        height={24}
                      />
                      sign up
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <FormBox>
            <FormBox.Header title="Welcome to the" image={icons.logoIcon} />
            <FormBox.Subtitle text="Log in or register now to continue browsing" />
            <FormBox.Content>
              <LoginForm closeModal={setIsOpen} />
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
              <RegisterForm closeModal={setIsOpen2} />
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
      {user && (
        <div className={styles.privateContent}>
          <div className={styles.accordionContainer}>
            <div className={styles.accordionList}>
              {(user.permissions.includes(RoutePolicies.admin) ||
                user.permissions.includes(RoutePolicies.librarian)) && (
                <AccordionLinks
                  mainItem={{ title: 'Librarian', icon: icons.librariamIcon }}
                  subItems={[
                    {
                      title: 'users loans',
                      icon: icons.usersLoansIcon,
                      link: '/dashboard/librarian/users-loans',
                    },
                    {
                      title: 'user loan',
                      icon: icons.userLoanIcon,
                      link: '/dashboard/librarian/user-loans',
                    },
                    {
                      title: 'make loan',
                      icon: icons.makeLoanIcon,
                      link: '/dashboard/librarian/make-loan',
                    },
                    {
                      title: 'users requests',
                      icon: icons.requestIcon,
                      link: '/dashboard/librarian/user-request',
                    },
                  ]}
                />
              )}

              {(user.permissions.includes(RoutePolicies.admin) ||
                user.permissions.includes(RoutePolicies.socialMedia)) && (
                <AccordionLinks
                  mainItem={{
                    title: 'Social media',
                    icon: icons.socialMediaIcon,
                  }}
                  subItems={[
                    {
                      title: 'news',
                      icon: icons.socialMediaNewsIcon,
                      link: '/dashboard/social-media/news',
                    },
                    {
                      title: 'events',
                      icon: icons.socialMediaEventsIcon,
                      link: '/dashboard/social-media/events',
                    },
                  ]}
                />
              )}

              {(user.permissions.includes(RoutePolicies.admin) ||
                user.permissions.includes(RoutePolicies.stockController)) && (
                <AccordionLinks
                  mainItem={{
                    title: 'Stock manager',
                    icon: icons.stockManagerIcon,
                  }}
                  subItems={[
                    {
                      title: 'book',
                      icon: icons.bookIcon,
                      link: '/dashboard/stock-manager/books',
                    },
                    {
                      title: 'categories',
                      icon: icons.caregoriesIcon,
                      link: '/dashboard/stock-manager/category',
                    },
                  ]}
                />
              )}

              {user.permissions.includes(RoutePolicies.admin) && (
                <AccordionLinks
                  mainItem={{ title: 'Admin', icon: icons.adminIcon }}
                  subItems={[
                    {
                      title: 'users roles',
                      icon: icons.usersRolesIcon,
                      link: '/dashboard/admin/users-roles',
                    },
                  ]}
                />
              )}
            </div>
          </div>
          <div className={styles.logoutContainer}>
            <button className={styles.logoutButton} onClick={logout}>
              <Image
                src={icons.logoutIcon}
                alt="loans icon"
                width={24}
                height={24}
              />
              logout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
