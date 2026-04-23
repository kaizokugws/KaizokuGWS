'use client';

import { useEffect } from 'react';
import { useTrackView } from '@/components/RecentlyViewed';

export default function ViewTracker() {
  useTrackView();
  return null;
}