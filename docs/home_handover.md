# Fireballing 프로젝트 인수인계 문서

> 최종 업데이트: 2026-09-22
> 현재 브랜치: `FB-2` (base: `master`)

---

## 1. 프로젝트 개요

AI 연애 시뮬레이터 및 피드백 앱. 모바일(React Native) + 서버(NestJS) 2개 앱으로 구성된 Turborepo 모노레포.

### 기술 스택 요약

| 영역 | 기술 |
|------|------|
| 모바일 | React Native 0.85.3, React 19.2, NativeWind 4 |
| 서버 | NestJS 11.1, tsx watch (esbuild) |
| AI | Google Generative AI (Gemini 3.6 Flash) |
| 상태관리 | Zustand 5 + Immer |
| 데이터 페칭 | TanStack Query 5 (모바일), Supabase (서버) |
| 검증 | Zod 4 |
| 인증 | Firebase Auth + App Check (현재 비활성) |
| 모노레포 | Turborepo 2.10 + pnpm 9.15 |

---

## 2. 레포 구조

```
fireballing/
├── apps/
│   ├── mobile/Fireballing/     # React Native 앱 (fblg-mobile)
│   └── server/fireballing-server/  # NestJS 서버 (fblg-server)
├── packages/
│   ├── ui/                     # @fblg/core-ui (25+ 공용 컴포넌트)
│   ├── authmanager/            # @fblg/authmanager (Zustand 인증 상태)
│   ├── schemas/                # @fblg/schemas (Zod 스키마)
│   ├── types/                  # @fblg/types (공용 타입)
│   ├── enums/                  # @fblg/enums
│   ├── utils/                  # @fblg/utils
│   ├── testing-config/         # 테스트 프리셋
│   ├── typescript-config/      # 공용 tsconfig
│   └── eslint-config/          # ESLint FlatConfig
├── .prettierignore             # vendor/Pods/node_modules 등 제외
└── turbo.json
```

### 모바일 앱 FSD 폴더 구조

```
src/
├── app/                  # 최상위 설정 (네비게이션, 프로바이더)
│   ├── navigation/       # RootNavigator, AuthStack, AppTabs, 각 Stack
│   └── providers/        # QueryProvider
├── pages/                # 각 화면 (UI 중심)
│   ├── home/             # 홈 화면 (프로필 상태별 분기)
│   ├── simulator/        # 챗봇 화면 (AI 대화)
│   ├── portfolio/        # 포트폴리오
│   ├── my-page/          # 마이페이지
│   ├── login/            # 로그인
│   ├── onboarding/       # 온보딩
│   ├── register/         # 회원가입
│   ├── edit-profile/     # 프로필 편집
│   ├── settings/         # 설정
│   └── terms/            # 약관
├── features/             # 비즈니스 기능 (UI + 로직)
│   └── chat/             # 챗봇 기능
│       └── api/          # useChatMutation 훅
├── entities/             # 데이터 모델, 스토어
│   ├── auth/             # 인증 상태 (authStore, authManager)
│   ├── profile/          # 프로필 모델
│   ├── simulator/        # 시뮬레이터 모델
│   └── user/             # 유저 모델
├── shared/               # 공용 유틸, UI
│   ├── api/              # apiClient (Axios 래퍼)
│   ├── config/           # env.ts (react-native-config)
│   ├── lib/              # analytics, navigationRef
│   ├── types/            # navigation.types.ts
│   └── ui/               # ScreenLayout, BottomSheet
└── widgets/              # (아직 미사용)
```

### 서버 구조

```
src/
├── main.ts                        # 부트스트랩 (CORS 전체 허용)
├── app.module.ts                  # 루트 모듈
├── common/
│   ├── config/env.config.ts       # Zod 기반 환경변수 로딩
│   ├── errors/                    # HttpError, SupabaseConnectionError
│   ├── filters/http-exception.filter.ts  # 전역 예외 필터
│   ├── supabase/                  # Supabase 연결 모듈
│   └── types/api-response.ts      # ApiResponse<T> 타입
└── features/
    └── chat/
        ├── chat.controller.ts     # POST /api/chat
        ├── chat.service.ts        # Gemini API 호출
        ├── chat.module.ts         # NestJS 모듈
        └── personas/index.ts      # 페르소나 프롬프트 맵
```

---

## 3. 챗봇 기능 (핵심 신규 구현)

### 3.1 데이터 흐름

```
[모바일 앱]                    [서버]                      [Gemini API]
TextInput → useChatMutation → POST /api/chat → ChatService → generateContent
         ← IChatMessage     ← ApiResponse    ← IChatMessage ← response.text()
```

### 3.2 공유 타입 (`@fblg/types`)

```typescript
interface IChatMessage { role: 'user' | 'model'; content: string }
interface IChatRequest { messages: IChatMessage[]; persona?: string }
interface IChatResponse { message: IChatMessage }
```

### 3.3 공유 스키마 (`@fblg/schemas`)

- `chatRequestSchema`: messages 배열 최소 1개, 마지막 메시지는 반드시 `role: 'user'`
- `persona` 기본값: `'default'`

### 3.4 서버 — ChatService

- `@google/generative-ai` SDK 사용, 모델: `gemini-3.6-flash`
- `GEMINI_API_KEY`는 `process.env`에서 직접 읽음 (NestJS DI 미사용, 아래 주의사항 참고)
- 시스템 프롬프트를 첫 user/model 메시지 쌍으로 주입
- 대화 히스토리는 클라이언트가 전체를 매 요청마다 전송 (서버 stateless)
- 페르소나: `default`, `portfolio` 2종 (`personas/index.ts`)

### 3.5 서버 — ChatController

- `POST /api/chat` 단일 엔드포인트
- 요청 body를 `chatRequestSchema.parse()`로 검증
- **tsx 호환 주의**: `emitDecoratorMetadata`를 지원하지 않아 NestJS DI가 작동하지 않음 → `const chatService = new ChatService()`로 모듈 레벨 직접 인스턴스화

### 3.6 모바일 — useChatMutation

- `@tanstack/react-query`의 `useMutation` 래핑
- **현재 URL 하드코딩**: `http://192.168.200.144:8080/api/chat` (실기기 테스트용)
- `env.API_URL`을 사용하려면 네이티브 리빌드 필요 (react-native-config 특성)
- `fetch` API 직접 사용 (apiClient/Axios 아님)

### 3.7 모바일 — SimulatorScreen (챗봇 UI)

- `FlatList` + `KeyboardAvoidingView` 구조
- 로컬 `useState`로 `IChatMessage[]` 관리
- 전송 시: 현재 messages에 user 메시지 추가 → mutation 호출 → 응답 push
- 로딩 중 전송 버튼 비활성화

---

## 4. 네비게이션 구조

```
RootNavigator
└── AppTabs (Bottom Tabs)
    ├── HomeStack
    │   ├── Home (홈)
    │   └── EditProfile (프로필 편집)
    ├── SimulatorStack
    │   └── Simulator (챗봇)
    ├── PortfolioStack
    │   └── Portfolio
    └── MyPageStack
        ├── MyPage
        └── Settings
```

- **인증 플로우 현재 비활성**: `RootNavigator`가 바로 `AppTabs` 렌더링
- `AuthStack` (Login → Terms → Register → Onboarding) 파일은 존재하나 연결 안 됨

---

## 5. 환경변수 관리

### 모바일 (`react-native-config`)

| 파일 | 용도 |
|------|------|
| `.env.development` | 개발용 (API_URL=http://localhost:8080) |
| `.env.production` | 프로덕션 (API_URL=https://api.ddasangfolio.com) |

- `.gitignore`에 `.env.development`, `.env.production` 등록됨
- 네이티브 리빌드 시 `ENVFILE=.env.development` 환경변수로 선택
- `src/shared/config/env.ts`에서 `Config.API_URL`, `Config.APP_ENV` 노출

### 서버

| 변수 | 설명 |
|------|------|
| `PORT` | 서버 포트 (기본 8080) |
| `SUPABASE_URL` | Supabase 프로젝트 URL |
| `SUPABASE_ANON_KEY` | Supabase 익명 키 |
| `GEMINI_API_KEY` | Google Gemini API 키 |

- `.env.development`에 저장, `.gitignore`로 제외
- `src/common/config/env.config.ts`에서 Zod로 검증 (GEMINI_API_KEY는 optional)

---

## 6. 알려진 제약사항 및 TODO

### 즉시 해결 필요

| 항목 | 상태 | 설명 |
|------|------|------|
| 챗봇 URL 하드코딩 | **임시** | `useChatMutation.ts`에 LAN IP 직접 기입. `env.API_URL` 연동 시 네이티브 리빌드 필요 |
| CORS `origin: true` | **임시** | 개발 편의상 전체 허용. 프로덕션 시 특정 도메인만 허용 필요 |
| iOS `NSAllowsArbitraryLoads` | **임시** | HTTP 허용 상태. 프로덕션 시 HTTPS만 사용하고 제거 |
| Android `usesCleartextTraffic` | **임시** | 프로덕션 시 false로 변경 |
| 인증 플로우 비활성 | **의도적** | 테스트 편의상 제거. 추후 AuthStack 재연결 필요 |

### tsx + NestJS DI 이슈

`tsx`(esbuild 기반)는 `emitDecoratorMetadata`를 지원하지 않아 NestJS의 `@Inject()` DI가 작동하지 않음.

**현재 우회**: `ChatController`에서 `ChatService`를 모듈 레벨에서 직접 인스턴스화.

**향후 해결 방안**:
- `ts-node` + SWC로 전환 (SWC는 decorator metadata 지원)
- 또는 프로덕션 빌드는 `tsc`로 하고 개발만 tsx 사용

---

## 7. 주요 커맨드

```bash
# 서버 로컬 실행
pnpm --filter fblg-server local

# 모바일 (iOS)
pnpm --filter fblg-mobile ios

# 모바일 (Android)
pnpm --filter fblg-mobile android

# 전체 테스트
pnpm test

# 전체 빌드
pnpm build

# 전체 타입 체크
pnpm check-types

# 전체 린트
pnpm lint

# Storybook (Web)
pnpm storybook:web
```

---

## 8. 최근 커밋 히스토리 (주요)

| 커밋 | 내용 |
|------|------|
| `79dad1f` | SafeArea inset 상단/하단 탭바에 적용 |
| `0cfab7f` | 홈 화면 프로필 등록 완료 상태 UI 구현 |
| `dd42793` | **모바일 챗봇 연동 + env 구조 정리** |
| `d9fc170` | **Gemini API 기반 챗봇 서버 구현** |
| `fdd6395` | Textbox → Textarea 리네임 |
| `c1024b9` | 디자인 시스템 v0.0.1 기반 전면 업데이트 |
| `348b747` | ScreenLayout → withLayout HOC 패턴 전환 |
| `ce9fc6f` | Auth Stack + Bottom Tab 네비게이션 + FSD 구조 구축 |
| `1037071` | Hono → NestJS 서버 전면 재작성 |

---

## 9. 테스트 현황

### 서버 (Vitest)

- `chat.service.spec.ts` — Gemini API mock 기반 단위 테스트
- `chat.controller.spec.ts` — ChatService mock 기반 컨트롤러 테스트
- `supabase.service.spec.ts` — Supabase 연결 테스트
- `app.controller.spec.ts` — 헬스체크

### 모바일 (Jest)

- `env.test.ts` — 환경변수 모듈 테스트
- `analytics.test.ts` — 애널리틱스 유틸 테스트

### E2E (Detox)

- `dummyForm.test.ts` — 삭제된 DummyForm 관련 (업데이트 필요)

---

## 10. Pre-commit Hook

`.husky/pre-commit`에서 순차 실행:

1. `pnpm format` — Prettier (`.prettierignore`로 vendor/Pods 제외)
2. `pnpm check-types` — TypeScript 타입 체크
3. `pnpm lint` — ESLint

error 0개여야 커밋 가능 (warning은 허용).
