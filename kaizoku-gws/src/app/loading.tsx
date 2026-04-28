import LoadingSkeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0B0D10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-[#222] rounded mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
