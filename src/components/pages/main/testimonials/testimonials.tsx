import { TestimonialCard } from '@/components/testimonial-card/testimonial-card';
import styles from './testimonials.module.css';
import { images } from '../../../../../public/assets/assets';

export const Testimonials = () => {
  return (
    <section className={styles.testimonialsContainer}>
      <h1>Testimonials</h1>
      <div className={styles.testimonialsCards}>
        <TestimonialCard
          text="Ocean Library has become my go-to place for discovering new books and authors. The collection is extensive, and the website is so easy to navigate. I love the personalized recommendations!"
          name="Anna L., Book Lover"
          image={images.testimonial1Image}
        />

        <TestimonialCard
          text="Ocean Library has something for everyone in the family. My kids love the children’s section, and I’ve found plenty of novels to enjoy myself. It’s a wonderful community resource!"
          name="Sarah K., Parent"
          image={images.testimonial3Image}
        />

        <TestimonialCard
          text="As a student, I rely on Ocean Library to access resources for my studies. The digital lending system is smooth, and the support team has always been incredibly helpful whenever I've had questions."
          name="Michael R., Student"
          image={images.testimonial2Image}
        />
      </div>
    </section>
  );
};
