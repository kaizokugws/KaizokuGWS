'use client';

import Link from 'next/link';
import { SearchX, Send, RefreshCw, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  searchQuery?: string;
}

export default function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div 
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 rounded-full bg-[#111418] flex items-center justify-center mb-6"
      >
        <SearchX className="w-10 h-10 text-[#4FD1FF]" />
      </motion.div>
      <h3 className="text-heading-3 mb-2 text-[#E6EDF3]">
        No results found
      </h3>
      <p className="text-body mb-2 max-w-md">
        {searchQuery
          ? `No items match "${searchQuery}". Try a different search term.`
          : 'No items match your current filters.'}
      </p>
      <p className="text-muted mb-6">
        Can&apos;t find what you&apos;re looking for?
      </p>
      <div className="flex gap-3">
        <Link
          href="/request"
          className="flex items-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,209,255,0.4)]"
        >
          <Send className="w-5 h-5" />
          Request this item
        </Link>
        <Link
          href="/pc-games"
          className="flex items-center gap-2 border border-[#222] hover:border-[#4FD1FF] text-[#9AA4AF] hover:text-[#E6EDF3] py-3 px-6 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Browse All
        </Link>
      </div>
    </motion.div>
  );
}

export function LoadingState({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[#111418] rounded-xl overflow-hidden border border-[#222]">
          <div className="relative h-48 skeleton" />
          <div className="p-4 space-y-3">
            <div className="h-5 w-3/4 skeleton" />
            <div className="h-4 w-1/2 skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = 'Something went wrong', 
  message = 'An error occurred while loading.',
  onRetry 
}: ErrorStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-red-400" />
      </div>
      <h3 className="text-heading-3 mb-2 text-[#E6EDF3]">
        {title}
      </h3>
      <p className="text-body mb-6 max-w-md">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 border border-[#222] hover:border-[#4FD1FF] text-[#9AA4AF] hover:text-[#E6EDF3] py-3 px-6 rounded-lg transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      )}
    </motion.div>
  );
}