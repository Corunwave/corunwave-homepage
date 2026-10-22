# globals.css 섹션 작성 패턴

최근 섹션 커밋(`ae84dda` 사업 방향성, `75388bf` CEO 인삿말)의 실제 형식을 정리했다. 새 섹션도 같은 모양으로 쓰면 diff가 예측 가능해지고 리뷰가 쉬워진다.

## 파일 구조 (위 → 아래)

1. `:root`: 섹션별 레이아웃 토큰 블록 (`/* CEO message */`, `/* Business direction */` …)
2. `[data-theme="dark"]`: 명시적 다크 테마
3. `@theme static`: 원시 색상, `--spacing-*`, `--radius-*`, `--text-*` (Tailwind 유틸리티 생성)
4. `@theme inline`: 애플리케이션 별칭
5. 컴포넌트 블록: 헤더 → 푸터 → Hero → Page hero → 회사소개 섹션들 → 메인 섹션들 …

## 1) `:root` 섹션 토큰

```css
  /* Business direction */
  --direction-inner-max: 1248px;
  --direction-description-max: 900px;
  --direction-visual-width: 400px;
  --direction-visual-width-mobile: 358px;
```

- 이름은 `--<prefix>-<의미>`, 값은 Figma 수치를 그대로 쓴다.
- 섹션 전용 색은 `--color-<prefix>-<의미>`로 짓는다(예: `--color-challenges-scrim`).
- JS가 읽거나 쓰는 변수에는 주석을 남긴다(예: `/* JS overwrites with the measured title height */`).

## 2) `@theme static` 타이포 토큰 (4종 세트)

```css
  /* Business direction typography (description reuses section-description / ceo-letter-mobile) */
  --text-direction-title-desktop: 2.25rem;
  --text-direction-title-desktop--line-height: 3rem;
  --text-direction-title-desktop--font-weight: 700;
  --text-direction-title-desktop--letter-spacing: 0;

  --text-direction-title-mobile: 1.5rem;
  --text-direction-title-mobile--line-height: 2.125rem;
  --text-direction-title-mobile--font-weight: 700;
  --text-direction-title-mobile--letter-spacing: 0;
```

- font-size와 line-height는 `rem`(px ÷ 16)으로 쓴다.
- 기존 토큰과 값이 같으면 새로 만들지 말고 재사용한다. 재사용했다면 주석에 남긴다.

## 3) 간격과 반경 토큰

- `--spacing-{4,8,12,16,20,24,28,32,40,48,96}`, `--radius-{0,12,20,24,28,999}`. 숫자가 곧 px이다.
- Tailwind 유틸리티로 쓸 때는 `gap-space-24`, `p-space-16`처럼 `space-` prefix를 붙인다.
- 자주 쓰일 새 값이 필요하면 같은 패턴(`--spacing-N: Npx;` + `--spacing-space-N: var(--spacing-N);`)으로 추가한다. 일회성 값은 섹션 토큰이나 CSS 안의 리터럴로 처리한다.

## 4) 섹션 CSS 블록

```css
/* Business direction — 사업 방향성 (preview .business-direction; Figma 653:20134 / 653:20160).
 * Static layout: hub artwork is the existing SVG, the label is overlaid as text.
 */
.direction-section {
  padding: var(--spacing-96) 0;
  background: var(--color-bg-page);
  color: var(--color-text-primary);
}

.direction-inner {
  width: min(
    var(--direction-inner-max),
    calc(100% - var(--section-gutter-desktop) * 2)
  );
  margin-inline: auto;
}

.direction-title {
  margin: 0;
  color: var(--color-brand-navy);
  font-family: var(--font-family-heading);
  font-size: var(--text-direction-title-desktop);
  line-height: var(--text-direction-title-desktop--line-height);
  font-weight: var(--text-direction-title-desktop--font-weight);
  letter-spacing: var(--text-direction-title-desktop--letter-spacing);
  word-break: keep-all;
  overflow-wrap: normal;
}
```

- 바깥은 `<prefix>-section`, 안쪽 컨테이너는 `<prefix>-inner`(max 1248px와 거터 패턴)로 둔다.
- 섹션 안 제목·본문의 타이포는 4종 토큰을 각각 `var()`로 연결한다.

## 5) 한국어 줄바꿈

```css
.direction-phrase,
.direction-keep {
  white-space: nowrap;
}
```

- 텍스트 블록에는 `word-break: keep-all; overflow-wrap: normal;`을 준다.
- 끊기면 안 되는 구절은 TSX에서 `<span className="<prefix>-keep">`으로 감싼다.

## 6) 반응형과 모션 (블록 끝에 둔다)

```css
@media (width <= 1024px) {
  .direction-inner {
    width: calc(100% - var(--spacing-48) * 2);
  }
}

@media (width <= 760px) {
  .direction-section {
    padding: 64px 0;
  }
  .direction-inner {
    width: calc(100% - var(--spacing-32));
  }
  .direction-title {
    font-size: var(--text-direction-title-mobile);
    /* … mobile 4종 세트 */
  }
}

@media (prefers-reduced-motion: reduce) {
  /* transition/animation 제거, 최종 상태로 고정 */
}
```

- 브레이크포인트는 `1024px`(태블릿)와 `760px`(모바일)이다. range 문법 `(width <= N)`을 쓴다.
- 태블릿 시안은 없다. `1024px` 블록에 모바일 시안의 값을 모두 두고(태블릿 = 모바일 확장), `760px` 블록에는 좁은 화면에서만 필요한 값(예: 거터 축소)만 둔다. 고정 너비는 컨테이너 폭에 맞춰 늘린다.
- 헤더 관련 미디어 쿼리 리터럴은 JS가 읽는 `--header-*` 변수와 동기화되어 있으니 건드리지 않는다.

## 7) JS 연동 reveal 패턴

```css
/* Scroll reveal: data-reveal is set by DownloadsSection; without JS the card stays visible. */
```

- 컴포넌트가 마운트된 뒤 `data-reveal` 같은 속성을 설정하고, CSS는 `[data-reveal="hidden"]`일 때만 숨긴다. JS가 실패해도 콘텐츠는 보인다.
- 값을 동적으로 바꿔야 하면 `element.style.setProperty('--var', …)`로 CSS 변수만 갱신한다. JSX `style` prop은 금지다.
