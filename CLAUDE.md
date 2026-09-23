# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Bundle id/App id: com.myapp.fireballing

# 주의사항

- 스타일은 style 쓰지말고 무조건 tailwind로만 작성할것
- api호출 부분은 fetch말고 axios 사용할것

# 케이스

- storybook: xxx.stories.tsx
- test: xxx.test.ts / xxx.spec.ts
- compoent: PascalCase
- others: camelCase

# 작업 순서: 신규 작업 시, 반드시 다음 플로우를 준수하여 작업 진행할 것

1. 기획&요구사항 정리

- atlassian mcp 사용해 Jira 접근하여 기획 확인
- 전반적 작업 내용은 jira에서 확인
- 브랜치 명은 티켓 이름을 그대로 사용

<!-- - 세부 기획, 제약사항 등은 confluence에서 확인(현재 세팅 안되었으므로 무시)
  - PDR: 기획 및 제약사항 어떻게, 어째서 했는지를 정리하는 문서
  - ADR: 특정 기술 도입 결정을 왜 하였는지 정리하는 문서 -->

2. 디자인: stitch mcp 사용해 화면, ui배치 구성

- 반드시 존재하는 디자인 시스템 기반으로 제작할것, 새로 제작 필요할시는 별도 생성 질문후 진행

3. 개발: Jira, confluence, stitch mcp 통해 작업사항 바탕으로 하여 작업내용 파악

- 개발 과정은 red green refactor 원칙 기반 TDD로 작업 진행할 것
- superpowers의 brainstorming skill 사용하여 기획 구체화 진행
- 커밋 메세지: 내용은 전부 한글로 작성할것

- 개발 방법론: superpowers의 test-driven-development skill 사용하여 TDD로 진행

1. 테스트 desc 작성, 작성후 검토 요청하기
2. 구현하려는 기능의 테스트 작성
3. 테스트를 통과시키는 최소한의 코드 작성
4. 리팩토링 및 개선

- 폴더 구조: fsd 패턴 사용하여 구조적으로 정리
  규칙
  폴더 구조: 레이어, 슬라이스, 세그먼트로 분류됨

레이어: fsd에서 정의된 폴더 분류
App: 최상위 app.tsx, provider, router 등 최상위 설정들
Pages; 개별 페이지 정의, 비즈니스 로직보다는 사용자 인터페이스 관련 로직만 관리
widgets: 페이지 내 독립적으로 작동하는 기능 관리, 다양한 페이지에서 재사용 가능 (ui): template
Features: 재사용 가능한 비즈니스 기능 위한 레이어, 재사용 가능한 ui+비즈니스 로직: organisms
Entities: 데이터 모델, 데이터에 대한 로직, 사용자 정보 관리 store, interface 정의
Shared: 공용 ui, 유틸 순수함수들-슬라이스 없이 세그먼트만 있음: atoms, molecules

슬라이스: 레이어의 컨텍스트별 폴더, 각 도메인에 대한 폴더명 구성

- index.ts: 해당 슬라이스에서 사용가능한 모든 기능 리턴, 구체적인 경로 몰라도 import 가능함
  세그먼트: 컨텍스트별 세부 내용, 아래 디렉토리로 구별되나 커스터마이징 가능
  - Model: 상태관리, 비즈니스로직, 데이터 상태 저장및 관리
  - Ui: 각 기능에 대한 UI
  - api: 각 api 요청에 대한 코드 작성 (rq useQuery, useMutation hoook)
  - Lib: 유틸 순수함수
  - Types: interface, type

레이어는 반드시 자신의 하위요소만 참조해야 함
각 세그먼트의 폴더명은 컨벤션은 있으나 임의 변경 가능

- 중요!: Jsdoc 작성
- 각 작성한 요소의 스펙에 대해 jsdoc 형식의 간단 문서를 작성해야 한다
- 한국어로 작성하며, 함수, 변수, 클래스 등의 경우 요소 바로 위에 작성한다

- 아래의 양식에 따라 작성한다
  /**

* # 컴포넌트/함수/클래스 이름
  ---
* - 간단설명: 무슨역할인지 1줄로 설명
  - 제약사항 및 특이사항: 있으면 목록별로 나열
  ---
  @param: 쿼리파라미터
  ex) @param children react children
  ---
* @example: 간단예제
*

*/

- type, interface, enum의 경우, jsdoc은 다음과 같은 형태로 작성한다
  /**

* 도서 검색 목록 정렬 기준
* - ACCURACY = 정확도순
* - LATEST = 발간일순
    _/
    export enum FETCH_BOOK_SORT {
    /_* 정확도순 _/
    ACCURACY = "accuracy",
    /_* 발간일순 */
    LATEST = "latest",
    }

4. 작업 마무리 및 PR

- 티켓 검토중으로 작업상태 변경
- 각 테스트 진행후 PR
- AI 가 기본 내용 검토
- 사용자가 최종 검토

## Package Manager & Runtime

- **Package manager**: pnpm 9.15.9 (use `pnpm`, not `npm` or `yarn`)
- **Node.js**: >= 18 (Volta 24.18.0)
- **Monorepo tool**: Turborepo 2.10 — all tasks run through `turbo`

## Common Commands

```bash
# Development
pnpm dev               # Start all dev servers

# Build
pnpm build             # Build all apps and packages

# Lint & Type-check
pnpm lint              # ESLint across all packages
pnpm check-types       # TypeScript type-check across all packages
pnpm format            # Prettier format (*.ts, *.tsx, *.md)

# Run tasks for a specific package only
pnpm --filter @fblg/core-ui build
pnpm --filter fblg-mobile local:a   # Android
pnpm --filter fblg-mobile local:i   # iOS

# Storybook
pnpm storybook         # Native (ondevice)
pnpm storybook:web     # Web (@6006)

# Test
pnpm test              # All tests via turbo
pnpm test:e2e          # E2E (Detox)
```

## Project Summary

- AI 연애 시뮬레이터 및 피드백 앱
- Mobile + Server 2개 앱 운영 중 (Web 앱은 워크스페이스 정의만 존재, 미구현)

## Architecture

```
fireballing/
├── apps/
│   ├── mobile/Fireballing/            # React Native 모바일 앱 (fblg-mobile)
│   └── server/fireballing-server/     # NestJS 백엔드 서버 (fblg-server)
├── packages/
│   ├── ui/                            # @fblg/core-ui — 공용 React 컴포넌트 (25+ 컴포넌트)
│   ├── authmanager/                   # @fblg/authmanager — 인증 상태 관리 (Zustand)
│   ├── schemas/                       # @fblg/schemas — 공용 Zod 스키마
│   ├── types/                         # @fblg/types — 공용 TypeScript 타입
│   ├── enums/                         # @fblg/enums — 공용 열거형
│   ├── utils/                         # @fblg/utils — 유틸 함수 (dayjs, lodash-es)
│   ├── testing-config/                # @fblg/testing-config — Vitest 프리셋 (react/node)
│   ├── typescript-config/             # @fblg/typescript-config — 공용 tsconfig
│   └── eslint-config/                 # @fblg/eslint-config — ESLint FlatConfig
├── turbo.json
└── pnpm-workspace.yaml
```

**Key patterns:**

- Apps consume `@fblg/core-ui` components and extend shared configs
- Mobile: FSD 폴더구조 (app/pages/widgets/features/entities/shared)
- Mobile 내비게이션: React Navigation 7 (native-stack + bottom-tabs)
- Server: NestJS 모듈 구조 + Supabase DB + Google Generative AI
- TypeScript strict mode + ES2022 target
- Turbo task pipeline: `build` depends on `^build`; `local` runs persistently with no cache

## Tech Stack

| 영역                | 기술                                         |
| ------------------- | -------------------------------------------- |
| **서버 프레임워크** | NestJS 11.1 (Node.js, Express)               |
| **모바일**          | React Native 0.85.3 (React 19.2)             |
| **스타일링**        | Tailwind CSS 4 + NativeWind 4                |
| **상태관리**        | Zustand 5 + Immer                            |
| **데이터 페칭**     | TanStack Query 5 (mobile), Supabase (server) |
| **유효성 검증**     | Zod 4                                        |
| **AI**              | Google Generative AI (server)                |
| **인증**            | Firebase Auth + App Check                    |
| **에러 트래킹**     | Sentry (react-native)                        |
| **OTA 업데이트**    | Revopush (react-native-code-push)            |
| **테스트 (Server)** | Vitest 4 + NestJS Testing                    |
| **테스트 (Mobile)** | Jest + Detox (E2E)                           |
| **http api 통신**   | Axios                                        |
| **TypeScript**      | 5.9.2 (root) / 5.8.3 (apps)                  |
| **린트/포맷**       | ESLint 9 (FlatConfig) + Prettier 3           |
| **모노레포**        | Turborepo 2.10 + pnpm 9.15                   |
| **공용 컴포넌트**   | @fblg/core-ui (25+ 컴포넌트, Storybook 10)   |

### 타입정의 규칙

- type, interface: xxx.types.ts에 정의
- zod schema, infer 사용해 나온 타입: xxx.schema.ts 에 정의
- 네이밍 규칙: 파스칼 케이스를 기본으로 한다
  - interface: I{name} ex) IUserInfo
  - type: {name} ex) FavoriteList
  - schema from zod: {name}Schema ex) MyPageSchema
