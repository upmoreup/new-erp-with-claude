import { useTranslation } from 'react-i18next'
import { DashboardCard } from './DashboardCard'
import '../styles/components/dashboard-grid.css'

export function DashboardGrid() {
  const { t } = useTranslation()

  return (
    <div className="dashboard-grid">
      <DashboardCard
        title={t('dashboard.card1_title')}
        description={t('dashboard.card1_desc')}
      />
      <DashboardCard
        title={t('dashboard.card2_title')}
        description={t('dashboard.card2_desc')}
      />
      <DashboardCard
        title={t('dashboard.card3_title')}
        description={t('dashboard.card3_desc')}
      />
    </div>
  )
}
