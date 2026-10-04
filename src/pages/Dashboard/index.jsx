import { useState, useEffect } from 'react'
import { Avatar, Dropdown, Layout, Menu, Tag, Button } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  ShopOutlined,
  UserOutlined,
  AppstoreOutlined
} from '@ant-design/icons'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Routes from "./Routes"
import sidebarItems from "./SidebarItems"
import { useAuth } from '@/context/Auth'

const { Header, Content, Footer, Sider } = Layout

const Dashboard = () => {
  const { user, handleLogout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const currentYear = new Date().getFullYear()

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true)
    }
  }, [location.pathname, isMobile])

  const getSelectedKey = () => {
    if (location.pathname.includes("/dashboard/products")) return "2"
    if (location.pathname.includes("/dashboard/orders")) return "3"
    if (location.pathname.includes("/dashboard/users")) return "4"
    return "1"
  }

  const getPageTitle = () => {
    if (location.pathname.includes("/dashboard/products/add")) return "Add New Product"
    if (location.pathname.includes("/dashboard/products")) return "Product Inventory"
    if (location.pathname.includes("/dashboard/orders")) return "Orders Management"
    if (location.pathname.includes("/dashboard/users")) return "User Management"
    return "Dashboard Overview"
  }

  const items = [
    {
      key: 'profile-info',
      label: (
        <div className="py-1 px-1">
          <div className="fw-bold text-dark">{user?.fullName || "User Account"}</div>
          <div className="text-muted small">{user?.email}</div>
          <div className="mt-1">
            <Tag color={user?.role === "superAdmin" ? "gold" : "blue"} className="text-uppercase m-0">
              {user?.role === "superAdmin" ? "Super Admin" : "Customer"}
            </Tag>
          </div>
        </div>
      ),
      disabled: true
    },
    { type: 'divider' },
    {
      key: 'store-link',
      label: 'Storefront',
      icon: <ShopOutlined />,
      onClick: () => navigate("/")
    },
    { type: 'divider' },
    {
      key: 'logout-action',
      label: 'Sign Out',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout
    }
  ]

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Mobile Backdrop Overlay when sidebar is open */}
      {isMobile && !collapsed && (
        <div
          className="dashboard-mobile-backdrop"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Modern Luxury Dark Sider - Fixed */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setIsMobile(broken)
          if (broken) setCollapsed(true)
        }}
        collapsedWidth={isMobile ? 0 : 80}
        width={250}
        trigger={null}
        style={{
          background: 'linear-gradient(180deg, #090d16 0%, #0f172a 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.12)',
          zIndex: isMobile ? 1000 : 100,
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          height: '100vh',
          overflowY: 'auto'
        }}
      >
        {/* Brand Area */}
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            height: 70,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0 16px',
            flexShrink: 0
          }}
        >
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <div
              style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
                fontSize: '1.1rem',
                flexShrink: 0
              }}
            >
              <AppstoreOutlined />
            </div>
            {!collapsed && (
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  color: '#ffffff',
                  letterSpacing: '-0.5px'
                }}
              >
                Apex<span style={{ color: '#fbbf24' }}>Store</span>
              </span>
            )}
          </Link>
        </div>

        {/* User preview snippet in sidebar */}
        {!collapsed && (
          <div
            className="m-3 p-3 rounded-3"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              flexShrink: 0
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <Avatar
                size={34}
                style={{
                  background: user?.role === 'superAdmin' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}
              >
                {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
              </Avatar>
              <div style={{ overflow: 'hidden' }}>
                <div className="text-white fw-semibold text-truncate small" style={{ maxWidth: 140 }}>
                  {user?.fullName || "Account"}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  {user?.role === 'superAdmin' ? '⭐ Administrator' : '👤 Customer'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            items={sidebarItems.filter(item => !item.allowedroles || item.allowedroles.includes(user.role))}
            style={{
              background: 'transparent',
              borderRight: 'none',
              marginTop: 8,
              fontSize: '0.95rem'
            }}
          />
        </div>

        {/* Bottom Storefront shortcut */}
        <div style={{ padding: '16px', marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.06)', flexShrink: 0 }}>
          <Link
            to="/"
            className="btn btn-outline-light btn-sm w-100 d-flex align-items-center justify-content-center gap-2 text-decoration-none"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: '0.85rem'
            }}
          >
            <ShopOutlined />
            {!collapsed && <span>Storefront</span>}
          </Link>
        </div>
      </Sider>

      {/* Main Content Layout - offset by fixed sidebar */}
      <Layout
        style={{
          background: '#f8fafc',
          minWidth: 0,
          marginLeft: isMobile ? 0 : (collapsed ? 80 : 250),
          transition: 'margin-left 0.2s cubic-bezier(0.2, 0, 0, 1)',
          minHeight: '100vh'
        }}
      >
        {/* Top Header */}
        <Header className="dashboard-header">
          <div className="d-flex align-items-center gap-2 gap-sm-3" style={{ minWidth: 0 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                fontSize: '1.15rem',
                width: 40,
                height: 40,
                borderRadius: 10,
                background: '#f1f5f9',
                border: '1px solid #e2e8f0'
              }}
              aria-label="Toggle navigation menu"
            />
            <div style={{ minWidth: 0, lineHeight: 1.2 }}>
              <div
                className="fw-bold text-dark font-heading text-truncate m-0"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', lineHeight: 1.25 }}
              >
                {getPageTitle()}
              </div>
              <div className="text-muted small d-none d-sm-block text-truncate" style={{ fontSize: '0.78rem', marginTop: 2, lineHeight: 1.2 }}>
                Control center and management hub
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 gap-sm-3 flex-shrink-0">
            <Link
              to="/"
              className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1 rounded-pill px-2 px-sm-3"
              style={{ fontSize: '0.825rem', height: 36, lineHeight: '22px' }}
              title="Visit Storefront"
            >
              <ShopOutlined style={{ fontSize: '0.95rem' }} />
              <span className="d-none d-sm-inline">Visit Store</span>
            </Link>

            <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
              <div
                className="d-flex align-items-center gap-2 p-1 pe-2 rounded-pill"
                style={{
                  cursor: 'pointer',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  transition: 'all 0.2s ease',
                  lineHeight: 1
                }}
              >
                <Avatar
                  size={34}
                  style={{
                    background: user?.role === 'superAdmin' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                    fontWeight: 700,
                    color: '#ffffff',
                    flexShrink: 0
                  }}
                >
                  {user?.fullName ? user.fullName[0].toUpperCase() : <UserOutlined />}
                </Avatar>
                <div className="d-none d-md-block text-start" style={{ lineHeight: 1 }}>
                  <div className="fw-semibold text-dark small text-truncate" style={{ maxWidth: 120, lineHeight: 1.2, marginBottom: 2 }}>
                    {user?.fullName || "My Account"}
                  </div>
                  <Tag
                    color={user?.role === 'superAdmin' ? 'gold' : 'blue'}
                    style={{ fontSize: '0.65rem', padding: '0 6px', margin: 0, lineHeight: '16px', borderRadius: 4 }}
                  >
                    {user?.role === 'superAdmin' ? 'Admin' : 'Customer'}
                  </Tag>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* Content Body */}
        <Content className="dashboard-content-wrapper">
          <Routes />
        </Content>

        {/* Dashboard Footer */}
        <Footer
          style={{
            textAlign: 'center',
            background: 'transparent',
            color: '#94a3b8',
            fontSize: '0.88rem',
            padding: '24px 16px'
          }}
        >
          ApexStore Marketplace Control Center © {currentYear}. All Rights Reserved.
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Dashboard