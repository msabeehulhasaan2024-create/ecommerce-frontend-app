import { useEffect } from 'react'
import { Col, Row, Typography } from 'antd'
import { FaBullseye, FaEye, FaAward, FaBoltLightning, FaHeadset, FaArrowRight } from "react-icons/fa6"
import { Link } from 'react-router-dom'
import Aos from 'aos'

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
        <main style={{ backgroundColor: "var(--bg-page)", minHeight: "85vh" }}>
            {/* Header Banner */}
            <div style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", borderBottom: "1px solid #e2e8f0" }} className="py-5 mb-5">
                <div className="container text-center" data-aos="fade-up">
                    <div className="feature-badge mx-auto">
                        <span>Our Story & Values</span>
                    </div>
                    <Title level={1} className="font-heading mb-3" style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)" }}>
                        About <span className="gradient-text-primary">ApexStore</span>
                    </Title>
                    <Paragraph style={{ color: "#64748b", fontSize: "1.15rem", maxWidth: "750px", margin: "0 auto", lineHeight: 1.6 }}>
                        ApexStore was founded with a singular ambition: to build the most intuitive, trustworthy, and seamless e-commerce marketplace. From consumer technology to high fashion, we bridge premium merchants with millions of delighted buyers.
                    </Paragraph>
                </div>
            </div>

            <div className="container pb-5">
                {/* Mission & Vision Cards */}
                <Row gutter={[24, 24]} className="mb-5">
                    <Col xs={24} md={12}>
                        <div className="modern-card p-4 p-lg-5 h-100" style={{ background: "#ffffff", borderLeft: "4px solid #4f46e5" }} data-aos="fade-up">
                            <div className="icon-bubble primary">
                                <FaBullseye size={28} />
                            </div>
                            <Title level={3} className="font-heading mb-2">Our Mission</Title>
                            <Paragraph style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: 1.7 }}>
                                To democratize access to exceptional quality products by creating an accessible, ultra-secure, and reliable digital ecosystem that empowers buyers and sellers alike.
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="modern-card p-4 p-lg-5 h-100" style={{ background: "#ffffff", borderLeft: "4px solid #f59e0b" }} data-aos="fade-up" data-aos-delay={150}>
                            <div className="icon-bubble amber">
                                <FaEye size={28} />
                            </div>
                            <Title level={3} className="font-heading mb-2">Our Vision</Title>
                            <Paragraph style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: 1.7 }}>
                                To become the benchmark for contemporary commerce — celebrated for unwavering authenticity, revolutionary delivery speeds, and customer-first experiences across the globe.
                            </Paragraph>
                        </div>
                    </Col>
                </Row>

                {/* Why Choose ApexStore */}
                <div className="text-center my-5" data-aos="fade-up">
                    <div className="feature-badge">
                        <span>Pillars of Excellence</span>
                    </div>
                    <Title level={2} className="font-heading mb-2">Why Millions Choose ApexStore</Title>
                    <Paragraph style={{ color: "#64748b", fontSize: "1.05rem" }}>
                        Our core standards ensure that every transaction exceeds your expectations.
                    </Paragraph>
                </div>

                <Row gutter={[24, 24]} className="pb-5">
                    <Col xs={24} md={8}>
                        <div className="modern-card p-4 text-center h-100" style={{ background: "#ffffff" }} data-aos="fade-up">
                            <div className="icon-bubble primary mx-auto">
                                <FaAward size={26} />
                            </div>
                            <Title level={4} className="font-heading mb-2">Rigorous Quality</Title>
                            <Paragraph style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }}>
                                Every merchant and item is screened with strict authenticity metrics so you only receive top-shelf products.
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <div className="modern-card p-4 text-center h-100" style={{ background: "#ffffff" }} data-aos="fade-up" data-aos-delay={100}>
                            <div className="icon-bubble emerald mx-auto">
                                <FaBoltLightning size={26} />
                            </div>
                            <Title level={4} className="font-heading mb-2">Speed & Security</Title>
                            <Paragraph style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }}>
                                Swift regional delivery paired with bank-grade encrypted checkout safeguards your transactions from end to end.
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <div className="modern-card p-4 text-center h-100" style={{ background: "#ffffff" }} data-aos="fade-up" data-aos-delay={200}>
                            <div className="icon-bubble amber mx-auto">
                                <FaHeadset size={26} />
                            </div>
                            <Title level={4} className="font-heading mb-2">24/7 Dedicated Care</Title>
                            <Paragraph style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }}>
                                Our expert support specialists are always active to resolve queries, dispatch replacements, and ensure satisfaction.
                            </Paragraph>
                        </div>
                    </Col>
                </Row>

                {/* CTA Strip */}
                <div className="dark-section-glow p-5 rounded-4 text-center text-white my-4 position-relative" data-aos="fade-up">
                    <Title level={2} className="text-white font-heading mb-2">Ready to Experience Modern Shopping?</Title>
                    <Paragraph className="text-light mb-4" style={{ color: "#cbd5e1", maxWidth: 500, margin: "0 auto 24px auto" }}>
                        Browse our latest arrivals and join thousands of satisfied customers today.
                    </Paragraph>
                    <Link to="/products" className="btn btn-gold btn-lg px-4 d-inline-flex align-items-center gap-2 text-decoration-none">
                        <span>Start Shopping</span>
                        <FaArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Hero