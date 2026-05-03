import { useTranslation } from 'react-i18next'
import '../styles/pages/page-layout.css'

export function Orders() {
  const { t } = useTranslation()

  return (
    <main className="page-container">
      <div className="page-header">
        <h1>{t('sidebar.orders')}</h1>
      </div>
      <div className="page-content">
        <p>Orders page content coming soon...</p>
      </div>
    </main>
  )
}
