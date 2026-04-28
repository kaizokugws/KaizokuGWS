import Link from 'next/link';
import { Home, Gamepad2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0D10] px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <span className="text-8xl font-bold text-[#4FD1FF] opacity-20">404</span>
        </div>
        <h1 className="text-2xl font-bold text-[#E6EDF3] mb-4">Page Not Found</h1>
        <p className="text-[#9AA4AF] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] text-[#0B0D10] font-semibold py-3 px-6 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(79,209,255,0.4)]"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/pc-games"
            className="flex items-center gap-2 border border-[#222] hover:border-[#4FD1FF] text-[#9AA4AF] hover:text-[#E6EDF3] py-3 px-6 rounded-lg transition-all"
          >
            <Gamepad2 className="w-5 h-5" />
            Browse Games
          </Link>
        </div>
      </div>
    </div>
  );
}
