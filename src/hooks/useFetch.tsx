'use client';

import React, { useState } from 'react';

export interface PaginationMeta {
  total: number;
  page: number;
  totalPages: number;
}

export interface UsePaginationOptions<T> {
  fetchFn: (
    page?: number,
    limit?: number,
  ) => Promise<{
    data: T[];
    total: number;
    page: number;
    totalPages: number;
  } | null>;
  initialPage?: number;
  initialLimit?: number;
}

export function usePagination<T>({
  fetchFn,
  initialPage = 1,
  initialLimit = 6,
}: UsePaginationOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    page: initialPage,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = React.useCallback(
    async (page = initialPage, limit = initialLimit) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn(page, limit);

        if (result) {
          setData(result.data);
          setMeta({
            page: result.page,
            total: result.total,
            totalPages: result.totalPages,
          });
        } else {
          setData([]);
          setMeta({
            page: initialPage,
            total: 0,
            totalPages: 0,
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
        setMeta({
          page: initialPage,
          total: 0,
          totalPages: 0,
        });
      } finally {
        setLoading(false);
      }
    },
    [fetchFn, initialPage, initialLimit],
  );

  const nextPage = React.useCallback(() => {
    if (meta.page < meta.totalPages) {
      fetchData(meta.page + 1);
    }
  }, [meta, fetchData]);

  const prevPage = React.useCallback(() => {
    if (meta.page > 1) {
      fetchData(meta.page - 1);
    }
  }, [meta, fetchData]);

  const goToPage = React.useCallback(
    (page: number) => {
      if (page > 0 && page <= meta.totalPages) {
        fetchData(page);
      }
    },
    [meta, fetchData],
  );

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    meta,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage,
    fetchData,
  };
}
