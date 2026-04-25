// 다양한 스타일과 크기를 지원하는 버튼 컴포넌트
import { ButtonHTMLAttributes } from 'react'
import '../../styles/components/button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  isLoading?: boolean
}

/**
 * 다양한 스타일과 크기를 지원하는 버튼 컴포넌트
 * @param {Object} props - 버튼 컴포넌트의 Props
 * @param {('primary'|'secondary'|'danger')} [props.variant='primary'] - 버튼 스타일
 * @param {('small'|'medium'|'large')} [props.size='medium'] - 버튼 크기
 * @param {boolean} [props.fullWidth=false] - 전체 너비로 표시 여부
 * @param {boolean} [props.isLoading=false] - 로딩 상태 표시 여부
 * @returns {JSX.Element} 렌더링된 버튼 요소
 */
export function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full-width' : ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? '...' : children}
    </button>
  )
}
