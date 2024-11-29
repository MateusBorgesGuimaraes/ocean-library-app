import Image from 'next/image';
import styles from './footer.module.css';
import { icons } from '../../../public/assets/assets';

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.addressContainer}>
        <h4>address</h4>
        <ul>
          <li>rose garden street</li>
          <li>number 34</li>
          <li>liberty neighborhood</li>
          <li>Washington, D.C.</li>
        </ul>
      </div>

      <div className={styles.logoContainer}>
        <div>
          <Image src={icons.logoIcon} alt="logo" />
        </div>
        <p>©Ocean Library all rights reserved</p>
      </div>

      <div className={styles.socialMediaContainer}>
        <h4>social media</h4>
        <ul>
          <li>facebook</li>
          <li>twitter(x)</li>
          <li>instagram</li>
          <li>tiktok</li>
        </ul>
      </div>
    </footer>
  );
};
