'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredItems([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.aliases?.some((alias) => alias.toLowerCase().includes(q))
    );
    setFilteredItems(filtered.slice(0, 6));
  }, [query, items]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9AA4AF]" />
        <input
          type="text"
          placeholder={`Search ${category.replace('-', ' ')}...`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-[#111418] border border-[#222] rounded-lg py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-[#4FD1FF] transition-colors placeholder:text-[#9AA4AF]"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setFilteredItems([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA4AF] hover:text-[#E6EDF3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && filteredItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#111418] border border-[#222] rounded-lg overflow-hidden z-50 shadow-xl">
          {filteredItems.map((item) => (
            <Link
              key={item.slug}
              href={`/${category}/${item.slug}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 hover:bg-[#161A20] transition-colors"
            >
              <div className="w-10 h-10 rounded bg-[#222] overflow-hidden relative flex-shrink-0">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#E6EDF3]">{item.title}</p>
                <p className="text-xs text-[#9AA4AF]">{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}