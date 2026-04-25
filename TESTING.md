# 프론트엔드 테스트 가이드

이 프로젝트에서 사용하는 프론트엔드 테스트 설정 및 작성 방법에 대한 가이드입니다.

## 테스트 도구

- **Vitest**: 빠른 테스트 러너 (Vite와 호환)
- **React Testing Library**: 사용자 관점에서 컴포넌트를 테스트
- **@testing-library/jest-dom**: DOM 검증을 위한 커스텀 매처들

## 테스트 실행

```bash
npm test              # 한 번 실행하고 종료
npm run test:watch   # watch 모드 (파일 변경 시 자동 재실행)
npm run test:ui      # UI 대시보드로 테스트 보기
```

## 테스트 파일 구조

테스트 파일은 컴포넌트 파일 옆에 같은 이름으로 `.test.tsx` 확장자로 생성합니다.

```
src/
  components/
    common/
      Button.tsx
      Button.test.tsx  ← 테스트 파일
      Input.tsx
      Input.test.tsx   ← 테스트 파일
```

## 테스트 작성 방법

### 기본 구조

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('컴포넌트가 렌더링되어야 한다', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected text')).toBeInTheDocument()
  })
})
```

### 주요 메서드들

#### 1. 요소 찾기 (Queries)

```typescript
// 역할(role)로 찾기 - 가장 권장됨
screen.getByRole('button', { name: /click/i })
screen.getByRole('textbox', { name: /email/i })

// 라벨로 찾기
screen.getByLabelText('Email')

// 텍스트로 찾기
screen.getByText('Submit')

// 없으면 null 반환 (존재하지 않음을 확인할 때)
screen.queryByText('Not found')
```

#### 2. 사용자 상호작용

```typescript
import userEvent from '@testing-library/user-event'

// 클릭
await userEvent.click(button)

// 텍스트 입력
await userEvent.type(input, 'hello@example.com')

// 선택
await userEvent.selectOptions(select, 'option-value')
```

#### 3. 검증 (Assertions)

```typescript
// 요소 존재 여부
expect(element).toBeInTheDocument()

// 텍스트 확인
expect(element).toHaveTextContent('text')

// CSS 클래스
expect(element).toHaveClass('active')

// 속성
expect(element).toHaveAttribute('id', 'my-id')

// 값 (input)
expect(input).toHaveValue('some value')

// 상태
expect(button).toBeDisabled()
expect(button).toBeEnabled()

// 함수 호출
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledWith('arg')
expect(mockFn).toHaveBeenCalledOnce()
```

## 실제 예시

### Button 컴포넌트 테스트

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  // 1. 기본 렌더링 테스트
  it('버튼이 렌더링되어야 한다', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  // 2. 클릭 이벤트 테스트
  it('클릭 이벤트가 작동해야 한다', async () => {
    const handleClick = vi.fn()  // Mock 함수
    render(<Button onClick={handleClick}>Click</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  // 3. 상태 변화 테스트
  it('로딩 상태일 때 "..." 표시되어야 한다', () => {
    render(<Button isLoading>Loading</Button>)
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  // 4. Props 적용 테스트
  it('variant 프롭이 CSS 클래스에 적용되어야 한다', () => {
    render(<Button variant="danger">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-danger')
  })
})
```

### Input 컴포넌트 테스트

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  // 1. 입력 기능 테스트
  it('입력값이 정상적으로 입력되어야 한다', async () => {
    render(<Input name="email" />)
    const input = screen.getByRole('textbox')
    
    await userEvent.type(input, 'test@example.com')
    expect(input).toHaveValue('test@example.com')
  })

  // 2. 라벨 테스트
  it('라벨이 입력 필드와 연결되어야 한다', () => {
    render(<Input label="Email" name="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  // 3. 에러 메시지 테스트
  it('에러 메시지가 표시되어야 한다', () => {
    render(<Input error="This field is required" name="email" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('input-error')
  })

  // 4. 헬퍼 텍스트 테스트
  it('에러가 없을 때만 도움말이 표시되어야 한다', () => {
    render(<Input helperText="This is optional" name="email" />)
    expect(screen.getByText('This is optional')).toBeInTheDocument()
  })
})
```

## 테스트 작성 팁

### 1. 사용자 관점으로 테스트하기

❌ **하지 말 것**: 내부 구현에 의존
```typescript
// 컴포넌트의 내부 상태를 테스트하면 안 됨
expect(component.state.isOpen).toBe(true)
```

✅ **하는 것**: 사용자가 보는 것을 테스트
```typescript
// 사용자가 보는 결과를 테스트
expect(screen.getByText('Modal opened')).toBeInTheDocument()
```

### 2. 비동기 작업 처리

```typescript
// 비동기 함수나 애니메이션이 있을 때
it('비동기 작업 후 업데이트되어야 한다', async () => {
  render(<AsyncComponent />)
  
  // 클릭
  await userEvent.click(screen.getByRole('button'))
  
  // 결과가 표시될 때까지 대기
  expect(await screen.findByText('Done')).toBeInTheDocument()
})
```

### 3. Mock 함수 사용

```typescript
import { vi } from 'vitest'

it('핸들러가 올바른 인자로 호출되어야 한다', async () => {
  const handleSubmit = vi.fn()
  render(<Form onSubmit={handleSubmit} />)
  
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  
  expect(handleSubmit).toHaveBeenCalledWith({ name: 'John' })
})
```

### 4. 여러 상황 테스트하기

```typescript
describe('Button', () => {
  // 상황별로 그룹화
  describe('when disabled', () => {
    it('클릭해도 반응하지 않아야 한다', async () => {
      const handleClick = vi.fn()
      render(<Button disabled onClick={handleClick}>Click</Button>)
      
      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('when loading', () => {
    it('"..." 로딩 텍스트를 표시해야 한다', () => {
      render(<Button isLoading>Submit</Button>)
      expect(screen.getByText('...')).toBeInTheDocument()
    })
  })
})
```

## 자주 사용하는 패턴

### 폼 제출 테스트

```typescript
it('폼을 제출할 수 있어야 한다', async () => {
  const handleSubmit = vi.fn()
  render(<LoginForm onSubmit={handleSubmit} />)
  
  // 필드 입력
  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
  await userEvent.type(screen.getByLabelText('Password'), 'password')
  
  // 제출
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  
  // 핸들러 확인
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password'
  })
})
```

### 조건부 렌더링 테스트

```typescript
it('조건에 따라 다른 요소를 표시해야 한다', () => {
  const { rerender } = render(<Component isAdmin={false} />)
  
  // isAdmin이 false일 때
  expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument()
  
  // isAdmin이 true일 때
  rerender(<Component isAdmin={true} />)
  expect(screen.getByText('Admin Panel')).toBeInTheDocument()
})
```

## 더 알아보기

- [Vitest 공식 문서](https://vitest.dev/)
- [React Testing Library 가이드](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library 쿼리 우선순위](https://testing-library.com/docs/queries/about#priority)

## 현재 프로젝트의 테스트

- ✅ Button.test.tsx - 7개 테스트
- ✅ Input.test.tsx - 9개 테스트

모두 통과 상태입니다!
