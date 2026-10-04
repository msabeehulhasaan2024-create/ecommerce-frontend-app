import { useEffect } from 'react'
import { Col, Form, Input, Row, Typography, Button } from 'antd'
import { FaLocationDot, FaPhone, FaEnvelope, FaClock, FaComments, FaPaperPlane } from "react-icons/fa6"
import Aos from 'aos'

const { Title, Paragraph, Text } = Typography

const FAQs = () => {
    useEffect(() => {
        Aos.init({
            duration: 900,
            once: true,
            easing: "ease-in-out"
        })
    }, [])

    return (
        <div className="container pb-5">
            <Row gutter={[32, 32]}>
                {/* Form Column */}
                <Col xs={24} lg={14}>
                    <div className="modern-card p-4 p-md-5 h-100" style={{ background: "#ffffff" }} data-aos="fade-up">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <span style={{ color: "#4f46e5", fontSize: "1.2rem" }}><FaPaperPlane /></span>
                            <Title level={3} className="font-heading mb-0">Send Us a Direct Message</Title>
                        </div>
                        <Paragraph type="secondary" className="mb-4">
                            Fill out the inquiry form below and an agent will reply within 4 hours.
                        </Paragraph>

                        <Form layout='vertical'>
                            <Row gutter={[16, 0]}>
                                <Col xs={24} sm={12}>
                                    <Form.Item label="Full Name" required>
                                        <Input type="text" placeholder='Your full name' size='large' />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item label="Phone Number" required>
                                        <Input type="text" placeholder='03XX - XXXXXXX' size='large' />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Email Address" required>
                                        <Input type="email" placeholder='name@example.com' size='large' />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Subject" required>
                                        <Input type="text" placeholder='Order query, return, product question' size='large' />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Message Content" required>
                                        <Input.TextArea rows={5} placeholder='Describe your inquiry in detail...' style={{ resize: "none" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Button
                                        type='primary'
                                        size='large'
                                        className="btn-indigo d-inline-flex align-items-center gap-2 px-4"
                                        style={{ height: 46 }}
                                    >
                                        <FaPaperPlane size={14} /> Send Message
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>

                {/* Info Column */}
                <Col xs={24} lg={10}>
                    <div className="d-flex flex-column gap-4">
                        {/* Contact Information Card */}
                        <div className="modern-card p-4" style={{ background: "#ffffff" }} data-aos="fade-up">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="icon-bubble primary mb-0" style={{ width: 44, height: 44 }}>
                                    <FaLocationDot size={18} />
                                </div>
                                <Title level={4} className="font-heading mb-0">Headquarters</Title>
                            </div>
                            <div className="d-flex flex-column gap-2 ps-2">
                                <div>
                                    <Text type="secondary" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Address</Text>
                                    <div className="fw-semibold text-dark">Plot 14, DHA Phase 6, Lahore, Pakistan</div>
                                </div>
                                <div>
                                    <Text type="secondary" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Phone Inquiries</Text>
                                    <div className="fw-semibold" style={{ color: "#4f46e5" }}>+92 300 000 0000</div>
                                </div>
                                <div>
                                    <Text type="secondary" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Email Support</Text>
                                    <div className="fw-semibold" style={{ color: "#06b6d4" }}>support@apexstore.pk</div>
                                </div>
                            </div>
                        </div>

                        {/* Working Hours Card */}
                        <div className="modern-card p-4" style={{ background: "#ffffff" }} data-aos="fade-up" data-aos-delay={100}>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="icon-bubble amber mb-0" style={{ width: 44, height: 44 }}>
                                        <FaClock size={18} />
                                    </div>
                                    <Title level={4} className="font-heading mb-0">Operating Hours</Title>
                                </div>
                                <span className="badge rounded-pill" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#059669", fontWeight: 700, padding: "5px 12px" }}>
                                    🟢 Active Support
                                </span>
                            </div>
                            <div className="d-flex flex-column gap-2 ps-2" style={{ fontSize: "0.925rem" }}>
                                <div className="d-flex justify-content-between">
                                    <span style={{ color: "#64748b" }}>Monday – Saturday:</span>
                                    <span className="fw-semibold text-dark">9:00 AM – 9:00 PM</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span style={{ color: "#64748b" }}>Sunday:</span>
                                    <span className="fw-semibold text-dark">10:00 AM – 6:00 PM</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span style={{ color: "#64748b" }}>Public Holidays:</span>
                                    <span className="fw-semibold text-dark">12:00 PM – 5:00 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Live Support Banner */}
                        <div className="modern-card p-4" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)", color: "#ffffff" }} data-aos="fade-up" data-aos-delay={150}>
                            <div className="d-flex align-items-center gap-3 mb-2">
                                <div style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 12,
                                    background: "rgba(245, 158, 11, 0.2)",
                                    color: "#f59e0b",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <FaComments size={20} />
                                </div>
                                <Title level={4} className="font-heading text-white mb-0">Instant Live Chat</Title>
                            </div>
                            <Paragraph style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.5 }}>
                                Need urgent help regarding an in-transit order? Speak directly with our responsive support agents.
                            </Paragraph>
                            <Button className="btn-gold d-inline-flex align-items-center gap-2" style={{ border: "none" }}>
                                <FaComments /> Launch Live Chat
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default FAQs