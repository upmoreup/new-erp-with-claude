import '../styles/components/dashboard-card.css'

interface DashboardCardProps {
  title: string
  description: string
}

export function DashboardCard({ title, description }: DashboardCardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
