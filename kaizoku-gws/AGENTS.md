<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Download Source Rules

Every game added to src/content/pc-games/ MUST include a `sources` array in frontmatter before it is published.

Each source entry must have:
  - name: display name shown on the button (e.g. "FitGirl Repack", "Dodi Repack", "MR DJ Repack")
  - file: filename without .txt extension of the magnet file inside public/magnets/

The magnet file MUST exist at public/magnets/[file].txt before publishing.
Each .txt file must contain exactly one magnet link and nothing else.
No concatenated links. No empty files. No placeholder hashes.

Magnet file naming convention:
  [slug]-fitgirl.txt
  [slug]-dodi.txt
  [slug]-[repackername].txt    e.g. gta-san-andreas-mrdj.txt

The DownloadSection component reads sources dynamically.
Never hardcode download button labels or magnet links in any component or markdown file.

To add a new game:
  1. Add magnet .txt file(s) to public/magnets/ using naming convention
  2. Add sources array to the game's markdown frontmatter
  3. Verify each source.file matches an existing .txt filename exactly
  4. Add popular: true to frontmatter if this is a featured title

## Legacy Rules (do not use)

Old system - DO NOT USE:
- `magnetFile` field in frontmatter
- `repacks` array in frontmatter

These fields are deprecated. Use only `sources` array.

## Date Rules

Always update `lastUpdated` to the current date when editing any game or software markdown file.
The date format is ISO 8601: "YYYY-MM-DD" (e.g., "2026-04-29").
When adding a new game, set `lastUpdated` to the current date.
Never leave `lastUpdated` with outdated dates like 2024 when the current year is 2026.
