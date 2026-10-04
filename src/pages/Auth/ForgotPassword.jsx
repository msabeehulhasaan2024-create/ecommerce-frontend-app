import { useEffect, useState } from "react"
import { Col, Row, Form, Input, Button, Typography, message } from "antd"
import { Link } from "react-router-dom"
import { FaBagShopping, FaEnvelope, FaKey, FaLock, FaPaperPlane, FaShieldHalved, FaArrowLeft, FaCheck } from "react-icons/fa6"
import axios from "axios"
import Aos from "aos"

const { Title, Paragraph } = Typography

const initialState = { email: "", otp: "", newPassword: "", confirmNewPassword: "" }

const ForgotPassword = () => {
    useEffect(() => {
        Aos.init({
            duration: 800,
            once: true,
            easing: "ease-in-out"
        })
    }, [])

    const [isProcessing, setIsProcessing] = useState(false)
    const [state, setState] = useState(initialState)
    const [step, setStep] = useState(1) // 1 = email, 2 = verify otp, 3 = reset password

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    // Step 1 - Send OTP to email
    const handleSendEmail = () => {
        const { email } = state
        if (!email) {
            return message.error("Please enter your email address")
        }
        const userData = { email }
        setIsProcessing(true)

        axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, userData)
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    message.success(data.message)
                    setStep(2)
                }
            })
            .catch((error) => {
                console.error(error)
                if (error.response) {
                    const { status, data } = error.response
                    if (status === 401 || status === 404 || status === 400) {
                        message.error(data.message)
                    }
                } else {
                    message.error("Something went wrong. Please try again.")
                }
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    // Step 2 - Verify OTP
    const handleVerifyOtp = () => {
        const { email, otp } = state
        if (!otp) {
            return message.error("Please enter the OTP")
        }
        const userData = { email, otp }
        setIsProcessing(true)

        axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, userData)
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    message.success(data.message)
                    setStep(3)
                }
            })
            .catch((error) => {
                console.error(error)
                if (error.response) {
                    const { status, data } = error.response
                    if (status === 401 || status === 404 || status === 400) {
                        message.error(data.message)
                    }
                } else {
                    message.error("Something went wrong. Please try again.")
                }
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    // Step 3 - Reset Password
    const handleResetPassword = () => {
        const { email, otp, newPassword, confirmNewPassword } = state

        if (!newPassword || newPassword.length < 6) {
            return message.error("Password must be at least 6 characters")
        }
        if (newPassword !== confirmNewPassword) { return message.error("Passwords do not match") }

        const userData = { email, otp, newPassword }
        setIsProcessing(true)

        axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, userData)
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    message.success(data.message)
                    setState(initialState)
                    setStep(1)
                }
            })
            .catch((error) => {
                console.error(error)
                if (error.response) {
                    const { status, data } = error.response
                    if (status === 401 || status === 404 || status === 400) {
                        message.error(data.message)
                    }
                } else {
                    message.error("Something went wrong. Please try again.")
                }
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    return (
        <div id="main">
            <div className="auth-card" data-aos="zoom-in" style={{ width: 480 }}>
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
                            Apex<span style={{ color: "#4f46e5" }}>Store</span>
                        </span>
                    </Link>

                    {/* Step indicator */}
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                        {[1, 2, 3].map((num) => {
                            const isActive = step === num
                            const isDone = step > num
                            return (
                                <div key={num} className="d-flex align-items-center">
                                    <div
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: "50%",
                                            background: isDone ? "#10b981" : isActive ? "#4f46e5" : "#e2e8f0",
                                            color: isDone || isActive ? "#ffffff" : "#64748b",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 700,
                                            fontSize: "0.85rem",
                                            boxShadow: isActive ? "0 0 0 3px rgba(79, 70, 229, 0.2)" : "none",
                                            transition: "all 0.3s ease"
                                        }}
                                    >
                                        {isDone ? <FaCheck style={{ fontSize: "0.75rem" }} /> : num}
                                    </div>
                                    {num < 3 && (
                                        <div
                                            style={{
                                                width: 36,
                                                height: 3,
                                                background: isDone ? "#10b981" : "#e2e8f0",
                                                margin: "0 6px",
                                                borderRadius: 2,
                                                transition: "all 0.3s ease"
                                            }}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <Title level={2} className="mb-1" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
                        {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP Code" : "Create New Password"}
                    </Title>
                    <Paragraph className="text-muted mb-0" style={{ fontSize: "0.92rem" }}>
                        {step === 1 && "Enter your email address and we'll send a 6-digit verification code"}
                        {step === 2 && `Enter the verification code sent to ${state.email || "your email"}`}
                        {step === 3 && "Choose a strong new password for your account"}
                    </Paragraph>
                </div>

                <Form layout="vertical">
                    <Row gutter={[0, 16]}>
                        {/* Step 1 - Email */}
                        {step === 1 && (
                            <>
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
                                    <Form.Item className="mb-2">
                                        <Button
                                            size="large"
                                            type="primary"
                                            htmlType="button"
                                            block
                                            loading={isProcessing}
                                            onClick={handleSendEmail}
                                            icon={!isProcessing && <FaPaperPlane className="me-1" />}
                                            style={{
                                                height: 48,
                                                borderRadius: 10,
                                                fontWeight: 600,
                                                fontSize: "1rem",
                                                boxShadow: "0 6px 20px -2px rgba(79, 70, 229, 0.45)"
                                            }}
                                        >
                                            Send Verification Code
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </>
                        )}

                        {/* Step 2 - Verify OTP */}
                        {step === 2 && (
                            <>
                                <Col span={24}>
                                    <Form.Item label={<span className="fw-semibold text-dark">Enter OTP Code</span>} required className="mb-2">
                                        <Input
                                            size="large"
                                            placeholder="Enter 6-digit code"
                                            name="otp"
                                            value={state.otp}
                                            onChange={handleChange}
                                            prefix={<FaKey style={{ color: "#94a3b8", marginRight: 8, fontSize: "0.95rem" }} />}
                                            style={{ borderRadius: 10, padding: "10px 14px", letterSpacing: "2px", fontWeight: 600, textAlign: "center" }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <button
                                            type="button"
                                            className="btn btn-link p-0 text-decoration-none text-muted d-flex align-items-center gap-1"
                                            style={{ fontSize: "0.88rem" }}
                                            onClick={() => { setState(s => ({ ...s, otp: "" })); setStep(1) }}
                                        >
                                            <FaArrowLeft style={{ fontSize: "0.75rem" }} /> Change email
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-link p-0 text-decoration-none fw-semibold"
                                            style={{ fontSize: "0.88rem", color: "#4f46e5" }}
                                            onClick={handleSendEmail}
                                        >
                                            Resend code
                                        </button>
                                    </div>
                                    <Form.Item className="mb-2">
                                        <Button
                                            size="large"
                                            type="primary"
                                            htmlType="button"
                                            block
                                            loading={isProcessing}
                                            onClick={handleVerifyOtp}
                                            icon={!isProcessing && <FaCheck className="me-1" />}
                                            style={{
                                                height: 48,
                                                borderRadius: 10,
                                                fontWeight: 600,
                                                fontSize: "1rem",
                                                boxShadow: "0 6px 20px -2px rgba(79, 70, 229, 0.45)"
                                            }}
                                        >
                                            Verify Code
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </>
                        )}

                        {/* Step 3 - Reset Password */}
                        {step === 3 && (
                            <>
                                <Col span={24}>
                                    <Form.Item label={<span className="fw-semibold text-dark">New Password</span>} required className="mb-2">
                                        <Input.Password
                                            size="large"
                                            placeholder="Enter your new password"
                                            name="newPassword"
                                            value={state.newPassword}
                                            onChange={handleChange}
                                            prefix={<FaLock style={{ color: "#94a3b8", marginRight: 8, fontSize: "0.95rem" }} />}
                                            style={{ borderRadius: 10, padding: "10px 14px" }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={<span className="fw-semibold text-dark">Confirm New Password</span>} required className="mb-2">
                                        <Input.Password
                                            size="large"
                                            placeholder="Confirm your new password"
                                            name="confirmNewPassword"
                                            value={state.confirmNewPassword}
                                            onChange={handleChange}
                                            prefix={<FaShieldHalved style={{ color: "#94a3b8", marginRight: 8, fontSize: "0.95rem" }} />}
                                            style={{ borderRadius: 10, padding: "10px 14px" }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item className="mb-2">
                                        <Button
                                            size="large"
                                            type="primary"
                                            htmlType="button"
                                            block
                                            loading={isProcessing}
                                            onClick={handleResetPassword}
                                            icon={!isProcessing && <FaCheck className="me-1" />}
                                            style={{
                                                height: 48,
                                                borderRadius: 10,
                                                fontWeight: 600,
                                                fontSize: "1rem",
                                                boxShadow: "0 6px 20px -2px rgba(79, 70, 229, 0.45)"
                                            }}
                                        >
                                            Update Password
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </>
                        )}
                    </Row>
                </Form>

                <div className="text-center pt-3 border-top mt-2">
                    <Paragraph className="mb-0 text-muted" style={{ fontSize: "0.92rem" }}>
                        Remember your password?{" "}
                        <Link to="/auth/login" className="fw-bold text-decoration-none" style={{ color: "#4f46e5" }}>
                            Back to login
                        </Link>
                    </Paragraph>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword