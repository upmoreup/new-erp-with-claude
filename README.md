# New ERP

React + TypeScript + Zustand + i18n으로 구축한 현대적인 ERP 시스템입니다.

## 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Zustand** - 상태 관리
- **i18next** - 다국어 지원
- **Vite** - 빌드 도구
- **React I18next** - React i18next 통합
- **Vitest** - 빠른 테스트 러너 (TDD 방식 적용)
- **React Testing Library** - 사용자 관점 컴포넌트 테스트
- **pnpm** - 패키지 관리자

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   ├── layouts/        # 레이아웃
│   └── pages/          # 페이지 컴포넌트
├── pages/              # 페이지 (라우팅)
├── store/              # Zustand 상태 관리
├── hooks/              # 커스텀 React hooks
├── services/           # API 및 외부 서비스
├── types/              # TypeScript 타입
├── utils/              # 유틸리티 함수
├── locales/            # 다국어 번역 파일
├── App.tsx             # 메인 앱 컴포넌트
└── main.tsx            # 엔트리 포인트
```

## 설치 및 시작

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 시작

```bash
pnpm dev
```

브라우저가 자동으로 열리며 `http://localhost:5173`에서 앱을 확인할 수 있습니다.

### 프로덕션 빌드

```bash
pnpm build
```

### 빌드 결과 미리보기

```bash
pnpm preview
```

### 타입 체크

```bash
pnpm type-check
```

### ESLint 실행

```bash
pnpm lint
```

## 다국어 설정

현재 지원되는 언어:
- **English** (en)
- **한국어** (ko)

새로운 언어를 추가하려면:

1. `src/locales/[lang]/translation.json` 파일 생성
2. `src/locales/i18n.ts`에서 `resources`에 추가
3. `src/store/languageStore.ts`의 `LanguageType`에 언어 추가

## pnpm 사용

이 프로젝트는 **pnpm**을 패키지 관리자로 사용합니다. pnpm은 npm/yarn보다 빠르고 디스크 공간을 효율적으로 사용합니다.

pnpm 설치:
```bash
npm install -g pnpm
```

pnpm 버전 확인:
```bash
pnpm --version
```

## 환경 변수

`.env` 파일을 생성하여 환경 변수를 설정합니다. `.env.example`을 참고하세요.

## 개발 방식

**TDD(Test-Driven Development)** 방식으로 개발하고 있습니다. 자세한 테스트 가이드는 [TESTING.md](./TESTING.md)를 참고하세요.

## 향후 계획

- [ ] 라우팅 (React Router)
- [ ] 백엔드 API 통합
- [ ] 상세한 컴포넌트 개발
- [x] 테스트 추가 (Vitest, React Testing Library) - TDD 방식 적용 완료
- [ ] 스타일 개선 (Tailwind CSS 또는 Styled Components)

## 라이선스

MIT
