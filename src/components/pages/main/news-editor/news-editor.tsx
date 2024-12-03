import { NewsCard } from '@/components/news-card/news-card';
import styles from './news-editor.module.css';
import { News } from '@/services/api/types/news-types';

type NewsEditorProps = {
  news: News[];
};

export const NewsEditor = ({ news }: NewsEditorProps) => {
  return (
    <section className={styles.newsEditorContainer}>
      <h1>News</h1>
      <div className={styles.newsSection}>
        {news.map((item) => (
          <NewsCard news={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};
