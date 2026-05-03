import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@store/languageStore'
import { Button } from '@components/common'
import '../styles/components/navbar.css'

interface NavbarProps {
  onMenuClick: () => void
  userName?: string
  onLogout: () => void
}

export function Navbar({ onMenuClick, userName, onLogout }: NavbarProps) {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguageStore()

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="hamburger-btn"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1>{t('app.title')}</h1>
      </div>

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
          <span>{userName}</span>
          <Button
            variant="secondary"
            size="small"
            onClick={onLogout}
          >
            {t('dashboard.logout')}
          </Button>
        </div>
      </div>
    </nav>
  )
}
