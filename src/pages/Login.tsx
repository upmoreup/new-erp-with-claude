// 사용자 로그인 페이지
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@store/authStore'
import { useLanguageStore } from '@store/languageStore'
import { Button } from '@components/common/Button'
import { Input } from '@components/common/Input'
import { ErrorMessage } from '@components/common/ErrorMessage'
import '../styles/pages/login.css'

/**
 * 사용자 로그인 페이지
 * @returns {JSX.Element} 렌더링된 로그인 페이지 요소
 */
export function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()
  const { language, setLanguage } = useLanguageStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError(t('login.errors.required'))
      return
    }

    if (!email.includes('@')) {
      setError(t('login.errors.invalid_email'))
      return
    }

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(t('login.errors.login_failed'))
    }
  }

  return (
    <div className="login-container">
      <div className="language-selector-top">
        <button
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'active' : ''}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('ko')}
          className={language === 'ko' ? 'active' : ''}
        >
          한국어
        </button>
      </div>

      <div className="login-box">
        <h1 className="login-title">{t('app.title')}</h1>
        <p className="login-subtitle">{t('login.subtitle')}</p>

        <form onSubmit={handleSubmit}>
          <Input
            label={t('login.email')}
            id="email"
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <Input
            label={t('login.password')}
            id="password"
            type="password"
            placeholder={t('login.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          {error && <ErrorMessage message={error} />}

          <Button
            type="submit"
            variant="primary"
            size="medium"
            fullWidth
            isLoading={isLoading}
          >
            {t('login.button')}
          </Button>
        </form>

        <p className="login-footer">{t('login.demo_info')}</p>
      </div>
    </div>
  )
}
