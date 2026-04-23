import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function RequestCard() {
  return (
    <Link href="/request" className="block group">
      <div className="bg-gradient-to-br from-[#111418] to-[#161A20] rounded-xl overflow-hidden border-2 border-dashed border-[#4FD1FF]/30 h-full min-h-[200px] flex flex-col items-center justify-center p-6 transition-all duration-300 hover:border-[#4FD1FF] hover:shadow-[0_0_30px_rgba(79,209,255,0.2)] hover:-translate-y-1">
        <PlusCircle className="w-10 h-10 text-[#4FD1FF] mb-4 group-hover:scale-110 transition-transform" />
        <p className="text-[#E6EDF3] font-semibold text-center group-hover:text-[#4FD1FF] transition-colors">Request another game/software</p>
        <p className="text-[#9AA4AF] text-sm text-center mt-2">
          Can&apos;t find what you&apos;re looking for? Let us know!
        </p>
      </div>
    </Link>
  );
}