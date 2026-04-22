interface InstallationGuideProps {
  guide: string;
}

export default function InstallationGuide({ guide }: InstallationGuideProps) {
  if (!guide) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Installation Guide</h2>
      <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
        <div
          className="prose prose-invert prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: guide }}
        />
      </div>
    </div>
  );
}