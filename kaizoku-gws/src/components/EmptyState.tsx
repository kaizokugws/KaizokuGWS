import Link from 'next/link';
import { SearchX, Send } from 'lucide-react';

interface EmptyStateProps {
  searchQuery?: string;
}

export default function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-[#111418] flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-[#4FD1FF]" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#E6EDF3]">
        No results found
      </h3>
      <p className="text-[#9AA4AF] mb-2 max-w-md">
        {searchQuery
          ? `No items match "${searchQuery}". Try a different search term.`
          : 'No items match your current filters.'}
      </p>
      <p className="text-[#9AA4AF] mb-6">
        Can&apos;t find what you&apos;re looking for?
      </p>
      <Link
        href="/request"
        className="flex items-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,209,255,0.4)]"
      >
        <Send className="w-5 h-5" />
        Request this item
      </Link>
    </div>
  );
}