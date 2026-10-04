import { Col, Row, Typography } from 'antd'
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaLocationDot, FaEnvelope, FaPhone, FaShieldHeart, FaTruckFast } from "react-icons/fa6";
import { ShopOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';

const { Paragraph, Title } = Typography

const Copyright = () => {
    const year = new Date().getFullYear()

    return (
        <footer style={{ background: '#090d16', borderTop: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative' }}>
            {/* Top gradient highlight bar */}
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 50%, #f59e0b 100%)' }} />

            <section className="pt-5 pb-4">
                <div className="container">
                    <Row gutter={[40, 32]}>
                        {/* Brand Column */}
                        <Col xs={24} md={12} lg={6}>
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <div style={{
                                    width: 36,
                                    height: 36,
                                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                    borderRadius: 10,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)'
                                }}>
                                    <ShopOutlined style={{ fontSize: 18 }} />
                                </div>
                                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>
                                    Apex<span style={{ color: '#f59e0b' }}>Store</span>
                                </span>
                            </div>

                            <Paragraph style={{ color: '#94a3b8', fontSize: '0.925rem', lineHeight: 1.6 }}>
                                Your premier online marketplace for curated electronics, high-end fashion, home essentials, and lifestyle goods. Premium quality delivered directly to your doorstep.
                            </Paragraph>

                            <div className='d-flex gap-2 pt-2'>
                                {[
                                    { icon: <FaFacebookF size={14} />, href: "#" },
                                    { icon: <FaInstagram size={14} />, href: "#" },
                                    { icon: <FaYoutube size={14} />, href: "#" },
                                    { icon: <FaLinkedinIn size={14} />, href: "#" }
                                ].map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: '50%',
                                            background: 'rgba(255, 255, 255, 0.06)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#e2e8f0',
                                            transition: 'all 0.25s ease',
                                            textDecoration: 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#4f46e5';
                                            e.currentTarget.style.color = '#ffffff';
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(79, 70, 229, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                                            e.currentTarget.style.color = '#e2e8f0';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        {item.icon}
                                    </a>
                                ))}
                            </div>
                        </Col>

                        {/* Navigation Links */}
                        <Col xs={24} sm={12} md={6} lg={6}>
                            <Title level={5} style={{ color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: 20 }}>
                                Navigation
                            </Title>
                            <div className="d-flex flex-column gap-2">
                                {[
                                    { label: 'Home', to: '/' },
                                    { label: 'Browse Products', to: '/products' },
                                    { label: 'About Our Story', to: '/about' },
                                    { label: 'Services & Guarantee', to: '/services' },
                                    { label: 'Customer Support', to: '/contact' }
                                ].map((link, i) => (
                                    <Link
                                        key={i}
                                        to={link.to}
                                        style={{
                                            color: '#94a3b8',
                                            textDecoration: 'none',
                                            fontSize: '0.925rem',
                                            transition: 'all 0.2s ease',
                                            display: 'inline-block'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </Col>

                        {/* Categories */}
                        <Col xs={24} sm={12} md={6} lg={6}>
                            <Title level={5} style={{ color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: 20 }}>
                                Featured Categories
                            </Title>
                            <div className="d-flex flex-column gap-2">
                                {[
                                    'Consumer Electronics',
                                    'Designer Fashion & Apparel',
                                    'Home & Living Decor',
                                    'Sports & Active Outdoors',
                                    'Watches & Eyewear'
                                ].map((cat, i) => (
                                    <Link
                                        key={i}
                                        to="/products"
                                        style={{
                                            color: '#94a3b8',
                                            textDecoration: 'none',
                                            fontSize: '0.925rem',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fbbf24'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                    >
                                        {cat}
                                    </Link>
                                ))}
                            </div>
                        </Col>

                        {/* Contact & Support */}
                        <Col xs={24} md={12} lg={6}>
                            <Title level={5} style={{ color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: 20 }}>
                                Get In Touch
                            </Title>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex align-items-start gap-3">
                                    <div style={{ color: '#f59e0b', marginTop: 3 }}><FaLocationDot size={15} /></div>
                                    <span style={{ color: '#94a3b8', fontSize: '0.925rem' }}>Plot 14, DHA Phase 6, Lahore, Pakistan</span>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{ color: '#10b981' }}><FaPhone size={14} /></div>
                                    <span style={{ color: '#94a3b8', fontSize: '0.925rem' }}>+92 300 000 0000</span>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{ color: '#06b6d4' }}><FaEnvelope size={14} /></div>
                                    <span style={{ color: '#94a3b8', fontSize: '0.925rem' }}>support@apexstore.pk</span>
                                </div>
                                <div className="mt-2 p-2 rounded" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                    <div className="d-flex align-items-center gap-2" style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
                                        <FaShieldHeart size={14} /> 100% Buyer Protection Guaranteed
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Bottom Copyright Sub-bar */}
            <section className='py-3' style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div className="container">
                    <Row align="middle" justify="space-between">
                        <Col xs={24} md={12} className="text-center text-md-start">
                            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                                &copy; {year} ApexStore Marketplace Ltd. All rights reserved.
                            </span>
                        </Col>
                        <Col xs={24} md={12} className="text-center text-md-end mt-2 mt-md-0">
                            <span style={{ color: '#64748b', fontSize: '0.825rem', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                                <span>Privacy Policy</span>
                                <span>•</span>
                                <span>Terms of Service</span>
                                <span>•</span>
                                <span>Security Verified</span>
                            </span>
                        </Col>
                    </Row>
                </div>
            </section>
        </footer>
    )
}

export default Copyright