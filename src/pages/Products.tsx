import { useTranslation } from 'react-i18next'
import '../styles/pages/page-layout.css'

export function Products() {
  const { t } = useTranslation()

  return (
    <main className="page-container">
      <div className="page-header">
        <h1>{t('sidebar.products')}</h1>
      </div>
      <div className="page-content">
        <p>Products page content coming soon...</p>
      </div>
    </main>
  )
}
