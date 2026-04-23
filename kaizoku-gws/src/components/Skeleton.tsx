'use client';

interface SkeletonProps {
  className?: string;
}

export function SkeletonCard({ className = '' }: SkeletonProps) {
  return (
    <div className={`bg-[#111418] rounded-xl overflow-hidden border border-[#222] ${className}`}>
      <div className="relative h-44 skeleton skeleton-image" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 skeleton skeleton-text" />
        <div className="h-4 w-1/2 skeleton skeleton-text" />
      </div>
    </div>
  );
}

export function SkeletonText({ className = '' }: SkeletonProps) {
  return <div className={`h-4 skeleton skeleton-text ${className}`} />;
}

export function SkeletonImage({ className = '' }: SkeletonProps) {
  return <div className={`skeleton skeleton-image ${className}`} />;
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}