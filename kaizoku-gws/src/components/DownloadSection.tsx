'use client';

import { useState } from 'react';
import { Download, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);

  const handleDownload = (index: number) => {
    setSelectedIndex(index);
    setError(null);
    setShowModal(true);
  };

  const confirmDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const magnetFile = magnetFiles[selectedIndex].magnetFile;
      const response = await fetch(magnetFile);
      if (!response.ok) {
        throw new Error('Download currently unavailable');
      }
      const magnetLink = await response.text();
      if (!magnetLink.trim()) {
        throw new Error('Download currently unavailable');
      }
      window.location.href = magnetLink.trim();
    } catch (err) {
      setError('Download currently unavailable');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null);
  };

  return (
    <>
      <div className="bg-[#111418] rounded-xl p-6 border border-[#222]">
        <h2 className="text-xl font-bold mb-4 text-[#E6EDF3]">Download</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {magnetFiles.map((option, index) => (
            <button
              key={option.name}
              onClick={() => handleDownload(index)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(79,209,255,0.4)]"
            >
              <Download className="w-5 h-5" />
              {option.name}
            </button>
          ))}
        </div>
        <p className="text-[#9AA4AF] text-sm mt-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Requires BitTorrent client to download
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative bg-[#111418] rounded-xl p-6 max-w-md w-full border border-[#222] animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#E6EDF3]">Confirm Download</h3>
              <button
                onClick={closeModal}
                className="text-[#9AA4AF] hover:text-[#E6EDF3] transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[#9AA4AF] mb-6">
              Download &quot;{title}&quot; - {magnetFiles[selectedIndex].name}? This will open your BitTorrent client.
            </p>
            
            {error && (
              <div className="flex items-center gap-2 p-3 mb-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                <XCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 px-4 border border-[#222] hover:border-[#4FD1FF] text-[#9AA4AF] hover:text-[#E6EDF3] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDownload}
                disabled={loading}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] font-medium rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0B0D10]/30 border-t-[#0B0D10] rounded-full animate-spin" />
                    Opening...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Yes, Download
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}