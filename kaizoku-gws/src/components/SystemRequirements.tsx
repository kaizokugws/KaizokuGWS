interface SystemRequirementsProps {
  requirements: string;
}

export default function SystemRequirements({ requirements }: SystemRequirementsProps) {
  if (!requirements) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">System Requirements</h2>
      <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
        <div
          className="prose prose-invert prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: requirements }}
        />
      </div>
    </div>
  );
}