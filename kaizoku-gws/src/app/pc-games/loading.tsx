'use client';

import { SkeletonGrid } from '@/components/Skeleton';

export default function Loading() {
  return (
    <main className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="skeleton skeleton-text w-48 h-8 mb-8" />
        <SkeletonGrid count={8} />
      </div>
    </main>
  );
}