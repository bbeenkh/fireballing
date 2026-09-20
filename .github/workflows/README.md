# GitHub Actions 워크플로우

## CI - Mobile (`ci.yml`)

| 항목          | 내용                                                            |
| ------------- | --------------------------------------------------------------- |
| **트리거**    | `master` 브랜치로의 **Pull Request**                            |
| **경로 필터** | `apps/mobile/**`, `packages/**`, `pnpm-lock.yaml`, `turbo.json` |
| **Runner**    | `ubuntu-latest`                                                 |
| **수행 작업** | Lint, Type-check, Test (`turbo --filter=fblg-mobile...`)        |

## CD - Android (`cd-android.yml`)

| 항목          | 내용                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- |
| **트리거**    | `master` 브랜치로의 **Push** (머지 시 자동 실행) 또는 **workflow_dispatch** (수동)      |
| **경로 필터** | `apps/mobile/**`, `packages/**` (push 시에만 적용)                                      |
| **Runner**    | `ubuntu-latest`                                                                         |
| **수동 입력** | `deploy_type`: `native` (Play Store 배포) / `ota` (RevoPush OTA 배포)                   |
| **수행 작업** | native → Release AAB 빌드 → Play Store internal 트랙 배포 / ota → RevoPush JS 번들 배포 |

## CD - iOS (`cd-ios.yml`)

| 항목          | 내용                                                                               |
| ------------- | ---------------------------------------------------------------------------------- |
| **트리거**    | `master` 브랜치로의 **Push** (머지 시 자동 실행) 또는 **workflow_dispatch** (수동) |
| **경로 필터** | `apps/mobile/**`, `packages/**` (push 시에만 적용)                                 |
| **Runner**    | `macos-15` (Apple Silicon)                                                         |
| **수동 입력** | `deploy_type`: `native` (TestFlight 배포) / `ota` (RevoPush OTA 배포)              |
| **수행 작업** | native → Release 빌드 → TestFlight 배포 / ota → RevoPush JS 번들 배포              |

---

## GitHub Secrets 설정 가이드

CD 워크플로우 실행 전 아래 secrets를 모두 등록해야 합니다.

### Android

#### 1. Release Keystore (`ANDROID_KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`)

```bash
# keystore 생성
keytool -genkeypair \
  -v -storetype PKCS12 \
  -keystore release.keystore \
  -alias fireballing \
  -keyalg RSA -keysize 2048 -validity 10000

# base64 인코딩
base64 -i release.keystore -o keystore.b64
```

- `ANDROID_KEYSTORE_BASE64` ← `keystore.b64` 파일 내용
- `KEYSTORE_PASSWORD` ← keystore 생성 시 입력한 비밀번호
- `KEY_ALIAS` ← `fireballing` (위 명령의 `-alias` 값)
- `KEY_PASSWORD` ← key 생성 시 입력한 비밀번호

> release.keystore 파일은 repo에 커밋하지 말고 안전한 곳에 백업할 것

#### 2. Google Play 서비스 계정 (`GOOGLE_PLAY_JSON_KEY`)

1. [Google Cloud Console](https://console.cloud.google.com) → 프로젝트 선택/생성
2. **IAM 및 관리자** → **서비스 계정** → **서비스 계정 만들기** (예: `play-store-deploy`)
3. **키** 탭 → **키 추가** → **JSON** → 다운로드
4. [Google Play Console](https://play.google.com/console) → **설정** → **API 액세스** → 위 서비스 계정 연결
5. 권한: **릴리스 관리자**
6. `GOOGLE_PLAY_JSON_KEY` ← 다운로드한 JSON 파일 내용 전체

> Play Console에 앱이 먼저 등록되어 있어야 함 (수동으로 첫 AAB 업로드 1회 필요)

### iOS

#### 3. App Store Connect API Key (`APP_STORE_CONNECT_API_KEY_ID`, `APP_STORE_CONNECT_ISSUER_ID`, `APP_STORE_CONNECT_API_KEY_CONTENT`)

1. [App Store Connect](https://appstoreconnect.apple.com) → **사용자 및 액세스** → **통합** → **App Store Connect API**
2. **키 생성** → 이름 지정, 역할: **App Manager**
3. 생성 후:
   - `APP_STORE_CONNECT_API_KEY_ID` ← 표시되는 **Key ID**
   - `APP_STORE_CONNECT_ISSUER_ID` ← 페이지 상단 **Issuer ID**
4. `.p8` 파일 다운로드 (1회만 가능, 재다운로드 불가)
   - `APP_STORE_CONNECT_API_KEY_CONTENT` ← `.p8` 파일 내용 전체

> [Apple Developer Program](https://developer.apple.com/programs/) 등록 필요 (연 $99)

#### 4. Fastlane Match (`MATCH_GIT_URL`, `MATCH_PASSWORD`, `MATCH_GIT_PRIVATE_KEY`)

```bash
# 1) 인증서 저장용 private repo 생성
gh repo create fireballing-certificates --private --confirm

# 2) SSH deploy key 생성
ssh-keygen -t ed25519 -C "match" -f match_deploy_key -N ""
# match_deploy_key.pub → 위 repo Settings > Deploy keys에 추가 (Write access 체크)
```

- `MATCH_GIT_URL` ← `git@github.com:<user>/fireballing-certificates.git`
- `MATCH_PASSWORD` ← 자유 설정 (match가 인증서 암호화에 사용)
- `MATCH_GIT_PRIVATE_KEY` ← `match_deploy_key` 파일 내용 (private key)

```bash
# 최초 인증서 생성 (로컬에서 1회 실행)
cd apps/mobile/Fireballing
bundle exec fastlane match appstore
```

### OTA (RevoPush)

#### 5. RevoPush 액세스 키 (`REVOPUSH_ACCESS_KEY`)

1. [RevoPush 대시보드](https://revopush.com)에서 앱 선택
2. **Settings** → **Access Keys** → **Create**
3. `REVOPUSH_ACCESS_KEY` ← 생성된 키 값

> OTA 배포 시에만 필요. native 배포에는 불필요

### 공통

#### 6. 프로덕션 환경변수 (`ENV_PROD`)

`.env.prod` 파일 내용 전체:

```
API_URL=https://your-api.com
CODEPUSH_KEY_ANDROID=<RevoPush 발급 키>
CODEPUSH_KEY_IOS=<RevoPush 발급 키>
SENTRY_DSN=<Sentry DSN>
```

### 일괄 등록

```bash
gh secret set ANDROID_KEYSTORE_BASE64 < keystore.b64
gh secret set KEYSTORE_PASSWORD --body "비밀번호"
gh secret set KEY_ALIAS --body "fireballing"
gh secret set KEY_PASSWORD --body "비밀번호"
gh secret set GOOGLE_PLAY_JSON_KEY < service-account.json
gh secret set ENV_PROD < .env.prod
gh secret set MATCH_GIT_URL --body "git@github.com:user/fireballing-certificates.git"
gh secret set MATCH_PASSWORD --body "비밀번호"
gh secret set MATCH_GIT_PRIVATE_KEY < match_deploy_key
gh secret set APP_STORE_CONNECT_API_KEY_ID --body "키ID"
gh secret set APP_STORE_CONNECT_ISSUER_ID --body "issuerID"
gh secret set APP_STORE_CONNECT_API_KEY_CONTENT < AuthKey_XXXX.p8
gh secret set REVOPUSH_ACCESS_KEY --body "키값"
```
