import { Typography } from 'antd'
import Aos from 'aos'
import { useEffect } from 'react'
import { FaLocationDot } from 'react-icons/fa6'

const { Title, Paragraph } = Typography

const Map = () => {
    useEffect(() => {
        Aos.init({
            duration: 900,
            once: true,
            easing: "ease-in-out"
        })
    }, [])

    return (
        <section className="container mb-5 pb-4" data-aos="fade-up">
            <div className="modern-card p-4 p-md-5" style={{ background: "#ffffff" }}>
                <div className="text-center mb-4">
                    <div className="feature-badge mx-auto">
                        <FaLocationDot size={13} />
                        <span>Interactive Navigation</span>
                    </div>
                    <Title level={3} className="font-heading mb-1">Visit Our Operations Center</Title>
                    <Paragraph type="secondary" style={{ maxWidth: 500, margin: "0 auto" }}>
                        Conveniently situated in DHA Lahore for vendor meetings, customer pickups, and dispatch management.
                    </Paragraph>
                </div>

                <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "var(--shadow-sm)" }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.089128545836!2d73.08623897469153!3d31.411670352506036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922681d444b32e1%3A0xc3887a0e53e91f7!2sSaylani%20Mass%20IT%20Training%20FSD!5e0!3m2!1sen!2s!4v1784019894480!5m2!1sen!2s"
                        width="100%"
                        height="420"
                        style={{ border: 0, display: "block" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title="ApexStore Office Location"
                    />
                </div>
            </div>
        </section>
    )
}

export default Map