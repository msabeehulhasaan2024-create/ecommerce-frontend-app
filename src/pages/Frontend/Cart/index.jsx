import { useState } from "react"
import { Typography, Button, Modal, Form, Input, message, Image, Row, Col, Card, Empty, Space, Progress } from "antd"
import { ShoppingCartOutlined, DeleteOutlined, PlusOutlined, MinusOutlined, CreditCardOutlined, SafetyCertificateOutlined, ArrowRightOutlined, ShoppingOutlined } from "@ant-design/icons"
import { useAuth } from "@/context/Auth"
import { Link } from "react-router-dom"
import axios from "axios"

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

const Cart = () => {
    const { cart, updateQuantity, removeFromCart } = useAuth()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [shippingAddress, setShippingAddress] = useState("")
    const [checkoutQty, setCheckoutQty] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false)

    // Handle Open Checkout Modal
    const handleOpenCheckout = (item) => {
        setSelectedItem(item)
        setCheckoutQty(item.quantity)
        setShippingAddress("")
        setIsModalOpen(true)
    }

    // Handle Cancel Checkout
    const handleCancel = () => {
        setIsModalOpen(false)
        setSelectedItem(null)
    }

    // Handle Place Order
    const handlePlaceOrder = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            return message.error("Please login to complete your order")
        }

        if (!shippingAddress.trim()) {
            return message.error("Please enter a shipping address")
        }

        const qty = Number(checkoutQty)
        if (!qty || qty < 1) {
            return message.error("Please enter a valid quantity")
        }

        if (qty > selectedItem.stock) {
            return message.error(`Quantity cannot exceed available stock (${selectedItem.stock})`)
        }

        const orderData = {
            products: [{
                productId: selectedItem.id,
                name: selectedItem.name,
                quantity: qty,
                price: selectedItem.price
            }],
            totalAmount: selectedItem.price * qty,
            shippingAddress
        }

        setIsProcessing(true)

        axios.post(`${import.meta.env.VITE_API_URL}/orders/create`, orderData, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                const { status, data } = res
                if (status === 200 || status === 201) {
                    message.success(data.message || "Order placed successfully!")
                    // Remove product from cart upon checkout success
                    removeFromCart(selectedItem.id)
                    setIsModalOpen(false)
                }
            })
            .catch((err) => {
                console.error(err)
                message.error(err.response?.data?.message || "Something went wrong while placing order")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    // Increment qty
    const handleIncrement = (item) => {
        if (item.quantity >= item.stock) {
            return message.warning(`Cannot exceed available stock (${item.stock})`)
        }
        updateQuantity(item.id, item.quantity + 1)
    }

    // Decrement qty
    const handleDecrement = (item) => {
        if (item.quantity <= 1) {
            return
        }
        updateQuantity(item.id, item.quantity - 1)
    }

    const totalCartSum = cart ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0
    const totalCartItems = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0
    const freeShippingThreshold = 2000
    const qualifiesForFreeShipping = totalCartSum >= freeShippingThreshold

    return (
        <main style={{ backgroundColor: "var(--bg-page)", minHeight: "85vh" }}>
            <div className="container py-5">
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <div style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.35)"
                        }}>
                            <ShoppingCartOutlined style={{ fontSize: "22px" }} />
                        </div>
                        <div>
                            <Title level={2} className="font-heading mb-0" style={{ fontSize: "1.75rem" }}>Shopping Cart</Title>
                            <Text type="secondary" style={{ fontSize: "0.9rem" }}>
                                {cart?.length ? `${cart.length} unique products in your cart` : "Your cart is empty"}
                            </Text>
                        </div>
                    </div>

                    {cart?.length > 0 && (
                        <Link to="/products" className="btn btn-glass d-none d-sm-inline-flex align-items-center gap-2" style={{ color: "#4f46e5", borderColor: "#e2e8f0" }}>
                            <ShoppingOutlined /> Continue Shopping
                        </Link>
                    )}
                </div>

                {!cart || cart.length === 0 ? (
                    <div className="modern-card p-5 text-center my-4">
                        <div style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 20px auto",
                            color: "#4f46e5",
                            fontSize: "36px"
                        }}>
                            <ShoppingCartOutlined />
                        </div>
                        <Title level={3} className="font-heading mb-2">Your Shopping Cart is Empty</Title>
                        <Paragraph type="secondary" style={{ maxWidth: 440, margin: "0 auto 24px auto", fontSize: "1rem" }}>
                            Looks like you haven't added any products to your cart yet. Explore our latest arrivals and discover great deals!
                        </Paragraph>
                        <Link to="/products">
                            <Button type="primary" size="large" className="btn-indigo px-4" style={{ height: 44 }}>
                                Start Shopping <ArrowRightOutlined />
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Row gutter={[24, 24]}>
                        {/* Cart Items List */}
                        <Col xs={24} lg={16}>
                            <Space orientation="vertical" style={{ width: "100%" }} size={16}>
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="modern-card p-3 p-sm-4"
                                        style={{ background: "#ffffff" }}
                                    >
                                        <Row gutter={[16, 16]} align="middle">
                                            {/* Product Image */}
                                            <Col xs={24} sm={6} md={3} className="text-center text-sm-start">
                                                <Image
                                                    src={item.imageURL}
                                                    alt={item.name}
                                                    width={84}
                                                    height={84}
                                                    style={{ objectFit: "cover", borderRadius: 12, border: "1px solid #e2e8f0" }}
                                                />
                                            </Col>

                                            {/* Product Details */}
                                            <Col xs={24} sm={10} md={9}>
                                                <Title level={5} className="mb-1" style={{ fontSize: "1.05rem", fontWeight: 700 }}>{item.name}</Title>
                                                <div className="d-flex align-items-center gap-2 mb-1">
                                                    <span className="badge rounded-pill text-capitalize" style={{ background: "#f1f5f9", color: "#475569", fontWeight: 600 }}>
                                                        {item.category}
                                                    </span>
                                                    <span style={{ fontSize: "0.825rem", color: "#64748b" }}>
                                                        Stock: {item.stock}
                                                    </span>
                                                </div>
                                                <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                                                    Unit Price: <span className="fw-semibold text-dark">Rs. {item.price?.toLocaleString()}</span>
                                                </div>
                                            </Col>

                                            {/* Quantity Selector */}
                                            <Col xs={12} sm={4} md={6} className="text-center">
                                                <div className="d-inline-flex align-items-center justify-content-center p-1 rounded-pill" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                                                    <Button
                                                        type="text"
                                                        shape="circle"
                                                        icon={<MinusOutlined style={{ fontSize: 12 }} />}
                                                        onClick={() => handleDecrement(item)}
                                                        disabled={item.quantity <= 1}
                                                        style={{ width: 32, height: 32 }}
                                                    />
                                                    <span className="fw-bold px-3" style={{ fontSize: "1rem", minWidth: 40, textAlign: "center" }}>
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        type="text"
                                                        shape="circle"
                                                        icon={<PlusOutlined style={{ fontSize: 12 }} />}
                                                        onClick={() => handleIncrement(item)}
                                                        disabled={item.quantity >= item.stock}
                                                        style={{ width: 32, height: 32 }}
                                                    />
                                                </div>
                                            </Col>

                                            {/* Subtotal & Actions */}
                                            <Col xs={12} sm={4} md={6} className="text-end">
                                                <div className="fw-bold fs-5 mb-2" style={{ color: "#4f46e5" }}>
                                                    Rs. {(item.price * item.quantity).toLocaleString()}
                                                </div>
                                                <div className="d-flex justify-content-end gap-2">
                                                    <Button
                                                        type="primary"
                                                        onClick={() => handleOpenCheckout(item)}
                                                        className="btn-indigo d-inline-flex align-items-center"
                                                        style={{ height: 36, paddingLeft: 14, paddingRight: 14, fontSize: "0.85rem" }}
                                                    >
                                                        Checkout
                                                    </Button>
                                                    <Button
                                                        type="text"
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        onClick={() => removeFromCart(item.id)}
                                                        style={{ height: 36, width: 36 }}
                                                        title="Remove from cart"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </Space>
                        </Col>

                        {/* Cart Summary Panel */}
                        <Col xs={24} lg={8}>
                            <div className="modern-card p-4 position-sticky" style={{ top: 90, background: "#ffffff", borderTop: "4px solid #f59e0b" }}>
                                <Title level={4} className="font-heading mb-3">Order Summary</Title>

                                {/* Free shipping alert bar */}
                                <div className="p-3 mb-3 rounded-3" style={{ background: qualifiesForFreeShipping ? "rgba(16, 185, 129, 0.08)" : "rgba(245, 158, 11, 0.08)", border: qualifiesForFreeShipping ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(245, 158, 11, 0.2)" }}>
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: qualifiesForFreeShipping ? "#059669" : "#d97706" }}>
                                            {qualifiesForFreeShipping ? "🎉 FREE Shipping Unlocked!" : "🚚 Free Shipping Target"}
                                        </span>
                                        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b" }}>
                                            {qualifiesForFreeShipping ? "Completed" : `Rs. ${totalCartSum.toLocaleString()} / Rs. ${freeShippingThreshold.toLocaleString()}`}
                                        </span>
                                    </div>
                                    <Progress
                                        percent={Math.min(100, Math.round((totalCartSum / freeShippingThreshold) * 100))}
                                        strokeColor={qualifiesForFreeShipping ? "#10b981" : "#f59e0b"}
                                        showInfo={false}
                                        size="small"
                                    />
                                    {!qualifiesForFreeShipping && (
                                        <span style={{ fontSize: "0.8rem", color: "#64748b", marginTop: 4, display: "block" }}>
                                            Add <strong>Rs. {(freeShippingThreshold - totalCartSum).toLocaleString()}</strong> more to enjoy free delivery!
                                        </span>
                                    )}
                                </div>

                                <div className="d-flex justify-content-between py-2" style={{ borderBottom: "1px solid #f1f5f9" }}>
                                    <Text type="secondary">Total Products</Text>
                                    <Text className="fw-semibold">{cart.length} types</Text>
                                </div>
                                <div className="d-flex justify-content-between py-2" style={{ borderBottom: "1px solid #f1f5f9" }}>
                                    <Text type="secondary">Total Items Quantity</Text>
                                    <Text className="fw-semibold">{totalCartItems} units</Text>
                                </div>
                                <div className="d-flex justify-content-between py-2" style={{ borderBottom: "1px solid #f1f5f9" }}>
                                    <Text type="secondary">Estimated Shipping</Text>
                                    <Text className="fw-semibold" style={{ color: qualifiesForFreeShipping ? "#10b981" : "#0f172a" }}>
                                        {qualifiesForFreeShipping ? "FREE" : "Calculated at checkout"}
                                    </Text>
                                </div>

                                <div className="d-flex justify-content-between align-items-center pt-3 pb-3 mt-2" style={{ borderTop: "2px dashed #e2e8f0" }}>
                                    <div>
                                        <span style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", display: "block" }}>Cart Value</span>
                                        <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Excluding shipping</span>
                                    </div>
                                    <span className="font-heading" style={{ fontSize: "1.6rem", fontWeight: 800, color: "#4f46e5" }}>
                                        Rs. {totalCartSum.toLocaleString()}
                                    </span>
                                </div>

                                <div className="p-3 rounded-3 mt-3 mb-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                                    <div className="d-flex align-items-center gap-2 mb-1" style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: 700 }}>
                                        <SafetyCertificateOutlined /> 100% Safe & Secure Checkout
                                    </div>
                                    <Text type="secondary" style={{ fontSize: "0.8rem" }}>
                                        * Please click 'Checkout' on any individual product above to place your order with shipping details.
                                    </Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                )}
            </div>

            {/* Checkout Modal */}
            <Modal
                title={
                    <div className="d-flex align-items-center gap-2">
                        <CreditCardOutlined style={{ color: "#4f46e5" }} />
                        <span className="font-heading" style={{ fontSize: "1.2rem", fontWeight: 700 }}>Confirm Product Order</span>
                    </div>
                }
                centered
                open={isModalOpen}
                onOk={handlePlaceOrder}
                onCancel={handleCancel}
                confirmLoading={isProcessing}
                okText="Place Order Now"
                okButtonProps={{ className: "btn-indigo", style: { height: 42, paddingLeft: 24, paddingRight: 24 } }}
                cancelButtonProps={{ style: { height: 42 } }}
            >
                {selectedItem && (
                    <Form layout="vertical" className="pt-2">
                        <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                            <div className="d-flex align-items-center gap-3">
                                <Image
                                    src={selectedItem.imageURL}
                                    alt={selectedItem.name}
                                    width={56}
                                    height={56}
                                    style={{ objectFit: "cover", borderRadius: 10 }}
                                />
                                <div>
                                    <div className="fw-bold text-dark">{selectedItem.name}</div>
                                    <Text type="secondary" style={{ fontSize: "0.85rem" }}>
                                        Rs. {selectedItem.price?.toLocaleString()} × {checkoutQty}
                                    </Text>
                                </div>
                            </div>
                            <div className="text-end">
                                <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Total</span>
                                <span className="fw-bold fs-5" style={{ color: "#4f46e5" }}>
                                    Rs. {(selectedItem.price * checkoutQty).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <Form.Item label="Quantity" required className="mb-2">
                            <div className="d-flex align-items-center gap-2">
                                <Button
                                    icon={<MinusOutlined />}
                                    onClick={() => setCheckoutQty(q => Math.max(1, q - 1))}
                                    disabled={checkoutQty <= 1}
                                />
                                <Input
                                    type="number"
                                    value={checkoutQty}
                                    onChange={(e) => {
                                        const val = Number(e.target.value)
                                        if (val >= 1 && val <= selectedItem.stock) {
                                            setCheckoutQty(val)
                                        }
                                    }}
                                    style={{ width: 80, textAlign: "center" }}
                                />
                                <Button
                                    icon={<PlusOutlined />}
                                    onClick={() => setCheckoutQty(q => Math.min(selectedItem.stock, q + 1))}
                                    disabled={checkoutQty >= selectedItem.stock}
                                />
                                <Text type="secondary" className="ms-2">Max stock: <strong>{selectedItem.stock}</strong></Text>
                            </div>
                        </Form.Item>

                        <Form.Item label="Shipping Address" required className="mb-0">
                            <TextArea
                                rows={3}
                                value={shippingAddress}
                                placeholder="Enter your complete delivery address"
                                onChange={(e) => setShippingAddress(e.target.value)}
                                style={{ resize: "none" }}
                            />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </main>
    )
}

export default Cart
