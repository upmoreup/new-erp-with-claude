import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import '../styles/components/sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation()

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <div className="sidebar-header">
            <h2>{t('app.title')}</h2>
          </div>
          <ul className="sidebar-menu">
            <li><Link to="/dashboard" onClick={onClose}>{t('sidebar.dashboard')}</Link></li>
            <li><Link to="/products" onClick={onClose}>{t('sidebar.products')}</Link></li>
            <li><Link to="/orders" onClick={onClose}>{t('sidebar.orders')}</Link></li>
            <li><Link to="/customers" onClick={onClose}>{t('sidebar.customers')}</Link></li>
            <li><Link to="/reports" onClick={onClose}>{t('sidebar.reports')}</Link></li>
            <li><Link to="/settings" onClick={onClose}>{t('sidebar.settings')}</Link></li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
