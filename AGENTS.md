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

## Code Review Rules

### 역할과 우선순위

- 고연차 Node.js 기반 풀스택 개발자의 관점에서 Next.js, React, TypeScript, Tailwind CSS v4 코드를 리뷰한다.
- 기업 홈페이지의 완성도를 최우선으로 삼는다. 디자인 일관성, 모바일·데스크톱 반응형 화면, 기본 접근성, SEO에 미치는 영향을 중심으로 판단한다.
- 설치 버전과 설정은 `package.json`, 잠금 파일 및 실제 코드를 확인한다. Next.js 동작을 판단할 때는 설치된 `node_modules/next/dist/docs/`의 관련 가이드를 먼저 확인하고, 과거 버전의 관례만으로 결함을 단정하지 않는다.

### 리뷰 범위와 지적 기준

- 변경한 코드를 중심으로 리뷰한다. 기존 코드는 변경으로 생긴 문제를 확인하는 데 필요한 만큼만 읽고, 변경과 무관한 기존 문제를 리뷰 범위에 추가하지 않는다.
- 명확한 결함과 홈페이지 완성도 문제를 지적한다. 화면 깨짐, 기능 오류, 반응형의 부자연스러움, 확인된 디자인 불일치, 사용자 혼란이 여기에 포함된다.
- 각 지적에는 코드나 디자인 근거, 발생 조건, 사용자 또는 운영에 미치는 영향을 제시한다. 근거가 부족한 추측이나 개인 취향을 결함으로 보고하지 않는다.
- 일반적인 구조 개선이나 리팩터링은 실제 문제를 해결할 때 제안한다. TypeScript 타입 설계 개선은 아래 기준에 따라 선택적인 제안으로 별도 보고할 수 있다.
- 리뷰 요청만으로 코드를 수정하지 않는다. 수정이 함께 요청되었다면 합의한 범위에서 수행한다.

### Figma Design System과 스타일

- 기준 Figma 자료: [코런웨이브 홈페이지 — 노드 189:2](https://www.figma.com/design/zjbsfXNavX7s1dGbtcv8fu/?node-id=189-2). 파일 키는 `zjbsfXNavX7s1dGbtcv8fu`, 노드 ID는 `189:2`이다.
- 해당 노드와 연결된 Design System 문서, 컴포넌트, 변수 및 스타일을 확인하여 변경 영역의 준수 여부를 리뷰한다. 링크된 노드 자체가 Design System 문서라고 단정하지 않는다.
- 문서에 정의된 색상, 간격, 타이포그래피, 컴포넌트 구성, 변형 및 상태 표현과 구현을 비교한다. 반응형 규칙이 제공되어 있으면 함께 확인한다.
- Figma 자료에 접근할 수 없거나 기준 문서를 찾지 못하면 미확인 범위를 명시한다. 확인하지 못한 값을 추정하여 준수 판정을 내리지 않는다.
- 이 파일의 `Styling Rules`와 `Font Usage Rules`를 함께 적용한다. Figma의 임시 폰트보다 Pretendard·A2Z 및 로컬 폰트 규칙을 우선한다. 다른 기준 충돌은 근거와 함께 보고한다.
- 모든 스타일, 토큰, 상태, 애니메이션 및 미디어 쿼리는 `app/globals.css`에서 관리하는지 확인한다. 별도 스타일 파일, 인라인 스타일 또는 JSX의 임의값 유틸리티로 우회하지 않는다.
- 기존 색상·간격·타이포그래피 토큰의 재사용과 hover·focus·disabled 등 해당 컴포넌트에 필요한 상태 표현의 일관성을 확인한다. 기존 스타일 구조를 재편하는 리팩터링은 요구하지 않는다.

### Next.js와 데이터 처리

- 서버·클라이언트 경계와 `'use client'`의 필요성을 확인한다. 불필요한 클라이언트 처리나 과도하게 넓은 클라이언트 경계는 번들, 초기 표시 또는 SEO에 미치는 구체적인 영향과 함께 지적한다.
- 초기 HTML의 핵심 콘텐츠 누락, hydration 불일치, 화면 깜빡임 및 브라우저 API의 잘못된 사용을 확인한다.
- 데이터 조회 위치와 캐시·갱신 동작은 설치된 Next.js 버전의 문서와 실제 설정을 근거로 검토한다.
- 로딩 지연, 빈 데이터, 요청 실패 및 오래된 콘텐츠 노출을 확인한다. 각 상황에서 사용자가 상태를 이해하고 필요한 행동을 할 수 있는지 살핀다.
- 변경과 관련된 문제가 없다면 별도의 캐시 정책, 모니터링 또는 데이터 계층 재설계를 요구하지 않는다.

### Axios 기반 API 페칭

- API 페칭에는 Axios를 사용한다. 변경 코드가 별도 합의 없이 직접 `fetch`나 다른 HTTP 클라이언트를 도입하는지 확인한다. 기존의 변경되지 않은 호출을 일괄 전환하지 않는다.
- 기존 공통 Axios 인스턴스와 API 함수를 재사용하는지 확인한다. 공통 `baseURL`, 타임아웃, 헤더 및 인증 설정이 호출부마다 중복되거나 서로 달라지는지 검토하고, 요청 특성에 필요한 타임아웃과 취소 처리가 있는지 확인한다.
- HTTP 요청·응답 변환은 React에 의존하지 않는 API 함수에 두고, 클라이언트의 상태·생명주기 제어는 Custom Hook에 둔다. API 함수가 타입이 명시된 Promise를 반환하고, 응답 전체와 `response.data` 중 무엇을 반환하는지 호출부와 일치하는지 확인한다. 응답 제네릭 지정은 런타임 검증을 대신하지 않는다.
- 오류는 `unknown`에서 `axios.isAxiosError` 등의 타입 가드로 좁히고, HTTP 오류 응답, 네트워크 실패, 타임아웃 및 요청 취소를 필요한 수준으로 구분하는지 확인한다. 취소된 요청을 일반 실패로 표시하거나 오류를 성공 값으로 조용히 바꾸지 않는다.
- 요청 취소는 `AbortController`의 `signal`을 API 함수에서 Axios 요청까지 전달하는지 확인한다. 새 코드에 deprecated된 `CancelToken`을 도입하지 않고, 재요청 시 이미 취소된 signal을 재사용하지 않는다.
- 인터셉터를 사용한다면 정상 값과 거부 상태가 의도대로 다음 단계에 전달되는지 확인한다. 렌더링·재마운트에 따른 중복 등록, 생명주기에 맞지 않는 해제 누락, 인증 재시도의 무한 반복과 중복 제출도 검토한다. 인터셉터가 필요 없는 요청에 도입을 강제하지 않는다.
- 서버에서 공유하는 Axios 인스턴스의 기본 헤더 등에 사용자별 인증 정보를 저장하여 요청 간 정보가 섞이지 않는지 확인한다. 브라우저에 노출하면 안 되는 인증 정보는 서버에 유지한다.
- Axios 사용만으로 Next.js의 `fetch` 전용 캐시·재검증·요청 메모이제이션 동작이 동일하게 적용된다고 가정하지 않는다. 실제 어댑터, 캐시 래퍼와 프레임워크 설정을 확인한다. Axios나 Custom Hook 사용을 이유로 서버 조회를 클라이언트로 옮겨 초기 콘텐츠·SEO를 손상시키지 않는다.

### Promise 체이닝

- API 비동기 흐름은 `.then()`·`.catch()`·`.finally()`를 이용한 Promise 체이닝을 기본으로 한다. 변경 코드의 일관성을 확인하고, 별도 필요 없이 `async`/`await`로 재작성하도록 제안하지 않는다. 프레임워크에서 필요한 비동기 진입점의 `await`까지 기계적으로 금지하지 않는다.
- 후속 단계가 의존하는 값이나 Promise를 `.then()`에서 반환하는지, API 함수와 훅의 요청 함수가 호출자가 기다릴 수 있는 체인을 반환하는지 확인한다. 중첩 체인, 반환 누락, 불필요한 `new Promise` 래핑으로 완료 시점이나 오류 전파가 끊기지 않아야 한다.
- `.catch()`에서 복구할 것인지 오류를 호출자에게 전달할 것인지 명확히 한다. 복구하지 않는 오류는 `throw` 또는 `Promise.reject`로 전달하고, 이벤트·Effect 등 최종 호출 경계에서 처리되지 않은 rejection이 남지 않는지 확인한다. `void`만 붙이는 것은 오류 처리가 아니다.
- `.finally()`는 정리 용도로 사용하고, 불필요한 예외나 거부된 Promise로 원래 결과를 덮어쓰지 않는지 확인한다. 이전 요청의 `.finally()`가 새 요청의 로딩 상태를 해제하는 등 경쟁 상태를 만들지 않아야 한다.
- 서로 의존하는 요청은 순서대로 연결하고, 독립 요청을 불필요하게 직렬 처리하지 않는지 확인한다. 병렬 실행 시 `Promise.all`과 `Promise.allSettled`의 선택이 전체 실패·부분 성공 UI 요구와 맞는지 검토한다.

### Custom Hook으로 로직 분리

- 클라이언트 컴포넌트의 API 호출 제어, 데이터·로딩·오류 상태 및 관련 도메인 로직은 목적이 명확한 Custom Hook으로 분리하는지 확인한다. 컴포넌트는 훅이 제공하는 상태와 동작으로 UI를 구성하고, 요청 구현과 상태 전이를 중복하지 않는다.
- React 상태나 생명주기를 사용하지 않는 HTTP 함수·순수 계산은 일반 함수로 둔다. 서버 전용 데이터 조회를 훅으로 감싸거나 모든 함수를 훅으로 바꾸지 않는다.
- 훅 이름은 `use`로 시작하고, 일반적인 Hook 호출 규칙을 지키는지 확인한다. 조건문·반복문·이벤트 핸들러 안에서 훅을 호출하지 않는다. 훅을 호출할 때마다 생성되는 상태가 자동으로 공유된다고 가정하지 않는다.
- 훅의 입력, 반환 타입, 데이터·로딩·오류 상태와 재요청·제출 함수의 계약을 명확히 한다. 요청 함수의 Promise가 실패를 거부로 전달하는지, 처리된 결과를 반환하는지 호출자가 알 수 있어야 한다. 불필요한 내부 setter나 Axios 설정을 UI에 노출하지 않는다.
- 요청 입력 변경, 재요청, 언마운트 시 취소 또는 무효화 처리가 있는지 확인한다. 늦게 도착한 이전 응답이 최신 데이터·오류·로딩 상태를 덮어쓰지 않아야 하며, 단순 마운트 여부 검사만으로 요청 간 경쟁을 해결했다고 보지 않는다.
- Effect의 의존성 누락과 오래된 클로저, 불안정한 객체·함수 참조로 인한 반복 요청, 개발 Strict Mode의 재실행 시 정리 누락을 확인한다. 무조건적인 메모이제이션이나 의존성 규칙 억제로 우회하지 않는다.
- 제출·수정·삭제 요청은 명시적인 사용자 동작에 연결하고, 중복 실행과 재시도 시 부작용을 확인한다. 렌더링이나 불필요한 Effect 재실행으로 변경 요청이 발생하지 않아야 한다.
- 변경의 위험에 따라 정상·빈 응답, 실패·타임아웃, 취소, 입력 변경 시 응답 순서 역전, 재요청 및 중복 제출 중 관련 시나리오를 검증한다. 자동 테스트가 필요하면 사용자에게 보이는 상태와 요청 횟수·인자를 검증하고, 체이닝 구문이나 훅 내부 구현을 그대로 복제하는 테스트는 피한다.
- 세부 동작은 설치 버전과 공식 [Axios 오류 처리](https://axios-http.com/docs/handling_errors)·[요청 취소](https://axios-http.com/docs/cancellation)·[인터셉터](https://axios-http.com/docs/interceptors), [React Custom Hook](https://react.dev/learn/reusing-logic-with-custom-hooks), [ECMAScript Promise](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects) 문서를 근거로 판단한다.

### Node.js 서버 코드와 보안

- 문의 폼, API, Server Action 등 서버 코드가 변경된 경우 서버 측 입력 검증, 오류 처리, 인증·인가가 필요한 동작의 권한 확인을 검토한다. 클라이언트 검증만으로 서버 입력을 신뢰하지 않는다.
- 비밀키·개인정보가 클라이언트 번들, 응답 또는 로그에 노출되는지 확인한다.
- 변경한 엔드포인트의 실제 사용 방식과 공개 범위를 근거로 스팸·과도한 요청 등 악용 가능성과 방어 필요성을 판단한다.
- 변경과 무관한 인증·인프라·의존성 전반의 보안 감사로 범위를 확대하지 않는다.

### React와 TypeScript

- 사용자 동작과 상태 갱신의 정확성, 불필요한 Effect·중복 상태, Effect 의존성 누락, 이벤트 리스너·타이머 등의 정리 누락을 확인한다.
- React 관련 지적에는 발생 가능한 오류, 상태 불일치 또는 불필요한 동작을 구체적으로 설명한다. API 관련 로직은 위 Custom Hook 분리 기준을 적용하고, 그 밖에 문제가 없는 컴포넌트 분리나 훅 추출을 일괄 요구하지 않는다.
- 타입 검사 오류뿐 아니라 무분별한 `any`, 근거 없는 타입 단언, `null`·`undefined` 처리 누락, 외부 데이터 경계의 런타임 검증 필요성을 확인한다. TypeScript 타입만으로 외부 데이터가 검증되었다고 간주하지 않는다.
- 변경 영역의 공통 타입 추출과 타입 설계 개선도 제안할 수 있다. 고급 타입은 가독성 또는 안전성에 실질적인 이점이 있을 때 제안한다.
- 타입 설계에 대한 선택적 제안은 결함과 구분하며, 제안 자체를 수정 필수 사유로 취급하지 않는다.

### 반응형 UI와 기본 접근성

- 변경 화면의 모바일·데스크톱 표시를 확인하고, 가로 넘침, 콘텐츠 잘림, 겹침, 이미지 왜곡 등 화면 깨짐을 지적한다.
- 이미지의 의미에 맞는 대체 텍스트와 입력란의 접근 가능한 이름을 확인한다. 장식 이미지는 불필요한 설명을 읽지 않도록 처리했는지 확인한다.
- 정식 WCAG 적합성 감사나 스크린리더 전체 테스트는 기본 리뷰의 필수 범위로 요구하지 않는다.

### 성능·SEO와 검증

- 이미지·폰트 로딩, 불필요한 JavaScript와 렌더링, 페이지 메타데이터, 제목 구조 및 색인 설정을 변경 영역과 관련하여 확인한다.
- 실행 가능한 프로젝트 스크립트를 확인하여 lint, 타입 검사 및 프로덕션 빌드를 수행한다. 변경 화면의 모바일·데스크톱 표시도 확인한다.
- 화면·런타임에 영향을 주는 변경은 Lighthouse 등의 도구로 성능·SEO를 측정하고 변경 전후를 비교한다. 문서만 수정한 경우에는 앱 빌드나 성능 측정을 요구하지 않는다.
- 전후 측정은 가능한 한 동일한 프로덕션 실행 조건, 경로, 화면 크기, 네트워크 및 도구 설정으로 수행한다. 비교를 위해 사용자의 미커밋 변경을 덮어쓰거나 되돌리지 않는다.
- 점수 차이만으로 결함을 단정하지 않는다. 관련 지표와 측정 조건을 제시하고, 변동성이 크거나 재현되지 않는 결과는 한계로 명시한다. 고정 점수 합격선을 임의로 도입하지 않는다.
- 실행 환경, 권한, 외부 서비스 또는 변경 전 기준 결과가 없어 검증할 수 없다면 수행한 검증과 미수행 항목·이유를 구분한다. 측정하지 않은 결과를 작성하지 않는다.
- 테스트는 변경의 위험과 기존 테스트 체계에 맞춰 수행한다. 단순 구현을 반복하는 테스트나 영향이 낮은 변경의 불필요한 테스트를 추가하지 않는다.

### 리뷰 결과 작성 방식

- 한국어로 문제와 수정 방향을 간결하게 보고한다. 심각도가 높은 문제부터 작성한다.
- 심각도는 실제 영향을 근거로 구분한다. 긴급 문제는 서비스 중단·중대한 보안 노출 등, 높은 우선순위는 핵심 동작이나 콘텐츠 접근 실패 등, 일반 우선순위는 제한된 조건의 오류나 디자인·사용성 문제 등으로 판단한다. 선택적 타입 설계 제안은 별도로 구분한다.
- 각 문제에 파일·라인, 발생 조건, 문제와 영향, 권장 수정 방향을 포함한다. 가능한 한 변경한 라인을 가리키고 위치 범위는 좁게 잡는다.
- 검증 결과에는 수행한 검사와 성공·실패 여부, 화면 확인 범위, 성능·SEO 측정의 핵심 결과를 요약한다. Figma 확인 범위와 검증 한계가 있으면 함께 적는다.
- 모든 항목의 점검표나 상세 보고서를 기본 출력으로 요구하지 않는다. 선택적인 TypeScript 설계 제안은 문제 목록과 분리한다.
- 문제가 없으면 발견한 문제가 없다고 명시하고, 실제 확인한 범위와 남은 검증 한계를 간단히 덧붙인다.

### 리뷰 전용 서브에이전트 사용

- 프로젝트 전용 리뷰 에이전트는 `.codex/agents/corunwave_reviewer.toml`의 `corunwave_reviewer`이다. 상세 리뷰 기준은 이 파일의 최신 규칙을 참조하며, 에이전트 설정에 별도의 기준을 중복 관리하지 않는다.
- 앞뒤 공백을 제외한 사용자 메시지가 `리뷰`이면 명시적인 코드 리뷰 실행 요청으로 해석한다. 추가 확인 없이 `corunwave_reviewer` 서브에이전트에 위임한다.
- `리뷰`의 기본 대상은 현재 저장소의 staged·unstaged 변경과 새 파일을 포함한 미커밋 변경사항이다. 사용자가 같은 요청에 대상 파일, 브랜치 또는 커밋을 지정하면 그 범위를 우선한다. 미커밋 변경이 없으면 리뷰할 변경이 없다고 보고한다.
- 메인 에이전트는 명시적인 코드 리뷰 요청을 받으면 이 서브에이전트 하나에 리뷰를 위임한다. 비교 기준·대상 파일·요구사항과 이미 수행한 검증을 전달하고, 결과를 기다린 뒤 근거와 중복 지적을 확인하여 사용자에게 보고한다. 일반적인 구현 요청만으로 리뷰를 자동 실행하지 않는다.
- 리뷰 서브에이전트는 추가 에이전트를 생성하거나 자신에게 재위임하지 않는다. 코드 수정이 필요하면 문제와 수정 방향을 메인 에이전트에 반환한다.
- 현재 세션에서 커스텀 에이전트를 선택할 수 없으면 설정 파일의 지침과 리뷰 범위를 일반 서브에이전트에 전달한다. 서브에이전트 도구 자체가 없다면 메인 에이전트가 같은 기준으로 리뷰하고 그 실행 방식을 명시한다.
- 기본 요청 예시: `리뷰`. 범위 지정 예시: `app/page.tsx 리뷰`, `main 브랜치 대비 현재 브랜치 리뷰`. 브랜치 리뷰는 실제 기준 브랜치 또는 커밋도 지정한다.
