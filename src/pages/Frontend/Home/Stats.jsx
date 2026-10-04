import { useEffect } from 'react';
import { Col, Row, Typography } from 'antd'
import { FaUserGroup, FaBoxesStacked, FaMapLocationDot, FaCartShopping } from "react-icons/fa6";
import Aos from 'aos';
import * as RC from "react-countup";

const { Title, Text } = Typography
const CountUp = RC.default?.default || RC.default || RC;

const Stats = () => {
    useEffect(() => {
        Aos.init({
            duration: 900,
            once: true,
            easing: "ease-in-out"
        })
    }, [])

    const statsData = [
        {
            icon: <FaUserGroup size={24} />,
            colorClass: 'primary',
            end: 300,
            suffix: 'K+',
            label: 'Happy Customers',
            sub: 'Across Pakistan & UAE'
        },
        {
            icon: <FaBoxesStacked size={24} />,
            colorClass: 'amber',
            end: 12000,
            suffix: '+',
            label: 'Products Listed',
            sub: 'Verified Authentic Goods'
        },
        {
            icon: <FaMapLocationDot size={24} />,
            colorClass: 'cyan',
            end: 50,
            suffix: '+',
            label: 'Cities Delivered',
            sub: 'Reliable Courier Network'
        },
        {
            icon: <FaCartShopping size={24} />,
            colorClass: 'emerald',
            end: 150,
            suffix: 'K+',
            label: 'Orders Completed',
            sub: '99.4% Delivery Success'
        }
    ]

    return (
        <section className="py-4 my-2">
            <div className="container">
                <Row gutter={[24, 24]}>
                    {statsData.map((item, idx) => (
                        <Col xs={24} sm={12} lg={6} key={idx}>
                            <div className="modern-card p-4 h-100 text-center" data-aos="fade-up" data-aos-delay={idx * 100}>
                                <div className={`icon-bubble ${item.colorClass} mx-auto`}>
                                    {item.icon}
                                </div>
                                <Title level={2} className="font-heading mb-1" style={{ fontSize: '2.2rem', fontWeight: 800 }}>
                                    <CountUp end={item.end} duration={2.5} enableScrollSpy scrollSpyOnce />{item.suffix}
                                </Title>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>
                                    {item.label}
                                </div>
                                <Text type="secondary" style={{ fontSize: '0.825rem', marginTop: 4, display: 'block' }}>
                                    {item.sub}
                                </Text>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    )
}

export default Stats