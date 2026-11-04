# BE 진행 현황 — somefit-server Postgres(Prisma) 연동

> 작성일: 2026-11-04 · 상태: **계획 수립 완료, 미착수**

---

## 1. 현재 상태 진단

`somefit-server`에는 **실제로 동작하는 영속 저장소가 없다.**

| 항목                 | 현황                                                                                |
| -------------------- | ----------------------------------------------------------------------------------- |
| 설치된 DB 라이브러리 | `@supabase/supabase-js` (`package.json`)                                            |
| 환경변수             | `.env.development` → `SUPABASE_URL=http://localhost:54321`, 키는 전부 `placeholder` |
| Supabase 프로젝트    | 레포에 `supabase/` 디렉터리·마이그레이션·SQL **전무**                               |
| 실제 사용처          | `src/app.controller.ts:34` 헬스체크(`checkConnection()`) **한 곳뿐**                |
| 스키마/쿼리 레이어   | 없음                                                                                |

즉 DB 연동은 **이름만 붙어 있고 내용이 비어 있는 상태**다.

### 참고: 현재 서버 구조

```
apps/server/somefit-server/src/
├── main.ts                              # bootstrap, loadEnv, CORS, 전역 필터
├── app.module.ts                        # SupabaseModule + ChatModule
├── app.controller.ts                    # GET / , GET /api/hello (supabase 연결 확인)
├── common/
│   ├── config/env.config.ts             # zod 기반 환경변수 검증
│   ├── supabase/{module,service}.ts     # @Global 모듈 + 클라이언트 생성
│   ├── errors/{http-error,supabase-connection-error}.ts
│   ├── filters/http-exception.filter.ts
│   └── types/api-response.ts
└── features/chat/                       # Gemini 챗봇 (DB 미사용, 히스토리는 클라이언트 보관)
```

---

## 2. 확정된 방향

| 항목          | 결정                    | 비고                                       |
| ------------- | ----------------------- | ------------------------------------------ |
| 로컬 DB       | **Docker Postgres**     | docker-compose로 기동                      |
| 운영 DB       | 이번 범위 밖            | `DATABASE_URL` 교체만으로 전환되도록 설계  |
| 접근 방식     | **Prisma**              | 스키마 파일 1개로 마이그레이션 + 타입 생성 |
| 첫 테이블     | **검증용 `User` 1개만** | 실제 도메인 연동은 하지 않음               |
| 기존 Supabase | **건드리지 않고 유지**  | 제거 여부는 별도 판단                      |

**목표:** "연결 → 마이그레이션 → 쿼리 → 헬스체크" 파이프라인을 실제로 한 번 관통시킨다.

---

## 3. 미리 확인된 제약 — 모르고 들어가면 막히는 지점

### 3-1. `tsx`는 `emitDecoratorMetadata`를 지원하지 않는다 ⚠️

`tsconfig.json`에 `emitDecoratorMetadata: true`가 있지만 dev 런너가 `tsx`(esbuild)라 런타임 메타데이터가 생성되지 않는다. 그래서 **생성자 타입 기반 DI가 깨진다.**

이미 우회 코드가 들어가 있다 — `src/features/chat/chat.controller.ts:8`

```ts
// ponytail: tsx가 emitDecoratorMetadata를 지원하지 않아 DI 불가, 직접 생성
const chatService = new ChatService();
```

→ **대응:** 새로 주입하는 `PrismaService`는 `@Inject(PrismaService)`로 토큰을 명시한다. 데코레이터 **인자**는 esbuild에서도 살아남으므로 메타데이터 없이 동작한다. (런너 교체는 범위 밖.)

### 3-2. pnpm 9 `onlyBuiltDependencies` 화이트리스트 ⚠️

루트 `package.json`의 `pnpm.onlyBuiltDependencies`에 없는 패키지는 postinstall이 차단된다. Prisma는 postinstall에서 엔진을 내려받으므로, **여기에 `prisma`·`@prisma/client`를 추가하지 않으면 설치는 성공하는데 런타임에 엔진 없음으로 터진다.**

### 3-3. Prisma generator `output` 명시 필요

최신 Prisma는 generated client 경로 명시를 요구/권고한다. 또한 pnpm 워크스페이스에서 `node_modules/.prisma` 암묵 경로는 호이스팅 때문에 불안정하다. → `output`을 명시하고 gitignore 한다.

### 3-4. 서버 CI가 없다

`.github/workflows/ci.yml`은 `apps/mobile/**`, `packages/**`만 트리거한다.
→ **DB에 실제로 붙는 테스트는 로컬 전용**으로 두고, 단위 테스트는 `PrismaService`를 mock 한다. (기존 `src/app.controller.spec.ts`가 `SupabaseService`를 mock 하는 패턴 그대로 재사용)

---

## 4. 단계별 작업 계획

### 1단계 — 로컬 Postgres 기동

- `apps/server/somefit-server/docker-compose.yml` 신규
  - `postgres:17-alpine`, `5432:5432`, named volume, `POSTGRES_USER/PASSWORD/DB=somefit`
  - `pg_isready` healthcheck (기동 직후 마이그레이션 돌리면 실패하므로 필요)
- `.env.development`에 추가
  ```
  DATABASE_URL=postgresql://somefit:somefit@localhost:5432/somefit?schema=public
  ```
  `.gitignore`가 `.env.*`를 무시하므로 README에 예시 값을 남길 것

**검증:** `docker compose up -d` → `docker compose exec db pg_isready -U somefit`

### 2단계 — Prisma 설치 및 스키마 정의

- `apps/server/somefit-server/package.json`
  - deps: `@prisma/client` / devDeps: `prisma`
  - scripts: `db:migrate`, `db:deploy`, `db:generate`, `db:studio`, `postinstall: prisma generate`
- 루트 `package.json`의 `pnpm.onlyBuiltDependencies`에 `prisma`, `@prisma/client` 추가 **(제약 3-2)**
- `prisma/schema.prisma` 신규

  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }

  generator client {
    provider = "prisma-client-js"
    output   = "../src/generated/prisma"   // 제약 3-3
  }

  model User {
    id        String   @id @default(uuid())
    email     String   @unique
    name      String?
    createdAt DateTime @default(now()) @map("created_at")

    @@map("users")
  }
  ```

  스네이크 케이스 테이블/컬럼 매핑 규칙을 여기서 정해두면 이후 도메인 테이블이 따라간다

- `.gitignore`에 `src/generated/` 추가

### 3단계 — 환경변수 스키마 확장 (TDD)

기존 `src/common/config/env.config.ts`를 재사용한다 (새 config 레이어 만들지 않음).

1. `env.config.spec.ts` — `DATABASE_URL` 누락 시 `loadEnv()`가 throw, 정상 값이면 파싱됨
2. `envSchema`에 `DATABASE_URL: z.string().url()` 추가
3. `SUPABASE_*`는 이번엔 그대로 둔다

### 4단계 — 첫 마이그레이션 생성

```bash
pnpm --filter somefit-server db:migrate --name init_user
```

생성된 `prisma/migrations/**`는 **커밋한다** (운영 전환 시 `migrate deploy`로 그대로 재생)

### 5단계 — PrismaService 작성 (red → green → refactor)

CLAUDE.md 규칙대로 **테스트 desc 먼저 작성 → 검토 요청 → 승인 후 구현**.

- `src/common/prisma/prisma.service.spec.ts` — desc 초안
  - `onModuleInit` 호출 시 `$connect`가 실행된다
  - `onModuleDestroy` 호출 시 `$disconnect`가 실행된다
  - `checkConnection`이 쿼리 성공 시 `true`를 반환한다
  - `checkConnection`이 쿼리 실패 시 `false`를 반환한다
  - `@prisma/client`는 `vi.mock`으로 대체 (`supabase.service.spec.ts` 패턴 그대로)
- `src/common/prisma/prisma.service.ts`
  - `extends PrismaClient implements OnModuleInit, OnModuleDestroy`
  - `checkConnection()`: ``$queryRaw`SELECT 1` `` → try/catch로 boolean (`SupabaseService.checkConnection()`과 동일 시그니처)
- `src/common/prisma/prisma.module.ts` — `@Global()` + providers/exports, `supabase.module.ts`와 동일 형태
- `src/app.module.ts`의 `imports`에 `PrismaModule` 추가
- 모든 요소에 CLAUDE.md JSDoc 양식(한국어) 적용

### 6단계 — 헬스체크로 실제 연동 확인

- `src/app.controller.spec.ts` 확장 — `GET /api/hello` 응답에 `database: 'connected' | 'disconnected'` 추가
- `src/app.controller.ts`에 `@Inject(PrismaService)`로 주입 **(제약 3-1 — 타입만 쓰면 런타임에 undefined)**
- 기존 `supabase` 필드는 유지 (비파괴)

**검증:** `pnpm --filter somefit-server local` → `curl localhost:8080/api/hello`

### 7단계 — 마무리

`pnpm --filter somefit-server test` / `check-types` / `lint` → 한글 커밋 → PR

---

## 5. 변경·추가 파일

**신규**

- `apps/server/somefit-server/docker-compose.yml`
- `apps/server/somefit-server/prisma/schema.prisma`
- `apps/server/somefit-server/prisma/migrations/**`
- `apps/server/somefit-server/src/common/prisma/prisma.service.ts`
- `apps/server/somefit-server/src/common/prisma/prisma.service.spec.ts`
- `apps/server/somefit-server/src/common/prisma/prisma.module.ts`
- `apps/server/somefit-server/src/common/config/env.config.spec.ts`

**수정**

- `package.json` (루트) — `pnpm.onlyBuiltDependencies`
- `apps/server/somefit-server/package.json` — deps + db 스크립트
- `apps/server/somefit-server/.env.development` — `DATABASE_URL`
- `apps/server/somefit-server/.gitignore` — `src/generated/`
- `apps/server/somefit-server/src/common/config/env.config.ts`
- `apps/server/somefit-server/src/app.module.ts`
- `apps/server/somefit-server/src/app.controller.ts` / `.spec.ts`
- `apps/server/somefit-server/README.md` — 로컬 DB 기동 순서

---

## 6. 재사용하는 기존 자산

| 파일                                                                  | 재사용 내용                                                                  |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `src/common/config/env.config.ts`                                     | zod 환경변수 검증 — 새 config 레이어 없이 `DATABASE_URL`만 추가              |
| `src/common/supabase/supabase.module.ts`                              | `@Global()` 모듈 패턴을 `PrismaModule`에 그대로 복사                         |
| `src/common/supabase/supabase.service.spec.ts`                        | 외부 SDK `vi.mock` + `Test.createTestingModule` 테스트 패턴                  |
| `src/app.controller.spec.ts`                                          | mock provider 주입 패턴                                                      |
| `src/common/errors/http-error.ts`, `filters/http-exception.filter.ts` | DB 에러를 HTTP로 올릴 때 (이번엔 헬스체크뿐이라 미사용, 도메인 붙일 때 사용) |

---

## 7. 검증 방법 (end-to-end)

```bash
# 1. DB 기동
cd apps/server/somefit-server && docker compose up -d
docker compose exec db pg_isready -U somefit

# 2. 마이그레이션 + 클라이언트 생성
pnpm --filter somefit-server db:migrate --name init_user

# 3. 테이블 실제 생성 확인
docker compose exec db psql -U somefit -d somefit -c '\d users'

# 4. 단위 테스트 / 타입 / 린트
pnpm --filter somefit-server test
pnpm --filter somefit-server check-types
pnpm --filter somefit-server lint

# 5. 서버 기동 후 연동 확인
pnpm --filter somefit-server local
curl localhost:8080/api/hello
# → {"success":true,"data":{"message":"Hello Somefit!","supabase":"...","database":"connected"}}

# 6. 끊김 감지 확인 (negative case)
docker compose stop db && curl localhost:8080/api/hello
# → "database":"disconnected"
```

---

## 8. 이번 범위에서 제외 — 나중에 할 일

| 항목                          | 내용                                                                                                                                                                                            | 착수 시점              |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 운영 DB 연결                  | Neon/RDS/Vercel Postgres. `DATABASE_URL` 교체 + 서버리스면 pooler URL(`?pgbouncer=true`) 필요                                                                                                   | 배포 타겟 확정 후      |
| 서버 CI                       | `ci.yml`에 `apps/server/**` 트리거 + postgres service 컨테이너                                                                                                                                  | 실제 DB 테스트 생길 때 |
| `SupabaseService` 제거        | 현재 헬스체크만 사용해 방치 비용 0. Firebase Auth를 쓰는 이상 Supabase Auth는 안 쓸 가능성이 높아 정리 대상                                                                                     | 별도 티켓              |
| 실제 도메인 테이블            | chat 대화 기록, user 프로필. 이번 `User`는 어디에도 연결 안 되는 검증용. `packages/types/user.ts`의 `UserProfile`이 Supabase Auth 기준으로 쓰여 있어 **Firebase uid 기준 재설계가 선행**돼야 함 | 도메인 작업 시         |
| `tsx` → swc/ts-node 런너 교체 | 교체하면 `@Inject` 명시와 chat.controller의 `new` 우회가 모두 불필요해지지만, 앱 전체 기동 경로를 건드림                                                                                        | 별도 판단              |
