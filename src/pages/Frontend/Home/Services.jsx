import { useEffect } from 'react';
import { Col, Row, Typography } from 'antd'
import { FaTruckFast, FaShieldHalved, FaArrowRotateLeft } from "react-icons/fa6";
import Aos from 'aos';

const { Title, Paragraph } = Typography

const Services = () => {
    useEffect(() => {
        Aos.init({
            duration: 900,
            once: true,
            easing: "ease-in-out"
        })
    }, [])

    const perks = [
        {
            icon: <FaTruckFast size={30} />,
            colorClass: 'primary',
            badge: 'Fast & Reliable',
            title: 'Free Shipping',
            desc: 'Enjoy complimentary express delivery on orders above Rs. 2,000 nationwide with live tracking.'
        },
        {
            icon: <FaShieldHalved size={30} />,
            colorClass: 'emerald',
            badge: '100% Protected',
            title: 'Secure Payments',
            desc: 'Shop with full confidence with 256-bit SSL encrypted checkout, debit/credit cards, and Cash on Delivery.'
        },
        {
            icon: <FaArrowRotateLeft size={30} />,
            colorClass: 'amber',
            badge: 'Hassle-Free',
            title: '7-Day Easy Returns',
            desc: 'Not completely in love with your purchase? Return any item within 7 days for a swift and easy refund.'
        }
    ]

    return (
        <section className="py-5">
            <div className="container">
                <div className="text-center mb-5" data-aos="fade-up">
                    <div className="feature-badge">
                        <span>Our Customer Promise</span>
                    </div>
                    <Title level={2} className="font-heading mb-2">Why Shop With ApexStore</Title>
                    <Paragraph style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
                        We deliver a shopping experience designed around speed, trust, and complete buyer satisfaction.
                    </Paragraph>
                </div>

                <Row gutter={[24, 24]}>
                    {perks.map((perk, idx) => (
                        <Col xs={24} md={8} key={idx}>
                            <div className="modern-card p-4 p-lg-5 text-center h-100" data-aos="fade-up" data-aos-delay={idx * 150}>
                                <div className={`icon-bubble ${perk.colorClass} mx-auto`}>
                                    {perk.icon}
                                </div>
                                <div style={{
                                    display: 'inline-block',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    color: perk.colorClass === 'primary' ? '#4f46e5' : perk.colorClass === 'emerald' ? '#10b981' : '#f59e0b',
                                    marginBottom: 8
                                }}>
                                    {perk.badge}
                                </div>
                                <Title level={3} className="font-heading mb-3" style={{ fontSize: '1.45rem' }}>{perk.title}</Title>
                                <Paragraph style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                    {perk.desc}
                                </Paragraph>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    )
}

export default Services