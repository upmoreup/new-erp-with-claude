import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Input } from '@/components/common/Input'

describe('Input', () => {
  it('입력 필드가 렌더링되어야 한다', () => {
    render(<Input name="email" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('라벨이 렌더링되어야 한다', () => {
    render(<Input label="Email" name="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('입력값이 정상적으로 입력되어야 한다', async () => {
    render(<Input name="text" />)
    const input = screen.getByRole('textbox')

    await userEvent.type(input, 'Hello')
    expect(input).toHaveValue('Hello')
  })

  it('에러 메시지가 표시되어야 한다', () => {
    render(<Input error="This field is required" name="email" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('에러가 있을 때 error 클래스가 적용되어야 한다', () => {
    render(<Input error="Error message" name="email" />)
    expect(screen.getByRole('textbox')).toHaveClass('input-error')
  })

  it('도움말 텍스트가 표시되어야 한다', () => {
    render(<Input helperText="This is optional" name="email" />)
    expect(screen.getByText('This is optional')).toBeInTheDocument()
  })

  it('에러가 있을 때 도움말 텍스트는 표시되지 않아야 한다', () => {
    render(<Input error="Error" helperText="Helper" name="email" />)
    expect(screen.queryByText('Helper')).not.toBeInTheDocument()
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('name을 id로 사용해야 한다', () => {
    render(<Input name="username" label="Username" />)
    expect(screen.getByLabelText('Username')).toHaveAttribute('id', 'username')
  })

  it('명시적 id가 name을 override해야 한다', () => {
    render(<Input name="username" id="custom-id" label="Username" />)
    expect(screen.getByLabelText('Username')).toHaveAttribute('id', 'custom-id')
  })
})
