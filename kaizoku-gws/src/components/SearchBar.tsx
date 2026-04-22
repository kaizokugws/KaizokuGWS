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
    setFilteredItems(filtered);
  }, [query, items]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
        <input
          type="text"
          placeholder="Search games..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-[#141414] border border-[#222] rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#ff3e3e] transition-colors"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setFilteredItems([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && filteredItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#141414] border border-[#222] rounded-lg overflow-hidden z-50 shadow-xl">
          {filteredItems.map((item) => (
            <Link
              key={item.slug}
              href={`/${category}/${item.slug}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 hover:bg-[#1a1a1a] transition-colors"
            >
              <div className="w-10 h-10 rounded bg-[#222] overflow-hidden relative">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-[#666]">{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}