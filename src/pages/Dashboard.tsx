// 로그인 후 메인 대시보드 페이지
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@store/authStore'
import { useLanguageStore } from '@store/languageStore'
import { Button } from '@components/common'
import '../styles/pages/dashboard.css'

/**
 * 로그인 후 메인 대시보드 페이지
 * @returns {JSX.Element} 렌더링된 대시보드 페이지 요소
 */
export function Dashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { language, setLanguage } = useLanguageStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar">
        <h1>{t('app.title')}</h1>
        <div className="navbar-right">
          <div className="language-selector">
            <Button
              variant="secondary"
              size="small"
              onClick={() => setLanguage('en')}
              className={language === 'en' ? 'active' : ''}
            >
              English
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => setLanguage('ko')}
              className={language === 'ko' ? 'active' : ''}
            >
              한국어
            </Button>
          </div>
          <div className="user-info">
            <span>{user?.name}</span>
            <Button
              variant="secondary"
              size="small"
              onClick={handleLogout}
            >
              {t('dashboard.logout')}
            </Button>
          </div>
        </div>
      </nav>

      <main className="dashboard-container">
        <div className="welcome-section">
          <h2>{t('dashboard.welcome', { name: user?.name })}</h2>
          <p>{t('dashboard.description')}</p>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <h3>{t('dashboard.card1_title')}</h3>
            <p>{t('dashboard.card1_desc')}</p>
          </div>
          <div className="card">
            <h3>{t('dashboard.card2_title')}</h3>
            <p>{t('dashboard.card2_desc')}</p>
          </div>
          <div className="card">
            <h3>{t('dashboard.card3_title')}</h3>
            <p>{t('dashboard.card3_desc')}</p>
          </div>
        </div>
      </main>
    </>
  )
}
