'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Item } from '@/lib/types';
import Link from 'next/link';
import { formatCategory } from '@/lib/utils';

interface SearchBarProps {
  items: Item[];
  category: string;
}

export default function SearchBar({ items, category }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return items
      .filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.aliases?.some(alias => alias.toLowerCase().includes(q)) ||
        item.tags?.some(tag => tag.toLowerCase().includes(q))
      )
      .slice(0, 8);
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

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9AA4AF] pointer-events-none" />
        <input
          type="text"
          placeholder={`Search ${category.replace('-', ' ')}...`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results.length > 0) {
              const firstResult = results[0];
              window.location.href = `/${category}/${firstResult.slug}`;
            }
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="w-full bg-[#111418] border border-[#222] rounded-lg py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-[#4FD1FF] transition-colors placeholder:text-[#9AA4AF] text-[#E6EDF3]"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA4AF] hover:text-[#E6EDF3] transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#111418] border border-[#222] rounded-lg overflow-hidden z-50 shadow-xl max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            results.map((item) => (
              <Link
                key={item.slug}
                href={`/${category}/${item.slug}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="flex items-center gap-3 p-3 hover:bg-[#161A20] transition-colors border-b border-[#222]/50 last:border-0"
              >
                <div className="w-10 h-10 rounded bg-[#222] overflow-hidden flex-shrink-0">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#E6EDF3] truncate">{item.title}</p>
                  <p className="text-xs text-[#9AA4AF]">{formatCategory(item.category)}</p>
                </div>
              </Link>
            ))
          ) : query.trim() ? (
            <div className="p-4 text-center text-[#9AA4AF] text-sm">
              No results found for &quot;{query}&quot;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}