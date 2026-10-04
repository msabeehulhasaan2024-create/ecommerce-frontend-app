import { useEffect, useState } from "react"
import { Row, Col, Typography, Button, Modal, Form, Input, message, Image, Spin } from "antd"
import { ShoppingCartOutlined, ThunderboltOutlined, AppstoreOutlined, CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { useAuth } from "@/context/Auth"
import axios from "axios"

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

const initialState = { quantity: 1, shippingAddress: "", selectedProduct: null }

const Products = () => {

    const [products, setProducts] = useState([])
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const { user, addToCart } = useAuth()

    // Get unique categories from products
    const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))]

    // Filter products based on selected category
    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory)

    // Handle Input Change
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    // Get All Products
    useEffect(() => {
        setIsProcessing(true)

        axios.get(`${import.meta.env.VITE_API_URL}/products/public-all`)
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    setProducts(data.products)
                }
            })
            .catch((err) => {
                console.log(err)
                message.error("Something went wrong while fetching products")
            })
            .finally(() => {
                setIsProcessing(false)
            })

    }, [])

    // Show Modal or Open Order Modal
    const handleOrderNow = (product) => {
        setState({ quantity: 1, shippingAddress: "", selectedProduct: product })
        setIsModalOpen(true)
    }

    // Handle Cancel Button
    const handleCancel = () => {
        setIsModalOpen(false)
        setState(initialState)
    }

    // Handle Pay / Place Order Button
    const handlePay = () => {
        const jwt = localStorage.getItem("token")
        if (!jwt) {
            return message.error("Please login to place an order")
        }

        const { quantity, shippingAddress, selectedProduct } = state
        const { id, price, stock, name } = selectedProduct

        const qty = Number(quantity)
        if (!qty || qty < 1) {
            return message.error("Please enter a valid quantity")
        }
        if (qty > stock) {
            return message.error(`Quantity cannot exceed available stock (${stock})`)
        }
        if (!shippingAddress) {
            return message.error("Please enter your shipping address")
        }

        if (user.role !== 'customer') {
            return message.error("Only customers can place orders")
        }

        const orderData = {
            products: [{ productId: id, name, quantity: qty, price }],
            totalAmount: price * qty,
            shippingAddress
        }

        setIsProcessing(true)

        axios.post(`${import.meta.env.VITE_API_URL}/orders/create`, orderData, { headers: { Authorization: `Bearer ${jwt}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200 || status === 201) {
                    message.success(data.message)
                    // Merge updated stock into the products state without a page refresh
                    if (Array.isArray(data.updatedProducts)) {
                        setProducts(prev =>
                            prev.map(p => {
                                const upd = data.updatedProducts.find(u => u.id === p.id)
                                return upd ? { ...p, stock: upd.stock } : p
                            })
                        )
                    }
                    setIsModalOpen(false)
                }
            })
            .catch((err) => {
                console.error(err)
                message.error("Something went wrong while placing an order")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    const currentQty = Number(state.quantity) || 1
    const { selectedProduct } = state

    return (
        <>
            <main style={{ backgroundColor: "var(--bg-page)", minHeight: "85vh" }}>
                {/* Header Banner */}
                <div style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", borderBottom: "1px solid #e2e8f0" }} className="py-5 mb-4">
                    <div className="container text-center">
                        <div className="feature-badge mx-auto">
                            <span>✨ Verified Catalog</span>
                        </div>
                        <Title level={1} className="font-heading mb-2">
                            Explore Premium Products
                        </Title>
                        <Paragraph style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
                            Discover unbeatable deals on high quality items with nationwide delivery and secure checkout.
                        </Paragraph>

                        {/* Category Filter Pills */}
                        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4 pt-2">
                            {categories.map((category) => {
                                const isSelected = selectedCategory === category
                                return (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className="text-capitalize"
                                        style={{
                                            border: isSelected ? "1px solid #4f46e5" : "1px solid #e2e8f0",
                                            background: isSelected ? "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)" : "#ffffff",
                                            color: isSelected ? "#ffffff" : "#475569",
                                            borderRadius: "50px",
                                            padding: "8px 22px",
                                            fontWeight: isSelected ? "700" : "500",
                                            fontSize: "0.925rem",
                                            boxShadow: isSelected ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "0 1px 3px rgba(15, 23, 42, 0.04)",
                                            transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {category}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="container pb-5">
                    {/* Catalog Status Bar */}
                    <div className="d-flex justify-content-between align-items-center mb-4 px-2">
                        <span style={{ color: "#64748b", fontSize: "0.95rem" }}>
                            Showing <strong style={{ color: "#0f172a" }}>{filteredProducts.length}</strong> items {selectedCategory !== "All" && <span>in <strong className="text-capitalize">{selectedCategory}</strong></span>}
                        </span>
                    </div>

                    {isProcessing && products.length === 0 ? (
                        <div className="text-center py-5">
                            <Spin size="large" />
                            <div className="mt-3 text-secondary">Loading product catalog...</div>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="modern-card p-5 text-center my-4">
                            <InfoCircleOutlined style={{ fontSize: 42, color: "#94a3b8" }} className="mb-3" />
                            <Title level={4}>No Products Found</Title>
                            <Paragraph type="secondary">There are no products listed in this category right now.</Paragraph>
                            <Button type="primary" onClick={() => setSelectedCategory("All")}>View All Products</Button>
                        </div>
                    ) : (
                        <Row gutter={[24, 24]}>
                            {filteredProducts.map((product) => {
                                const isOutOfStock = product.stock <= 0
                                return (
                                    <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                                        <div className="modern-card h-100 d-flex flex-column" style={{ background: "#fff" }}>
                                            {/* Product Image Container */}
                                            <div className="position-relative overflow-hidden" style={{ height: 220, background: "#f1f5f9" }}>
                                                <img
                                                    alt={product.name}
                                                    src={product.imageURL}
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                        objectFit: "cover",
                                                        transition: "transform 0.4s ease"
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                />

                                                {/* Category Chip Top-Left */}
                                                <div
                                                    className="position-absolute text-capitalize"
                                                    style={{
                                                        top: 12,
                                                        left: 12,
                                                        background: "rgba(15, 23, 42, 0.75)",
                                                        backdropFilter: "blur(8px)",
                                                        color: "#fff",
                                                        fontSize: "0.75rem",
                                                        fontWeight: 600,
                                                        padding: "4px 10px",
                                                        borderRadius: "20px"
                                                    }}
                                                >
                                                    {product.category}
                                                </div>

                                                {/* Stock Status Top-Right */}
                                                <div
                                                    className="position-absolute d-flex align-items-center gap-1"
                                                    style={{
                                                        top: 12,
                                                        right: 12,
                                                        background: isOutOfStock ? "rgba(239, 68, 68, 0.9)" : "rgba(16, 185, 129, 0.9)",
                                                        backdropFilter: "blur(8px)",
                                                        color: "#fff",
                                                        fontSize: "0.75rem",
                                                        fontWeight: 700,
                                                        padding: "4px 10px",
                                                        borderRadius: "20px",
                                                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                                                    }}
                                                >
                                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }}></span>
                                                    {isOutOfStock ? "Sold Out" : "In Stock"}
                                                </div>
                                            </div>

                                            {/* Product Content */}
                                            <div className="p-3 d-flex flex-column flex-grow-1">
                                                <Title
                                                    level={5}
                                                    className="mb-1 text-truncate"
                                                    style={{ fontSize: "1rem", color: "#0f172a", fontWeight: 700 }}
                                                    title={product.name}
                                                >
                                                    {product.name}
                                                </Title>

                                                <div className="d-flex justify-content-between align-items-baseline mt-2 mb-3">
                                                    <div>
                                                        <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Price</span>
                                                        <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#4f46e5" }}>
                                                            Rs. {product.price?.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="text-end">
                                                        <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Available</span>
                                                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: product.stock < 5 ? "#ef4444" : "#334155" }}>
                                                            {product.stock} units
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="mt-auto d-flex flex-column gap-2">
                                                    <Button
                                                        type="primary"
                                                        block
                                                        icon={<ThunderboltOutlined />}
                                                        onClick={() => handleOrderNow(product)}
                                                        disabled={isOutOfStock}
                                                        className="btn-indigo d-flex align-items-center justify-content-center"
                                                        style={{ height: 40 }}
                                                    >
                                                        Order Now
                                                    </Button>
                                                    <Button
                                                        block
                                                        icon={<ShoppingCartOutlined />}
                                                        onClick={() => addToCart(product)}
                                                        disabled={isOutOfStock}
                                                        style={{
                                                            height: 40,
                                                            borderColor: "#e2e8f0",
                                                            color: "#334155",
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    )}
                </div>
            </main>

            {/* Modal Box for Placing Order */}
            <Modal
                title={
                    <div className="d-flex align-items-center gap-2">
                        <ThunderboltOutlined style={{ color: "#4f46e5" }} />
                        <span className="font-heading" style={{ fontSize: "1.2rem", fontWeight: 700 }}>Quick Checkout</span>
                    </div>
                }
                centered={true}
                open={isModalOpen}
                onOk={handlePay}
                onCancel={handleCancel}
                confirmLoading={isProcessing}
                okText="Confirm & Place Order"
                okButtonProps={{ className: "btn-indigo", style: { height: 42, paddingLeft: 24, paddingRight: 24 } }}
                cancelButtonProps={{ style: { height: 42 } }}
            >
                {selectedProduct && (
                    <Form layout="vertical" className="pt-2">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                                    <div className="d-flex align-items-center gap-3">
                                        <Image
                                            src={selectedProduct.imageURL}
                                            alt={selectedProduct.name}
                                            width={56}
                                            height={56}
                                            style={{ objectFit: 'cover', borderRadius: 10 }}
                                        />
                                        <div>
                                            <div className="fw-bold text-dark">{selectedProduct.name}</div>
                                            <Text type="secondary" style={{ fontSize: "0.85rem" }}>
                                                Rs. {selectedProduct.price?.toLocaleString()} × {currentQty}
                                            </Text>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Subtotal</span>
                                        <span className="fw-bold fs-5" style={{ color: "#4f46e5" }}>
                                            Rs. {(selectedProduct.price * currentQty).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Quantity" required className="mb-2">
                                    <Input
                                        type="number"
                                        size="large"
                                        name="quantity"
                                        min={1}
                                        value={state.quantity}
                                        placeholder="Enter quantity"
                                        max={selectedProduct.stock}
                                        onChange={handleChange}
                                    />
                                    <span style={{ fontSize: "0.8rem", color: "#64748b", marginTop: 4, display: "block" }}>
                                        Max available stock: <strong>{selectedProduct.stock}</strong>
                                    </span>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Shipping Address" required className="mb-0">
                                    <TextArea
                                        rows={3}
                                        name="shippingAddress"
                                        value={state.shippingAddress}
                                        placeholder="House / Street, Area, City, Postal Code"
                                        onChange={handleChange}
                                        style={{ resize: "none" }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Modal>
        </>
    )
}

export default Products
