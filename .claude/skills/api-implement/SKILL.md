---
name: api-implement
description: 코런웨이브 홈페이지(이 저장소)에서 백엔드 API를 만들거나 프론트와 연동할 때 사용하는 클린 아키텍처 패턴(backend/<도메인>/ 의 domain·application·infrastructure 레이어, Payload Repository, Route Handler, axios API 함수, hook). 사용자가 "API 만들어줘", "○○ API 추가", "엔드포인트", "Route Handler", "DB에 저장", "Payload 컬렉션 저장", "Repository", "UseCase", "폼 제출 연동", "프론트에서 API 호출", "메일/알림 발송 연동"처럼 말하거나, 새 데이터를 저장·조회·전송하는 서버 기능이나 그 호출 코드를 추가해 달라고 하면 반드시 이 스킬을 사용할 것. 문의하기(contact) 구현이 기준 예시다.
---

# API 구현 (corunwave-homepage)

서버 로직은 `backend/<도메인>/` 아래 **클린 아키텍처**로 나누고, 프론트 호출은 **axios API 함수 → hook → 컴포넌트** 순서로 쓴다. 기준 구현은 `backend/contact/`와 `app/api/contact/route.ts`다. 새 API를 만들 때 먼저 이 파일들을 열어 같은 모양으로 만든다. 커밋은 하지 않는다.

## 1. 구조와 의존 방향

```
backend/
  shared/infrastructure/        # 도메인 공용 (필요할 때만 만든다)
  <domain>/
    domain/                     # 순수 TS. 외부 라이브러리·server-only import 금지
      entity/<Name>Entity.ts    # class. private constructor + create() + restore()
      entity/<name>Rules.ts     # 순수 검증 함수·제한값·에러 문구 (클라이언트도 import)
      repository/I<Name>Repository.ts   # interface
      notifier/I<Name>Notifier.ts       # 외부 발송이 있을 때 interface
      error/<Name>ValidationError.ts
    application/
      dto/                      # 입력 DTO + 신뢰할 수 없는 JSON → DTO 정규화, 응답 DTO
      usecase/<Verb><Name>UseCase.ts    # class, 생성자로 인터페이스 주입, execute()
    infrastructure/             # 첫 줄 import "server-only"
      repository/Payload<Name>Repository.ts + <Name>DocMapper.ts   # Payload Local API
      notifier/<Vendor><Name>Notifier.ts
    <name>Container.ts          # server-only. 구현체를 조립하는 유일한 곳
app/api/<route>/route.ts        # 얇은 HTTP 어댑터
app/_lib/api/                   # httpClient.ts(axios 공용 인스턴스), <domain>Api.ts
app/_hooks/use<Verb><Name>.ts   # 프론트 호출 hook
payload/collections/<Name>.ts       # 저장소 스키마·접근 권한(Payload 컬렉션)
```

의존은 `infrastructure → application → domain` 한 방향만 허용한다. domain은 아무것도 import하지 않고, application은 domain의 인터페이스만 안다. 구체 클래스(Payload, Resend)를 아는 곳은 infrastructure와 Container뿐이다.

## 2. 작업 순서

1. **요구 파악**: 엔티티 필드, 필수/선택, 길이 제한, 상태 enum, 부수 효과(메일·알림)를 요청에서 찾고, 추론할 수 없는 것만 묻는다. 라우트 경로와 테이블 이름도 정한다.
2. **Next.js 문서 확인**: 이 프로젝트는 Next.js 16이라 기존 지식과 다를 수 있다. Route Handler나 `after`를 새로 쓰면 `node_modules/next/dist/docs/`를 확인한다.
3. **저장소 스키마**: `payload/collections/<Name>.ts`에 컬렉션을 만들고 `payload.config.ts`에 등록한다(아래 규칙). 개발 중에는 Payload가 스키마를 DB에 자동 반영한다. 운영 DB 반영과 기존 데이터 이관 SQL은 사용자가 실행한다. 대신 실행하지 않는다.
4. **domain**: Rules(순수 검증) → Entity → Repository 인터페이스 → (필요 시) Notifier 인터페이스 → ValidationError.
5. **application**: DTO(+정규화 함수) → UseCase. 저장과 부수 효과는 UseCase를 나눈다.
6. **infrastructure**: RowMapper → Repository 구현 → Notifier 구현.
7. **Container**: `create<Verb><Name>UseCase()` 함수로 조립한다.
8. **Route Handler**: 얇게 만든다.
9. **프론트**: `app/_lib/api/<domain>Api.ts`(axios) → `app/_hooks/use...ts` → 컴포넌트 연결.
10. **검증**: 아래 "검증"을 수행한다.

## 3. 레이어별 규칙

**Entity**
- 생성자는 private이다. `create(input, ...)`는 신규 값을 Rules로 검증하고 실패하면 ValidationError(`errors` 포함)를 던진다. `restore(props)`는 DB에서 읽은 값을 복원하며 검증하지 않는다.
- 상태 변경 메서드(`markEmailSent()`, `changeStatus()` 등)는 새 인스턴스를 반환한다(불변).
- 속성은 `readonly props`로 노출한다. DB 컬럼명이 아닌 camelCase를 쓴다.

**Rules (검증)**
- 검증 규칙의 단일 출처다. 서버(Entity)와 브라우저(폼)가 같은 파일을 import한다. 그래서 `server-only`나 Node 전용 모듈을 import하지 않는다.
- 규칙을 클라이언트 쪽에 따로 복제하지 않는다.

**Repository**
- 인터페이스는 도메인 언어로 쓴다(`create`, `findById`, `findAll`, `update...`). Payload 타입이 인터페이스에 새어 나가면 안 된다.
- 구현체는 Payload Local API(`payload.create/find/update`)로 접근하고, 문서 ↔ Entity 변환을 DocMapper에 맡긴다. 직접 SQL이나 별도 ORM은 쓰지 않는다. Local API는 기본적으로 접근 제어를 건너뛰므로(`overrideAccess`), 공개 REST로 새는 것을 막는 규칙은 컬렉션의 `access`에 둔다.
- 구현체는 Payload 인스턴스를 `() => Promise<Payload>`로 받아 **첫 쿼리 때 생성**한다. 그래야 입력 검증이 환경변수 검사보다 먼저 실행되어 400이 500으로 바뀌지 않는다.
- 쿼리 에러는 그대로 위로 올린다. Payload `find`는 페이지 번호 방식이라 `offset`은 `limit`의 배수로 쓴다.

**UseCase**
- 클래스, 생성자 주입, `execute()` 하나. HTTP·Next.js(`after`, `Request`)를 모른다.
- 저장이 핵심이고 메일 같은 부수 효과가 실패해도 저장은 유지해야 하면 **저장 UseCase와 알림 UseCase를 나눈다.** 알림 UseCase는 예외를 밖으로 던지지 않고, 결과를 DB 상태 컬럼(`pending/sent/failed` + 에러 메시지)에 기록한다. 그러면 CMS에서 실패 건을 확인하고 재발송할 수 있다.

**Container**
- `create...UseCase()` 팩토리 함수만 export한다. 환경변수는 여기서 읽는다(`requireEnv`).
- 선택적 부수 효과의 환경변수는 호출 시점에 읽도록 지연시킨다(예: `new ResendNotifier(() => config)`). 환경변수가 없어도 저장은 되고 `failed`로 기록되게 하기 위해서다.

**Route Handler** (`app/api/<route>/route.ts`)
1. `request.json()` 실패 → 400 `{ ok:false, message }`
2. 공개 폼이면 honeypot 필드(`website`)에 값이 있을 때 200 `{ ok:true }`를 반환하고 저장하지 않는다(봇에게 신호를 주지 않는다).
3. IP는 `x-forwarded-for`의 첫 값 → `x-real-ip` 순으로 읽는다.
4. UseCase 실행. ValidationError → 400 `{ ok:false, errors }`, 그 밖의 예외 → `console.error` 후 500 `{ ok:false, message }`(내부 에러 내용을 응답에 싣지 않는다).
5. 성공 → 201 `{ ok:true, id }`. 부수 효과는 `after()`로 응답 뒤에 실행하고, `after` 콜백 안에서도 try/catch로 로그를 남긴다.
- 응답 JSON 모양은 항상 `{ ok: boolean, ... }`로 맞춘다.

**프론트 호출**
- `app/_lib/api/httpClient.ts`의 axios 인스턴스(`baseURL: "/api"`)를 재사용한다. 새 인스턴스를 만들지 않는다. 브라우저 → Route Handler 호출에만 axios를 쓰고, `backend/` 안에서는 쓰지 않는다.
- `<domain>Api.ts`는 axios 호출과 요청/응답 타입만 가진다.
- hook은 `status: "idle" | "sending" | "done" | "failed"`와 `submit()`을 제공한다. 이미 `sending`이면 중복 제출을 무시하고, `axios.isAxiosError`로 400(필드 에러)과 그 밖의 오류를 구분한다. 컴포넌트에는 DOM 읽기, 클라이언트 검증, 메시지 렌더링만 남긴다.
- React Compiler가 켜져 있으므로 `useCallback`/`useMemo`를 쓰지 않는다.
- 클라이언트 코드는 `backend/`에서 **domain의 순수 Rules와 타입만** import한다. infrastructure, container, UseCase를 가져오면 안 된다.

## 4. 컬렉션(저장소) 규칙
- 파일: `payload/collections/<Name>.ts`, 슬러그는 kebab-case 복수형. 한국어 `labels`, `admin.group`, `useAsTitle`을 붙인다.
- 공개 폼이 만드는 데이터는 **`access.create: () => false`**로 닫는다. 저장은 서버(Route Handler → UseCase → Local API)만 한다. 읽기·수정은 역할 함수(`payload/access/roles.ts`)로 제한하고, 삭제는 `ceo`만 둔다.
- 사용자가 입력한 필드는 `admin.readOnly: true` + `access: { update: () => false }`로 잠그고, 처리 상태 같은 운영 필드만 수정 가능하게 둔다.
- 상태는 영문 select 값으로 두고 한국어 라벨은 `options`가 담당한다. 길이 제한은 Rules의 값과 맞춘다(Rules가 단일 출처).
- 개인정보는 동의 시각(`consentedAt`)과 IP를 함께 저장한다. 개인정보처리방침의 보유 기간과 어긋나지 않게 한다.
- 관리자에서 하는 부가 동작(재발송 등)은 컬렉션 `endpoints` + `ui` 필드의 클라이언트 컴포넌트로 만들고, 컴포넌트는 `app/(payload)/admin/importMap.js`에 등록한다. 엔드포인트는 server-only 모듈(Container)을 호출 시점에 `import()`한다.
- Postgres 식별자는 63자까지라 깊게 중첩된 배열은 `dbName`으로 줄인다. 기존 테이블 데이터를 옮길 때는 `scripts/migrate-*.mjs`처럼 id·시각을 보존하고 여러 번 실행해도 안전하게 만든다.

## 5. 환경변수 · 보안
- 서버 비밀값은 `NEXT_PUBLIC_` 접두사를 붙이지 않는다. 새 변수는 `.env.example`에 추가하고 `.env.local`에는 값을 넣지 않은 채 사용자에게 안내한다.
- DB 연결 문자열(`DATABASE_URL`), `PAYLOAD_SECRET`, 메일 API 키는 Payload 설정·infrastructure·Container에서만 읽는다.
- 사용자 입력을 HTML 메일에 넣을 때는 이스케이프하고, 메일 제목에는 줄바꿈을 제거한다.

## 6. 프로젝트 공통 규칙
- 스타일은 `app/globals.css`에만 추가한다(로딩·완료·에러 메시지 포함). 컴포넌트 CSS 파일, `style` prop, CSS-in-JS 금지.
- 한국어 응답, 사용자 노출 문구는 기존 폼 톤을 따른다.

## 7. 검증
1. `npm run lint`, `npm run build` 통과. 클라이언트가 `server-only` 모듈을 끌어오면 build가 실패한다.
2. `npx next start -p <포트>`를 백그라운드로 띄우고 **환경변수 없이도 되는 경로**를 curl로 확인한다.
   - 검증 실패 값 → 400과 필드별 `errors` (500이면 infrastructure가 검증보다 먼저 만들어지고 있다는 뜻이다)
   - 깨진 JSON → 400
   - honeypot 값 있음 → 200, 저장 안 됨
   - 정상 값 + 환경변수 없음 → 500 JSON
   확인이 끝나면 서버를 반드시 종료한다.
3. `grep -rn "PAYLOAD_SECRET\|DATABASE_URL\|RESEND_API_KEY" .next/static`이 비어 있는지 확인한다.
4. 저장·조회는 `esbuild`로 번들한 임시 스크립트(`--packages=external --alias:server-only=./scripts/stubs/empty.ts`)로 UseCase를 실제 DB에 실행해 확인하고, 만든 테스트 행은 지운다. 실제 메일 발송은 사용자가 확인한다. 확인하지 못한 항목은 보고에서 그렇게 밝힌다.

## 8. 마지막 보고
- 만든 파일 목록(레이어별), 기준 구현과 달라진 점과 이유
- 확인한 것과 확인하지 못한 것을 구분해서 적는다.
- 사용자가 직접 해야 할 일(SQL 실행, 환경변수, 외부 서비스 설정)
- 커밋은 하지 않았다는 점
