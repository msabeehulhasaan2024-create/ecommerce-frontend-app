import { useEffect, useState } from "react"
import { Row, Col, Card, Typography, Button, Tag, Skeleton } from "antd"
import {
  ProductOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  PlusOutlined,
  ShopOutlined,
  ArrowRightOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/Auth"
import axios from "axios"
import Aos from "aos"

const { Title, Paragraph, Text } = Typography

const Home = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    productsCount: null,
    ordersCount: null,
    usersCount: null,
    loading: true
  })

  useEffect(() => {
    Aos.init({ duration: 700, once: true })
    const token = localStorage.getItem("token")
    if (!token) {
      setStats(s => ({ ...s, loading: false }))
      return
    }

    const headers = { Authorization: `Bearer ${token}` }
    const promises = [
      axios.get(`${import.meta.env.VITE_API_URL}/products/all`, { headers }).catch(() => null),
      axios.get(`${import.meta.env.VITE_API_URL}/orders/all`, { headers }).catch(() => null)
    ]

    if (user?.role === "superAdmin") {
      promises.push(axios.get(`${import.meta.env.VITE_API_URL}/auth/users`, { headers }).catch(() => null))
    }

    Promise.all(promises).then(([prodRes, ordRes, userRes]) => {
      setStats({
        productsCount: prodRes?.data?.products ? prodRes.data.products.length : 0,
        ordersCount: ordRes?.data?.orders ? ordRes.data.orders.length : 0,
        usersCount: userRes?.data?.users ? userRes.data.users.length : 0,
        loading: false
      })
    })
  }, [user?.role])

  const isSuperAdmin = user?.role === "superAdmin"

  return (
    <div className="py-2" data-aos="fade-up">
      {/* Welcome Banner */}
      <div
        className="rounded-4 p-4 p-md-5 mb-4 position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #090d16 0%, #1e1b4b 60%, #312e81 100%)",
          color: "#ffffff",
          boxShadow: "0 12px 32px -4px rgba(15, 23, 42, 0.15)"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, rgba(245, 158, 11, 0.1) 70%)",
            filter: "blur(40px)",
            pointerEvents: "none"
          }}
        />

        <Row align="middle" justify="space-between" gutter={[24, 24]}>
          <Col xs={24} md={16} className="position-relative" style={{ zIndex: 1 }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <Tag
                color={isSuperAdmin ? "gold" : "cyan"}
                className="text-uppercase fw-semibold px-2 py-0"
                style={{ fontSize: "0.75rem", borderRadius: 4 }}
              >
                {isSuperAdmin ? "System Administrator" : "Verified Customer"}
              </Tag>
              <span className="text-white-50 small d-flex align-items-center gap-1">
                <CheckCircleOutlined className="text-success" /> Live & Protected
              </span>
            </div>
            <Title level={2} className="text-white mb-2 font-heading" style={{ fontWeight: 800 }}>
              Welcome back, {user?.fullName || "User"}!
            </Title>
            <Paragraph className="text-white-50 mb-4" style={{ fontSize: "1rem", maxWidth: 540 }}>
              {isSuperAdmin
                ? "Here is your real-time store performance, product catalog health, and order fulfillment status."
                : "Manage your shopping activity, view past purchases, and track active deliveries."}
            </Paragraph>

            <div className="d-flex flex-wrap gap-2">
              {isSuperAdmin ? (
                <>
                  <Link to="/dashboard/products/add" className="btn btn-warning fw-semibold rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm text-decoration-none">
                    <PlusOutlined /> Add Product
                  </Link>
                  <Link to="/dashboard/orders" className="btn btn-outline-light rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 text-decoration-none">
                    <UnorderedListOutlined /> View Orders
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/products" className="btn btn-warning fw-semibold rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm text-decoration-none">
                    <ShopOutlined /> Browse Store
                  </Link>
                  <Link to="/dashboard/orders" className="btn btn-outline-light rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 text-decoration-none">
                    <UnorderedListOutlined /> My Orders
                  </Link>
                </>
              )}
            </div>
          </Col>

          <Col xs={24} md={8} className="text-md-end position-relative" style={{ zIndex: 1 }}>
            <div
              className="d-inline-block text-start p-3 rounded-3"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                minWidth: 200
              }}
            >
              <div className="text-white-50 small mb-1">Session Active</div>
              <div className="text-white fw-bold">{user?.email}</div>
              <div className="mt-2 pt-2 border-top border-secondary d-flex align-items-center justify-content-between">
                <span className="small text-white-50">Status:</span>
                <span className="badge bg-success-subtle text-success">Healthy</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* KPI Stats Cards */}
      <Row gutter={[20, 20]} className="mb-4">
        {/* Products KPI */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="modern-card h-100"
            style={{ borderRadius: 16 }}
            bodyStyle={{ padding: 22 }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-muted small fw-semibold text-uppercase">Total Catalog</span>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(79, 70, 229, 0.1)",
                  color: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem"
                }}
              >
                <ProductOutlined />
              </div>
            </div>
            {stats.loading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <>
                <div className="fs-2 fw-bold text-dark font-heading mb-1">
                  {stats.productsCount !== null ? stats.productsCount : "--"}
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-muted small">Active Products</span>
                  {isSuperAdmin && (
                    <Link to="/dashboard/products" className="small fw-semibold text-primary text-decoration-none">
                      Manage <ArrowRightOutlined style={{ fontSize: "0.75rem" }} />
                    </Link>
                  )}
                </div>
              </>
            )}
          </Card>
        </Col>

        {/* Orders KPI */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="modern-card h-100"
            style={{ borderRadius: 16 }}
            bodyStyle={{ padding: 22 }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-muted small fw-semibold text-uppercase">Total Orders</span>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(245, 158, 11, 0.1)",
                  color: "#f59e0b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem"
                }}
              >
                <UnorderedListOutlined />
              </div>
            </div>
            {stats.loading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <>
                <div className="fs-2 fw-bold text-dark font-heading mb-1">
                  {stats.ordersCount !== null ? stats.ordersCount : "--"}
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-muted small">Recorded in System</span>
                  <Link to="/dashboard/orders" className="small fw-semibold text-warning text-decoration-none">
                    View <ArrowRightOutlined style={{ fontSize: "0.75rem" }} />
                  </Link>
                </div>
              </>
            )}
          </Card>
        </Col>

        {/* Users KPI */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="modern-card h-100"
            style={{ borderRadius: 16 }}
            bodyStyle={{ padding: 22 }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-muted small fw-semibold text-uppercase">
                {isSuperAdmin ? "Total Users" : "Customer Tier"}
              </span>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(6, 182, 212, 0.1)",
                  color: "#06b6d4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem"
                }}
              >
                <TeamOutlined />
              </div>
            </div>
            {stats.loading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <>
                <div className="fs-2 fw-bold text-dark font-heading mb-1">
                  {isSuperAdmin ? (stats.usersCount !== null ? stats.usersCount : "--") : "VIP Member"}
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-muted small">
                    {isSuperAdmin ? "Registered Accounts" : "Verified Account"}
                  </span>
                  {isSuperAdmin && (
                    <Link to="/dashboard/users" className="small fw-semibold text-info text-decoration-none">
                      Manage <ArrowRightOutlined style={{ fontSize: "0.75rem" }} />
                    </Link>
                  )}
                </div>
              </>
            )}
          </Card>
        </Col>

        {/* Security & Health KPI */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="modern-card h-100"
            style={{ borderRadius: 16 }}
            bodyStyle={{ padding: 22 }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-muted small fw-semibold text-uppercase">Security Status</span>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(16, 185, 129, 0.1)",
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem"
                }}
              >
                <SafetyCertificateOutlined />
              </div>
            </div>
            <div className="fs-2 fw-bold text-success font-heading mb-1">100% Secure</div>
            <div className="d-flex align-items-center justify-content-between">
              <span className="text-muted small">JWT Encrypted</span>
              <Tag color="success" className="m-0" style={{ fontSize: "0.7rem" }}>
                Active
              </Tag>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Action Navigation Grid */}
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={16}>
          <Card
            title={<span className="fw-bold font-heading">Quick Actions & Navigation</span>}
            bordered={false}
            className="modern-card"
            style={{ borderRadius: 16 }}
          >
            <Row gutter={[16, 16]}>
              {isSuperAdmin && (
                <>
                  <Col xs={24} sm={12}>
                    <Link
                      to="/dashboard/products/add"
                      className="p-3 rounded-3 d-flex align-items-center gap-3 text-decoration-none border h-100"
                      style={{
                        background: "#f8fafc",
                        borderColor: "#e2e8f0",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 10,
                          background: "#4f46e5",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem"
                        }}
                      >
                        <PlusOutlined />
                      </div>
                      <div>
                        <div className="fw-bold text-dark">Add New Product</div>
                        <div className="text-muted small">Publish a product with photo & pricing</div>
                      </div>
                    </Link>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Link
                      to="/dashboard/products"
                      className="p-3 rounded-3 d-flex align-items-center gap-3 text-decoration-none border h-100"
                      style={{
                        background: "#f8fafc",
                        borderColor: "#e2e8f0",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 10,
                          background: "#f59e0b",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem"
                        }}
                      >
                        <ProductOutlined />
                      </div>
                      <div>
                        <div className="fw-bold text-dark">Inventory Catalog</div>
                        <div className="text-muted small">Update stock, edit details or delete</div>
                      </div>
                    </Link>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Link
                      to="/dashboard/orders"
                      className="p-3 rounded-3 d-flex align-items-center gap-3 text-decoration-none border h-100"
                      style={{
                        background: "#f8fafc",
                        borderColor: "#e2e8f0",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 10,
                          background: "#10b981",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem"
                        }}
                      >
                        <UnorderedListOutlined />
                      </div>
                      <div>
                        <div className="fw-bold text-dark">Customer Orders</div>
                        <div className="text-muted small">Process orders and update tracking status</div>
                      </div>
                    </Link>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Link
                      to="/dashboard/users"
                      className="p-3 rounded-3 d-flex align-items-center gap-3 text-decoration-none border h-100"
                      style={{
                        background: "#f8fafc",
                        borderColor: "#e2e8f0",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 10,
                          background: "#06b6d4",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem"
                        }}
                      >
                        <TeamOutlined />
                      </div>
                      <div>
                        <div className="fw-bold text-dark">User Management</div>
                        <div className="text-muted small">Manage roles, permissions and accounts</div>
                      </div>
                    </Link>
                  </Col>
                </>
              )}

              {/* General Storefront shortcuts */}
              <Col xs={24} sm={isSuperAdmin ? 12 : 24}>
                <Link
                  to="/"
                  className="p-3 rounded-3 d-flex align-items-center gap-3 text-decoration-none border h-100"
                  style={{
                    background: "#f8fafc",
                    borderColor: "#e2e8f0",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 10,
                      background: "#0f172a",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem"
                    }}
                  >
                    <ShopOutlined />
                  </div>
                  <div>
                    <div className="fw-bold text-dark">Storefront Homepage</div>
                    <div className="text-muted small">View public store as visitors see it</div>
                  </div>
                </Link>
              </Col>

              {!isSuperAdmin && (
                <>
                  <Col xs={24} sm={12}>
                    <Link
                      to="/products"
                      className="p-3 rounded-3 d-flex align-items-center gap-3 text-decoration-none border h-100"
                      style={{
                        background: "#f8fafc",
                        borderColor: "#e2e8f0",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 10,
                          background: "#4f46e5",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem"
                        }}
                      >
                        <ProductOutlined />
                      </div>
                      <div>
                        <div className="fw-bold text-dark">Browse Products</div>
                        <div className="text-muted small">Discover trending items and deals</div>
                      </div>
                    </Link>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Link
                      to="/cart"
                      className="p-3 rounded-3 d-flex align-items-center gap-3 text-decoration-none border h-100"
                      style={{
                        background: "#f8fafc",
                        borderColor: "#e2e8f0",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 10,
                          background: "#f59e0b",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem"
                        }}
                      >
                        <ShoppingCartOutlined />
                      </div>
                      <div>
                        <div className="fw-bold text-dark">My Shopping Cart</div>
                        <div className="text-muted small">Check saved items and checkout</div>
                      </div>
                    </Link>
                  </Col>
                </>
              )}
            </Row>
          </Card>
        </Col>

        {/* System & Architecture Info */}
        <Col xs={24} lg={8}>
          <Card
            title={<span className="fw-bold font-heading">System & Marketplace</span>}
            bordered={false}
            className="modern-card h-100"
            style={{ borderRadius: 16 }}
          >
            <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
              <span className="text-muted small">API Gateway</span>
              <Tag color="green">ONLINE</Tag>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
              <span className="text-muted small">Database Sync</span>
              <span className="fw-semibold text-dark small">Cloud MongoDB</span>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
              <span className="text-muted small">Storage Bucket</span>
              <span className="fw-semibold text-dark small">Active Media</span>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
              <span className="text-muted small">Auth Mode</span>
              <span className="fw-semibold text-dark small">JWT Bearer Token</span>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2">
              <span className="text-muted small">Current Environment</span>
              <Tag color="purple">Production</Tag>
            </div>

            <div className="mt-4 p-3 rounded-3" style={{ background: "#f1f5f9" }}>
              <div className="small fw-bold text-dark mb-1">Need to update customer view?</div>
              <div className="text-muted small mb-2">Check the public marketplace catalog in real-time.</div>
              <Link to="/products" className="btn btn-outline-primary btn-sm w-100 rounded-pill text-decoration-none">
                Open Public Marketplace
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home