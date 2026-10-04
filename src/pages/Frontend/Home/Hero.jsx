import { useEffect } from 'react'
import { Col, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ShoppingOutlined, ArrowRightOutlined, StarFilled, ThunderboltFilled, SafetyCertificateFilled } from "@ant-design/icons"
import Aos from 'aos'
import heroImg from '@/assets/hero.avif'

const { Title, Paragraph } = Typography

const Hero = () => {
    useEffect(() => {
        Aos.init({
            duration: 900,
            once: true,
            easing: "ease-in-out"
        })
    }, [])

    return (
        <section className="py-5" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Subtle background ambient glow */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                right: '10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none'
            }} />

            <div className="container py-lg-4" data-aos="fade-up">
                <Row gutter={[48, 40]} align="middle">
                    <Col xs={24} lg={12} className="pe-lg-4">
                        <div className="feature-badge">
                            <span style={{ color: '#f59e0b' }}>✨</span>
                            <span>The Next Generation Marketplace</span>
                        </div>

                        <Title level={1} className="font-heading mb-3" style={{ fontSize: "clamp(2.5rem, 5vw, 3.6rem)", lineHeight: 1.15 }}>
                            Shop Smarter with <span className="gradient-text-primary">ApexStore</span>
                        </Title>

                        <Paragraph style={{ color: "#64748b", fontSize: "1.15rem", lineHeight: 1.6, marginBottom: "32px" }}>
                            Discover thousands of handpicked products at unbeatable prices. Experience lightning-fast delivery, effortless returns, and secure checkout — all seamlessly in one place.
                        </Paragraph>

                        <div className="d-flex flex-wrap gap-3 mb-4">
                            <Link to="/products" className="btn btn-indigo d-inline-flex align-items-center gap-2 px-4 py-2 fs-6">
                                <ShoppingOutlined /> Explore Products
                            </Link>
                            <Link to="/auth/register" className="btn btn-gold d-inline-flex align-items-center gap-2 px-4 py-2 fs-6">
                                Join ApexStore <ArrowRightOutlined />
                            </Link>
                        </div>

                        {/* Trust highlights */}
                        <div className="d-flex flex-wrap gap-4 pt-3" style={{ borderTop: "1px solid rgba(226, 232, 240, 0.9)" }}>
                            <div className="d-flex align-items-center gap-2">
                                <SafetyCertificateFilled style={{ color: "#10b981", fontSize: "18px" }} />
                                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155" }}>100% Genuine</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <ThunderboltFilled style={{ color: "#f59e0b", fontSize: "18px" }} />
                                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155" }}>Express Nationwide</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <StarFilled style={{ color: "#4f46e5", fontSize: "18px" }} />
                                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155" }}>4.9/5 Rating</span>
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} lg={12} className="text-center position-relative">
                        <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
                            {/* Glowing shadow border */}
                            <div style={{
                                position: 'absolute',
                                inset: '-8px',
                                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.4) 0%, rgba(245, 158, 11, 0.3) 100%)',
                                borderRadius: '28px',
                                filter: 'blur(16px)',
                                opacity: 0.6,
                                zIndex: 0
                            }} />

                            <img
                                src={heroImg}
                                alt="ApexStore Shopping"
                                className="img-fluid rounded-4 position-relative"
                                style={{
                                    height: "460px",
                                    width: "100%",
                                    objectFit: "cover",
                                    borderRadius: "24px",
                                    zIndex: 1,
                                    boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.2)"
                                }}
                            />

                            {/* Floating Glass Pill - Top Right */}
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                right: '-15px',
                                background: 'rgba(255, 255, 255, 0.92)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255, 255, 255, 0.8)',
                                borderRadius: '16px',
                                padding: '12px 18px',
                                boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
                                zIndex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <div style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    background: 'rgba(16, 185, 129, 0.12)',
                                    color: '#10b981',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 18
                                }}>
                                    <ThunderboltFilled />
                                </div>
                                <div className="text-start">
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Fast Shipping</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>24h Delivery</div>
                                </div>
                            </div>

                            {/* Floating Glass Pill - Bottom Left */}
                            <div style={{
                                position: 'absolute',
                                bottom: '25px',
                                left: '-15px',
                                background: 'rgba(255, 255, 255, 0.92)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255, 255, 255, 0.8)',
                                borderRadius: '16px',
                                padding: '12px 18px',
                                boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
                                zIndex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <div style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    background: 'rgba(245, 158, 11, 0.12)',
                                    color: '#f59e0b',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 18
                                }}>
                                    <StarFilled />
                                </div>
                                <div className="text-start">
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Top Rated</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>300K+ Happy Buyers</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default Hero
