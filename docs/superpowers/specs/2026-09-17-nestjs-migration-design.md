# Hono → NestJS 서버 전환 설계

## 개요

`apps/server/fireballing-server/`의 Hono 기반 서버를 NestJS+Supabase로 전환한다.
비즈니스 로직(서비스 함수)은 최대한 재사용하고, HTTP 레이어만 NestJS 패턴으로 교체한다.

## 전환 범위

### 유지하는 것
- Supabase 연동 (Auth + DB)
- 워크스페이스 패키지: `@fblg/schemas`, `@fblg/types`
- 환경변수 Zod 검증
- 기존 엔드포인트 스펙 (경로, 요청/응답 형식)
- `ApiResponse<T>` 응답 포맷

### 변경하는 것
| 현재 (Hono) | 전환 후 (NestJS) |
|---|---|
| `new Hono()` 라우팅 | `@Controller` + `@Get/@Post` 데코레이터 |
| `authMiddleware` (Hono Context) | `AuthGuard` (NestJS Guard) |
| `errorHandler` 미들웨어 | `HttpExceptionFilter` |
| `c.json()` 응답 | NestJS 자동 직렬화 |
| `c.set('userId')` 컨텍스트 | `@CurrentUser()` 커스텀 데코레이터 |
| Vitest | Jest (NestJS 기본) |
| `@hono/node-server` | `@nestjs/platform-express` |

## 모듈 구조

```
apps/server/fireballing-server/
├── src/
│   ├── main.ts                          # NestJS bootstrap
│   ├── app.module.ts                    # Root module
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts           # 6 엔드포인트
│   │   ├── auth.service.ts              # 기존 로직 이식
│   │   ├── auth.guard.ts                # Bearer 토큰 검증
│   │   ├── current-user.decorator.ts    # @CurrentUser() 파라미터 데코레이터
│   │   ├── auth.controller.spec.ts
│   │   └── auth.service.spec.ts
│   ├── portfolio/
│   │   ├── portfolio.module.ts
│   │   ├── portfolio.controller.ts      # 5 CRUD 엔드포인트
│   │   ├── portfolio.service.ts         # 기존 로직 이식
│   │   ├── portfolio.controller.spec.ts
│   │   └── portfolio.service.spec.ts
│   ├── supabase/
│   │   ├── supabase.module.ts           # Global module
│   │   └── supabase.service.ts          # Supabase 클라이언트 팩토리
│   └── config/
│       ├── config.module.ts
│       └── env.validation.ts            # Zod 스키마 검증 (기존 재사용)
├── test/
│   └── app.e2e-spec.ts
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
└── .env.development
```

## 엔드포인트 매핑

### AuthController (`/api/auth`)
| Method | Path | Guard | 설명 |
|--------|------|-------|------|
| POST | `/signup` | - | 회원가입 |
| POST | `/login` | - | 로그인 |
| POST | `/refresh` | - | 토큰 갱신 |
| GET | `/me` | AuthGuard | 현재 유저 조회 |
| POST | `/logout` | AuthGuard | 로그아웃 |
| POST | `/oauth/google` | - | 구글 로그인 |

### PortfolioController (`/api/portfolio`)
| Method | Path | Guard | 설명 |
|--------|------|-------|------|
| POST | `/` | AuthGuard | 포트폴리오 생성 |
| GET | `/` | AuthGuard | 목록 조회 |
| GET | `/:id` | AuthGuard | 단건 조회 |
| PATCH | `/:id` | AuthGuard | 수정 |
| DELETE | `/:id` | AuthGuard | 삭제 |

## 핵심 구현 사항

### 1. SupabaseService
- `@Injectable()` + `@Global()` 모듈로 제공
- `createClient(accessToken?)` — 인증된/비인증 클라이언트 생성
- 기존 `supabase.ts` 로직 그대로 이식

### 2. AuthGuard
- `CanActivate` 인터페이스 구현
- `Authorization: Bearer <token>` 검증
- `request.user = { userId }` 세팅
- 실패 시 `UnauthorizedException` throw

### 3. CurrentUser 데코레이터
- `createParamDecorator`로 `request.user.userId` 추출

### 4. 에러 처리
- 기존 `HttpError` → NestJS `HttpException` 직접 사용
- `SupabaseConnectionError` → `ServiceUnavailableException`으로 매핑
- 글로벌 `HttpExceptionFilter`로 `ApiResponse` 포맷 통일

### 5. 환경변수
- `@nestjs/config` + `ConfigModule.forRoot()`
- 기존 Zod 스키마로 `validate` 함수 구현

### 6. CORS
- `main.ts`에서 `app.enableCors()` 설정

## 의존성 변경

### 제거
- `hono`, `@hono/node-server`

### 추가
- `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`
- `@nestjs/config`
- `reflect-metadata`, `rxjs`
- `@nestjs/testing` (dev)

### 유지
- `@supabase/supabase-js`, `zod`
- `@fblg/schemas`, `@fblg/types`

## 테스트 전략

- Jest (NestJS 기본 테스트 러너)
- `@nestjs/testing`의 `Test.createTestingModule()` 활용
- 서비스: Supabase 클라이언트 mock
- 컨트롤러: 서비스 mock + supertest로 HTTP 레벨 테스트
- 기존 테스트 시나리오 동일하게 재작성
