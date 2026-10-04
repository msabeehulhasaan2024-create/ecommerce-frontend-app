import { Typography } from 'antd'
import { useEffect } from 'react'
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
        <div style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", borderBottom: "1px solid #e2e8f0" }} className="py-5 mb-4">
            <div className="container text-center" data-aos="fade-up">
                <div className="feature-badge mx-auto">
                    <span>Help & Communication</span>
                </div>
                <Title level={1} className="font-heading mb-2" style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)" }}>
                    We're Here to <span className="gradient-text-primary">Help</span>
                </Title>
                <Paragraph style={{ color: "#64748b", fontSize: "1.15rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
                    Have questions about an existing order, partnership opportunities, or technical assistance? Reach our friendly support team anytime.
                </Paragraph>
            </div>
        </div>
    )
}

export default Hero