import { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import '../styles/components/layout.css'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar
        onMenuClick={handleMenuClick}
        userName={user?.name}
        onLogout={handleLogout}
      />
      <div className="layout-content">
        <Outlet />
      </div>
    </>
  )
}
