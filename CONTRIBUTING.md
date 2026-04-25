# Contributing Guide

New ERP 프로젝트에 기여하기 위한 가이드입니다. 이 문서를 따라 일관된 개발 워크플로우를 유지해주세요.

## 🌳 브랜치 전략 (Release-Based Development)

### 브랜치 구조

```
release/[version]   ← 프로덕션 배포 & 개발 브랜치 (최종 검증된 기능만)
  ↑
  ├── feature/*     ← 기능 개발 브랜치 (release에서 분기)
  └── fix/*         ← 버그 수정 브랜치 (release에서 분기)
```

### 브랜치별 설명

| 브랜치 | 목적 | 생성 출처 | 특징 |
|--------|------|---------|------|
| `release/*` | **프로덕션 배포 & 개발 브랜치** | N/A | 최종 검증된 기능만 포함, 배포 시 이 브랜치를 배포 |
| `feature/*` | 기능 개발 | `release/*` | 새 기능 개발, release로 PR |
| `fix/*` | 버그 수정 | `release/*` | 버그 수정, release로 PR |

---

## 📌 브랜치 네이밍 규칙

브랜치 이름은 명확하고 일관되게 작성합니다.

### 기능 개발 (Feature)
```
feature/[이슈번호]-[간단한-설명]
```

**예시:**
- `feature/1-user-authentication`
- `feature/12-login-form-validation`
- `feature/45-dashboard-layout`

### 버그 수정 (Fix)
```
fix/[이슈번호]-[간단한-설명]
```

**예시:**
- `fix/50-auth-token-expiry-bug`
- `fix/51-api-response-parsing`
- `fix/8-input-validation-error`

### 배포 버전 (Release)
```
release/[버전번호]
```

**예시:**
- `release/1.0.0`
- `release/1.1.0`
- `release/2.0.0`

> **주의:** release 브랜치는 최종 검증된 기능만 포함하는 안정적인 브랜치입니다.
> 모든 새로운 feature와 fix는 현재 활성 release 브랜치에서 분기합니다.

---

## 💬 커밋 메시지 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다.

### 형식

```
<타입>(<스코프>): <설명>

<본문 (선택)>

<푸터 (선택)>
```

### 타입 (Type)

| 타입 | 설명 | 예시 |
|------|------|------|
| `feat` | 새로운 기능 추가 | `feat(auth): 사용자 로그인 기능 구현` |
| `fix` | 버그 수정 | `fix(api): 토큰 갱신 오류 해결` |
| `docs` | 문서 작성/수정 | `docs: README 업데이트` |
| `style` | 코드 스타일 변경 (포맷팅, 공백 등) | `style: 함수 들여쓰기 정렬` |
| `refactor` | 코드 리팩토링 (기능 변경 없음) | `refactor(store): Zustand 스토어 구조 개선` |
| `test` | 테스트 추가/수정 | `test(button): Button 컴포넌트 단위 테스트` |
| `chore` | 빌드, 의존성, 설정 변경 | `chore: pnpm 의존성 업데이트` |

### 스코프 (Scope)

프로젝트 구조에 따라 선택합니다:

- `components`: UI 컴포넌트 변경
- `pages`: 페이지 레이아웃/로직 변경
- `store`: Zustand 스토어 변경
- `hooks`: Custom Hook 변경
- `utils`: 유틸리티 함수 변경
- `services`: API 서비스 변경
- `types`: TypeScript 타입 정의 변경
- `styles`: 스타일 파일 변경
- `i18n`: 다국어 번역 변경

### 예시

```
feat(components): 로그인 폼 컴포넌트 추가

사용자 인증을 위한 로그인 폼을 구현했습니다.
- 이메일, 비밀번호 입력 필드 추가
- 폼 유효성 검사 로직 구현
- 에러 메시지 표시 기능

Close #12
```

```
fix(auth): 토큰 만료 시 자동 로그아웃 처리

토큰이 만료되었을 때 사용자를 로그인 페이지로 리다이렉트합니다.
```

```
test(button): Button 컴포넌트 클릭 이벤트 테스트
```

---

## 🔄 PR (Pull Request) 및 코드리뷰

### PR 작성 규칙

1. **제목 형식**: 커밋 메시지 컨벤션을 따릅니다.
   ```
   feat(auth): 사용자 로그인 페이지 구현
   ```

2. **설명 (Body)** - 다음 항목을 포함합니다:
   ```markdown
   ## 변경 사항
   - 로그인 폼 UI 구현
   - 유효성 검사 로직 추가
   
   ## 테스트 방법
   1. 로그인 페이지로 이동
   2. 유효하지 않은 이메일 입력 후 제출 버튼 클릭
   3. 에러 메시지 표시 확인
   
   ## 스크린샷 (UI 변경 시)
   [여기에 스크린샷 첨부]
   
   Closes #12
   ```

3. **최소 커밋 수**: 논리적으로 의미 있는 단위로 커밋합니다.

### 병합 규칙

| 병합 경로 | PR 필수 | 리뷰 승인 | CI 통과 | 설명 |
|---------|--------|---------|--------|------|
| `feature/*` → `release/*` | ✅ | 1명 이상 | ✅ | 기능 개발 완료 |
| `fix/*` → `release/*` | ✅ | 1명 이상 | ✅ | 버그 수정 완료 |

> **배포:** `release/*` 브랜치가 최종 배포 대상입니다. release 브랜치의 코드를 프로덕션 환경에 배포합니다.

### 코드리뷰 체크리스트

리뷰어는 다음을 확인합니다:

- [ ] 코드가 프로젝트 컨벤션을 따르는가?
- [ ] 테스트가 충분한가? (TDD 방식)
- [ ] 타입스크립트 타입이 정확한가?
- [ ] API 호출이 올바른가?
- [ ] 다국어(i18n)가 적용되었는가?
- [ ] 성능 이슈가 없는가?
- [ ] 보안 이슈가 없는가?

---

## 🛡️ 브랜치 보호 규칙

GitHub 저장소 설정에서 다음 규칙을 적용합니다.

### `release/*` 브랜치
- ✅ PR을 통한 변경만 허용
- ✅ CI 테스트 통과 필수
- ✅ 최소 1명의 리뷰 승인 필수
- ✅ 직접 push 금지

---

## 🚀 개발 워크플로우 예시

### 새 기능 개발하기

```bash
# 1. release 브랜치에서 최신 코드 가져오기
git checkout release/1.0.0
git pull origin release/1.0.0

# 2. feature 브랜치 생성
git checkout -b feature/12-login-form

# 3. 코드 작성 및 커밋 (TDD 방식)
# - 테스트 작성
# - 기능 구현
# - 테스트 통과 확인
git add src/components/LoginForm.tsx src/test/unit/components/LoginForm.test.tsx
git commit -m "feat(components): 로그인 폼 컴포넌트 구현"

# 4. 원격 저장소에 푸시
git push origin feature/12-login-form

# 5. GitHub에서 PR 생성 (release/1.0.0으로)
# - 제목: feat(components): 로그인 폼 컴포넌트 구현
# - 설명에 변경 사항, 테스트 방법, 스크린샷 추가

# 6. 리뷰 진행 및 승인
# 7. PR 병합
# 8. 로컬에서 feature 브랜치 삭제
git checkout release/1.0.0
git pull origin release/1.0.0
git branch -d feature/12-login-form
```

### 버그 수정하기

```bash
# 1. release 브랜치에서 최신 코드 가져오기
git checkout release/1.0.0
git pull origin release/1.0.0

# 2. fix 브랜치 생성
git checkout -b fix/50-auth-bug

# 3. 버그 수정 및 테스트 작성
git add src/services/auth.ts src/test/unit/services/auth.test.tsx
git commit -m "fix(services): 토큰 갱신 오류 해결"

# 4. 원격 저장소에 푸시
git push origin fix/50-auth-bug

# 5. GitHub에서 PR 생성 (release/1.0.0으로)
# - 제목: fix(services): 토큰 갱신 오류 해결
# - 설명에 문제점, 해결 방법, 테스트 방법 추가

# 6. 리뷰 진행 및 승인
# 7. PR 병합
# 8. 로컬에서 fix 브랜치 삭제
git checkout release/1.0.0
git pull origin release/1.0.0
git branch -d fix/50-auth-bug
```

### 배포 하기

```bash
# 1. release 브랜치가 최종 검증 및 모든 기능이 완료되었다면 배포 준비
git checkout release/1.0.0
git pull origin release/1.0.0

# 2. 배포 (release 브랜치의 코드를 프로덕션에 배포)
# - CI/CD 파이프라인이 자동으로 배포 진행
# - 또는 수동으로 배포 명령어 실행

# 3. 태그 생성 (배포 기록)
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# 4. 새 release 버전 브랜치 준비 (다음 버전 개발)
# 다음 버전 개발을 위해 새 release 브랜치 생성
git checkout -b release/1.1.0
git push origin release/1.1.0
```

---

## 📋 TDD (Test-Driven Development) 가이드

New ERP는 TDD 방식을 따릅니다. 상세 내용은 [TESTING.md](./TESTING.md)를 참조하세요.

**요점:**
1. 테스트를 먼저 작성합니다.
2. 테스트를 통과하는 최소한의 코드를 작성합니다.
3. 리팩토링합니다.

---

## 📚 추가 리소스

- [TESTING.md](./TESTING.md) — 테스트 작성 가이드
- [README.md](./README.md) — 프로젝트 개요 및 기술 스택
- [Conventional Commits](https://www.conventionalcommits.org/) — 커밋 메시지 표준
- [Git Flow 상세 가이드](https://nvie.com/posts/a-successful-git-branching-model/)

---

## ❓ 질문 및 피드백

프로젝트에 관한 질문이나 이 가이드에 대한 피드백은 프로젝트 리더 또는 팀에 문의해주세요.
