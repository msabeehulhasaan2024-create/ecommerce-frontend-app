import { Col, Row, Typography } from 'antd'
import Aos from 'aos';
import { useEffect } from 'react';
import { FaShieldHalved, FaArrowsRotate, FaTruckFast, FaCartShopping, FaBoxOpen, FaHandshake, FaList, FaMapLocationDot, FaHeadset, FaStore, FaCreditCard, FaGift, FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography

const OurServices = () => {
  useEffect(() => {
    Aos.init({
      duration: 900,
      once: true,
      easing: "ease-in-out"
    })
  }, [])

  const services = [
    { icon: <FaList size={26} />, color: "primary", title: "Product Catalog", desc: "Browse thousands of verified products across consumer tech, apparel, interior decor, and outdoor gear." },
    { icon: <FaMapLocationDot size={26} />, color: "cyan", title: "Order Tracking", desc: "Real-time automated status and package tracking from dispatch to your doorstep." },
    { icon: <FaHeadset size={26} />, color: "amber", title: "Customer Support", desc: "24/7 dedicated assistance via live chat and priority email for all inquiries and order adjustments." },
    { icon: <FaStore size={26} />, color: "primary", title: "Seller Portal", desc: "Effortlessly list inventory, manage incoming orders, and scale to thousands of active buyers." },
    { icon: <FaCreditCard size={26} />, color: "emerald", title: "Secure Checkout", desc: "Flexible encrypted payments: Credit/Debit Cards, JazzCash, EasyPaisa, or Cash on Delivery." },
    { icon: <FaGift size={26} />, color: "amber", title: "Loyalty Rewards", desc: "Earn redeemable reward points on every transaction for exclusive vouchers and free shipping." },
    { icon: <FaShieldHalved size={26} />, color: "emerald", title: "Buyer Protection", desc: "100% money-back guarantee if your item is defective, delayed, or not as described." },
    { icon: <FaArrowsRotate size={26} />, color: "cyan", title: "Hassle-Free Returns", desc: "7-day return policy with simple courier pickup and quick refund processing." },
    { icon: <FaTruckFast size={26} />, color: "primary", title: "Express Delivery", desc: "Guaranteed 24 to 48-hour delivery across major metropolitan hubs with premium couriers." },
  ]

  const steps = [
    { num: "01", icon: <FaCartShopping size={28} />, title: "Browse & Select", desc: "Explore curated items, read verified buyer reviews, and add to your bag." },
    { num: "02", icon: <FaCreditCard size={28} />, title: "Secure Checkout", desc: "Provide your shipping address and pick your favorite secure payment method." },
    { num: "03", icon: <FaBoxOpen size={28} />, title: "Packed with Care", desc: "Inspected for authenticity, bubble-wrapped, and packed in secure boxes." },
    { num: "04", icon: <FaTruckFast size={28} />, title: "Speedy Delivery", desc: "Dispatched straight to your home with real-time SMS and email tracking." }
  ]

  return (
    <main style={{ backgroundColor: "var(--bg-page)", minHeight: "85vh" }}>
      {/* Header Banner */}
      <div style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", borderBottom: "1px solid #e2e8f0" }} className="py-5 mb-5">
        <div className="container text-center" data-aos="fade-up">
          <div className="feature-badge mx-auto">
            <span>Marketplace Capabilities</span>
          </div>
          <Title level={1} className="font-heading mb-3" style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)" }}>
            Our <span className="gradient-text-primary">Services</span> & Guarantees
          </Title>
          <Paragraph style={{ color: "#64748b", fontSize: "1.15rem", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6 }}>
            Designed to deliver a world-class shopping journey with state-of-the-art logistics, payment safety, and merchant support.
          </Paragraph>
        </div>
      </div>

      <div className="container pb-5">
        {/* Service Cards Grid */}
        <Row gutter={[24, 24]} className="mb-5">
          {services.map((srv, idx) => (
            <Col xs={24} md={12} lg={8} key={idx}>
              <div className="modern-card p-4 h-100" style={{ background: "#ffffff" }} data-aos="fade-up" data-aos-delay={idx * 50}>
                <div className={`icon-bubble ${srv.color}`}>
                  {srv.icon}
                </div>
                <Title level={4} className="font-heading mb-2">{srv.title}</Title>
                <Paragraph style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                  {srv.desc}
                </Paragraph>
              </div>
            </Col>
          ))}
        </Row>

        {/* How It Works Section */}
        <div className="text-center my-5 pt-3" data-aos="fade-up">
          <div className="feature-badge">
            <span>Seamless Process</span>
          </div>
          <Title level={2} className="font-heading mb-2">How ApexStore Works</Title>
          <Paragraph style={{ color: "#64748b", fontSize: "1.05rem" }}>
            Four effortless steps between discovering your favorite item and having it at your door.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} className="mb-5">
          {steps.map((step, idx) => (
            <Col xs={24} sm={12} lg={6} key={idx}>
              <div className="modern-card p-4 h-100 text-center position-relative" style={{ background: "#ffffff" }} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div style={{
                  position: "absolute",
                  top: 14,
                  right: 18,
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  color: "#e2e8f0",
                  fontFamily: "Outfit, sans-serif"
                }}>
                  {step.num}
                </div>
                <div className="icon-bubble primary mx-auto mb-3">
                  {step.icon}
                </div>
                <Title level={4} className="font-heading mb-2">{step.title}</Title>
                <Paragraph style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* CTA Banner */}
      <section className="dark-section-glow py-5 position-relative">
        <div className="container py-4 position-relative" style={{ zIndex: 1 }} data-aos="fade-up">
          <Row justify="center">
            <Col xs={24} lg={10} className="text-center">
              <div className="icon-bubble amber mx-auto mb-3" style={{ width: 72, height: 72 }}>
                <FaHandshake size={34} />
              </div>
              <Title level={1} className="font-heading text-white mb-3">Become a Seller Today</Title>
              <Paragraph className="text-light fs-5 mb-4" style={{ color: "#cbd5e1", lineHeight: 1.6 }}>
                Join thousands of merchants scaling their businesses on ApexStore. List your inventory with zero upfront fees and reach active customers nationwide.
              </Paragraph>
              <Link to="/auth/register" className="btn btn-gold btn-lg px-5 py-3 d-inline-flex align-items-center gap-2 text-decoration-none">
                <span>Start Selling on ApexStore</span>
                <FaArrowRight size={14} />
              </Link>
            </Col>
          </Row>
        </div>
      </section>
    </main>
  )
}

export default OurServices