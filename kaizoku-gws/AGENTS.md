<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Download Source Rule

Every game added to `src/content/pc-games/` MUST include a `sources` array in frontmatter.
Each source must have:
- name: display name of the repack (e.g. "FitGirl Repack", "Dodi Repack", "MR DJ Repack")
- file: the filename (without .txt) of the magnet file inside public/magnets/

The magnet file must exist at `public/magnets/[file].txt` before the game is published.

Naming convention for magnet files:
- `[slug]-fitgirl.txt`
- `[slug]-dodi.txt`
- `[slug]-[repackername].txt`

The DownloadSection component reads sources dynamically — never hardcode download buttons.
