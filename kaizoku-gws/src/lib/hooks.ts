'use client';

import { useEffect, useState, useCallback } from 'react';

const RECENTLY_VIEWED_KEY = 'kaizoku_recently_viewed';
const FAVORITES_KEY = 'kaizoku_favorites';
const MAX_ITEMS = 10;

export interface RecentlyViewedItem {
  slug: string;
  title: string;
  thumbnail: string;
  category: string;
  viewedAt: string;
}

export interface FavoriteItem {
  slug: string;
  title: string;
  thumbnail: string;
  category: string;
  addedAt: string;
}

function getStoredItems(key: string): RecentlyViewedItem[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<RecentlyViewedItem[]>(() => getStoredItems(RECENTLY_VIEWED_KEY));

  const addItem = useCallback((item: Omit<RecentlyViewedItem, 'viewedAt'>) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i.slug !== item.slug);
      const newItem: RecentlyViewedItem = {
        ...item,
        viewedAt: new Date().toISOString(),
      };
      const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);
      
      try {
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      
      return updated;
    });
  }, []);

  const clearItems = useCallback(() => {
    try {
      localStorage.removeItem(RECENTLY_VIEWED_KEY);
    } catch {
      // ignore
    }
    setItems([]);
  }, []);

  return {
    items,
    addItem,
    clearItems,
  };
}

function getStoredFavorites(key: string): FavoriteItem[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [items, setItems] = useState<FavoriteItem[]>(() => getStoredFavorites(FAVORITES_KEY));

  const isFavorite = useCallback((slug: string) => {
    return items.some(item => item.slug === slug);
  }, [items]);

  const toggleFavorite = useCallback((item: Omit<FavoriteItem, 'addedAt'>) => {
    setItems((prev) => {
      const exists = prev.some(i => i.slug === item.slug);
      
      if (exists) {
        const updated = prev.filter(i => i.slug !== item.slug);
        try {
          localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        } catch {}
        return updated;
      }
      
      const newItem: FavoriteItem = {
        ...item,
        addedAt: new Date().toISOString(),
      };
      const updated = [newItem, ...prev].slice(0, MAX_ITEMS);
      
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const clearItems = useCallback(() => {
    try {
      localStorage.removeItem(FAVORITES_KEY);
    } catch {}
    setItems([]);
  }, []);

  return {
    items,
    isFavorite,
    toggleFavorite,
    clearItems,
  };
}

