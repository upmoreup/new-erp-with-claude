import { useAuthStore } from '@store/authStore'
import { WelcomeSection } from '@components/WelcomeSection'
import { DashboardGrid } from '@components/DashboardGrid'
import '../styles/pages/dashboard.css'

export function Dashboard() {
  const { user } = useAuthStore()

  return (
    <main className="dashboard-container">
      <WelcomeSection userName={user?.name} />
      <DashboardGrid />
    </main>
  )
}
