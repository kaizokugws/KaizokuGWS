'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  
  const pages: (number | '...')[] = [1];
  
  if (current > 3) pages.push('...');
  
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  
  for (let i = start; i <= end; i++) pages.push(i);
  
  if (current < total - 2) pages.push('...');
  
  pages.push(total);
  return pages;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const router = useRouter();

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(`${basePath}?page=${page}`);
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3, ease: 'easeOut' }}
      className="flex items-center justify-center gap-1.5 mt-12 mb-8 flex-wrap"
    >
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative inline-flex items-center justify-center min-w-[2.5rem] h-10 px-4 text-sm font-mono border border-white/10 bg-white/5 text-white/60 rounded-md transition-all duration-200 ease-out hover:border-white/30 hover:text-white hover:bg-white/10 cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
      >
        <ChevronLeft size={16} />
        <span className="sr-only">Previous</span>
      </button>

      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex items-center justify-center min-w-[2.5rem] h-10 text-white/30 text-sm font-mono cursor-default select-none"
            >
              ...
            </span>
          );
        }

        const isActive = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`relative inline-flex items-center justify-center min-w-[2.5rem] h-10 px-3 text-sm font-mono border rounded-md transition-all duration-200 ease-out cursor-pointer select-none ${
              isActive
                ? 'border-[#4FD1FF] bg-[#4FD1FF]/15 text-white shadow-[0_0_12px_rgba(79,209,255,0.3)] cursor-default'
                : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:text-white hover:bg-white/10'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activePage"
                className="absolute inset-0 rounded-md border border-[#4FD1FF] bg-[#4FD1FF]/10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{page}</span>
          </button>
        );
      })}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="relative inline-flex items-center justify-center min-w-[2.5rem] h-10 px-4 text-sm font-mono border border-white/10 bg-white/5 text-white/60 rounded-md transition-all duration-200 ease-out hover:border-white/30 hover:text-white hover:bg-white/10 cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
      >
        <ChevronRight size={16} />
        <span className="sr-only">Next</span>
      </button>
    </motion.div>
  );
}
