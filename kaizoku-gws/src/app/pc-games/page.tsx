import { Metadata } from 'next';
import { getAllItems } from '@/lib/content';
import PCGamesClient from './PCGamesClient';

export const metadata: Metadata = {
  title: 'PC Games',
  description: 'Download premium PC games via BitTorrent. Repacks from FitGirl, DODI, and more.',
};

export default function PCGamesPage() {
  const items = getAllItems('pc-games');
  return <PCGamesClient items={items} />;
}
