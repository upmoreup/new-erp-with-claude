import { useTranslation } from 'react-i18next'
import '../styles/pages/page-layout.css'

export function Settings() {
  const { t } = useTranslation()

  return (
    <main className="page-container">
      <div className="page-header">
        <h1>{t('sidebar.settings')}</h1>
      </div>
      <div className="page-content">
        <p>Settings page content coming soon...</p>
      </div>
    </main>
  )
}
