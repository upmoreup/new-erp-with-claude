// 에러 메시지를 화면에 표시하는 컴포넌트
import '../../styles/components/errorMessage.css'

interface ErrorMessageProps {
  message: string
}

/**
 * 에러 메시지를 화면에 표시하는 컴포넌트
 * @param {Object} props - 에러 메시지 컴포넌트의 Props
 * @param {string} props.message - 표시할 에러 메시지 텍스트
 * @returns {JSX.Element} 렌더링된 에러 메시지 요소
 */
export function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className="error-message">{message}</div>
}
