import { Metadata } from 'next';
import { getAllItems } from '@/lib/content';
import PCSoftwaresClient from './PCSoftwaresClient';

export const metadata: Metadata = {
  title: 'PC Software',
  description: 'Download professional PC software and utilities via BitTorrent. Repacks from trusted uploaders.',
};

export default function PCSoftwaresPage() {
  const items = getAllItems('pc-softwares');
  return <PCSoftwaresClient items={items} />;
}
