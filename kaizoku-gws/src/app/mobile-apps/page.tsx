import { Metadata } from 'next';
import { getAllItems } from '@/lib/content';
import MobileAppsClient from './MobileAppsClient';

export const metadata: Metadata = {
  title: 'Mobile Apps',
  description: 'Download Android APK apps via BitTorrent. Apps, games, and utilities for mobile devices.',
};

export default function MobileAppsPage() {
  const items = getAllItems('mobile-apps');
  return <MobileAppsClient items={items} />;
}
