'use client';

import Link from 'next/link';
import { SearchX, Send, RefreshCw, ArrowLeft, Frown } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  searchQuery?: string;
  category?: string;
}

export default function EmptyState({ searchQuery, category }: EmptyStateProps) {
  const browseUrl = category || '/pc-games';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 text-center px-4"
    >
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#4FD1FF]/20 to-[#4FD1FF]/5 flex items-center justify-center mb-8 border border-[#4FD1FF]/20"
      >
        <Frown className="w-12 h-12 text-[#4FD1FF]/60" />
        <div className="absolute inset-0 rounded-full bg-[#4FD1FF]/5 animate-pulse" />
      </motion.div>
      
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold mb-3 text-[#E6EDF3]"
      >
        No results found
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[#9AA4AF] mb-8 max-w-md"
      >
        {searchQuery ? (
          <>No items matching <span className="text-[#4FD1FF] font-medium">"{searchQuery}"</span>. Try different keywords.</>
        ) : (
          'No items match your current filters. Try adjusting your search or filters.'
        )}
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          href="/request"
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,209,255,0.5)] hover:scale-105"
        >
          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          Request this item
        </Link>
        <Link
          href={browseUrl}
          className="group flex items-center justify-center gap-2 border border-[#222] hover:border-[#4FD1FF] text-[#9AA4AF] hover:text-[#E6EDF3] py-3 px-8 rounded-xl transition-all duration-300 bg-[#111418]/50 hover:bg-[#111418]"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Browse All
        </Link>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-sm text-[#9AA4AF]/60"
      >
        <p>Tip: Try using fewer filters or search for a simpler term</p>
      </motion.div>
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