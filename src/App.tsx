// 메인 애플리케이션 컴포넌트 - 라우팅과 언어 설정을 관리
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import i18next from 'i18next'
import { useAuthStore } from '@store/authStore'
import { useLanguageStore } from '@store/languageStore'
import { Login } from '@pages/Login'
import { Dashboard } from '@pages/Dashboard'
import { Products } from '@pages/Products'
import { Orders } from '@pages/Orders'
import { Customers } from '@pages/Customers'
import { Reports } from '@pages/Reports'
import { Settings } from '@pages/Settings'
import { Layout } from '@components/Layout'

/**
 * 인증된 사용자만 접근할 수 있는 보호된 라우트
 * @param {Object} props - 보호된 라우트의 Props
 * @param {React.ReactNode} props.children - 렌더링할 React 요소
 * @returns {JSX.Element|React.ReactNode} 인증된 경우 children, 아니면 로그인 페이지로 리다이렉트
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

/**
 * 메인 애플리케이션 컴포넌트 - 라우팅과 언어 설정을 관리
 * @returns {JSX.Element} 렌더링된 앱 요소
 */
function App() {
  const { language } = useLanguageStore()

  useEffect(() => {
    i18next.changeLanguage(language)
  }, [language])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
