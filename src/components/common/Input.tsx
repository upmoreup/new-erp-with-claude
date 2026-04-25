// 라벨, 에러 메시지, 도움말을 지원하는 입력 필드 컴포넌트
import { InputHTMLAttributes } from 'react'
import '../../styles/components/input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

/**
 * 라벨, 에러 메시지, 도움말을 지원하는 입력 필드 컴포넌트
 * @param {Object} props - 입력 필드 컴포넌트의 Props
 * @param {string} [props.label] - 입력 필드 위에 표시할 라벨 텍스트
 * @param {string} [props.error] - 에러 메시지 (표시되면 입력 필드 스타일이 변함)
 * @param {string} [props.helperText] - 입력 필드 아래에 표시할 도움말 텍스트 (에러가 없을 때만 표시)
 * @returns {JSX.Element} 렌더링된 입력 필드 요소
 */
export function Input({
  label,
  error,
  helperText,
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name

  return (
    <div className="input-wrapper">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input id={inputId} className={error ? 'input-error' : ''} {...props} />
      {error && <span className="error-text">{error}</span>}
      {helperText && !error && <span className="helper-text">{helperText}</span>}
    </div>
  )
}
