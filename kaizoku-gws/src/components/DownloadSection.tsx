'use client';

import { useState, useEffect } from 'react';
import { Download, AlertTriangle, CheckCircle, XCircle, FileText, HardDrive, Clock, ChevronRight, Check } from 'lucide-react';
import { DownloadSource } from '@/lib/types';

interface DownloadSectionProps {
  sources: DownloadSource[];
  title: string;
  fileSize?: string;
  lastUpdated?: string;
}

export default function DownloadSection({ sources, title, fileSize, lastUpdated }: DownloadSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [magnets, setMagnets] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMagnets() {
      if (!sources || sources.length === 0) {
        setLoading(false);
        return;
      }

      const magnetMap = new Map<string, string>();
      
      for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        try {
          const response = await fetch(`/magnets/${source.file}.txt`);
          if (response.ok) {
            const text = await response.text();
            const trimmed = text.trim();
            magnetMap.set(source.file, trimmed);
          }
        } catch (e) {
          console.error(`Failed to fetch magnet for ${source.file}`);
        }
      }
      
      setMagnets(magnetMap);
      setLoading(false);
    }

    fetchMagnets();
  }, [sources]);

  const getMagnet = (file: string): string => {
    return magnets.get(file) || '';
  };

  const handleDownload = (index: number) => {
    setSelectedIndex(index);
    setError(null);
    setStep(1);
    setShowModal(true);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const confirmDownload = () => {
    const magnetLink = getMagnet(sources[selectedIndex].file);
    
    if (!magnetLink || !magnetLink.startsWith('magnet:')) {
      setError('Invalid or missing magnet link');
      return;
    }
    
    setDownloading(true);
    setTimeout(() => {
      window.location.href = magnetLink;
    }, 500);
  };

  const closeModal = () => {
    setShowModal(false);
    setStep(1);
    setError(null);
    setDownloading(false);
  };

  const isValidMagnet = (file: string): boolean => {
    const link = getMagnet(file);
    return typeof link === 'string' && link.startsWith('magnet:');
  };

  if (!sources || sources.length === 0) {
    return (
      <div className="bg-[#111418] rounded-xl p-6 border border-[#222]">
        <h2 className="text-xl font-bold mb-4 text-[#E6EDF3]">Download</h2>
        <p className="text-[#9AA4AF]">No downloads available</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#111418] rounded-xl p-6 border border-[#222]">
        <h2 className="text-xl font-bold mb-4 text-[#E6EDF3]">Download</h2>
        
        {(fileSize || lastUpdated) && (
          <div className="flex flex-wrap gap-4 mb-4 py-2 px-3 bg-[#161A20] rounded-lg border border-[#222]">
            {fileSize && fileSize !== 'Unknown' && (
              <div className="flex items-center gap-2 text-sm text-[#9AA4AF]">
                <HardDrive className="w-4 h-4 text-[#4FD1FF]" />
                <span>{fileSize}</span>
              </div>
            )}
            {lastUpdated && (
              <div className="flex items-center gap-2 text-sm text-[#9AA4AF]">
                <Clock className="w-4 h-4 text-[#4FD1FF]" />
                <span>Updated: {lastUpdated}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          {sources.map((source, index) => {
            const valid = loading || isValidMagnet(source.file);
            return (
              <button
                key={source.file}
                onClick={() => handleDownload(index)}
                disabled={!valid}
                className={`flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${
                  valid 
                    ? 'bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] hover:shadow-[0_0_20px_rgba(79,209,255,0.4)]'
                    : 'bg-[#222] text-[#666] cursor-not-allowed'
                }`}
              >
                <Download className="w-5 h-5" />
                {`Download — ${source.name}`}
              </button>
            );
          })}
        </div>
        {sources.some(s => !isValidMagnet(s.file)) && (
          <p className="text-red-400 text-sm mt-4 flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Some download options unavailable
          </p>
        )}
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
          <div className="relative bg-[#111418] rounded-xl p-6 max-w-lg w-full border border-[#222] animate-scale-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step >= s 
                      ? 'bg-[#4FD1FF] text-[#0B0D10]' 
                      : 'bg-[#222] text-[#666]'
                  }`}>
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-12 h-0.5 ${step > s ? 'bg-[#4FD1FF]' : 'bg-[#222]'}`} />
                  )}
                </div>
              ))}
            </div>

            {step === 1 && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#E6EDF3]">Select Version</h3>
                  <button
                    onClick={closeModal}
                    className="text-[#9AA4AF] hover:text-[#E6EDF3] transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-3 mb-6">
                  {sources.map((source, index) => (
                    <button
                      key={source.file}
                      onClick={() => setSelectedIndex(index)}
                      className={`w-full p-4 rounded-lg border text-left transition-all ${
                        selectedIndex === index
                          ? 'border-[#4FD1FF] bg-[#4FD1FF]/10'
                          : 'border-[#222] hover:border-[#4FD1FF]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-[#E6EDF3]">{source.name}</div>
                        </div>
                        {selectedIndex === index && (
                          <CheckCircle className="w-5 h-5 text-[#4FD1FF]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={nextStep}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  Next Step
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#E6EDF3]">Download Info</h3>
                  <button
                    onClick={closeModal}
                    className="text-[#9AA4AF] hover:text-[#E6EDF3] transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-[#161A20] rounded-lg">
                    <FileText className="w-5 h-5 text-[#4FD1FF]" />
                    <div>
                      <div className="text-sm text-[#9AA4AF]">File</div>
                      <div className="text-[#E6EDF3]">{title}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#161A20] rounded-lg">
                    <HardDrive className="w-5 h-5 text-[#4FD1FF]" />
                    <div>
                      <div className="text-sm text-[#9AA4AF]">Size</div>
                      <div className="text-[#E6EDF3]">{fileSize || 'Unknown'}</div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={nextStep}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  Next Step
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#E6EDF3]">Confirm Download</h3>
                  <button
                    onClick={closeModal}
                    className="text-[#9AA4AF] hover:text-[#E6EDF3] transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="bg-[#161A20] rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-[#4FD1FF]" />
                    <span className="text-[#E6EDF3]">{sources[selectedIndex].name}</span>
                  </div>
                  <p className="text-[#9AA4AF] text-sm">
                    This will open your BitTorrent client to begin downloading "{title}".
                  </p>
                </div>
                
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
                    disabled={downloading}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] font-medium rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {downloading ? 'Opening...' : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Confirm & Download
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}