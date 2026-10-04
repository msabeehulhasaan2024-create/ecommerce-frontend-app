import { Col, Row, Typography } from 'antd'
import { useEffect } from 'react';
import { FaLaptop, FaShirt, FaCouch, FaBasketball, FaArrowRight, FaTag } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Aos from 'aos';

const { Title, Paragraph } = Typography

const Courses = () => {
    useEffect(() => {
        Aos.init({
            duration: 900,
            once: true,
            easing: "ease-in-out"
        })
    }, [])

    const categoryList = [
        {
            name: 'Electronics',
            icon: <FaLaptop size={32} />,
            colorClass: 'cyan',
            badge: 'Laptops, Phones & Tech',
            link: '/products'
        },
        {
            name: 'Fashion & Apparel',
            icon: <FaShirt size={32} />,
            colorClass: 'primary',
            badge: 'Trending Styles & Fits',
            link: '/products'
        },
        {
            name: 'Home & Living',
            icon: <FaCouch size={32} />,
            colorClass: 'amber',
            badge: 'Decor, Furniture & Kitchen',
            link: '/products'
        },
        {
            name: 'Sports & Outdoors',
            icon: <FaBasketball size={32} />,
            colorClass: 'emerald',
            badge: 'Fitness & Adventure Gear',
            link: '/products'
        }
    ]

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5" data-aos="fade-up">
                        <div className="feature-badge">
                            <span>Curated Selections</span>
                        </div>
                        <Title level={2} className="font-heading mb-2">Shop by Category</Title>
                        <Paragraph style={{ color: "#64748b", fontSize: "1.1rem" }}>
                            Explore handpicked collections crafted to fit your everyday lifestyle.
                        </Paragraph>
                    </div>

                    <Row gutter={[24, 24]}>
                        {categoryList.map((cat, idx) => (
                            <Col xs={24} sm={12} lg={6} key={idx}>
                                <Link to={cat.link} className="text-decoration-none">
                                    <div className="modern-card p-4 text-center h-100 d-flex flex-column align-items-center justify-content-center" data-aos="fade-up" data-aos-delay={idx * 100}>
                                        <div className={`icon-bubble ${cat.colorClass} mb-3`}>
                                            {cat.icon}
                                        </div>
                                        <Title level={4} className="font-heading mb-1" style={{ color: '#0f172a' }}>
                                            {cat.name}
                                        </Title>
                                        <span style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '16px' }}>
                                            {cat.badge}
                                        </span>
                                        <span className="d-inline-flex align-items-center gap-1" style={{ color: '#4f46e5', fontWeight: 600, fontSize: '0.875rem' }}>
                                            Browse Catalog <FaArrowRight size={12} />
                                        </span>
                                    </div>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Exclusive Deals & Discounts Banner */}
            <section className="dark-section-glow py-5 my-4 position-relative">
                <div className="container py-4 position-relative" style={{ zIndex: 1 }} data-aos="fade-up">
                    <Row justify="center">
                        <Col xs={24} lg={10} className="text-center">
                            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3" style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700 }}>
                                <FaTag size={13} /> LIMITED TIME PROMOTIONS
                            </div>
                            <Title level={1} className="font-heading text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
                                Exclusive Deals Await You
                            </Title>
                            <Paragraph className="text-light fs-5 mb-4" style={{ color: '#cbd5e1' }}>
                                Unlock incredible seasonal discounts on premium products. Fast shipping, guaranteed authenticity, and flash savings every single day.
                            </Paragraph>
                            <Link to="/products" className="btn btn-gold btn-lg px-5 py-3 d-inline-flex align-items-center gap-2 text-decoration-none">
                                <span>Browse All Deals</span>
                                <FaArrowRight size={14} />
                            </Link>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )
}

export default Courses