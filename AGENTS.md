<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Styling Rules

- 모든 스타일 정의는 반드시 `app/globals.css`에만 작성한다. 색상, 간격, 타이포그래피 등의 토큰과 컴포넌트 스타일, 반응형 미디어 쿼리, 상태 및 애니메이션 스타일도 이 파일에서 관리한다.
- 컴포넌트별 CSS 파일, CSS Modules, Sass 파일을 새로 만들거나 스타일을 별도 파일로 분리하지 않는다.
- TSX/JSX의 `style` prop, `<style>` 태그, styled-jsx, CSS-in-JS로 스타일을 정의하지 않는다. 컴포넌트에서는 `className`으로 `app/globals.css`에 정의한 클래스를 적용한다.
- Tailwind의 토큰과 커스텀 유틸리티도 `app/globals.css`에서 정의한다. 기존 폰트 규칙의 `font-sans`, `font-emphasis`는 사용할 수 있지만, 새로운 스타일 값을 TSX/JSX의 임의값 유틸리티로 작성하지 않는다.
- 개발 서버나 캐시 문제를 우회하기 위해 스타일 파일을 분리하지 않는다. 요청받지 않은 기존 스타일 구조 변경이나 리팩터링은 하지 않는다.

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
