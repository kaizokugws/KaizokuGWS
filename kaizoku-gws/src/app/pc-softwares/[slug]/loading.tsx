export default function SoftwareLoading() {
  return (
    <div className="min-h-screen bg-[#0B0D10] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="skeleton h-8 w-64 rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="skeleton h-[400px] w-full rounded-xl" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
          </div>
          <div className="space-y-4">
            <div className="skeleton h-48 w-full rounded-xl" />
            <div className="skeleton h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}