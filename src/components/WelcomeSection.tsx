import { useTranslation } from 'react-i18next'
import '../styles/components/welcome-section.css'

interface WelcomeSectionProps {
  userName?: string
}

export function WelcomeSection({ userName }: WelcomeSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="welcome-section">
      <h2>{t('dashboard.welcome', { name: userName })}</h2>
      <p>{t('dashboard.description')}</p>
    </div>
  )
}
