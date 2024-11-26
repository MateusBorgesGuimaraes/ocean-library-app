import styles from './sidebar.module.css';
import { icons } from '../../public/assets/assets';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
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
              <Link href="/signin">
                <div className={`${styles.itemContainer}`}>
                  <Image src={icons.signInIcon} alt="sign in icon" />
                  sign in
                </div>
              </Link>
            </li>

            <li className={`${styles.menuItem}`}>
              <Link href="/signup">
                <div className={`${styles.itemContainer}`}>
                  <Image src={icons.signUpIcon} alt="sign up icon" />
                  sign up
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
