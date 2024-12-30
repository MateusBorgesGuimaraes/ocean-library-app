'use client';

import { EditNewsForm } from '@/components/forms/edit-news-form/edit-news-form';
import { newsService } from '@/services/api/news-service';
import { News } from '@/services/api/types/news-types';
import React from 'react';

type EditNewsProps = {
  id: string;
};

export const EditNews = ({ id }: EditNewsProps) => {
  const [news, setNews] = React.useState<News>();

  React.useEffect(() => {
    const fetchEvent = async () => {
      const response = await newsService.getNewsById(id);
      setNews(response);
    };
    fetchEvent();
  }, [id]);

  if (!news) {
    return null;
  }

  return (
    <div>
      <EditNewsForm initialData={news} />
    </div>
  );
};
