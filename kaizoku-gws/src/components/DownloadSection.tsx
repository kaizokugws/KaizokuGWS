'use client';

import { useState } from 'react';
import { Download, AlertTriangle } from 'lucide-react';

interface DownloadOption {
  name: string;
  magnetFile: string;
}

interface DownloadSectionProps {
  magnetFiles: DownloadOption[];
  title: string;
}

export default function DownloadSection({ magnetFiles, title }: DownloadSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleDownload = (index: number) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const confirmDownload = async () => {
    setLoading(true);
    try {
      const magnetFile = magnetFiles[selectedIndex].magnetFile;
      const response = await fetch(magnetFile);
      const magnetLink = await response.text();
      window.location.href = magnetLink.trim();
    } catch (error) {
      console.error('Failed to fetch magnet link:', error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
        <h2 className="text-xl font-bold mb-4">Download</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {magnetFiles.map((option, index) => (
            <button
              key={option.name}
              onClick={() => handleDownload(index)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff3e3e] to-[#ff6b00] hover:from-[#ff5e5e] hover:to-[#ff7d20] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,62,62,0.4)]"
            >
              <Download className="w-5 h-5" />
              {option.name}
            </button>
          ))}
        </div>
        <p className="text-[#666] text-sm mt-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#ff6b00]" />
          Requires BitTorrent client to download
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-[#141414] rounded-xl p-6 max-w-md w-full border border-[#222] animate-slide-up">
            <h3 className="text-xl font-bold mb-4">Confirm Download</h3>
            <p className="text-[#888] mb-6">
              Download &quot;{title}&quot; - {magnetFiles[selectedIndex].name}? This will open your BitTorrent client.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 px-4 border border-[#333] rounded-lg hover:bg-[#1a1a1a] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDownload}
                disabled={loading}
                className="flex-1 py-2.5 px-4 bg-[#ff3e3e] hover:bg-[#ff5e5e] rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Opening...' : 'Yes, Download'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}