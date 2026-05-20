'use client';

import { franchises } from "@/lib/franchises";
import FranchiseCard from "./FranchiseCard";

export default function FranchiseGrid() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#E6EDF3]">
            Top Franchises
          </h2>
          <a 
            href="/pc-games"
            className="text-sm text-white/40 hover:text-white/80 
                       transition-colors duration-200 font-mono flex items-center gap-1"
          >
            Browse All 
            <span className="text-lg">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {franchises.map((franchise) => (
            <div
              key={franchise.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${franchises.indexOf(franchise) * 50}ms` }}
            >
              <FranchiseCard franchise={franchise} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
