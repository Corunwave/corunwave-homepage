<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Font Usage Rules

- Use **Pretendard** as the default font for body text, navigation, buttons, and general UI. Inherit the global body font or use Tailwind's `font-sans` utility.
- Use **A2Z** for intentionally emphasized text, such as accent headings. Apply `font-emphasis` only to those elements; do not replace the default font globally. This utility currently uses A2Z Regular.
- Reuse the local fonts defined in `public/fonts/fonts.ts`. Their CSS variables must be registered through the exported fonts' `.variable` classes in `app/layout.tsx`.
- Keep font choices centralized in `app/globals.css`: `--font-family-body` references `--font-pretendard`, and `--font-family-emphasis` references `--font-a2z-regular`. Use these tokens in custom CSS instead of hardcoding font families.
- Preserve these font rules when implementing Figma designs, even if the reference uses Noto Sans KR or another temporary font. Do not introduce external font downloads for these roles.

Example:

```tsx
<p className="font-sans">Default text in Pretendard</p>
<h2 className="font-emphasis">Accent heading in A2Z</h2>
```
