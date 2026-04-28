"use client";

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0D10] px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <span className="text-8xl font-bold text-[#4FD1FF] opacity-20">!</span>
        </div>
        <h1 className="text-2xl font-bold text-[#E6EDF3] mb-4">Something went wrong</h1>
        <p className="text-[#9AA4AF] mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 mx-auto bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] text-[#0B0D10] font-semibold py-3 px-6 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(79,209,255,0.4)]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
