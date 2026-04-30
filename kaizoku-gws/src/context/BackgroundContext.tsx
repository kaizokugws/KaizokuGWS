"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BackgroundContextType {
  showDotWave: boolean;
  setShowDotWave: (val: boolean) => void;
}

const BackgroundContext = createContext<BackgroundContextType>({
  showDotWave: true,
  setShowDotWave: () => {},
});

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [showDotWave, setShowDotWave] = useState(true);
  return (
    <BackgroundContext.Provider value={{ showDotWave, setShowDotWave }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export const useBackground = () => useContext(BackgroundContext);
