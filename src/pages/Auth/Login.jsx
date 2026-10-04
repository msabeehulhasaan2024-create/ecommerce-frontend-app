import { useEffect, useState } from "react"
import { Col, Row, Form, Input, Button, Typography, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/Auth"
import { FaBagShopping, FaEnvelope, FaLock, FaArrowRightToBracket } from "react-icons/fa6"
import axios from "axios"
import Aos from "aos"

const { Title, Paragraph } = Typography
const initialState = { email: "", password: "" }

const Login = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      easing: "ease-in-out"
    })
  }, [])

  const [isProcessing, setIsProcessing] = useState(false)
  const [state, setState] = useState(initialState)
  const navigate = useNavigate()
  const { readProfile } = useAuth()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleSubmit = () => {
    let { email, password } = state

    const userData = { email, password }
    setIsProcessing(true)

    axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userData)
      .then((res) => {
        const { status, data } = res
        if (status === 201) {
          localStorage.setItem("token", data.token)
          message.success(data.message)
          readProfile(data.token)
        }
      })
      .catch((error) => {
        console.error(error)
        if (error.response) {
          const { status, data } = error.response
          if (status === 401) {
            message.error(data.message)
          }
        } else {
          message.error("Something went wrong while login")
        }
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <div id="main">
      <div className="auth-card" data-aos="zoom-in">
        {/* Brand header */}
        <div className="text-center mb-4">
          <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-3">
            <div
              style={{
                width: 44,
                height: 44,
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 6px 16px rgba(79, 70, 229, 0.4)",
                fontSize: "1.2rem"
              }}
            >
              <FaBagShopping />
            </div>
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#0f172a", letterSpacing: "-0.5px" }}>
              Shop<span style={{ color: "#4f46e5" }}>Nest</span>
            </span>
          </Link>
          <Title level={2} className="mb-1" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
            Welcome Back
          </Title>
          <Paragraph className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
            Sign in to access your orders, wishlist & account
          </Paragraph>
        </div>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Form.Item label={<span className="fw-semibold text-dark">Email Address</span>} required className="mb-2">
                <Input
                  size="large"
                  placeholder="name@example.com"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  prefix={<FaEnvelope style={{ color: "#94a3b8", marginRight: 8, fontSize: "0.95rem" }} />}
                  style={{ borderRadius: 10, padding: "10px 14px" }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="fw-semibold text-dark ant-form-item-required">Password</label>
                <Link to="/auth/forgot-password" className="text-decoration-none fw-semibold" style={{ fontSize: "0.85rem", color: "#4f46e5" }}>
                  Forgot password?
                </Link>
              </div>
              <Form.Item required className="mb-3">
                <Input.Password
                  size="large"
                  placeholder="••••••••"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  prefix={<FaLock style={{ color: "#94a3b8", marginRight: 8, fontSize: "0.95rem" }} />}
                  style={{ borderRadius: 10, padding: "10px 14px" }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className="mb-3">
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isProcessing}
                  icon={!isProcessing && <FaArrowRightToBracket className="me-1" />}
                  style={{
                    height: 48,
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: "1rem",
                    boxShadow: "0 6px 20px -2px rgba(79, 70, 229, 0.45)"
                  }}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className="text-center pt-2 border-top">
          <Paragraph className="mb-0 text-muted" style={{ fontSize: "0.92rem" }}>
            Don't have an account?{" "}
            <Link to="/auth/register" className="fw-bold text-decoration-none" style={{ color: "#4f46e5" }}>
              Create an account
            </Link>
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

export default Login