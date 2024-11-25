import styles from './event-card.module.css';
import { images } from '../../../public/assets/assets';

export const EventCard = () => {
  return (
    <div
      className={styles.cardContainer}
      style={{ backgroundImage: `url(${images.eventTest1Image.src})` }}
    >
      <p className={styles.eventTitle}>Oficina de Escrita Criativa</p>

      <div className={styles.footerCard}>
        <button className={styles.register}>participar</button>

        <span className={styles.dec}></span>
      </div>
    </div>
  );
};
