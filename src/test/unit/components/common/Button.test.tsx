import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/common/Button'

describe('Button', () => {
  it('버튼이 렌더링되어야 한다', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('클릭 이벤트가 작동해야 한다', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('로딩 상태일 때 "..." 표시되어야 한다', () => {
    render(<Button isLoading>Loading</Button>)
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('disabled 상태일 때 클릭할 수 없어야 한다', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} disabled>Disabled</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('fullWidth 프롭이 CSS 클래스에 적용되어야 한다', () => {
    render(<Button fullWidth>Full Width</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-full-width')
  })

  it('variant 프롭이 CSS 클래스에 적용되어야 한다', () => {
    render(<Button variant="danger">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-danger')
  })

  it('size 프롭이 CSS 클래스에 적용되어야 한다', () => {
    render(<Button size="large">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-large')
  })
})
