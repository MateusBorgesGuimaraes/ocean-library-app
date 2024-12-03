'use client';

import { Hero } from '@/components/pages/main/hero/hero';
import styles from './page.module.css';
import { Events } from '@/components/pages/main/events/events';
import { NewAdditions } from '@/components/pages/main/new-additions/new-additions';
import { Testimonials } from '@/components/pages/main/testimonials/testimonials';
import { NewRealeases } from '@/components/pages/main/new-realeases/new-realeases';
import React from 'react';
import { News } from '@/services/api/types/news-types';
import { LibraryEvent } from '@/services/api/types/event-types';
import { Book } from '@/services/api/types/book-types';
import { editorChoiceService } from '@/services/api/editor-choice-service';
import { NewsEditor } from '@/components/pages/main/news-editor/news-editor';

export default function Home() {
  const [news, setNews] = React.useState<News[]>([]);
  const [events, setEvents] = React.useState<LibraryEvent[]>([]);
  const [books, setBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const items = await editorChoiceService.getEditorChoiceItems();

      if (!items) return;

      setNews(items.news);
      setEvents(items.events);
      setBooks(items.books);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <Events events={events} />
        <NewAdditions />
        <Testimonials />
        <NewsEditor news={news} />
        <NewRealeases book={books} />
      </main>
    </div>
  );
}
