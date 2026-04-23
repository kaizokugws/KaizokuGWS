'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Item } from '@/lib/types';
import Link from 'next/link';

interface SearchBarProps {
  items: Item[];
  category: string;
}

export default function SearchBar({ items, category }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredItems([]);
      return;
    }

    const q = query.toLowerCase().trim();
    if (!q) {
      setFilteredItems([]);
      return;
    }

    const filtered = items
      .filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const aliasMatch = item.aliases?.some((alias) => 
          alias.toLowerCase().includes(q)
        );
        const tagMatch = item.tags?.some((tag) => 
          tag.toLowerCase().includes(q)
        );
        return titleMatch || aliasMatch || tagMatch;
      })
      .slice(0, 8);

    setFilteredItems(filtered);
  }, [query, items]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery('');
    setFilteredItems([]);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setFilteredItems([]);
  };

  const categoryLabel = category.replace('-', ' ');

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9AA4AF] pointer-events-none" />
        <input
          type="text"
          placeholder={`Search ${categoryLabel}...`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) {
              setIsOpen(true);
            }
          }}
          className="w-full bg-[#111418] border border-[#222] rounded-lg py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-[#4FD1FF] transition-colors placeholder:text-[#9AA4AF] text-[#E6EDF3]"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA4AF] hover:text-[#E6EDF3] transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#111418] border border-[#222] rounded-lg overflow-hidden z-50 shadow-xl max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-4 text-center text-[#9AA4AF] text-sm">
              Type to search...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-[#9AA4AF] text-sm mb-2">
                No results for &quot;{query}&quot;
              </p>
              <Link
                href="/request"
                className="text-[#4FD1FF] text-sm hover:underline"
                onClick={handleClose}
              >
                Request this item
              </Link>
            </div>
          ) : (
            filteredItems.map((item) => (
              <Link
                key={item.slug}
                href={`/${category}/${item.slug}`}
                onClick={handleClose}
                className="flex items-center gap-3 p-3 hover:bg-[#161A20] transition-colors border-b border-[#222]/50 last:border-0"
              >
                <div className="w-10 h-10 rounded bg-[#222] overflow-hidden relative flex-shrink-0">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#E6EDF3] truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#9AA4AF]">
                    {item.category}
                  </p>
                </div>
                {item.rating && item.rating > 0 && (
                  <span className="text-xs text-[#4FD1FF] font-medium">
                    {item.rating}★
                  </span>
                )}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}