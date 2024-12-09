'use client';

import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

interface UseSearchOptions<T> {
  searchFn: (query: string) => Promise<T | null>;
  debounceTime?: number;
  minQueryLength?: number;
}

export function useSearch<T>({
  searchFn,
  debounceTime = 300,
  minQueryLength = 2,
}: UseSearchOptions<T>) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const performSearch = useCallback(
    async (query: string) => {
      if (query.trim().length < minQueryLength) {
        setSearchResults(null);
        setIsSearchOpen(false);
        return;
      }

      setError(null);

      try {
        const results = await searchFn(query);

        setSearchResults(results);
        setIsSearchOpen(!!results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setSearchResults(null);
        setIsSearchOpen(false);
      }
    },
    [searchFn, minQueryLength],
  );

  const debouncedSearch = useCallback(() => {
    return debounce(performSearch, debounceTime);
  }, [performSearch, debounceTime]);

  useEffect(() => {
    const searchDebounced = debouncedSearch();

    if (searchValue) {
      searchDebounced(searchValue);
    } else {
      setSearchResults(null);
      setIsSearchOpen(false);
    }

    return () => {
      searchDebounced.cancel();
    };
  }, [searchValue, debouncedSearch]);

  const clearSearch = useCallback(() => {
    setSearchValue('');
    setSearchResults(null);
    setIsSearchOpen(false);
    setError(null);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [],
  );

  return {
    searchValue,
    searchResults,
    error,
    isSearchOpen,
    setSearchValue,
    handleSearchChange,
    clearSearch,
  };
}
