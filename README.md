# 썸핏 (somefit)

Web, Server, Mobile 3개 앱을 포함하는 **Turborepo 모노레포** 구조로 구성되어 있습니다.

## 기술스택

| 영역                | 기술                               |
| ------------------- | ---------------------------------- |
| **Web 프레임워크**  | TanStack Start (React 19 + Vite 8) |
| **서버 프레임워크** | Hono 4 (Node.js)                   |
| **모바일**          | React Native 0.85 (React 19)       |
| **스타일링**        | Tailwind CSS 4                     |
| **테스트**          | Vitest (Web), Jest (Mobile)        |
| **TypeScript**      | 5.8 ~ 6.0                          |
| **린트 / 포맷**     | ESLint 9 (FlatConfig) + Prettier 3 |
| **모노레포**        | Turborepo 2.9 + pnpm 9.0           |
| **공용 컴포넌트**   | @somefit/core-ui (React 19)           |

## 커맨드 정리

```bash
# 로컬 개발 서버 실행 (전체 — Web, Server)
pnpm local

# 모바일 로컬 실행
pnpm local:a           # Android
pnpm local:i           # iOS

# 프로덕션 빌드 (전체)
pnpm build

# 린트
pnpm lint

# 타입 체크
pnpm check-types

# 코드 포맷팅
pnpm format

# 특정 패키지만 실행
pnpm --filter @somefit/core-ui build
pnpm --filter somefit-web local
pnpm --filter somefit-server local
```

## 각 모듈 정의

### apps

| 앱         | 경로                              | 설명                                                                                                       |
| ---------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Web**    | `apps/web/somefit-web/`       | TanStack Start + Vite 기반 프론트엔드. Tailwind CSS로 스타일링하며, Vitest + Testing Library로 테스트 수행 |
| **Server** | `apps/server/somefit-server/` | Hono 기반 백엔드 API 서버. tsx로 개발 시 핫 리로드 지원                                                    |
| **Mobile** | `apps/mobile/Somefit/`          | React Native 기반 모바일 앱. Android / iOS 동시 지원                                                       |

### packages

| 패키지                | 이름                      | 설명                                                   |
| --------------------- | ------------------------- | ------------------------------------------------------ |
| **ui**                | `@somefit/core-ui`           | 공용 React 컴포넌트 라이브러리 (button, card, code 등) |
| **typescript-config** | `@somefit/typescript-config` | 공용 tsconfig 프리셋 (base, nextjs, react-library)     |
| **eslint-config**     | `@somefit/eslint-config`     | 공용 ESLint 설정 (base, next, react-internal)          |
