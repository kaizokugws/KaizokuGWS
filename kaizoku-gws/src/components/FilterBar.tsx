'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Item, FilterState, SortOption } from '@/lib/types';

interface FilterBarProps {
  items: Item[];
  category: string;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'title', label: 'Alphabetical' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'releaseYear', label: 'Newest' },
  { value: 'lastUpdated', label: 'Recently Added' },
];

export default function FilterBar({ items, category }: FilterBarProps) {
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9AA4AF]" />
          <input
            type="text"
            placeholder={`Search ${category.replace('-', ' ')}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111418] border border-[#222] rounded-lg py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-[#4FD1FF] transition-colors placeholder:text-[#9AA4AF]"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA4AF] hover:text-[#E6EDF3]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

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
            className="p-2.5 bg-[#111418] border border-[#222] rounded-lg hover:border-[#4FD1FF] transition-colors"
          >
            <ChevronDown
              className={`w-5 h-5 text-[#9AA4AF] transition-transform ${
                sortDir === 'asc' ? '' : 'rotate-180'
              }`}
            />
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 border rounded-lg transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-[#4FD1FF]/10 border-[#4FD1FF] text-[#4FD1FF]'
                : 'bg-[#111418] border-[#222] text-[#9AA4AF] hover:border-[#4FD1FF]'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
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
              className="text-sm text-[#4FD1FF] hover:text-[#6ED8FF] transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      <div className="text-sm text-[#9AA4AF]">
        Showing {filteredItems.length} of {items.length} items
      </div>
    </div>
  );
}