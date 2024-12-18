'use client';

import React, { useState } from 'react';

export interface PaginationMeta {
  total: number;
  page: number;
  totalPages: number;
}

export interface UsePaginationOptions<T, P = void> {
  fetchFn: (
    params: P,
    page?: number,
    limit?: number,
  ) => Promise<{
    data: T[];
    meta: {
      total: number;
      page: number;
      totalPages: number;
    };
  } | null>;
  initialParams: P;
  initialPage?: number;
  initialLimit?: number;
  skip?: boolean;
}

export function usePagination<T, P = void>({
  fetchFn,
  initialParams,
  initialPage = 1,
  initialLimit = 6,
  skip = false,
}: UsePaginationOptions<T, P>) {
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
      if (skip) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn(initialParams, page, limit);
        if (result) {
          setData(result.data);
          setMeta(result.meta);
        } else {
          console.log('passou fora');
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
    [fetchFn, initialParams, initialPage, initialLimit, skip],
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
    // Only fetch if not skipped
    if (!skip) {
      fetchData();
    }
  }, [fetchData, skip]);

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
