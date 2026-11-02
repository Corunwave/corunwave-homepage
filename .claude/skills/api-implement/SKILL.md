---
name: api-implement
description: 코런웨이브 홈페이지(이 저장소)에서 백엔드 API를 만들거나 프론트와 연동할 때 사용하는 클린 아키텍처 패턴(backend/<도메인>/ 의 domain·application·infrastructure 레이어, Supabase Repository, Route Handler, axios API 함수, hook). 사용자가 "API 만들어줘", "○○ API 추가", "엔드포인트", "Route Handler", "DB에 저장", "Supabase 연동", "Repository", "UseCase", "폼 제출 연동", "프론트에서 API 호출", "메일/알림 발송 연동"처럼 말하거나, 새 데이터를 저장·조회·전송하는 서버 기능이나 그 호출 코드를 추가해 달라고 하면 반드시 이 스킬을 사용할 것. 문의하기(contact) 구현이 기준 예시다.
---

# API 구현 (corunwave-homepage)

서버 로직은 `backend/<도메인>/` 아래 **클린 아키텍처**로 나누고, 프론트 호출은 **axios API 함수 → hook → 컴포넌트** 순서로 쓴다. 기준 구현은 `backend/contact/`와 `app/api/contact/route.ts`다. 새 API를 만들 때 먼저 이 파일들을 열어 같은 모양으로 만든다. 커밋은 하지 않는다.

## 1. 구조와 의존 방향

```
backend/
  shared/infrastructure/        # 도메인 공용 (예: supabaseAdmin.ts)
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
      repository/Supabase<Name>Repository.ts + <Name>RowMapper.ts
      notifier/<Vendor><Name>Notifier.ts
    <name>Container.ts          # server-only. 구현체를 조립하는 유일한 곳
app/api/<route>/route.ts        # 얇은 HTTP 어댑터
app/_lib/api/                   # httpClient.ts(axios 공용 인스턴스), <domain>Api.ts
app/_hooks/use<Verb><Name>.ts   # 프론트 호출 hook
supabase/migrations/<timestamp>_<table>.sql
```

의존은 `infrastructure → application → domain` 한 방향만 허용한다. domain은 아무것도 import하지 않고, application은 domain의 인터페이스만 안다. 구체 클래스(Supabase, Resend)를 아는 곳은 infrastructure와 Container뿐이다.

## 2. 작업 순서

1. **요구 파악**: 엔티티 필드, 필수/선택, 길이 제한, 상태 enum, 부수 효과(메일·알림)를 요청에서 찾고, 추론할 수 없는 것만 묻는다. 라우트 경로와 테이블 이름도 정한다.
2. **Next.js 문서 확인**: 이 프로젝트는 Next.js 16이라 기존 지식과 다를 수 있다. Route Handler나 `after`를 새로 쓰면 `node_modules/next/dist/docs/`를 확인한다.
3. **DB**: `supabase/migrations/`에 SQL을 만든다(아래 규칙). 사용자가 Supabase에서 직접 실행한다. 대신 실행하지 않는다.
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
- 인터페이스는 도메인 언어로 쓴다(`create`, `findById`, `findAll`, `update...`). Supabase 타입이 인터페이스에 새어 나가면 안 된다.
- 구현체는 snake_case 행 ↔ Entity 변환을 RowMapper에 맡긴다. **ORM(Prisma/Drizzle)은 쓰지 않는다**(`supabase-js` 사용).
- 구현체는 Supabase 클라이언트를 `() => SupabaseClient`로 받아 **첫 쿼리 때 생성**한다. 그래야 입력 검증이 환경변수 검사보다 먼저 실행되어 400이 500으로 바뀌지 않는다.
- 쿼리 에러는 `throw error`로 위로 올린다.

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

## 4. DB 마이그레이션 규칙
- 파일: `supabase/migrations/<YYYYMMDDHHMMSS>_<table>.sql`
- id는 `bigint generated always as identity`, 시간은 `timestamptz`, 상태는 enum 타입으로 만든다(값은 영문. 한글 표시는 CMS가 담당).
- 길이 제한은 `varchar(n)`과 `check`로 DB에도 건다. Rules의 제한값과 맞춘다.
- `created_at`, `updated_at`을 두고 `updated_at`은 trigger로 갱신한다.
- **RLS를 켜고 정책은 만들지 않는다.** anon/authenticated는 차단되고, 서버는 Supabase **secret API key**(`sb_secret_...`, 환경변수 `SUPABASE_SECRET_KEY`)로만 접근한다. 레거시 `service_role` JWT 키는 쓰지 않는다.
- 개인정보는 동의 시각(`consented_at`)과 IP를 함께 저장한다. 개인정보처리방침의 보유 기간과 어긋나지 않게 한다.

## 5. 환경변수 · 보안
- 서버 비밀값은 `NEXT_PUBLIC_` 접두사를 붙이지 않는다. 새 변수는 `.env.example`에 추가하고 `.env.local`에는 값을 넣지 않은 채 사용자에게 안내한다.
- Supabase secret key와 메일 API 키는 infrastructure와 Container에서만 읽는다.
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
3. `grep -rn "SUPABASE_SECRET_KEY\|sb_secret_" .next/static`이 비어 있는지 확인한다.
4. 실제 저장·메일 동작은 사용자가 SQL 실행과 `.env.local` 설정을 마친 뒤 확인할 수 있다. 확인하지 못한 항목은 보고에서 그렇게 밝힌다.

## 8. 마지막 보고
- 만든 파일 목록(레이어별), 기준 구현과 달라진 점과 이유
- 확인한 것과 확인하지 못한 것을 구분해서 적는다.
- 사용자가 직접 해야 할 일(SQL 실행, 환경변수, 외부 서비스 설정)
- 커밋은 하지 않았다는 점
