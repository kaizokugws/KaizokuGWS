"use client";

import { useEffect } from "react";
import { useBackground } from "@/context/BackgroundContext";

export default function HideDotWave() {
  const { setShowDotWave } = useBackground();
  useEffect(() => {
    setShowDotWave(false);
    return () => setShowDotWave(true);
  }, []);
  return null;
}
