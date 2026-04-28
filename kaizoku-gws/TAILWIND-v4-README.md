# Tailwind CSS v4 Configuration

This project uses **Tailwind CSS v4** which uses a CSS-based configuration approach.

## Key Points:
- No `tailwind.config.ts` file needed
- Configuration is done via CSS variables in `src/app/globals.css`
- PostCSS config: `@tailwindcss/postcss` plugin in `postcss.config.mjs`
- Import: `@import "tailwindcss";` at the top of `src/app/globals.css`

## Content Paths:
Tailwind v4 automatically scans for class names in:
- `src/` directory (all files)
- `node_modules/` (for component libraries if needed)

No need to specify content paths manually like in v3.
