'use client';

import { useState } from 'react';
import { Download, AlertTriangle, CheckCircle, XCircle, FileText, HardDrive, Clock, ChevronRight, Check } from 'lucide-react';

interface DownloadOption {
  name: string;
  magnetFile: string;
  version?: string;
  notes?: string;
}

interface DownloadSectionProps {
  magnetFiles: DownloadOption[];
  title: string;
  fileSize?: string;
  lastUpdated?: string;
}

export default function DownloadSection({ magnetFiles, title, fileSize, lastUpdated }: DownloadSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

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
    const magnetLink = magnetFiles[selectedIndex].magnetFile;
    
    if (!magnetLink || !magnetLink.startsWith('magnet:')) {
      setError('Invalid magnet link');
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

  const isValidMagnet = (url: string) => {
    return url && url.startsWith('magnet:?xt=');
  };

  const selectedOption = magnetFiles[selectedIndex];

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
          {magnetFiles.map((option, index) => {
            const valid = isValidMagnet(option.magnetFile);
            return (
              <button
                key={option.name}
                onClick={() => handleDownload(index)}
                disabled={!valid}
                className={`flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${
                  valid 
                    ? 'bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] hover:shadow-[0_0_20px_rgba(79,209,255,0.4)]'
                    : 'bg-[#222] text-[#666] cursor-not-allowed'
                }`}
              >
                <Download className="w-5 h-5" />
                {option.name}
              </button>
            );
          })}
        </div>
        {magnetFiles.some(m => !isValidMagnet(m.magnetFile)) && (
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
            {/* Step indicator */}
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
                  {magnetFiles.map((option, index) => (
                    <button
                      key={option.name}
                      onClick={() => setSelectedIndex(index)}
                      className={`w-full p-4 rounded-lg border text-left transition-all ${
                        selectedIndex === index
                          ? 'border-[#4FD1FF] bg-[#4FD1FF]/10'
                          : 'border-[#222] hover:border-[#4FD1FF]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-[#E6EDF3]">{option.name}</div>
                          {option.version && (
                            <div className="text-sm text-[#9AA4AF]">Version: {option.version}</div>
                          )}
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
                  {selectedOption.version && (
                    <div className="flex items-center gap-3 p-3 bg-[#161A20] rounded-lg">
                      <Clock className="w-5 h-5 text-[#4FD1FF]" />
                      <div>
                        <div className="text-sm text-[#9AA4AF]">Version</div>
                        <div className="text-[#E6EDF3]">{selectedOption.version}</div>
                      </div>
                    </div>
                  )}
                  {selectedOption.notes && (
                    <div className="flex items-start gap-3 p-3 bg-[#161A20] rounded-lg">
                      <FileText className="w-5 h-5 text-[#4FD1FF] mt-0.5" />
                      <div>
                        <div className="text-sm text-[#9AA4AF]">Notes</div>
                        <div className="text-[#E6EDF3]">{selectedOption.notes}</div>
                      </div>
                    </div>
                  )}
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
                    <span className="text-[#E6EDF3]">{selectedOption.name}</span>
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