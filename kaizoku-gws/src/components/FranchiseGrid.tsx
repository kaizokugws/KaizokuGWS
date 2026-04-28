'use client';

import { motion } from "framer-motion";
import { franchises } from "@/lib/franchises";
import FranchiseCard from "./FranchiseCard";

export default function FranchiseGrid() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header — match existing section header style on the page */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#E6EDF3]">
            Top Franchises
          </h2>
          <a 
            href="/pc-games"
            className="text-sm text-white/40 hover:text-white/80 
                       transition-colors duration-200 font-mono"
          >
            Browse All →
          </a>
        </div>

        {/* Grid - wider cards (fewer columns), shorter height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {franchises.map((franchise, index) => (
            <motion.div
              key={franchise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.06,
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <FranchiseCard franchise={franchise} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
