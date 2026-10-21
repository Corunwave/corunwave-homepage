---
name: section-implement
description: 코런웨이브 홈페이지(이 저장소)에서 페이지 섹션 UI를 Figma 노드와 디자이너 프리뷰 HTML을 기준으로 구현하고, globals.css 단일 스타일시트 규칙·토큰·폰트 규칙을 지킨 뒤 npm run lint와 npm run build 통과까지 확인한다. 사용자가 "섹션 구현", "○○ 섹션 구현해줘", "○○ 섹션 만들어줘", "이 피그마 섹션 붙여줘", "다음 섹션 하자"처럼 말하거나, Figma 노드 링크나 프리뷰의 특정 섹션을 페이지에 추가해 달라고 하면 반드시 이 스킬을 사용할 것. 이 저장소에서는 범용 figma:implement-design보다 이 스킬이 우선한다.
---

# 섹션 구현 (corunwave-homepage)

이 스킬은 매번 반복해 오던 섹션 구현 지침을 하나로 묶은 것이다. 목표는 **디자인과 맞고, 프로젝트 규칙을 지키며, lint와 build를 통과하는 섹션 하나**다. 커밋은 하지 않는다. 사용자가 직접 커밋하거나 따로 요청한다.

## 1. 입력 파악

다음 세 가지를 요청에서 찾는다. 대화나 코드로 추론할 수 없는 것만 묻는다.

- **섹션 이름**: 예) "핵심과제", "연혁"
- **대상 페이지**: `app/page.tsx`(메인), `app/about/page.tsx`(회사소개) 등. 새 route라면 그 사실을 확인한다.
- **Figma URL**: `figma.com/design/:fileKey/...?node-id=1-2`에서 fileKey를 추출하고, nodeId의 `-`를 `:`로 바꾼다. 데스크톱과 모바일 노드가 따로 오는 경우가 많으니 둘 다 받는다.

## 2. 레퍼런스 수집

두 자료는 역할이 다르다. Figma는 **수치(크기·간격·색·타이포)**의 기준이고, 프리뷰 HTML은 **레이아웃 방식·모션·인터랙션 의도**의 기준이다.

**Figma**
- Figma MCP 서버 지침상 `get_design_context` 전에 `/figma-design-to-code` 스킬을 로드해야 한다.
- 호출 순서: `create_session`(fileKey) → `get_design_context` → `get_screenshot`. 모바일 노드도 같은 방식으로 가져온다.
- `get_design_context`가 돌려주는 코드는 참고용이다. Tailwind 임의값이나 인라인 스타일이 섞여 있어도 그대로 옮기지 말고 아래 규칙으로 번역한다.
- 이미지와 아이콘 에셋이 필요하면 `public/images/<page>/` 아래에 저장한다.

**프리뷰 HTML**
- 경로: `/Users/harenkei/Documents/08_works/01_corunwave/02_homepage/corunwave-preview/index.html` (에셋은 `./assets/`)
- 해당 섹션의 클래스명(예: `.business-direction`, `.core-challenges`)을 grep해서 마크업, CSS, JS를 읽는다. 스크롤 연동이나 sticky 같은 동작은 대부분 여기에 있다.
- 프리뷰에 해당 섹션이 없으면 Figma만으로 진행하고, 보고할 때 그 사실을 적는다.

**두 자료가 다를 때:** 수치는 Figma, 동작은 프리뷰를 따른다. 어느 쪽인지 판단하기 애매하면 합리적으로 고르고, 마지막 보고에 "불일치와 선택"으로 남긴다. 멈춰서 묻는 것보다 이쪽이 사용자에게 덜 번거롭다.

## 3. 기존 자산 확인

새로 만들기 전에 이미 있는 것을 찾는다. 일관성을 유지할 수 있고 globals.css가 불필요하게 커지는 것도 막는다.

- **토큰** (`app/globals.css`): 색상 `--color-*`, 간격 `--spacing-*`(px 이름), 반경 `--radius-*`, 타이포 `--text-*`, 거터 `--section-gutter-desktop|mobile`. 예를 들어 `--text-section-description-*`처럼 재사용할 수 있는 토큰이 있으면 그대로 쓴다.
- **공용 컴포넌트**: `app/_components/commons/`의 `buttons/LinkButton`, `buttons/BorderedButton`, `tabs/Tabs`, `hero/PageHero`
- **형제 섹션**: 같은 페이지의 섹션 하나를 읽고 구조와 주석 문체를 맞춘다. 정적 섹션은 `app/_components/about/BusinessDirectionSection.tsx`, 스크롤 연동 클라이언트 섹션은 `app/_components/home/ProposalTargetsSection.tsx`나 `SolutionsSection.tsx`가 좋은 예다.
- Next.js 16 API가 필요하면 `node_modules/next/dist/docs/`를 먼저 확인한다. 이 버전은 예전 관례와 다를 수 있다.

## 4. 컴포넌트 작성

- **위치**: `app/_components/<page>/<Name>Section.tsx` (예: `about/`, `home/`). 여러 페이지에서 쓰는 컴포넌트는 `app/_components/commons/<group>/`에 둔다.
- **서버 컴포넌트가 기본**이다. `"use client"`는 스크롤, IntersectionObserver, 상태, 이벤트, 브라우저 API가 필요할 때만 붙인다. 정적 콘텐츠를 클라이언트로 만들면 번들이 커지고 SEO 이점도 줄어든다.
- **형식**: `const XxxSection = () => { ... }; export default XxxSection;`. 텍스트와 카드 데이터는 파일 상단의 대문자 상수 배열로 분리한다.
- **출처 주석**: 컴포넌트 위에 한 줄을 남긴다. 예) `/* Business direction "사업 방향성" (preview .business-direction; Figma 653:20134 / 653:20160). Static server component. */`
- **시맨틱 구조**: `<section aria-labelledby="xxx-title">` 안에 `<h2 id="xxx-title">`를 두고, 카드 제목은 `h3`로 한다. 반복 카드는 `article`이나 `ul/li`로 만든다.
- **이미지**: `next/image`에 `width`와 `height`를 명시한다. 장식 이미지는 `alt=""`로 두고, 장식용 래퍼에는 `aria-hidden="true"`를 준다.
- **한국어 줄바꿈**: 끊기면 어색한 구절은 `<span className="<prefix>-keep">`로 감싼다. CSS 쪽은 references를 참고한다.
- **수동 메모이제이션 금지**: `useMemo`, `useCallback`, `memo`를 쓰지 않는다. React Compiler가 켜져 있다.
- **JS 모션**: 상태는 `data-*` 속성(예: `data-reveal`)으로 CSS에 전달한다. JS가 없어도 콘텐츠가 보이도록 기본 상태를 visible로 둔다. 리스너와 observer는 effect cleanup에서 해제한다.

## 5. 스타일 작성: 모두 `app/globals.css`

이 프로젝트의 하드 규칙이다(AGENTS.md, CLAUDE.md). 스타일을 다른 곳에 두면 리뷰에서 그대로 결함으로 지적된다.

**금지**
- `style` prop, `<style>`, CSS Modules, 별도 CSS 파일, CSS-in-JS
- JSX의 Tailwind 임의값(`w-[237px]` 등). 값이 필요하면 토큰을 먼저 만든다.
- font-family 하드코딩. `var(--font-family-body)`, `--font-family-heading`, `--font-family-emphasis`를 쓴다.
- `prefers-color-scheme`로 다크모드를 자동 적용하는 것
- 요청받지 않은 기존 스타일 리팩터링

**추가 순서와 배치**: 자세한 형식은 `references/css-conventions.md`를 읽는다.
1. `:root`의 섹션 토큰 영역에 `/* Section name */` 블록을 추가한다(`--<prefix>-inner-max` 등). 페이지 내 섹션 순서에 맞는 위치에 넣는다.
2. `@theme static` 끝부분에 타이포 토큰 `--text-<prefix>-<role>-desktop|mobile`과 `--line-height`, `--font-weight`, `--letter-spacing` 세트를 추가한다.
3. 같은 페이지의 기존 섹션 CSS 블록 바로 뒤에 출처 주석과 함께 섹션 CSS 블록을 추가한다. 블록 끝에는 `@media (width <= 1024px)`, `(width <= 760px)`를 두고, 모션이 있으면 `prefers-reduced-motion: reduce`도 둔다.

**태블릿 처리 원칙**: 디자인(Figma)에는 데스크톱과 모바일만 있고 태블릿 시안은 없다. 태블릿 범위(761px ~ 1024px)는 **모바일 레이아웃을 확장한 것**으로 처리한다.
- `@media (width <= 1024px)` 블록에 모바일 구성(열 수, 간격, 타이포 토큰, 오브젝트 크기 등)을 그대로 적용한다. 태블릿 전용 수치나 별도 타이포·간격 토큰은 만들지 않는다.
- 모바일 시안이 고정 너비(예: 358px)를 쓰더라도 태블릿에서는 컨테이너 폭에 맞춰 늘어나게(`width: 100%`, `1fr`, `max-width`) 한다. 모바일 시안의 비율과 정렬은 유지한다.
- 모바일 시안의 값(섹션 패딩, 제목·본문 타이포 토큰 포함)은 모두 `1024px` 블록에 둔다. `@media (width <= 760px)`에는 좁은 화면에서만 필요한 값(예: 좌우 거터를 16px로 줄이기)만 남긴다.
- 보고의 "불일치와 선택"에 "태블릿은 모바일 확장으로 처리"를 적는다.

**폰트 역할**: 본문, UI, 버튼은 Pretendard(`--font-family-body`), 섹션 제목은 `--font-family-heading`(A2Z Bold)이다. 일부 강조만 `font-emphasis`를 쓴다. Figma가 Noto Sans KR 등을 쓰더라도 이 역할을 따른다.

**클래스명**: 섹션 고유 prefix(예: `direction-`, `ceo-`, `challenges-`)를 붙인 kebab-case로 짓는다. 변형은 `--modifier`로 표시한다(`direction-branch--0`).

## 6. 페이지 연결

`app/<route>/page.tsx`에서 import하고 Figma와 프리뷰의 섹션 순서대로 `<main>` 안에 배치한다. import 경로는 기존 파일 스타일(상대 경로)을 따른다. 새 route라면 `metadata`(title, description)도 정의한다.

## 7. 검증: 통과해야 완료

```bash
npm run lint
npm run build
```

- 둘 다 통과할 때까지 원인을 고친다. `eslint-disable`, `@ts-ignore`, 규칙 완화로 우회하지 않는다. 그렇게 하면 실제 결함이 숨겨진다.
- build가 이번 변경과 무관한 기존 코드 때문에 실패하면, 고치기 전에 그 사실을 사용자에게 알린다.
- 규칙 자가 점검으로, 새로 만들거나 수정한 TSX에 다음이 없는지 확인한다.
  ```bash
  grep -nE 'style=|className="[^"]*-\[|\.module\.css|<style' <변경한 tsx 파일들>
  ```
- `next dev`가 `AGENTS.md`를 다시 만들어 diff가 생겨도 무시한다.
- **브라우저 대조는 하지 않는다.** `npm run dev`로 서버를 띄우거나 Chrome 도구·스크린샷으로 구현 결과를 Figma와 대조하는 일은 사용자가 직접 한다. 검증은 lint, build, 위 grep까지만 수행하고 개발 서버를 실행하지 않는다.

## 8. 보고

짧게 한국어로 보고한다.

- **만든/수정한 파일**: 컴포넌트, page.tsx, globals.css(추가한 토큰과 클래스 블록 요약), 에셋
- **디자인 대조 메모**: Figma와 프리뷰가 달랐던 점과 선택한 쪽, 확인하지 못한 부분(예: 모바일 노드 없음)
- **검증 결과**: lint와 build 각각 통과 여부. 실패가 남았다면 출력과 함께 그대로 적는다.
- **사용자 확인 필요 항목**: 브라우저에서 직접 대조해야 할 부분(예: 폭별 레이아웃, 모션, 줄바꿈)을 짧게 나열한다. 브라우저 확인은 하지 않았다고 명시한다.
- **커밋 메시지 제안** (커밋은 하지 않음): `feat: <페이지> <섹션명> 섹션 UI 구현`
  예) `feat: 회사소개 페이지 사업 방향성 섹션 UI 구현`
