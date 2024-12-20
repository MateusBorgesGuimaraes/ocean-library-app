'use client';

import { useToastStore } from '@/store/toast-store';
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
  manualFetch?: boolean;
}

export function usePagination<T, P = void>({
  fetchFn,
  initialParams,
  initialPage = 1,
  initialLimit = 6,
  skip = false,
  manualFetch = false,
}: UsePaginationOptions<T, P>) {
  const [data, setData] = useState<T[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    page: initialPage,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(!manualFetch);
  const [error, setError] = useState<string | null>(null);
  const addToast = useToastStore((state) => state.addToast);

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
          setData([]);
          setMeta({
            page: initialPage,
            total: 0,
            totalPages: 0,
          });
        }
      } catch (err) {
        addToast({
          title: 'Error',
          type: 'error',
          message: err instanceof Error ? err.message : 'An error occurred',
          duration: 5000,
        });
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
    [fetchFn, initialParams, initialPage, initialLimit, skip, addToast],
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
    if (!skip && !manualFetch) {
      fetchData();
    }
  }, [fetchData, skip, manualFetch]);

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
