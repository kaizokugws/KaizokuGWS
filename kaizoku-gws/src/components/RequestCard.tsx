import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function RequestCard() {
  return (
    <Link href="/request" className="block group">
      <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] rounded-xl overflow-hidden border-2 border-dashed border-[#ff3e3e]/50 h-full min-h-[200px] flex flex-col items-center justify-center p-6 transition-all duration-300 hover:border-[#ff3e3e] hover:shadow-[0_0_30px_rgba(255,62,62,0.2)]">
        <PlusCircle className="w-12 h-12 text-[#ff3e3e] mb-4 group-hover:scale-110 transition-transform" />
        <p className="text-[#ff3e3e] font-semibold text-center">Request another game/software</p>
        <p className="text-[#666] text-sm text-center mt-2">
          Can&apos;t find what you&apos;re looking for? Let us know!
        </p>
      </div>
    </Link>
  );
}