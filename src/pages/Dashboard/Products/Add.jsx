import { useEffect, useState } from "react"
import { Row, Col, Typography, Form, Input, Select, Button, message, Card } from "antd"
import { Link, useNavigate } from "react-router-dom"
import Aos from "aos"
import axios from "axios"
import { EyeOutlined, ArrowLeftOutlined, CloudUploadOutlined, CheckCircleOutlined } from "@ant-design/icons"

const { Title, Paragraph, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const initialState = { name: "", price: "", stock: "", category: "", description: "" }

const Add = () => {
    useEffect(() => {
        Aos.init({
            duration: 700,
            once: true
        })
    }, [])

    const [state, setState] = useState(initialState)
    const [image, setImage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {
        let { name, price, stock, category, description } = state

        if (name === "" || price === "" || stock === "" || category === "" || description === "") {
            return message.error("All fields are required")
        }
        if (!image) { return message.error("Please select an image") }

        const product = { name, price, stock, category, description }

        const formData = new FormData()
        for (const key in product) { formData.append(key, product[key]) }
        formData.append("image", image)

        setIsProcessing(true)
        const token = localStorage.getItem("token")

        axios.post(`${import.meta.env.VITE_API_URL}/products/create`, formData, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 201) {
                    message.success(data.message)
                    setState(initialState)
                    setImage(null)
                    navigate("/dashboard/products")
                }
            })
            .catch((error) => {
                console.error(error)
                message.error("Something went wrong while creating a product")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    return (
        <div className="py-2" data-aos="fade-up" style={{ maxWidth: 850, margin: "0 auto" }}>
            {/* Header toolbar */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <Link to="/dashboard/products" className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1 mb-1">
                        <ArrowLeftOutlined style={{ fontSize: "0.75rem" }} /> Back to Inventory
                    </Link>
                    <Title level={2} className="mb-0 font-heading fw-bold">Create New Product</Title>
                </div>

                <Link
                    to="/dashboard/products"
                    className="btn btn-outline-secondary rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 small text-decoration-none"
                >
                    <EyeOutlined /> View All Products
                </Link>
            </div>

            {/* Form Card */}
            <Card bordered={false} className="modern-card" style={{ borderRadius: 16 }} bodyStyle={{ padding: "32px 28px" }}>
                <Form layout="vertical">
                    <Row gutter={20}>
                        <Col span={24}>
                            <Form.Item label={<span className="fw-semibold text-dark">Product Title</span>} required className="mb-3">
                                <Input
                                    size="large"
                                    placeholder="e.g. Minimalist Velvet Lounge Chair"
                                    name="name"
                                    value={state.name}
                                    onChange={handleChange}
                                    style={{ borderRadius: 8, padding: "10px 14px" }}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item label={<span className="fw-semibold text-dark">Price (Rs.)</span>} required className="mb-3">
                                <Input
                                    type="number"
                                    size="large"
                                    placeholder="e.g. 18500"
                                    name="price"
                                    value={state.price}
                                    onChange={handleChange}
                                    style={{ borderRadius: 8, padding: "10px 14px" }}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item label={<span className="fw-semibold text-dark">Available Stock</span>} required className="mb-3">
                                <Input
                                    type="number"
                                    size="large"
                                    placeholder="e.g. 45"
                                    name="stock"
                                    value={state.stock}
                                    onChange={handleChange}
                                    style={{ borderRadius: 8, padding: "10px 14px" }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label={<span className="fw-semibold text-dark">Marketplace Category</span>} required className="mb-3">
                                <Select
                                    size="large"
                                    placeholder="Select a category"
                                    value={state.category || undefined}
                                    onChange={(value) => { setState({ ...state, category: value }) }}
                                    style={{ borderRadius: 8 }}
                                >
                                    <Option value="electronics">Electronics & Gadgets</Option>
                                    <Option value="glasses">Eyewear & Accessories</Option>
                                    <Option value="furnitures">Furniture & Living</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label={<span className="fw-semibold text-dark">Product Description</span>} required className="mb-3">
                                <TextArea
                                    rows={5}
                                    placeholder="Detail the materials, features, dimensions, technical specs, and included warranty..."
                                    name="description"
                                    value={state.description}
                                    onChange={handleChange}
                                    style={{ borderRadius: 8, resize: "none", padding: "12px 14px" }}
                                />
                            </Form.Item>
                        </Col>

                        {/* Image Upload Zone */}
                        <Col span={24}>
                            <Form.Item label={<span className="fw-semibold text-dark">Product Image Asset</span>} required className="mb-4">
                                <div
                                    className="p-4 rounded-3 text-center border-2 border-dashed position-relative"
                                    style={{
                                        background: image ? "rgba(16, 185, 129, 0.04)" : "#f8fafc",
                                        borderColor: image ? "#10b981" : "#cbd5e1",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    <div className="mb-2">
                                        {image ? (
                                            <CheckCircleOutlined style={{ fontSize: "2rem", color: "#10b981" }} />
                                        ) : (
                                            <CloudUploadOutlined style={{ fontSize: "2.2rem", color: "#4f46e5" }} />
                                        )}
                                    </div>

                                    {image ? (
                                        <div>
                                            <div className="fw-bold text-success mb-1">{image.name}</div>
                                            <div className="text-muted small">{(image.size / 1024).toFixed(1)} KB - Selected ready to publish</div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="fw-semibold text-dark mb-1">Click below or choose a high-resolution photo</div>
                                            <div className="text-muted small">Supports JPG, PNG, WEBP files up to 5MB</div>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        className="form-control mt-3"
                                        style={{ maxWidth: 360, margin: "12px auto 0" }}
                                        onChange={(e) => { setImage(e.target.files[0]) }}
                                    />
                                </div>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Button
                                type="primary"
                                htmlType="button"
                                size="large"
                                block
                                loading={isProcessing}
                                onClick={handleSubmit}
                                style={{
                                    height: 48,
                                    borderRadius: 10,
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    boxShadow: "0 6px 20px -2px rgba(79, 70, 229, 0.45)"
                                }}
                            >
                                Publish Product to Catalog
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    )
}

export default Add