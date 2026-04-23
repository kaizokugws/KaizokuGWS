interface SystemRequirementsProps {
  requirements: string;
}

export default function SystemRequirements({ requirements }: SystemRequirementsProps) {
  if (!requirements) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-[#E6EDF3]">System Requirements</h2>
      <div className="bg-[#111418] rounded-xl p-6 border border-[#222]">
        <div
          className="prose prose-invert prose-sm max-w-none text-[#9AA4AF]"
          dangerouslySetInnerHTML={{ __html: requirements }}
        />
      </div>
    </div>
  );
}