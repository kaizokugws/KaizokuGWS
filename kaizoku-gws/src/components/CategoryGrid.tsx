'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Item, SortOption } from '@/lib/types';
import EmptyState from '@/components/EmptyState';
import RequestCard from '@/components/RequestCard';

interface CategoryGridProps {
  items: Item[];
  category: string;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'title', label: 'Alphabetical' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'releaseYear', label: 'Newest' },
  { value: 'lastUpdated', label: 'Recently Added' },
];

export default function CategoryGrid({ items, category }: CategoryGridProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    items.forEach((item) => item.tags?.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [items]);

  const allYears = useMemo(() => {
    const years = new Set<number>();
    items.forEach((item) => {
      if (item.releaseYear) years.add(item.releaseYear);
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [items]);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.aliases?.some((a) => a.includes(q)) ||
          item.tags?.some((t) => t.includes(q))
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((item) =>
        selectedTags.some((tag) => item.tags?.includes(tag))
      );
    }

    if (selectedYear) {
      result = result.filter((item) => item.releaseYear === selectedYear);
    }

    result.sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';

      switch (sortBy) {
        case 'rating':
          aVal = a.rating || 0;
          bVal = b.rating || 0;
          break;
        case 'releaseYear':
          aVal = a.releaseYear || 0;
          bVal = b.releaseYear || 0;
          break;
        case 'lastUpdated':
          aVal = a.lastUpdated || '';
          bVal = b.lastUpdated || '';
          break;
        default:
          aVal = a.title;
          bVal = b.title;
      }

      if (typeof aVal === 'number') {
        return sortDir === 'asc' ? aVal - (bVal as number) : (bVal as number) - aVal;
      }
      return sortDir === 'asc'
        ? aVal.localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal);
    });

    return result;
  }, [items, search, sortBy, sortDir, selectedTags, selectedYear]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
    setSelectedYear(null);
    setSortBy('title');
    setSortDir('asc');
  };

  const hasActiveFilters = search || selectedTags.length > 0 || selectedYear;

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#9AA4AF]">No items available yet</p>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <>
        <div className="mb-6 p-4 bg-[#111418] rounded-lg border border-[#222]">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder={`Search ${category.replace('-', ' ')}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-[#9AA4AF] text-[#E6EDF3]"
            />
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#4FD1FF] hover:text-[#6ED8FF]"
            >
              Clear filters
            </button>
          )}
        </div>
        <EmptyState searchQuery={search} />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder={`Search ${category.replace('-', ' ')}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-[#111418] border border-[#222] rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#4FD1FF] transition-colors placeholder:text-[#9AA4AF] text-[#E6EDF3]"
        />

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-[#111418] border border-[#222] rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#4FD1FF] transition-colors text-[#E6EDF3]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
            className="px-3 py-2 bg-[#111418] border border-[#222] rounded-lg hover:border-[#4FD1FF] transition-colors text-[#9AA4AF]"
          >
            {sortDir === 'asc' ? '↑' : '↓'}
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 border rounded-lg transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-[#4FD1FF]/10 border-[#4FD1FF] text-[#4FD1FF]'
                : 'bg-[#111418] border-[#222] text-[#9AA4AF] hover:border-[#4FD1FF]'
            }`}
          >
            {showFilters || hasActiveFilters ? '✓' : '⚙'}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-[#111418] border border-[#222] rounded-lg p-4 space-y-4">
          {allTags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 text-[#E6EDF3]">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-[#4FD1FF] text-[#0B0D10]'
                        : 'bg-[#161A20] text-[#9AA4AF] hover:text-[#E6EDF3]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {allYears.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 text-[#E6EDF3]">Release Year</h4>
              <div className="flex flex-wrap gap-2">
                {allYears.map((year) => (
                  <button
                    key={year}
                    onClick={() =>
                      setSelectedYear(selectedYear === year ? null : year)
                    }
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedYear === year
                        ? 'bg-[#4FD1FF] text-[#0B0D10]'
                        : 'bg-[#161A20] text-[#9AA4AF] hover:text-[#E6EDF3]'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#4FD1FF] hover:text-[#6ED8FF]"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      <div className="text-sm text-[#9AA4AF]">
        Showing {filteredItems.length} of {items.length} items
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Link key={item.slug} href={`/${category}/${item.slug}`} className="group block">
            <div className="bg-[#111418] rounded-xl overflow-hidden border border-[#222] transition-all duration-300 hover:border-[#4FD1FF] hover:shadow-[0_0_20px_rgba(79,209,255,0.15)] hover:-translate-y-1">
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-base truncate text-[#E6EDF3] group-hover:text-[#4FD1FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#9AA4AF] text-sm mt-1">{item.category}</p>
              </div>
            </div>
          </Link>
        ))}
        <RequestCard />
      </div>
    </div>
  );
}